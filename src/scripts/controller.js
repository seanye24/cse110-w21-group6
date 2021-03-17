/* eslint-disable no-await-in-loop */
import { dispatch, subscribe } from '../models';
import { ACTIONS, ANNOUNCEMENTS, INTERVALS } from '../utils/constants';
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
      // if no tasks are selected, try to select first task
      if (!currentSelectedTask) {
        selectFirstTask();
      }
      // stop if no tasks available
      if (!currentSelectedTask) {
        if (numberOfPomodorosCompleted === 0) {
          dispatch(ACTIONS.incrementNumberOfPomodoros, -1); // if session is stopped bc no tasks are available, set numPomodoros to -1
        }
        dispatch(ACTIONS.changeSession, 'inactive');
        return;
      }

      // start pomodoro, stop if interval is interrupted
      const shouldContinue = await startInterval(60 * pomodoroLength);
      if (!shouldContinue) {
        return;
      }

      dispatch(ACTIONS.incrementCurrentTask);
      dispatch(
        ACTIONS.incrementNumberOfPomodoros,
        numberOfPomodorosCompleted + 1,
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
        dispatch(ACTIONS.doNotCompleteCurrentTask);
      }
      dispatch(ACTIONS.changeCurrentInterval, INTERVALS.pomodoro);

      if (!shouldContinue) {
        return;
      }
    }
  }
};

/**
 * Handle end of session
 */
const endSession = () => {
  if (numberOfPomodorosCompleted === -1) {
    setAnnouncement(ANNOUNCEMENTS.noTasksAvailable);
  } else {
    setAnnouncement(ANNOUNCEMENTS.endOfSession);
  }
  if (numberOfPomodorosCompleted > 0) {
    initializeSummaryPopup(
      document.querySelector('#summary-overlay'),
      getTasks(),
    );
    openSummaryPopup();
  }
  dispatch(ACTIONS.incrementNumberOfPomodoros, 0);
  dispatch(ACTIONS.changeCurrentTime, 0);
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
      elementsThatChangeTheme.forEach((elem) => {
        elem.classList.add('pomodoro');
        elem.classList.remove('short-break');
        elem.classList.remove('long-break');
      });
      sessionButton.innerText = 'Start';
      sessionButton.classList.remove('in-session');
      endSession();
    }
  };
  const onChangeTime = (sessionState) => {
    currentTime = sessionState.currentTime;
  };
  const onChangeInterval = (sessionState) => {
    currentInterval = sessionState.currentInterval;

    switch (currentInterval) {
      case INTERVALS.pomodoro:
        elementsThatChangeTheme.forEach((elem) => {
          elem.classList.add('pomodoro');
          elem.classList.remove('short-break');
          elem.classList.remove('long-break');
        });
        break;
      case INTERVALS.shortBreak:
        elementsThatChangeTheme.forEach((elem) => {
          elem.classList.remove('pomodoro');
          elem.classList.add('short-break');
          elem.classList.remove('long-break');
        });
        break;
      case INTERVALS.longBreak:
        elementsThatChangeTheme.forEach((elem) => {
          elem.classList.remove('pomodoro');
          elem.classList.remove('short-break');
          elem.classList.add('long-break');
        });
        break;
      default:
    }

    // play timer audio at the end of every interval
    if (sessionState.numberOfPomodorosCompleted > 0) {
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
  const onCompleteTask = (sessionState) => {
    setTasklistUsability(true);
    setButtonVisibility('hidden');
    wasAnnouncementButtonClicked = true;
    if (sessionState.currentInterval === INTERVALS.shortBreak) {
      setAnnouncement(INTERVALS.shortBreak);
    } else if (sessionState.currentInterval === INTERVALS.longBreak) {
      setAnnouncement(INTERVALS.longBreak);
    }
  };
  const onDidNotCompleteTask = (sessionState) => {
    setButtonVisibility('hidden');
    wasAnnouncementButtonClicked = true;
    if (sessionState.currentInterval === INTERVALS.shortBreak) {
      setAnnouncement(ANNOUNCEMENTS.shortBreakInterval);
    } else if (sessionState.currentInterval === INTERVALS.longBreak) {
      setAnnouncement(ANNOUNCEMENTS.longBreakInterval);
    }
  };

  ({
    session,
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
    [ACTIONS.incrementNumberOfPomodoros]: onChangeNumPomodoros,
    [ACTIONS.changeCurrentTime]: onChangeTime,
    [ACTIONS.changeCurrentInterval]: onChangeInterval,
    [ACTIONS.changeCurrentSelectedTask]: onSelectTask,
    [ACTIONS.incrementNumberOfPomodoros]: onChangePomodoroLength,
    [ACTIONS.changeShortBreakLength]: onChangeShortBreakLength,
    [ACTIONS.changeLongBreakLength]: onChangeLongBreakLength,
    [ACTIONS.changeTimerAudio]: onChangeTimerAudio,
    [ACTIONS.completeCurrentTask]: onCompleteTask,
    [ACTIONS.doNotCompleteCurrentTask]: onDidNotCompleteTask,
  }));

  dispatch(ACTIONS.changeShortBreakLength, 0.1); // TODO: FOR TESTING, remove later
  dispatch(ACTIONS.changeLongBreakLength, 0.1); // TODO: FOR TESTING, remove later

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

      dispatch(ACTIONS.changeSession, 'active');
      await startSession();
    } else {
      openConfirmationPopup();
    }
  });
};

export default initializeController;
