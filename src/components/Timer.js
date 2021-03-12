/**
 * @file progress-ring web component
 */

import { createElement, getMinutesAndSeconds } from '../utils/helpers';
import { validateContainerRadius, validateTime } from '../utils/timer';

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
              font: ${this._containerRadius / 2}px 'Duru-Sans', sans-serif; 
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
