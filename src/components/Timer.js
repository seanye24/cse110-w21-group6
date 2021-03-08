/**
 * @file progress-ring web component
 */

import {
  checkIfTimeValid,
  createElement,
  getMinutesAndSeconds,
} from '../utils/utils';

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

    this._time = this.getAttribute('time');
    this._containerRadius = this.getAttribute('container-radius');

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
    const newVal = parseInt(newValue, 10);
    if (Number.isNaN(newVal)) {
      return;
    }
    switch (name) {
      case 'time': {
        const isTimeValid = checkIfTimeValid(newValue);
        if (isTimeValid) {
          this._time = newVal;
          this.timerContainer.innerText = getMinutesAndSeconds(this._time);
        }
        break;
      }
      case 'container-radius': {
        this._containerRadius = newVal;
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

  set time(time) {
    this._time = time;
    this.setAttribute('time', this._time);
  }

  get containerRadius() {
    return this._containerRadius;
  }

  set containerRadius(radius) {
    this._containerRadius = radius;
    this.setAttribute('container-radius', this._containerRadius);
  }
}

export default Timer;
