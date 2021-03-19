/* eslint-disable no-await-in-loop */
import { dispatch, subscribe } from '../models';
import { ACTIONS, INTERVALS } from '../utils/constants';
import { tick, updateClassesByInterval } from '../utils/helpers';
import { openPopup as openConfirmationPopup } from './confirmationPopup';
import { openPopup as openSettingsPopup } from './settings';
import {
  initializePopup as initializeSummaryPopup,
  openPopup as openSummaryPopup,
} from './summaryPopup';
import { getTasks } from './taskList';

let session;
let totalSessionTime;
let numberOfPomodorosCompleted;
let currentTime;
let currentInterval;
let currentSelectedTask;
let pomodoroLength;
let shortBreakLength;
let longBreakLength;
let timerAudio;
let wasAnnouncementButtonClicked;

/**
 * Starts and runs interval until interval is completed
 * @param {number} intervalLength - length of interval (in seconds)
 * @return {Promise<void>} - implicitly returns Promise after currentTime reaches 0
 */
const startInterval = async (intervalLength) => {
  dispatch(ACTIONS.changeCurrentTime, intervalLength);
  while (currentTime >= 0) {
    // quit if session stops
    if (session === 'inactive') {
      return false;
    }
    await tick(1);
    if (session === 'active') {
      dispatch(ACTIONS.changeCurrentTime, currentTime - 1);
    }
  }
  return true;
};

/**
 * Handles pomodoro app, dispatches actions to components depending on the current interval
 */
const startSession = async () => {
  // continue looping if session has not been ended
  while (session === 'active') {
    if (currentInterval === INTERVALS.pomodoro) {
      // stop if no tasks available
      if (!currentSelectedTask) {
        dispatch(ACTIONS.changeSession, 'inactive');
        return;
      }

      // start pomodoro, stop if interval is interrupted
      const shouldContinue = await startInterval(60 * pomodoroLength);
      if (!shouldContinue) {
        return;
      }

      dispatch(ACTIONS.incrementSelectedTask);
      dispatch(ACTIONS.changeNumberOfPomodoros, numberOfPomodorosCompleted + 1);
      dispatch(
        ACTIONS.changeTotalSessionTime,
        totalSessionTime + 60 * pomodoroLength,
      );

      // check if break should be short or long
      const shouldBeLongBreak =
        numberOfPomodorosCompleted > 0 && numberOfPomodorosCompleted % 4 === 0;
      const nextInterval = shouldBeLongBreak
        ? INTERVALS.longBreak
        : INTERVALS.shortBreak;
      dispatch(ACTIONS.changeCurrentInterval, nextInterval);
    } else {
      wasAnnouncementButtonClicked = false;
      // start break, stop if interval is interrupted
      const nextIntervalLength =
        currentInterval === INTERVALS.longBreak
          ? longBreakLength
          : shortBreakLength;
      const shouldContinue = await startInterval(60 * nextIntervalLength);

      // choose no if user didn't pick
      if (!wasAnnouncementButtonClicked) {
        dispatch(ACTIONS.doNotCompleteSelectedTask);
      }
      if (!shouldContinue) {
        return;
      }

      dispatch(
        ACTIONS.changeTotalSessionTime,
        totalSessionTime + 60 * nextIntervalLength,
      );
      dispatch(ACTIONS.changeCurrentInterval, INTERVALS.pomodoro);
    }
  }
};

/**
 * Handle end of session
 */
const endSession = () => {
  if (numberOfPomodorosCompleted > 0) {
    initializeSummaryPopup(
      document.querySelector('#summary-overlay'),
      getTasks(),
    );
    openSummaryPopup();
  }
  dispatch(ACTIONS.changeTotalSessionTime, 0);
  dispatch(ACTIONS.changeCurrentTime, 0);
  dispatch(ACTIONS.changeCurrentInterval, INTERVALS.pomodoro);
  dispatch(ACTIONS.changeSelectedTask, null);
  dispatch(ACTIONS.changeNumberOfPomodoros, 0);
  dispatch(ACTIONS.clearCompletedTasks);
};

