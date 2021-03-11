/**
 * @file utility functions for settings popup component
 */

import { TIMER_AUDIOS } from './constants';
import { validateNumber, validateString } from './utils';

/**
 * Validate if input is number, between 3 - 5
 * @param {any} value - value to check
 * @return {number | null} - short break length if valid, null otherwise
 */
export const validateShortBreakLength = (value) => {
  const shortBreakLength = validateNumber(value, true);
  if (
    shortBreakLength === null ||
    shortBreakLength < 3 ||
    shortBreakLength > 5
  ) {
    return null;
  }
  return shortBreakLength;
};

/**
 * Validate if input is number, between 15 - 30
 * @param {any} value - value to check
 * @return {number | null} - long break length if valid, null otherwise
 */
export const validateLongBreakLength = (value) => {
  const longBreakLength = validateNumber(value, true);
  if (
    longBreakLength === null ||
    longBreakLength < 15 ||
    longBreakLength > 30
  ) {
    return null;
  }
  return longBreakLength;
};

/**
 * Validate if input is valid audio file path
 * @param {any} value - value to check
 * @return {string | null} - path if valid, null otherwise
 */
export const validateTimerAudio = (value) => {
  const timerAudio = validateString(value);
  if (
    timerAudio === null ||
    !Object.values(TIMER_AUDIOS).includes(timerAudio)
  ) {
    return null;
  }
  return timerAudio;
};
