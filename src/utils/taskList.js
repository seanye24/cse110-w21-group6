/**
 * @file utility functions for taskList component
 */

import { validateNumber } from './helpers';

/**
 * Validate if input is number, greater than 0
 * @param {any} value - value to check
 * @return {number | null} - short break length if valid, null otherwise
 */
export const validatePomodoros = (value) => {
  const pomodoros = validateNumber(value, true);
  if (pomodoros === null || pomodoros < 0) {
    return null;
  }
  return pomodoros;
};
