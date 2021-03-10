/**
 * @file Manage progress ring for page
 */

let progressRingElement;

/**
 * Set progress ring
 * @param {HTMLElement} element - progress ring element
 */
const initializeProgressRing = (element) => {
  progressRingElement = element;
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
  progressRingElement.progress = JSON.stringify(progress);
};

/**
 * Set radius of ring
 * @param {number} radius - new radius to set
 */
const setRadiusStroke = (radius, stroke) => {
  progressRingElement.radius = radius;
  progressRingElement.stroke = stroke;
};

/**
 * Get radius of ring
 * @return {number} radius
 */
const getRadius = () => progressRingElement.radius;

/**
 * Get stroke of ring
 * @return {number} stroke
 */
const getStroke = () => progressRingElement.stroke;

export {
  initializeProgressRing,
  getProgress,
  setProgress,
  setRadiusStroke,
  getRadius,
  getStroke,
};
