/* eslint-disable no-await-in-loop */
/**
 * @file Entry point for application
 */

import '../styles/style.css';
import { Timer, ProgressRing, TaskList, Settings } from '../components';
import {
  deselectAllTasks,
  getCurrentlySelectedTask,
  incrementPomodoro,
  initializeTaskList,
  selectFirstTask,
  setTasklistUsability,
} from './taskList';
import { initializeProgressRing, setProgress } from './progressRing';
import { initializeTimer, setTimer } from './timer';
import { initializeSettings } from './settings';
import {
  POMODORO_ANNOUNCEMENT,
  SHORT_BREAK_ANNOUNCEMENT,
  LONG_BREAK_ANNOUNCEMENT,
  POMODORO_INTERVAL,
  SHORT_BREAK_INTERVAL,
  LONG_BREAK_INTERVAL,
  END_OF_SESSION_ANNOUNCEMENT,
} from '../utils/constants';
import {
  initializeIntervalLengths,
  setAnnouncement,
  tick,
} from '../utils/utils';

customElements.define('timer-component', Timer);
customElements.define('progress-ring', ProgressRing);
customElements.define('task-list', TaskList);
customElements.define('settings-component', Settings);

let isSessionOngoing = false;

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

const {
  pomodoroLength,
  shortBreakLength,
  longBreakLength,
} = initializeIntervalLengths();

/**
 * Handles pomodoro app, dispatches actions to components depending on the current interval
 * @param {HTMLElement} announcementElement - element for announcements
 */
const startSession = async (announcementElement) => {
  let numPomodoros = 0;
  let currInterval = null;
  let currSelectedTask = null;

  // continue looping if session has not been ended
  while (isSessionOngoing) {
    // set next interval and announcements
    if (currInterval === POMODORO_INTERVAL) {
      numPomodoros++;

      // check if break should be short or long
      const shouldBeLongBreak = numPomodoros > 0 && numPomodoros % 4 === 0;
      if (shouldBeLongBreak) {
        currInterval = LONG_BREAK_INTERVAL;
        setAnnouncement(announcementElement, LONG_BREAK_ANNOUNCEMENT);
      } else {
        currInterval = SHORT_BREAK_INTERVAL;
        setAnnouncement(announcementElement, SHORT_BREAK_ANNOUNCEMENT);
      }
    } else {
      currInterval = POMODORO_INTERVAL;

      currSelectedTask = getCurrentlySelectedTask();
      if (!currSelectedTask) currSelectedTask = selectFirstTask();

      setTasklistUsability(false);
      setAnnouncement(announcementElement, POMODORO_ANNOUNCEMENT);
    }

    // pick interval to start
    switch (currInterval) {
      case POMODORO_INTERVAL:
        if (await startInterval(pomodoroLength))
          incrementPomodoro(currSelectedTask);
        break;
      case SHORT_BREAK_INTERVAL:
        await startInterval(shortBreakLength);
        break;
      case LONG_BREAK_INTERVAL:
        await startInterval(longBreakLength);
        break;
      default:
    }
    setTasklistUsability(true);

    // reset progress and give it time to reset (progress-ring transition is 35s)
    setProgress(100);
    await tick(0.25);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const progressRingElement = document.querySelector('.progress-ring');
  const timerElement = progressRingElement.shadowRoot.querySelector('.timer');
  const announcementElement = document.querySelector('.announcement');
  const settingsElement = document.querySelector('.settings');
  initializeProgressRing(progressRingElement);
  initializeTimer(timerElement);
  initializeSettings(settingsElement);
  initializeTaskList(document.querySelector('.task-list'));
  deselectAllTasks();
  setTimer(pomodoroLength);

  // start session when start button is clicked
  const startButton = document.querySelector('.session-button');
  startButton.addEventListener('click', (e) => {
    if (e.target.innerText === 'Start') {
      isSessionOngoing = true;
      startSession(announcementElement);
      e.target.innerText = 'End';
      e.target.className = 'session-button in-session';
    } else {
      isSessionOngoing = false;
      setAnnouncement(announcementElement, END_OF_SESSION_ANNOUNCEMENT);
      deselectAllTasks();
      e.target.innerText = 'Start';
      e.target.className = 'session-button';
      // TODO: stop session
      // TODO: display metrics
    }
  });
});
