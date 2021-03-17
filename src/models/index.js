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
  numberOfPomodorosCompleted: 0,
  numberOfTasksCompleted: 0,
  currentTime: 0,
  currentInterval: INTERVALS.pomodoro,
  currentSelectedTask: null,
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
    case ACTIONS.changeSession:
      sessionState.session = payload;
      break;
    case ACTIONS.changeCurrentTime:
      sessionState.currentTime = payload;
      break;
    case ACTIONS.changeCurrentInterval:
      sessionState.currentInterval = payload;
      break;
    case ACTIONS.changeCurrentSelectedTask:
      sessionState.currentSelectedTask = payload;
      break;
    case ACTIONS.incrementCurrentTask:
      break;
    case ACTIONS.completeCurrentTask:
      break;
    case ACTIONS.doNotCompleteCurrentTask:
      break;
    case ACTIONS.incrementNumberOfPomodoros:
      sessionState.numberOfPomodorosCompleted = payload;
      break;
    case ACTIONS.incrementNumberOfTasks:
      sessionState.numberOfTasksCompleted = payload;
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
