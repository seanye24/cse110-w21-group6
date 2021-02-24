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
  const num = parseInt(value, 10);
  return Number.isNaN(num) ? null : num;
};

export { createElement, validateNumber };
