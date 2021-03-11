/**
 * @file Various utility methods
 */

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
  if (namespace) {
    element = document.createElementNS(namespace, elementType);
  } else {
    element = document.createElement(elementType);
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

export {
  createElement,
  getMinutesAndSeconds,
  tick,
  validateNumber,
  validateString,
};
