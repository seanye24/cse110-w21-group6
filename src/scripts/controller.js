/* eslint-disable no-await-in-loop */
import { dispatch, subscribe } from '../models';
import {
  ACTIONS,
  END_OF_SESSION_ANNOUNCEMENT,
  LONG_BREAK_ANNOUNCEMENT,
  LONG_BREAK_INTERVAL,
  NO_TASKS_ANNOUNCEMENT,
  POMODORO_INTERVAL,
  SHORT_BREAK_ANNOUNCEMENT,
  SHORT_BREAK_INTERVAL,
} from '../utils/constants';
import { tick } from '../utils/helpers';
import { setAnnouncement, setButtonVisibility } from './announcement';
import { openPopup as openConfirmationPopup } from './confirmationPopup';
import { openPopup as openSettingsPopup } from './settings';
import {
  initializePopup as initializeSummaryPopup,
  openPopup as openSummaryPopup,
} from './summaryPopup';
import { getTasks, selectFirstTask, setTasklistUsability } from './taskList';

let session;
let numPomodoros;
let currTime;
let currInterval;
let currSelectedTask;
let pomodoroLength;
let shortBreakLength;
let longBreakLength;
let timerAudio;
let wasAnnouncementButtonClicked;

/**
 * Starts and runs interval until interval is completed
 * @param {number} intervalLength - length of interval (in seconds)
 * @return {Promise<void>} - implicitly returns Promise after currTime reaches 0
 */
