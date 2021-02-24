import { createElement } from '../utils';

class ProgressRing extends HTMLElement {
  constructor() {
    super();

    const stroke = this.getAttribute('stroke');
    const radius = this.getAttribute('radius');
    const normalizedRadius = radius - stroke * 2;
    this.circumference = normalizedRadius * 2 * Math.PI;

    this.root = this.attachShadow({ mode: 'open' });
    this.styleElement = document.createElement('style');
    this.styleElement.innerText = `
      .svg {
        overflow: hidden;
        width: ${2 * radius}px;
        height: ${2 * radius}px;
      }

      .circle {
        stroke: #0095b3;
        stroke-dasharray: ${this.circumference} ${this.circumference};
        stroke-dashoffset: ${(1 - 0.3) * this.circumference};
        fill: transparent;
        stroke-width: ${stroke};

        transition: 0.35s stroke-dashoffset;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }
    `;

    const svgNamespace = 'http://www.w3.org/2000/svg';
    this.svgElement = createElement(
      'svg',
      { class: 'svg' },
      { namespace: svgNamespace },
    );

    this.circleElement = createElement(
      'circle',
      {
        class: 'circle',
        r: normalizedRadius,
        cx: radius,
        cy: radius,
      },
      { namespace: svgNamespace },
    );

    this.root.append(this.styleElement, this.svgElement);
    this.svgElement.appendChild(this.circleElement);
  }
}

export default ProgressRing;
