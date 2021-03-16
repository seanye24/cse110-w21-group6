/**
 * @file progress-ring web component
 */

import { createElement } from '../utils/helpers';
import { validateLength, validateProgress } from '../utils/progressRing';

/**
 * Custom web component representing a progress ring.
 * @extends HTMLElement
 * @param {number} stroke - width of circle stroke
 * @param {number} radius - radius of circle
 * @param {number} progress - progress of ring
 */
class ProgressRing extends HTMLElement {
  static get observedAttributes() {
    return ['radius', 'stroke', 'progress'];
  }

  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.styleElement = document.createElement('style');

    const svgNamespace = 'http://www.w3.org/2000/svg';
    this.svgElement = createElement(
      'svg',
      { class: 'svg' },
      { namespace: svgNamespace },
    );

    this.circleElement = createElement(
      'circle',
      { class: 'circle pomodoro' },
      { namespace: svgNamespace },
    );
    this.baseCircleElement = createElement(
      'circle',
      { class: 'base-circle' },
      { namespace: svgNamespace },
    );

    this.foreignObjectElement = createElement(
      'foreignObject',
      { class: 'foreign-object' },
      { namespace: svgNamespace },
    );
    this.foreignObjectContainer = createElement('div', {
      class: 'foreign-object-container',
    });
    this.timerComponent = createElement('timer-component', {
      className: 'timer',
      time: 0,
    });
    this.circleComponent = createElement('pomodoro-circles', {
      className: 'circles',
      circleCount: 0,
    });

    this.root.append(this.styleElement, this.svgElement);
    this.svgElement.append(
      this.baseCircleElement,
      this.circleElement,
      this.foreignObjectElement,
    );
    this.foreignObjectElement.appendChild(this.foreignObjectContainer);
    this.foreignObjectContainer.append(
      this.timerComponent,
      this.circleComponent,
    );

    this._radius = 0;
    this._stroke = 0;
    this._progress = 0;
    this.updateComponent(this._radius, this._stroke, this._progress);
  }

  /** Updates component view */
  updateComponent(radius, stroke, progress) {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    this.styleElement.innerText = `
      .svg {
        overflow: hidden;
        width: ${2 * radius}px;
        height: ${2 * radius}px;
      }

      .base-circle {
        stroke: #fff;
        stroke-dasharray: ${circumference} ${circumference};
        stroke-dashoffset: 0;
        stroke-width: ${stroke};
      }

      .circle {
        stroke-dasharray: ${circumference} ${circumference};
        stroke-dashoffset: ${(1 - progress / 100) * circumference};
        stroke-width: ${stroke + 2};
        fill: transparent;

        transition: stroke-dashoffset 0.5s;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }

      .circle.pomodoro {
        stroke: #0095b3;
        fill: #48cae4;
      }

      .circle.short-break {
        stroke: #4ab717;
        fill: #69da00;
      }

      .circle.long-break {
        stroke: #f87335;
        fill: #f97f38;
      }

      .foreign-object {
      }

      .foreign-object-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `;

    this.foreignObjectElement.setAttribute('width', 2 * radius);
    this.foreignObjectElement.setAttribute('height', 2 * radius);
    this.circleElement.setAttribute('r', normalizedRadius);
    this.circleElement.setAttribute('cx', radius);
    this.circleElement.setAttribute('cy', radius);

    this.baseCircleElement.setAttribute('r', normalizedRadius);
    this.baseCircleElement.setAttribute('cx', radius);
    this.baseCircleElement.setAttribute('cy', radius);

    this.timerComponent.containerRadius = radius;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'radius': {
        const radius = validateLength(newValue);
        if (radius === null) {
          this.setAttribute(name, oldValue);
          return;
        }

        this._radius = radius;
        break;
      }
      case 'stroke': {
        const stroke = validateLength(newValue);
        if (stroke === null) {
          this.setAttribute(name, oldValue);
          return;
        }

        this._stroke = stroke;
        break;
      }
      case 'progress': {
        const progress = validateProgress(newValue);
        if (progress === null) {
          this.setAttribute(name, oldValue);
          return;
        }

        this._progress = progress;
        break;
      }
      default:
    }

    this.updateComponent(this._radius, this._stroke, this._progress);
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    const radius = validateLength(value);
    if (radius === null) {
      return;
    }

    this._radius = radius;
    this.setAttribute('radius', this._radius);
  }

  get stroke() {
    return this._stroke;
  }

  set stroke(value) {
    const stroke = validateLength(value);
    if (stroke === null) {
      return;
    }

    this._stroke = stroke;
    this.setAttribute('stroke', this._stroke);
  }

  get progress() {
    return this._progress;
  }

  set progress(value) {
    const progress = validateProgress(value);
    if (progress === null) {
      return;
    }

    this._progress = progress;
    this.setAttribute('progress', this._progress);
  }
}

export default ProgressRing;
