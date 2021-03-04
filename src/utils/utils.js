/**
 * @file Various utility methods
 */

import {
  DEFAULT_POMODORO_INTERVAL,
  DEFAULT_SHORT_BREAK_INTERVAL,
  DEFAULT_LONG_BREAK_INTERVAL,
} from './constants';

/**
 * Creates an HTMLElement and set its attributes
 * Created to reduce boilerplate from element creation
 * @param {string} elementType - element tag name
 * @param {{key: string}} props - element's attributes/properties
 * @param {{option: string}} options - element options such as namespace
 * @return element - new HTMLElement created
 */
const createElement = (elementType, props = {}, options = {}) => {
  const { namespace } = options;
  let element;
  if (namespace) element = document.createElementNS(namespace, elementType);
  else element = document.createElement(elementType); // create element

  // set attributes/properties
  Object.entries(props).forEach(([key, value]) => {
    if (namespace || !(key in element)) element.setAttribute(key, value);
    else element[key] = value;
  });

  return element;
};

/**
 * Tries to convert input to a number
 * @param {any} value - to be converted to number
 * @return {number | null} - number if successful, null otherwise
 */
const validateNumber = (value) => {
  const num = parseFloat(value, 10);
  return Number.isNaN(num) ? null : num;
};

/**
 * Checks if time is valid for timer
 * @param {number} time - time to be checked (in seconds)
 */
const checkIfTimeValid = (time) => {
  const secondsInAnHour = 60 * 60;
  return time >= 0 && time < secondsInAnHour;
};

/**
 * Use promises to tick by specified tickLength
 * NOTE: ticks may be slightly longer than the duration due the single threaded nature of JavaScript
 * @param {number} duration - duration of tick (in seconds)
 * @return {Promise<void>} - promise that resolves after tick duration
 */
const tick = async (duration) =>
  new Promise((res) => setTimeout(res, 1000 * duration));

/**
 * Converts seconds into MM : SS
 * @param {string} seconds - seconds to convert
 * @return {string} - time in format MM:SS
 */
const getMinutesAndSeconds = (totalSeconds) => {
  const [minutes, seconds] = [
    Math.floor(totalSeconds / 60),
    Math.floor(totalSeconds % 60),
  ].map((t) => (t < 10 ? `0${t}` : t)); // left time unit with 0 if necessary
  return `${minutes}:${seconds}`;
};

/**
 * Initialize interval lengths, retrieve from localStorage if possible
 * @return {{pomodoroLength: number, shortBreakLength: number, longBreakLength: number}} - lengths of intervals
 */
const initializeIntervalLengths = () => {
  let pomodoroLength = window.localStorage.getItem('pomodoroLength');
  let shortBreakLength = window.localStorage.getItem('shortBreakLength');
  let longBreakLength = window.localStorage.getItem('longBreakLength');
  if (!pomodoroLength) {
    pomodoroLength = DEFAULT_POMODORO_INTERVAL;
    window.localStorage.setItem('pomodoroLength', pomodoroLength);
  }
  if (!shortBreakLength) {
    shortBreakLength = DEFAULT_SHORT_BREAK_INTERVAL;
    window.localStorage.setItem('shortBreakLength', shortBreakLength);
  }
  if (!longBreakLength) {
    longBreakLength = DEFAULT_LONG_BREAK_INTERVAL;
    window.localStorage.setItem('longBreakLength', longBreakLength);
  }
  return { pomodoroLength, shortBreakLength, longBreakLength };
};

export {
  createElement,
  initializeIntervalLengths,
  getMinutesAndSeconds,
  tick,
  checkIfTimeValid,
  validateNumber,
};
