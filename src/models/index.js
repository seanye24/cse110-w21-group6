import {
  DEFAULT_POMODORO_LENGTH,
  POMODORO_INTERVAL,
  SET_CURR_INTERVAL,
  SET_CURR_SELECTED_TASK,
  SET_LONG_BREAK_LENGTH,
  SET_NUM_POMODOROS,
  SET_POMODORO_LENGTH,
  SET_SESSION,
  SET_SHORT_BREAK_LENGTH,
  SET_TIMER_AUDIO,
} from '../utils/constants';

const timerAudio = new Audio();
timerAudio.volume = 0.2;

// initialize session state
const sessionState = {
  session: 'inactive',
  currInterval: POMODORO_INTERVAL,
  currSelectedTask: '',
  numPomodoros: 0,
  pomodoroLength: 0.05, // TODO: FOR TESTING, use DEFAULT_POMODORO_LENGTH later
  shortBreakLength: 0,
  longBreakLength: 0,
  timerAudio,
};

const stateCallbacks = Object.keys(sessionState).reduce(
  (acc, key) => ({ ...acc, [key]: [] }),
  {},
);

/**
 * Allow consumers to subscribe to session state
 * @param {stateName: Function} callbacks - object that maps a state name to a callback that will be run when the state name changes
 * @return {{stateName: stateValue}} - current session state
 */
const subscribe = (callbacks) => {
  Object.entries(callbacks).forEach(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(stateCallbacks, key)) {
      stateCallbacks[key].push(value);
    }
  });
  return sessionState;
};

/**
 * Process actions, update state, and call corresponding callbacks
 * @param {string} action - name of action
 * @param {any} payload - action payload
 */
const dispatch = (action, payload) => {
  switch (action) {
    case SET_SESSION:
      sessionState.session = payload;
      stateCallbacks.session.forEach((callback) => callback(payload));
      break;
    case SET_CURR_INTERVAL:
      sessionState.currInterval = payload;
      stateCallbacks.currInterval.forEach((callback) => callback(payload));
      break;
    case SET_CURR_SELECTED_TASK:
      sessionState.currSelectedTask = payload;
      stateCallbacks.currSelectedTask.forEach((callback) => callback(payload));
      break;
    case SET_NUM_POMODOROS:
      sessionState.numPomodoros = payload;
      stateCallbacks.numPomodoros.forEach((callback) => callback(payload));
      break;
    case SET_POMODORO_LENGTH:
      sessionState.pomodoroLength = payload;
      stateCallbacks.pomodoroLength.forEach((callback) => callback(payload));
      break;
    case SET_SHORT_BREAK_LENGTH:
      sessionState.shortBreakLength = payload;
      stateCallbacks.shortBreakLength.forEach((callback) => callback(payload));
      break;
    case SET_LONG_BREAK_LENGTH:
      sessionState.longBreakLength = payload;
      stateCallbacks.longBreakLength.forEach((callback) => callback(payload));
      break;
    case SET_TIMER_AUDIO:
      sessionState.timerAudio.src = payload;
      stateCallbacks.longBreakLength.forEach((callback) => callback(payload));
      break;
    default:
  }
};

export { subscribe, dispatch };
