import ProgressRing from '../components/ProgressRing';
import { createElement } from '../utils';

window.customElements.define('progress-ring', ProgressRing);
let progressRingElement;

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

const setProgress = (progress) => {
  progressRingElement.progress = progress;
};

/**
 * Start the progress bar
 * @param {number} tickLength - amount of progress to decrease
 * @param {number} tickFrequency - how often to decrease progress (in ms)
 */
const startRing = (tickLength, tickFrequency) => {
  const ticker = setInterval(() => {
    if (progressRingElement.progress <= 0) clearInterval(ticker);
    setProgress(progressRingElement.progress - tickLength);
  }, tickFrequency);
};

export { initializeProgressRing, setProgress, startRing };
