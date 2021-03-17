/**
 * @author Fernando Bracamonte
 * @file Timer script used to emulate the pomodoro process
 */

import { subscribe } from '../models';
import { ACTIONS } from '../utils/constants';

let timerElement;

/**
 * Set time of timer component
 * @param {number} time - new time of timer (in seconds)
 */
const setTimer = (time) => {
  timerElement.time = time;
};

/**
 * Get time of timer component
 * @return {number} - current time of timer (in seconds)
 */
const getTime = () => timerElement.time;

/**
 * Initialize timer component
 * @param {HTMLElement} element - timer element
 */
const initializeTimer = (element) => {
  timerElement = element;
  const { pomodoroLength } = subscribe({
    [ACTIONS.changeSession]: (sessionState) => {
      if (sessionState.session === 'inactive') {
        setTimer(60 * sessionState.pomodoroLength);
      }
    },
    [ACTIONS.changeCurrentTime]: (sessionState) => {
      if (sessionState.session === 'active') {
        setTimer(sessionState.currentTime);
      }
    },
  });
  setTimer(pomodoroLength * 60);
};

export { initializeTimer, setTimer, getTime };