const startInterval = async (intervalLength) => {
  dispatch(ACTIONS.CHANGE_TIME, intervalLength);
  while (currTime >= 0) {
    // quit if session stops
    if (session === 'inactive') {
      return false;
    }
    await tick(1);
    if (session === 'active') {
      dispatch(ACTIONS.CHANGE_TIME, currTime - 1);
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
    if (currInterval === POMODORO_INTERVAL) {
      // if no tasks are selected, try to select first task
      if (!currSelectedTask) {
        selectFirstTask();
      }
      // stop if no tasks available
      if (!currSelectedTask) {
        if (numPomodoros === 0) {
          dispatch(ACTIONS.SET_NUM_POMODOROS, -1); // if session is stopped bc no tasks are available, set numPomodoros to -1
        }
        dispatch(ACTIONS.CHANGE_SESSION, 'inactive');
        return;
      }

      // start pomodoro, stop if interval is interrupted
      const shouldContinue = await startInterval(60 * pomodoroLength);
      if (!shouldContinue) {
        return;
      }

      dispatch(ACTIONS.INCREMENT_CURRENT_TASK);
      dispatch(ACTIONS.SET_NUM_POMODOROS, numPomodoros + 1);

      // check if break should be short or long
      const shouldBeLongBreak = numPomodoros > 0 && numPomodoros % 4 === 0;
      const nextInterval = shouldBeLongBreak
        ? LONG_BREAK_INTERVAL
        : SHORT_BREAK_INTERVAL;
      dispatch(ACTIONS.CHANGE_INTERVAL, nextInterval);
    } else {
      wasAnnouncementButtonClicked = false;
      // start break, stop if interval is interrupted
      const nextIntervalLength =
        currInterval === LONG_BREAK_INTERVAL
          ? longBreakLength
          : shortBreakLength;
      const shouldContinue = await startInterval(60 * nextIntervalLength);

      // choose no if user didn't pick
      if (!wasAnnouncementButtonClicked) {
        dispatch(ACTIONS.DID_NOT_COMPLETE_CURRENT_TASK);
      }
      dispatch(ACTIONS.CHANGE_INTERVAL, POMODORO_INTERVAL);

      if (!shouldContinue) {
        return;
      }
    }
  }
};

/**
 * Handle end of session
 * @param {number} numPomodoros - number of pomodoros completed during the session
 */
const endSession = () => {
  if (numPomodoros === -1) {
    setAnnouncement(NO_TASKS_ANNOUNCEMENT);
  } else {
    setAnnouncement(END_OF_SESSION_ANNOUNCEMENT);
  }
  if (numPomodoros > 0) {
    initializeSummaryPopup(
      document.querySelector('#summary-overlay'),
      getTasks(),
    );
    openSummaryPopup();
  }
  dispatch(ACTIONS.SET_NUM_POMODOROS, 0);
  dispatch(ACTIONS.CHANGE_TIME, 0);
};

const initializeController = () => {
  const sessionButton = document.querySelector('.session-button');
  const settingsIcon = document.querySelector('.settings-icon');
  const progressRingElement = document.querySelector('.progress-ring');
  const timerElement = progressRingElement.shadowRoot.querySelector('.timer');

  const onChangeSession = (sessionState) => {
    session = sessionState.session;
    if (session === 'active') {
      sessionButton.innerText = 'End';
      sessionButton.classList.add('session-button', 'in-session');
    } else if (session === 'inactive') {
      sessionButton.innerText = 'Start';
      sessionButton.classList.remove('in-session');
      endSession();
    }
  };
  const onChangeTime = (sessionState) => {
    currTime = sessionState.currTime;
  };
  const onChangeInterval = (sessionState) => {
    currInterval = sessionState.currInterval;

    // play timer audio at the end of every interval
    if (sessionState.numPomodoros > 0) {
      timerAudio.pause();
      timerAudio.play().catch(() => true); // ignore if interrupted
    }
  };
  const onSelectTask = (sessionState) => {
    currSelectedTask = sessionState.currSelectedTask;
  };
  const onChangeNumPomodoros = (sessionState) => {
    numPomodoros = sessionState.numPomodoros;
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
  const onCompleteTask = (sessionState) => {
    setTasklistUsability(true);
    setButtonVisibility('hidden');
    wasAnnouncementButtonClicked = true;
    if (sessionState.currInterval === SHORT_BREAK_INTERVAL) {
      setAnnouncement(SHORT_BREAK_ANNOUNCEMENT);
    } else if (sessionState.currInterval === LONG_BREAK_INTERVAL) {
      setAnnouncement(LONG_BREAK_ANNOUNCEMENT);
    }
  };
  const onDidNotCompleteTask = (sessionState) => {
    setButtonVisibility('hidden');
    wasAnnouncementButtonClicked = true;
    if (sessionState.currInterval === SHORT_BREAK_INTERVAL) {
      setAnnouncement(SHORT_BREAK_ANNOUNCEMENT);
    } else if (sessionState.currInterval === LONG_BREAK_INTERVAL) {
      setAnnouncement(LONG_BREAK_ANNOUNCEMENT);
    }
  };

  ({
    session,
    numPomodoros,
    currTime,
    currInterval,
    currSelectedTask,
    pomodoroLength,
    shortBreakLength,
    longBreakLength,
    timerAudio,
  } = subscribe({
    [ACTIONS.CHANGE_SESSION]: onChangeSession,
    [ACTIONS.SET_NUM_POMODOROS]: onChangeNumPomodoros,
    [ACTIONS.CHANGE_TIME]: onChangeTime,
    [ACTIONS.CHANGE_INTERVAL]: onChangeInterval,
    [ACTIONS.SELECT_TASK]: onSelectTask,
    [ACTIONS.SET_POMODORO_LENGTH]: onChangePomodoroLength,
    [ACTIONS.SET_SHORT_BREAK_LENGTH]: onChangeShortBreakLength,
    [ACTIONS.SET_LONG_BREAK_LENGTH]: onChangeLongBreakLength,
    [ACTIONS.SET_TIMER_AUDIO]: onChangeTimerAudio,
    [ACTIONS.COMPLETE_CURRENT_TASK]: onCompleteTask,
    [ACTIONS.DID_NOT_COMPLETE_CURRENT_TASK]: onDidNotCompleteTask,
  }));

  dispatch(ACTIONS.SET_SHORT_BREAK_LENGTH, 0.05); // TODO: FOR TESTING, remove later
  dispatch(ACTIONS.SET_LONG_BREAK_LENGTH, 0.07); // TODO: FOR TESTING, remove later

  // initialize variables, event listeners, and component values
  settingsIcon.onclick = openSettingsPopup;
  timerElement.onclick = () => timerAudio.pause();
  sessionButton.onmousedown = (e) => {
    e.preventDefault();
  };

  // start session when start button is clicked
  sessionButton.addEventListener('click', async () => {
    if (sessionButton.innerText === 'Start') {
      // enable audio element
      const oldTimerAudioSrc = timerAudio.src;
      timerAudio.src = '';
      timerAudio.play().catch(() => true); // ignore if interrupted
      timerAudio.src = oldTimerAudioSrc;

      dispatch(ACTIONS.CHANGE_SESSION, 'active');
      await startSession();
    } else {
      openConfirmationPopup();
    }
  });
};

export default initializeController;
