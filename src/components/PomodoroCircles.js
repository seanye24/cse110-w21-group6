/**
 * @file pomodoro-circles web component
 */

import { createElement } from '../utils/utils';

/**
 * Custom web component representing a progress ring.
 * @extends HTMLElement
 * TODO: add documentation
 */
class PomodoroCircles extends HTMLElement {
  static get observedAttributes() {
    return ['circleCount'];
  }

  constructor() {
    super();

    this._circleCount = 0;

    this.styleElement = createElement('style', {
      innerText: `
        .container {
          font: initial 'Duru-Sans', sans-serif;
          color: #fff;
        }
      `,
    });

    this.shadow = this.attachShadow({ mode: 'open' });
    // add html elements and styling
    this.counterContainer = createElement('div', {
      className: 'container',
    });

    this.shadow.append(this.styleElement, this.counterContainer);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // TODO: validate newValue
    // make sure newValue is a number
    // make sure newValue >= 1 && newValue <= 4
    const isNumber = newValue.isNaN();

    switch (name) {
      case 'circle-count':
        // TODO: circle count changes behavior
        if (isNumber === false) {
          if (newValue >= 1 && newValue <= 4) {
            this._circleCount = newValue;
          } else {
            this._circleCount = 0;
          }
          this.counterContainer.innerText = 4 - this._circleCount;
        }
        break;
      default:
    }
  }

  // TODO: getter/setter for circle count
  get circleCount() {
    return this._circleCount;
  }

  set circleCount(circleCount) {
    this._circleCount = circleCount;
    this.setAttribute('circleCount', this._circleCount);
  }
}

export default PomodoroCircles;
