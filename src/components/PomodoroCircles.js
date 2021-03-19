/**
 * @file pomodoro-circles web component
 */

import styles from '../styles/pomodoro-circles.component.css';
import { createElement } from '../utils/helpers';
import { validateCircleCount } from '../utils/pomodoroCircles';

/**
 * Custom web component representing pomodoro circles.
 * @extends HTMLElement
 */
class PomodoroCircles extends HTMLElement {
  static get observedAttributes() {
    return ['circle-count'];
  }

  constructor() {
    super();

    this._circleCount = 0;
    this.styleElement = createElement('style', {
      innerText: styles,
    });

    this.shadow = this.attachShadow({ mode: 'open' });
    // add html elements and styling
    this.counterContainer = createElement('div', {
      className: 'circle-container',
    });
    this.circles = new Array(4)
      .fill(null)
      .map(() => createElement('div', { className: 'circle' }));

    this.counterContainer.append(...this.circles);
    this.shadow.append(this.styleElement, this.counterContainer);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'circle-count') {
      const circleCount = validateCircleCount(newValue);
      if (circleCount === null) {
        this.setAttribute(name, oldValue);
        return;
      }

      this._circleCount = circleCount;

      this.circles.forEach((circle, i) => {
        if (i < circleCount) {
          circle.classList.add('active');
        } else {
          circle.classList.remove('active');
        }
      });
    }
  }

  get circleCount() {
    return this._circleCount;
  }

  set circleCount(value) {
    const circleCount = validateCircleCount(value);
    if (circleCount === null) {
      return;
    }

    this._circleCount = circleCount;
    this.setAttribute('circle-count', this._circleCount);
  }
}

export default PomodoroCircles;
