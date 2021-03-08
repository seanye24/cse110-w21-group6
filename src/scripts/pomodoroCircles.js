/**
 * @file Manage pomodoro circles for page
 */

let pomodoroCirclesElement;

/**
 * Set pomodoro circles
 * @param {HTMLElement} element - pomodoro circles element
 */
const initializePomodoroCircles = (element) => {
  pomodoroCirclesElement = element;
};

/**
 * Get number of filled pomodoro circles
 * @return {number} - amount of filled pomodoro circles
 */
const getCircleCount = () => pomodoroCirclesElement.circleCount;

/**
 * Set number of filled pomodoro circles
 * @param {number} progress - amount of filled pomodoro circles to set
 */
const setCircleCount = (circleCount) => {
  pomodoroCirclesElement.circleCount = circleCount;
};

export { initializePomodoroCircles, getCircleCount, setCircleCount };
