/**
 * @file Manage progress ring for page
 */

import { subscribe } from '../models';
import {
  ACTIONS,
  LONG_BREAK_INTERVAL,
  POMODORO_INTERVAL,
  SHORT_BREAK_INTERVAL,
} from '../utils/constants';
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
    [ACTIONS.CHANGE_SESSION]: (sessionState) => {
      if (sessionState.session === 'inactive') {
        setProgress(100);
        overlayCircleElement.setAttribute('class', 'overlay-circle pomodoro');
      }
    },
    [ACTIONS.CHANGE_INTERVAL]: (sessionState) => {
      setProgress(100);
      switch (sessionState.currInterval) {
        case POMODORO_INTERVAL:
          overlayCircleElement.setAttribute('class', 'overlay-circle pomodoro');
          break;
        case SHORT_BREAK_INTERVAL:
          overlayCircleElement.setAttribute(
            'class',
            'overlay-circle short-break',
          );
          break;
        case LONG_BREAK_INTERVAL:
          overlayCircleElement.setAttribute(
            'class',
            'overlay-circle long-break',
          );
          break;
        default:
      }
    },
    [ACTIONS.CHANGE_TIME]: (sessionState) => {
      if (sessionState.session === 'active') {
        let currIntervalLength;
        switch (sessionState.currInterval) {
          case POMODORO_INTERVAL:
            currIntervalLength = sessionState.pomodoroLength;
            break;
          case SHORT_BREAK_INTERVAL:
            currIntervalLength = sessionState.shortBreakLength;
            break;
          case LONG_BREAK_INTERVAL:
            currIntervalLength = sessionState.longBreakLength;
            break;
          default:
            return;
        }
        const currProgress =
          (100 * sessionState.currTime) / (60 * currIntervalLength);
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
