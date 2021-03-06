/**
 * @file Manage pomodoro circles for page
 */

let pomodoroCirclesElement;

/**
 * TODO: update documention
 */
const initializeCircleCount = (element) => {
  pomodoroCirclesElement = element;
};

/**
 * // usually just for testing
 * TODO: update documentation
 */
const getCircleCount = () => pomodoroCirclesElement.circleCount;

/**
 * TODO: update documentation
 */
const setCircleCount = (circleCount) => {
  // update component
  pomodoroCirclesElement.circleCount = circleCount;
};

export { initializeCircleCount, getCircleCount, setCircleCount };
