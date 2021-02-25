/**
 * @file Manage progress ring for page
 */

import { createElement } from '../utils';

let progressRingElement = document.querySelector('.progress-ring');

/**
 * Set progress ring size, attach to DOM
 * @param {HTMLElement} container - progress ring container
 * @param {number} radius - ring radius
 * @param {number} stroke - ring width
 * @param {number} progress - initial progress
 */
const initializeProgressRing = (
  container,
  radius = 0,
  stroke = 0,
  progress = 0,
) => {
  progressRingElement = createElement('progress-ring', {
    radius,
    stroke,
    progress,
  });
  container.appendChild(progressRingElement);
};

/**
 * Get progress
 * @return {number} - current progress
 */
const getProgress = () => progressRingElement.progress;

/**
 * Set progress
 * @param {number} progress - progress to set
 */
const setProgress = (progress) => {
  progressRingElement.progress = progress;
};

/**
 * Start the progress bar
 * @param {number} tickLength - amount of progress to decrease
 * @param {number} tickFrequency - how often to decrease progress (in ms)
 */
const startProgressRing = (tickLength, tickFrequency) => {
  const ticker = setInterval(() => {
    if (progressRingElement.progress <= 0) clearInterval(ticker);
    setProgress(progressRingElement.progress - tickLength);
  }, tickFrequency);
};

/**
 * Set radius of ring
 * @param {number} radius - new radius to set
 */
const setRadiusStroke = (radius, stroke) => {
  progressRingElement.radius = radius;
  progressRingElement.stroke = stroke;
};

export {
  initializeProgressRing,
  getProgress,
  setProgress,
  startProgressRing,
  setRadiusStroke,
};
