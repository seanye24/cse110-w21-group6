import { validateNumber } from './helpers';

/**
 * Validate if input is valid circle count (is Number and in range)
 * @param {any} value - value to check
 * @return {number | null} - circle count if valid, otherwise null
 */
export const validateCircleCount = (value) => {
  const circleCount = validateNumber(value, true);
  if (circleCount === null || circleCount < 0 || circleCount > 4) {
    return null;
  }
  return circleCount;
};
