/**
 * @file progress-ring web component
 */

import {
  checkIfTimeValid,
  createElement,
  getMinutesAndSeconds,
  validateNumber,
} from '../utils/utils';

/**
 * Validate if input is number, between 0s and 3600s (1 hr)
 * @param {any} value - value to check
 * @return {number | null} - time if valid, null otherwise
 */
const validateTime = (value) => {
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
const validateContainerRadius = (value) => {
  const containerRadius = validateNumber(value);
  if (containerRadius === null || containerRadius < 0) {
    return null;
  }
  return containerRadius;
};

/**
 * Custom web component representing a timer
 * @extends HTMLElement
 * @param {number} time - current remaining time (in seconds)
 * @param {number} radius - radius of container (progress ring)
 */
class Timer extends HTMLElement {
  static get observedAttributes() {
    return ['time', 'container-radius'];
  }

  constructor() {
    super();

    this._time = 0;
    this._containerRadius = 0;

    this.styleElement = createElement('style', {
      innerText: `
        .container {
          font: initial 'Duru-Sans', sans-serif;
          color: #fff;
        }
      `,
    });

    this.shadow = this.attachShadow({ mode: 'open' });
    this.timerContainer = createElement('div', {
      className: 'container',
    });

    this.shadow.append(this.styleElement, this.timerContainer);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'time': {
        const time = validateTime(newValue);
        if (time === null) {
          return;
        }
        this._time = time;
        this.timerContainer.innerText = getMinutesAndSeconds(this._time);
        break;
      }
      case 'container-radius': {
        const containerRadius = validateTime(newValue);
        if (containerRadius === null) {
          return;
        }
        this._containerRadius = containerRadius;
        // scale font relative to progress ring radius
        this.styleElement.innerText = `
            .container {
              font: ${this._containerRadius / 30}em 'Duru-Sans', sans-serif; 
              color: #fff;
            }
          `;
        break;
      }
      default:
    }
  }

  get time() {
    return this._time;
  }

  set time(value) {
    const time = validateTime(value);
    if (time === null) {
      return;
    }

    this._time = time;
    this.setAttribute('time', this._time);
  }

  get containerRadius() {
    return this._containerRadius;
  }

  set containerRadius(value) {
    const containerRadius = validateContainerRadius(value);
    if (containerRadius === null) {
      return;
    }

    this._containerRadius = containerRadius;
    this.setAttribute('container-radius', this._containerRadius);
  }
}

export default Timer;
