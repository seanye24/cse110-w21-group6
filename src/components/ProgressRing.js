/**
 * @file progress-ring web component
 */

import { createElement, validateNumber } from '../utils/utils';

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
      { class: 'circle' },
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

    this.root.append(this.styleElement, this.svgElement);
    this.svgElement.append(
      this.baseCircleElement,
      this.circleElement,
      this.foreignObjectElement,
    );
    this.foreignObjectElement.appendChild(this.foreignObjectContainer);
    this.foreignObjectContainer.append(this.timerComponent);

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
        fill: #48cae4;
      }

      .circle {
        stroke: #0095b3;
        stroke-dasharray: ${circumference} ${circumference};
        stroke-dashoffset: ${(1 - progress / 100) * circumference};
        stroke-width: ${stroke + 2};
        fill: transparent;

        transition: stroke-dashoffset 0.5s;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }

      .foreign-object {
        width: ${2 * radius}px;
        height: ${2 * radius}px;
      }

      .foreign-object-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `;

    this.circleElement.setAttribute('r', normalizedRadius);
    this.circleElement.setAttribute('cx', radius);
    this.circleElement.setAttribute('cy', radius);

    this.baseCircleElement.setAttribute('r', normalizedRadius);
    this.baseCircleElement.setAttribute('cx', radius);
    this.baseCircleElement.setAttribute('cy', radius);

    this.timerComponent.containerRadius = radius;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const newValueNumber = validateNumber(newValue);

    // check if attribute value is number
    if (newValueNumber === null) {
      return;
    }

    // validate attribute ranges
    switch (name) {
      case 'radius':
        if (newValueNumber < 0) {
          return;
        }
        break;
      case 'stroke':
        if (newValueNumber < 0) {
          return;
        }
        break;
      case 'progress':
        if (name === 'progress') {
          if (newValueNumber < 0 || newValueNumber > 100) {
            return;
          }
        }
        break;
      default:
        return;
    }

    this[`_${name}`] = newValueNumber;
    this.updateComponent(this._radius, this._stroke, this._progress);
  }

  get radius() {
    return this._radius;
  }

  set radius(val) {
    const num = validateNumber(val);
    this.setAttribute('radius', num);
  }

  get stroke() {
    return this._stroke;
  }

  set stroke(val) {
    const num = validateNumber(val);
    this.setAttribute('stroke', num);
  }

  get progress() {
    return this._progress;
  }

  set progress(val) {
    const num = validateNumber(val);
    this.setAttribute('progress', num);
  }
}

export default ProgressRing;
