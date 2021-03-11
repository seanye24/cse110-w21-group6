/**
 * @file Manage progress ring for page
 */

import { validateLength, validateProgress } from '../utils/progressRing';

let progressRingElement;

/**
 * Set progress ring
 * @param {HTMLElement} element - progress ring element
 */
const initializeProgressRing = (element) => {
  progressRingElement = element;
};

/**
 * Get radius of ring
 * @return {number} - radius of progress ring
 */
const getRadius = () => progressRingElement.radius;

/**
 * Set radius of ring
 * @param {number} radius - new radius to set
 */
const setRadius = (value) => {
  const radius = validateLength(value);
  if (radius === null) {
    return;
  }

  progressRingElement.radius = radius;
};

/**
 * Get stroke of ring
 * @return {number} - stroke of progress ring
 */
const getStroke = () => progressRingElement.stroke;

/**
 * Set stroke of ring
 * @param {number} value - new stroke to set
 */
const setStroke = (value) => {
  const stroke = validateLength(value);
  if (stroke === null) {
    return;
  }

  progressRingElement.stroke = stroke;
};

/**
 * Get progress
 * @return {number} - current progress
 */
const getProgress = () => progressRingElement.progress;

/**
 * Set progress
 * @param {number} value - progress to set
 */
const setProgress = (value) => {
  const progress = validateProgress(value);
  if (progress === null) {
    return;
  }

  progressRingElement.progress = progress;
};

export {
  initializeProgressRing,
  getRadius,
  getStroke,
  getProgress,
  setRadius,
  setStroke,
  setProgress,
};
