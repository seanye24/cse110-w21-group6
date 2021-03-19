/**
 * @file Various utility methods
 */

import { subscribe } from '../models';
import { INTERVALS } from './constants';

/**
 * Creates an HTMLElement and set its attributes
 * Created to reduce boilerplate from element creation
 * @param {string} elementName - element tag name
 * @param {{key: string}} props - element's attributes/properties
 * @param {{option: string}} options - element options such as namespace
 * @return element - new HTMLElement created
 */
const createElement = (elementName, props = {}, options = {}) => {
  const { namespace } = options;
  let element;
  if (namespace) {
    element = document.createElementNS(namespace, elementName);
  } else {
    element = document.createElement(elementName);
  } // create element

  // set attributes/properties
  Object.entries(props).forEach(([key, value]) => {
    if (namespace || !(key in element)) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });

  return element;
};

/**
 * Validate if input is string
 * @param {any} value - value to to check
 * @return {string | null} - string if input is a valid string, null otherwise
 */
const validateString = (value) => {
  if (typeof value === 'string' || value instanceof String) {
    return value;
  }
  return null;
};

/**
 * Tries to convert input to a number
 * @param {any} value - to be converted to number
 * @param {boolean} shouldTruncate - determine if number should be truncated
 * @return {number | null} - number if successful, null otherwise
 */
const validateNumber = (value, shouldTruncate = false) => {
  const isNumberOrString =
    typeof value === 'number' ||
    value instanceof Number ||
    validateString(value) !== null;
  const number = Number(value);
  if (!isNumberOrString || Number.isNaN(number)) {
    return null;
  }
  return shouldTruncate ? Math.floor(number) : number;
};

/**
 * Tries to convert input to a boolean
 * input must be already boolean or the strings 'true' | 'false'
 * @param {any} value - to be converted to boolean
 * @return {boolean | any} - boolean if successful, null otherwise
 */
const validateBoolean = (value) => {
  const isBoolean = typeof value === 'boolean' || value instanceof Boolean;
  if (isBoolean) {
    return value;
  }

  const isString = validateString(value) !== null;
  if (isString && value === 'true') {
    return true;
  }
  if (isString && value === 'false') {
    return false;
  }

  return null;
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
 * Converts seconds into MM:SS
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
 * Converts seconds into HH:MM:SS
 * @param {string} seconds - seconds to convert
 * @return {string} - time in format HH h MM m SS s
 */
const getHoursMinutesAndSeconds = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;
  const hoursFormatted = hours > 0 ? `${hours}h` : '';
  const minutesFormatted = minutes > 0 ? `${minutes}m` : '';
  const secondsFormatted =
    seconds > 0 || (hours === 0 && minutes === 0) ? `${seconds}s` : '';
  return [hoursFormatted, minutesFormatted, secondsFormatted]
    .filter((s) => s !== '')
    .join(' ');
};

/**
 * Computes total time elapsed during a session
 * @param {{intervalName: string, timeRemaining: number}} lastInterval - the interval in which the session stopped in
 */
const getTotalSessionTime = (lastInterval) => {
  const {
    totalSessionTime: estimatedTotalSessionTime,
    shortBreakLength,
    longBreakLength,
  } = subscribe();
  const { intervalName, timeRemaining } = lastInterval;

  // if session was interrupted during break, add on time elapsed during break before the interrupt
  // otherwise, use recorded session time
  if (intervalName === INTERVALS.shortBreak && timeRemaining !== -1) {
    return estimatedTotalSessionTime + (60 * shortBreakLength - timeRemaining);
  }
  if (intervalName === INTERVALS.longBreak && timeRemaining !== -1) {
    return estimatedTotalSessionTime + (60 * longBreakLength - timeRemaining);
  }
  return estimatedTotalSessionTime;
};

/**
 * Update elements' class based on current interval
 * @param {string} currentInterval - current interval in session
 * @param {HTMLElement[]} elements - elements whose classes need to be updated
 */
const updateClassesByInterval = (currentInterval, elements) => {
  elements.forEach((elm) => {
    switch (currentInterval) {
      case INTERVALS.pomodoro:
        elm.classList.add('pomodoro');
        elm.classList.remove('short-break');
        elm.classList.remove('long-break');
        break;
      case INTERVALS.shortBreak:
        elm.classList.remove('pomodoro');
        elm.classList.add('short-break');
        elm.classList.remove('long-break');
        break;
      case INTERVALS.longBreak:
        elm.classList.remove('pomodoro');
        elm.classList.remove('short-break');
        elm.classList.add('long-break');
        break;
      default:
        elm.classList.add('pomodoro');
        elm.classList.remove('short-break');
        elm.classList.remove('long-break');
    }
  });
};

export {
  createElement,
  getMinutesAndSeconds,
  getHoursMinutesAndSeconds,
  getTotalSessionTime,
  updateClassesByInterval,
  tick,
  validateNumber,
  validateString,
  validateBoolean,
};
