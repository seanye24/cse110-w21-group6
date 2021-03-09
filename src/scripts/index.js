/* eslint-disable no-await-in-loop */
/**
 * @file Entry point for application
 */

import '../styles/style.css';
import { Timer, ProgressRing, TaskList, Settings } from '../components';
import {
  completeTask,
  deselectAllTasks,
  getCurrentlySelectedTask,
  incrementPomodoro,
  initializeTaskList,
  selectFirstTask,
  setTasklistUsability,
} from './taskList';
import { initializeProgressRing, setProgress } from './progressRing';
import { initializeTimer, setTimer } from './timer';
import {
  initializeSettings,
  getShortBreakLength,
  getLongBreakLength,
  openSettingsPopup,
} from './settings';
import {
  initializeAnnouncement,
  setAnnouncement,
  setYesButtonCallback,
  setNoButtonCallback,
  setButtonVisibility,
} from './announcement';
import {
  initializeConfirmation,
  openConfirmationPopup,
  closeConfirmationPopup,
} from './endSessionConfirmationPopup';
import {
  POMODORO_ANNOUNCEMENT,
  SHORT_BREAK_ANNOUNCEMENT,
  LONG_BREAK_ANNOUNCEMENT,
  POMODORO_INTERVAL,
  SHORT_BREAK_INTERVAL,
  LONG_BREAK_INTERVAL,
  END_OF_SESSION_ANNOUNCEMENT,
  TASK_COMPLETION_QUESTION,
  NO_TASKS_ANNOUNCEMENT,
  DEFAULT_POMODORO_INTERVAL,
} from '../utils/constants';
import { tick } from '../utils/utils';

customElements.define('timer-component', Timer);
customElements.define('progress-ring', ProgressRing);
customElements.define('task-list', TaskList);
customElements.define('settings-component', Settings);

let isSessionOngoing = false;
const pomodoroLength = DEFAULT_POMODORO_INTERVAL;
let shortBreakLength;
let longBreakLength;

/**
 * Starts and runs interval until interval is completed
 * @param {number} intervalLength - length of interval (in seconds)
 * @return {Promise<void>} - implicitly returns Promise after currTime reaches 0
 */
const startInterval = async (intervalLength) => {
  let currTime = intervalLength;
  while (currTime >= 0) {
    // quit if session stops
    if (!isSessionOngoing) {
      setTimer(0);
      setProgress(0);
      return false;
    }
    const currProgress = (100 * currTime) / intervalLength;
    setTimer(currTime);
    setProgress(currProgress);
    await tick(1);
    currTime--;
  }
  return true;
};

/**
 * Handles pomodoro app, dispatches actions to components depending on the current interval
 * @param {Function} changeSessionButton - changes session button from start to end
 * @return {Promise<number>} - number of pomodoros completed during session
 */
const startSession = async (changeSessionButton) => {
  let numPomodoros = 0;
  let currInterval = POMODORO_INTERVAL;
  let currSelectedTask = null;

  // continue looping if session has not been ended
  while (isSessionOngoing) {
    if (currInterval === POMODORO_INTERVAL) {
      // use previous currTask or next available
      // stop if no tasks are available
      currSelectedTask = getCurrentlySelectedTask();
      if (!currSelectedTask) {
        currSelectedTask = selectFirstTask();
      }
      if (!currSelectedTask) {
        return numPomodoros === 0 ? -1 : numPomodoros;
      }

      if (numPomodoros === 0) {
        changeSessionButton();
      }

      // disable tasklist
      setTasklistUsability(false);
      setAnnouncement(POMODORO_ANNOUNCEMENT);

      // start pomodoro
      if (!(await startInterval(60 * pomodoroLength))) {
        return numPomodoros;
      }

      currSelectedTask = incrementPomodoro(currSelectedTask); // increment task if pomo is fully completed

      // check if break should be short or long
      numPomodoros++;
      const shouldBeLongBreak = numPomodoros > 0 && numPomodoros % 4 === 0;
      currInterval = shouldBeLongBreak
        ? LONG_BREAK_INTERVAL
        : SHORT_BREAK_INTERVAL;

      // reenable task list
      setTasklistUsability(true);
    } else {
      // prompt user
      setButtonVisibility('visible');
      setAnnouncement(TASK_COMPLETION_QUESTION);

      // copy curr selected task due to weird loop closures
      const currSelectedTaskCopy = currSelectedTask;
      const currAnnouncement =
        currInterval === LONG_BREAK_ANNOUNCEMENT
          ? LONG_BREAK_ANNOUNCEMENT
          : SHORT_BREAK_ANNOUNCEMENT;

      let wasButtonClicked = false;
      setYesButtonCallback(() => {
        completeTask(currSelectedTaskCopy);
        selectFirstTask();
        setAnnouncement(currAnnouncement);
        setButtonVisibility('hidden');
        wasButtonClicked = true;
      });
      setNoButtonCallback(() => {
        setAnnouncement(currAnnouncement);
        setButtonVisibility('hidden');
        wasButtonClicked = true;
      });

      if (
        !(await startInterval(
          currInterval === LONG_BREAK_INTERVAL
            ? 60 * longBreakLength
            : 60 * shortBreakLength,
        ))
      ) {
        return numPomodoros;
      }

      if (!wasButtonClicked) {
        setButtonVisibility('hidden');
      }
      currInterval = POMODORO_INTERVAL;
    }

    // reset progress and give it time to reset (progress-ring transition is 35s)
    setProgress(100);
    await tick(0.25);
  }
  return numPomodoros;
};