const initializeController = () => {
  const mainElement = document.querySelector('#main');
  const navBarElement = document.querySelector('.navbar');
  const footerElement = document.querySelector('.footer');
  const sessionButton = document.querySelector('.session-button');
  const settingsIcon = document.querySelector('.material-icons');
  const progressRingElement = document.querySelector('.progress-ring');
  const timerElement = progressRingElement.shadowRoot.querySelector('.timer');

  const elementsThatChangeTheme = [
    mainElement,
    navBarElement,
    sessionButton,
    footerElement,
  ];

  const onChangeSession = (sessionState) => {
    session = sessionState.session;
    if (session === 'active') {
      sessionButton.innerText = 'End';
      sessionButton.classList.add('session-button', 'in-session');
    } else if (session === 'inactive') {
      updateClassesByInterval(INTERVALS.pomodoro, elementsThatChangeTheme);
      sessionButton.innerText = 'Start';
      sessionButton.classList.remove('in-session');
      endSession();
    }
  };
  const onChangeTotalSessionTime = (sessionState) => {
    totalSessionTime = sessionState.totalSessionTime;
  };
  const onChangeTime = (sessionState) => {
    currentTime = sessionState.currentTime;
  };
  const onChangeInterval = (sessionState) => {
    currentInterval = sessionState.currentInterval;
    updateClassesByInterval(currentInterval, elementsThatChangeTheme);

    // play timer audio at the end of every interval
    if (
      sessionState.session === 'active' &&
      sessionState.numberOfPomodorosCompleted > 0
    ) {
      timerAudio.pause();
      timerAudio.play().catch(() => true); // ignore if interrupted
    }
  };
  const onSelectTask = (sessionState) => {
    currentSelectedTask = sessionState.currentSelectedTask;
  };
  const onChangeNumPomodoros = (sessionState) => {
    numberOfPomodorosCompleted = sessionState.numberOfPomodorosCompleted;
  };
  const onChangePomodoroLength = (sessionState) => {
    pomodoroLength = sessionState.pomodoroLength;
  };
  const onChangeShortBreakLength = (sessionState) => {
    shortBreakLength = sessionState.shortBreakLength;
  };
  const onChangeLongBreakLength = (sessionState) => {
    longBreakLength = sessionState.longBreakLength;
  };
  const onChangeTimerAudio = (sessionState) => {
    timerAudio = sessionState.timerAudio;
  };
  const onCompleteTask = () => {
    wasAnnouncementButtonClicked = true;
  };
  const onDidNotCompleteTask = () => {
    wasAnnouncementButtonClicked = true;
  };

  ({
    session,
    totalSessionTime,
    numberOfPomodorosCompleted,
    currentTime,
    currentInterval,
    currentSelectedTask,
    pomodoroLength,
    shortBreakLength,
    longBreakLength,
    timerAudio,
  } = subscribe({
    [ACTIONS.changeSession]: onChangeSession,
    [ACTIONS.changeTotalSessionTime]: onChangeTotalSessionTime,
    [ACTIONS.changeNumberOfPomodoros]: onChangeNumPomodoros,
    [ACTIONS.changeCurrentTime]: onChangeTime,
    [ACTIONS.changeCurrentInterval]: onChangeInterval,
    [ACTIONS.changeSelectedTask]: onSelectTask,
    [ACTIONS.changePomodoroLength]: onChangePomodoroLength,
    [ACTIONS.changeShortBreakLength]: onChangeShortBreakLength,
    [ACTIONS.changeLongBreakLength]: onChangeLongBreakLength,
    [ACTIONS.changeTimerAudio]: onChangeTimerAudio,
    [ACTIONS.completeSelectedTask]: onCompleteTask,
    [ACTIONS.doNotCompleteSelectedTask]: onDidNotCompleteTask,
  }));

  // initialize variables, event listeners, and component values
  settingsIcon.onclick = openSettingsPopup;
  timerElement.onclick = () => timerAudio.pause();
  sessionButton.onmousedown = (e) => {
    e.preventDefault();
  };
  [...document.querySelectorAll('.navbar-link')].forEach((l) => {
    l.onmousedown = (e) => e.preventDefault();
  });

  // start session when start button is clicked
  sessionButton.addEventListener('click', async () => {
    if (sessionButton.innerText === 'Start') {
      // enable audio element
      const oldTimerAudioSrc = timerAudio.src;
      timerAudio.src = '';
      timerAudio.play().catch(() => true); // ignore if interrupted
      timerAudio.src = oldTimerAudioSrc;

      dispatch(ACTIONS.changeSession, 'active');
      await startSession();
    } else {
      openConfirmationPopup();
    }
  });
};

export default initializeController;
