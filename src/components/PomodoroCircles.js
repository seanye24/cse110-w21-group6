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

    this._circleCount = 0;

    this.styleElement = createElement('style', {
      innerText: `
      .circle1 {
        height: 10px;
        width: 10px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
      }
      .circle2 {
        height: 10px;
        width: 10px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
      }
      .circle3 {
        height: 10px;
        width: 10px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
      }
      .circle4 {
        height: 10px;
        width: 10px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
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

    switch (name) {
      case 'circle-count':
        // TODO: circle count changes behavior
        if (newValue.isNaN === false) {
          if (newValue >= 1 && newValue <= 4) {
            this._circleCount = newValue;
          } else {
            this._circleCount = 0;
          }
          /*
          if (this._circleCount === 0) {
            this.styleElement.innerText = `
            .circle1 {
              height: 10px;
              width: 10px;
              background-color: #bbb;
              border-radius: 50%;
              display: inline-block;
            }
            .circle2 {
              height: 10px;
              width: 10px;
              background-color: #bbb;
              border-radius: 50%;
              display: inline-block;
            }
            .circle3 {
              height: 10px;
              width: 10px;
              background-color: #bbb;
              border-radius: 50%;
              display: inline-block;
            }
            .circle4 {
              height: 10px;
              width: 10px;
              background-color: #bbb;
              border-radius: 50%;
              display: inline-block;
            }
            `;
          } else if (this._circleCount === 1) {
            this.styleElement.innerText = `
            .circle1 {
              height: 10px;
              width: 10px;
              background-color: #000;
              border-radius: 50%;
              display: inline-block;
            }
            .circle2 {
              height: 10px;
              width: 10px;
              background-color: #bbb;
              border-radius: 50%;
              display: inline-block;
            }
            .circle3 {
              height: 10px;
              width: 10px;
              background-color: #bbb;
              border-radius: 50%;
              display: inline-block;
            }
            .circle4 {
              height: 10px;
              width: 10px;
              background-color: #bbb;
              border-radius: 50%;
              display: inline-block;
            }
            `;
          } else if (this._circleCount === 2) {
            this.styleElement.innerText = `
            .circle1 {
              height: 10px;
              width: 10px;
              background-color: #000;
              border-radius: 50%;
              display: inline-block;
            }
            .circle2 {
              height: 10px;
              width: 10px;
              background-color: #000;
              border-radius: 50%;
              display: inline-block;
            }
            .circle3 {
              height: 10px;
              width: 10px;
              background-color: #bbb;
              border-radius: 50%;
              display: inline-block;
            }
            .circle4 {
              height: 10px;
              width: 10px;
              background-color: #bbb;
              border-radius: 50%;
              display: inline-block;
            }
            `;
          } else if (this._circleCount === 3) {
            this.styleElement.innerText = `
            .circle1 {
              height: 10px;
              width: 10px;
              background-color: #000;
              border-radius: 50%;
              display: inline-block;
            }
            .circle2 {
              height: 10px;
              width: 10px;
              background-color: #000;
              border-radius: 50%;
              display: inline-block;
            }
            .circle3 {
              height: 10px;
              width: 10px;
              background-color: #000;
              border-radius: 50%;
              display: inline-block;
            }
            .circle4 {
              height: 10px;
              width: 10px;
              background-color: #bbb;
              border-radius: 50%;
              display: inline-block;
            }
            `;
          } else if (this._circleCount === 4) {
            this.styleElement.innerText = `
            .circle1 {
              height: 10px;
              width: 10px;
              background-color: #000;
              border-radius: 50%;
              display: inline-block;
            }
            .circle2 {
              height: 10px;
              width: 10px;
              background-color: #000;
              border-radius: 50%;
              display: inline-block;
            }
            .circle3 {
              height: 10px;
              width: 10px;
              background-color: #000;
              border-radius: 50%;
              display: inline-block;
            }
            .circle4 {
              height: 10px;
              width: 10px;
              background-color: #000;
              border-radius: 50%;
              display: inline-block;
            }
            `;
          }
          */
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
