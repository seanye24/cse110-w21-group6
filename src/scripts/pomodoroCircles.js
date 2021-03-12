/**
 * @file Manage pomodoro circles for page
 */

let circlesElement;

/**
 * Get number of filled pomodoro circles
 * @return {number} - number of filled pomodoro circles
 */
const getCircleCount = () => circlesElement.circleCount;

/**
 * Set number of filled pomodoro circles
 * @param {number} circleCount - number of filled pomodoro circles to set
 */
const setCircleCount = (circleCount) => {
  circlesElement.circleCount = circleCount;
};

/**
 * Initialize pomodoro circles
 * @param {HTMLElement} element - pomodoro circles element
 */
const initializePomodoroCircles = (element) => {
  circlesElement = element;
};

export { initializePomodoroCircles, getCircleCount, setCircleCount };
