/**
 * @file utility functions for timer component
 */

import { validateNumber } from './helpers';

/**
 * Validate if input is number, between 0s and 3600s (1 hr)
 * @param {any} value - value to check
 * @return {number | null} - time if valid, null otherwise
 */
export const validateTime = (value) => {
  const time = validateNumber(value, true);
  if (time === null || time < 0 || time >= 60 * 60) {
    return null;
  }
  return time;
};

/**
 * Validate if input is number and positive
 * @param {any} value - value to check
 * @return {number | null} - radius if valid, null otherwise
 */
export const validateContainerRadius = (value) => {
  const containerRadius = validateNumber(value);
  if (containerRadius === null || containerRadius < 0) {
    return null;
  }
  return containerRadius;
};
