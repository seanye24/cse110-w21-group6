/**
 * @file Publisher in the publish-subscribe pattern, holds global state
 */

import {
  ACTIONS,
  DEFAULT_POMODORO_LENGTH,
  INTERVALS,
} from '../utils/constants';

const timerAudio = new Audio();
timerAudio.volume = 0.2;

// initialize session state
const sessionState = {
  session: 'inactive',
  totalSessionTime: 0,
  numberOfPomodorosCompleted: 0,
  currentTime: 0,
  currentInterval: INTERVALS.pomodoro,
  currentSelectedTask: null,
  completedTasks: [],
  pomodoroLength: DEFAULT_POMODORO_LENGTH,
  shortBreakLength: 0,
  longBreakLength: 0,
  timerAudio,
};

// maps each action to a synchronous message queue of callbacks
const actionCallbacks = Object.values(ACTIONS).reduce(
  (acc, action) => ({ ...acc, [action]: [] }),
  {},
);

/**
 * Allow consumers to subscribe to session state and use callbacks to be notified of actions
 * @param {Object.<string, Function>} callbacks - object that maps a state name to a callback that will be run when the state name changes
 * @return {Object.<string, any>} - current session state
 */
const subscribe = (callbacks) => {
  if (typeof callbacks === 'object' && callbacks !== null) {
    Object.entries(callbacks).forEach(([action, callback]) => {
      if (Object.prototype.hasOwnProperty.call(actionCallbacks, action)) {
        actionCallbacks[action].push(callback);
      }
    });
  }
  return sessionState;
};

/**
 * Process actions, update state, and call corresponding callbacks
 * @param {string} action - name of action
 * @param {any} payload - action payload
 */
const dispatch = (action, payload) => {
  switch (action) {
    case ACTIONS.changeSession:
      sessionState.session = payload;
      break;
    case ACTIONS.changeTotalSessionTime:
      sessionState.totalSessionTime = payload;
      break;
    case ACTIONS.changeCurrentTime:
      sessionState.currentTime = payload;
      break;
    case ACTIONS.changeCurrentInterval:
      sessionState.currentInterval = payload;
      break;
    case ACTIONS.changeSelectedTask:
      sessionState.currentSelectedTask = payload;
      break;
    case ACTIONS.incrementSelectedTask:
      break;
    case ACTIONS.completeSelectedTask:
      break;
    case ACTIONS.doNotCompleteSelectedTask:
      break;
    case ACTIONS.addToCompletedTasks:
      sessionState.completedTasks.push(payload);
      break;
    case ACTIONS.clearCompletedTasks:
      sessionState.completedTasks = [];
      break;
    case ACTIONS.changeNumberOfPomodoros:
      sessionState.numberOfPomodorosCompleted = payload;
      break;
    case ACTIONS.changePomodoroLength:
      sessionState.pomodoroLength = payload;
      break;
    case ACTIONS.changeShortBreakLength:
      sessionState.shortBreakLength = payload;
      break;
    case ACTIONS.changeLongBreakLength:
      sessionState.longBreakLength = payload;
      break;
    case ACTIONS.changeTimerAudio:
      sessionState.timerAudio.src = payload;
      break;
    default:
      return;
  }
  actionCallbacks[action].forEach((callback) => callback(sessionState));
};

export { subscribe, dispatch };
