import {
  DEFAULT_POMODORO_LENGTH,
  POMODORO_INTERVAL,
  ACTIONS,
} from '../utils/constants';

const {
  CHANGE_SESSION,
  CHANGE_TIME,
  CHANGE_INTERVAL,
  SELECT_TASK,
  INCREMENT_CURRENT_TASK,
  COMPLETE_CURRENT_TASK,
  DID_NOT_COMPLETE_CURRENT_TASK,
  SET_LONG_BREAK_LENGTH,
  SET_NUM_POMODOROS,
  SET_POMODORO_LENGTH,
  SET_SHORT_BREAK_LENGTH,
  SET_TIMER_AUDIO,
} = ACTIONS;

const timerAudio = new Audio();
timerAudio.volume = 0.2;

// initialize session state
const sessionState = {
  session: 'inactive',
  numPomodoros: 0,
  currTime: 0,
  currInterval: POMODORO_INTERVAL,
  currSelectedTask: null,
  pomodoroLength: 0.1 || DEFAULT_POMODORO_LENGTH, // TODO: FOR TESTING, use DEFAULT_POMODORO_LENGTH later
  shortBreakLength: 0,
  longBreakLength: 0,
  timerAudio,
};

const actionCallbacks = Object.values(ACTIONS).reduce(
  (acc, action) => ({ ...acc, [action]: [] }),
  {},
);

/**
 * Allow consumers to subscribe to session state
 * @param {stateName: Function} callbacks - object that maps a state name to a callback that will be run when the state name changes
 * @return {{stateName: stateValue}} - current session state
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
    case CHANGE_SESSION:
      sessionState.session = payload;
      break;
    case CHANGE_TIME:
      sessionState.currTime = payload;
      break;
    case CHANGE_INTERVAL:
      sessionState.currInterval = payload;
      break;
    case SELECT_TASK:
      sessionState.currSelectedTask = payload;
      break;
    case INCREMENT_CURRENT_TASK:
      break;
    case COMPLETE_CURRENT_TASK:
      break;
    case DID_NOT_COMPLETE_CURRENT_TASK:
      break;
    case SET_NUM_POMODOROS:
      sessionState.numPomodoros = payload;
      break;
    case SET_POMODORO_LENGTH:
      sessionState.pomodoroLength = payload;
      break;
    case SET_SHORT_BREAK_LENGTH:
      sessionState.shortBreakLength = payload;
      break;
    case SET_LONG_BREAK_LENGTH:
      sessionState.longBreakLength = payload;
      break;
    case SET_TIMER_AUDIO:
      sessionState.timerAudio.src = payload;
      break;
    default:
      return;
  }
  actionCallbacks[action].forEach((callback) => callback(sessionState));
};

export { subscribe, dispatch };
