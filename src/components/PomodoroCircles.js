/**
 * @file pomodoro-circles web component
 */

import { createElement } from '../utils/utils';

/**
 * Custom web component representing pomodoro circles.
 * @extends HTMLElement
 */
class PomodoroCircles extends HTMLElement {
  static get observedAttributes() {
    return ['circleCount'];
  }

  constructor() {
    super();

    this._circleCount = this.getAttribute('circleCount');

    this.styleElement = createElement('style', {
      innerText: `
      .circle-container {
        display: flex;
      }
      
      .circle {
        height: 15px;
        width: 15px;
        border: 1px solid white;
        border-radius: 50%;
        margin-left: 7px;
        margin-right: 7px;
        margin-top: 15px;
        display: inline-block;
      }
      `,
    });

    this.shadow = this.attachShadow({ mode: 'open' });
    // add html elements and styling
    this.counterContainer = createElement('div', {
      className: 'cirlce-container',
    });
    this.circle1 = createElement('div', {
      className: 'circle',
    });
    this.circle2 = createElement('div', {
      className: 'circle',
    });
    this.circle3 = createElement('div', {
      className: 'circle',
    });
    this.circle4 = createElement('div', {
      className: 'circle',
    });

    this.counterContainer.append(
      this.circle1,
      this.circle2,
      this.circle3,
      this.circle4,
    );
    this.shadow.append(this.styleElement, this.counterContainer);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'circle-count':
        if (newValue >= 1 && newValue <= 4) {
          this._circleCount = newValue;
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
