/**
 * @file Manage progress ring for page
 */

import { subscribe } from '../models';
import { ACTIONS, INTERVALS } from '../utils/constants';
import { validateLength, validateProgress } from '../utils/progressRing';

let progressRingElement;

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

/**
 * Set progress ring
 * @param {HTMLElement} element - progress ring element
 */
const initializeProgressRing = (element) => {
  progressRingElement = element;
  const overlayCircleElement = progressRingElement.shadowRoot.querySelector(
    '.overlay-circle',
  );
  subscribe({
    [ACTIONS.changeSession]: (sessionState) => {
      if (sessionState.session === 'inactive') {
        setProgress(100);
        overlayCircleElement.setAttribute('class', 'overlay-circle pomodoro');
      }
    },
    [ACTIONS.changeCurrentInterval]: (sessionState) => {
      setProgress(100);
      switch (sessionState.currentInterval) {
        case INTERVALS.pomodoro:
          overlayCircleElement.setAttribute('class', 'overlay-circle pomodoro');
          break;
        case INTERVALS.shortBreak:
          overlayCircleElement.setAttribute(
            'class',
            'overlay-circle short-break',
          );
          break;
        case INTERVALS.longBreak:
          overlayCircleElement.setAttribute(
            'class',
            'overlay-circle long-break',
          );
          break;
        default:
      }
    },
    [ACTIONS.changeCurrentTime]: (sessionState) => {
      if (sessionState.session === 'active') {
        let currentIntervalLength;
        switch (sessionState.currentInterval) {
          case INTERVALS.pomodoro:
            currentIntervalLength = sessionState.pomodoroLength;
            break;
          case INTERVALS.shortBreak:
            currentIntervalLength = sessionState.shortBreakLength;
            break;
          case INTERVALS.longBreak:
            currentIntervalLength = sessionState.longBreakLength;
            break;
          default:
            return;
        }
        const currProgress =
          (100 * sessionState.currentTime) / (60 * currentIntervalLength);
        setProgress(currProgress);
      }
    },
  });
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
