/**
 * @file utility functions for progress ring component
 */

import { validateNumber } from './helpers';

/**
 * Validate if input is number, nonnegative
 * @param {any} value - value to check
 * @return {number | null} - time if valid, null otherwise
 */
export const validateLength = (value) => {
  const length = validateNumber(value);
  if (length === null || length < 0) {
    return null;
  }
  return length;
};

/**
 * Validate if input is number and between 0 - 100
 * @param {any} value - value to check
 * @return {number | null} - progress if valid, null otherwise
 */
export const validateProgress = (value) => {
  const progress = validateNumber(value);
  if (progress === null || progress < 0 || progress > 100) {
    return null;
  }
  return progress;
};
