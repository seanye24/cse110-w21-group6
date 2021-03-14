/**
 * @file utility functions for taskList component
 */

import { validateBoolean, validateNumber, validateString } from './helpers';

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

/**
 * Validate if input is valid task
 * @param {any} value - value to check
 * @return {Task | null} - Task if valid, null otherwise
 */
export const validateTask = (value) => {
  try {
    const {
      name,
      usedPomodoros,
      estimatedPomodoros,
      selected,
      completed,
    } = value;
    const isNameValid = validateString(name) !== null;
    const isUsedPomodorosValid = validatePomodoros(usedPomodoros) !== null;
    const isEstimatedPomodorosValid =
      validatePomodoros(estimatedPomodoros) !== null;
    const isSelectedValid = validateBoolean(selected) !== null;
    const isCompletedValid = validateBoolean(completed) !== null;
    if (
      !isNameValid ||
      !isUsedPomodorosValid ||
      !isEstimatedPomodorosValid ||
      !isCompletedValid ||
      !isSelectedValid
    ) {
      return null;
    }

    const task = {
      name,
      usedPomodoros,
      estimatedPomodoros,
      selected,
      completed,
    };
    return task;
  } catch (e) {
    return null;
  }
};
