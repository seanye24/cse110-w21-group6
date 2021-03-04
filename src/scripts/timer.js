/**
 * @author Fernando Bracamonte
 * @file Timer script used to emulate the pomodoro process
 */

let timerElement;

/**
 * Initialize timer component
 * @param {HTMLElement} element - timer element
 */
const initializeTimer = (element) => {
  timerElement = element;
};

/**
 * Set time of timer component
 * @param {number} time - new time of timer (in seconds)
 */
const setTimer = (time) => {
  timerElement.time = time;
};

export { initializeTimer, setTimer };
