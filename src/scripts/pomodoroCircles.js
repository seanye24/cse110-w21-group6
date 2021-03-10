/**
 * @file Manage pomodoro circles for page
 */

let circlesElement;

/**
 * Get number of filled pomodoro circles
 * @return {number} - amount of filled pomodoro circles
 */
const getCircleCount = () => circlesElement.circleCount;

/**
 * Set number of filled pomodoro circles
 * @param {number} progress - amount of filled pomodoro circles to set
 */
const setCircleCount = (circleCount) => {
  circlesElement.circleCount = circleCount;
};

/**
 * Set pomodoro circles
 * @param {HTMLElement} element - pomodoro circles element
 */
const initializePomodoroCircles = (element) => {
  circlesElement = element;
};

export { initializePomodoroCircles, getCircleCount, setCircleCount };
