/**
 * @file Manage pomodoro circles for page
 */

import { subscribe } from '../models';
import { ACTIONS, POMODORO_INTERVAL } from '../utils/constants';
import { validateCircleCount } from '../utils/pomodoroCircles';

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
const setCircleCount = (value) => {
  const circleCount = validateCircleCount(value);
  if (circleCount === null) {
    return;
  }

  circlesElement.circleCount = circleCount;
};

/**
 * Initialize pomodoro circles
 * @param {HTMLElement} element - pomodoro circles element
 */
const initializePomodoroCircles = (element) => {
  circlesElement = element;
  subscribe({
    [ACTIONS.CHANGE_SESSION]: (sessionState) => {
      if (sessionState.session === 'inactive') {
        setCircleCount(0);
      }
    },
    [ACTIONS.CHANGE_INTERVAL]: (sessionState) => {
      if (sessionState.session === 'active') {
        // reset circles if starting new set of 4 pomos
        if (sessionState.currInterval === POMODORO_INTERVAL) {
          if (sessionState.numPomodoros % 4 === 0) {
            setCircleCount(0);
          }
        } else {
          setCircleCount(((sessionState.numPomodoros - 1) % 4) + 1);
        }
      }
    },
  });
};

export { initializePomodoroCircles, getCircleCount, setCircleCount };