/**
 * Handle end of session
 * @param {HTMLElement} sessionButton - session button element
 * @param {number} numPomodoros - number of pomodoros completed during the session
 */
const endSession = (sessionButton, numPomodoros) => {
  isSessionOngoing = false;
  setAnnouncement(
    numPomodoros === -1 ? NO_TASKS_ANNOUNCEMENT : END_OF_SESSION_ANNOUNCEMENT,
  );
  deselectAllTasks();
  sessionButton.innerText = 'Start';
  sessionButton.className = 'session-button';
  // TODO: stop session
  // TODO: display metrics
};

window.addEventListener('DOMContentLoaded', () => {
  const settingsIcon = document.querySelector('.settings-icon');
  const progressRingElement = document.querySelector('.progress-ring');
  const timerElement = progressRingElement.shadowRoot.querySelector('.timer');
  const sessionButton = document.querySelector('.session-button');
  const announcementElement = document.querySelector('.announcement-container');
  const taskListElement = document.querySelector('.task-list');
  const confirmationPopup = document.querySelector('.confirmation-popup');
  const settingsElement = document.querySelector('.settings');

  const onSaveSettings = (newShortBreakLength, newLongBreakLength) => {
    shortBreakLength = newShortBreakLength;
    longBreakLength = newLongBreakLength;
  };

  initializeProgressRing(progressRingElement);
  initializeTimer(timerElement);
  initializeAnnouncement(announcementElement);
  initializeTaskList(taskListElement);
  initializeConfirmation(confirmationPopup, () => {
    isSessionOngoing = false;
  });
  initializeSettings(settingsElement, onSaveSettings);
  settingsIcon.onclick = openSettingsPopup;

  shortBreakLength = getShortBreakLength();
  longBreakLength = getLongBreakLength();

  deselectAllTasks();
  setTimer(60 * pomodoroLength);

  // adjust nav bar color
  const navBar = document.querySelector('.navbar');
  window.onscroll = () => {
    if (window.scrollY === 0) {
      navBar.classList.remove('scrolled');
    } else {
      navBar.classList.add('scrolled');
    }
  };

  // start session when start button is clicked
  sessionButton.onmousedown = (e) => {
    e.preventDefault();
  };
  sessionButton.addEventListener('click', async (e) => {
    if (e.target.innerText === 'Start') {
      isSessionOngoing = true;
      const changeSessionButton = () => {
        e.target.innerText = 'End';
        e.target.className = 'session-button in-session';
      };
      const numPomodoros = await startSession(changeSessionButton);
      // reset progress and give it time to reset (progress-ring transition is 35s)
      setProgress(100);
      await tick(0.25);
      setTasklistUsability(true);
      endSession(e.target, numPomodoros);
      setButtonVisibility('hidden');
    } else {
      openConfirmationPopup();
    }
  });
});
