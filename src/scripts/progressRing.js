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
