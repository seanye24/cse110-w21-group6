import { ProgressRing } from '../components';
import { createElement } from '../utils/helpers';
import {
  initializeProgressRing,
  getProgress,
  setProgress,
  getRadius,
  getStroke,
  setRadius,
  setStroke,
} from '../scripts/progressRing';
import { validateLength, validateProgress } from '../utils/progressRing';

customElements.define('progress-ring', ProgressRing);

describe('testing progress ring utils', () => {
  test('validateLength returns length on valid input', () => {
    const lengths = new Array(1000).fill(null).map((e, i) => i);
    lengths.forEach((value) => {
      expect(validateLength(value)).toBe(value);
    });
  });

  test('validateLength returns null on invalid input', () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];
    invalidLengths.forEach((value) => {
      expect(validateLength(value)).toBe(null);
    });
  });

  test('validateProgress returns progress on valid input', () => {
    const lengths = new Array(101).fill(null).map((e, i) => i);
    lengths.forEach((value) => {
      expect(validateProgress(value)).toBe(value);
    });
  });

  test('validateProgress returns null on invalid input', () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];
    invalidLengths.forEach((value) => {
      expect(validateProgress(value)).toBe(null);
    });
  });
});

describe('testing progress ring', () => {
  let progressRingElement;
  beforeEach(() => {
    progressRingElement = createElement('progress-ring', {
      radius: 100,
      stroke: 20,
      progress: 0,
      className: 'progress-ring',
    });
    document.body.innerHTML = '';
    document.body.appendChild(progressRingElement);
    initializeProgressRing(progressRingElement);
  });

  test('get attribute', () => {
    expect(progressRingElement.getAttribute('radius')).toBe('100');
    expect(progressRingElement.getAttribute('stroke')).toBe('20');
    expect(progressRingElement.getAttribute('progress')).toBe('0');
  });

  test('if input valid, set attribute changes attribute and property', () => {
    const values = new Array(101).fill(null).map((e, i) => i);
    values.forEach((value) => {
      progressRingElement.setAttribute('radius', value);
      expect(progressRingElement.getAttribute('radius')).toBe(`${value}`);
      expect(progressRingElement.radius).toBe(value);

      progressRingElement.setAttribute('stroke', value);
      expect(progressRingElement.getAttribute('stroke')).toBe(`${value}`);
      expect(progressRingElement.stroke).toBe(value);

      progressRingElement.setAttribute('progress', value);
      expect(progressRingElement.getAttribute('progress')).toBe(`${value}`);
      expect(progressRingElement.progress).toBe(value);
    });
  });

  test("if input invalid, set attribute doesn't change attribute and property", () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];

    invalidLengths.forEach((value) => {
      progressRingElement.setAttribute('radius', value);
      expect(progressRingElement.getAttribute('radius')).toBe('100');
      expect(progressRingElement.radius).toBe(100);

      progressRingElement.setAttribute('stroke', value);
      expect(progressRingElement.getAttribute('stroke')).toBe('20');
      expect(progressRingElement.stroke).toBe(20);

      progressRingElement.setAttribute('progress', value);
      expect(progressRingElement.getAttribute('progress')).toBe('0');
      expect(progressRingElement.progress).toBe(0);
    });
  });

  test('getter functions', () => {
    expect(progressRingElement.radius).toBe(100);
    expect(progressRingElement.stroke).toBe(20);
    expect(progressRingElement.progress).toBe(0);
  });

  test('if input valid, setter function changes attribute and property', () => {
    const values = new Array(101).fill(null).map((e, i) => i);
    values.forEach((value) => {
      progressRingElement.radius = value;
      expect(progressRingElement.getAttribute('radius')).toBe(`${value}`);
      expect(progressRingElement.radius).toBe(value);

      progressRingElement.stroke = value;
      expect(progressRingElement.getAttribute('stroke')).toBe(`${value}`);
      expect(progressRingElement.stroke).toBe(value);

      progressRingElement.progress = value;
      expect(progressRingElement.getAttribute('progress')).toBe(`${value}`);
      expect(progressRingElement.progress).toBe(value);
    });
  });

  test("if input invalid, setter function doesn't change attribute and property", () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];

    invalidLengths.forEach((value) => {
      progressRingElement.radius = value;
      expect(progressRingElement.getAttribute('radius')).toBe('100');
      expect(progressRingElement.radius).toBe(100);

      progressRingElement.stroke = value;
      expect(progressRingElement.getAttribute('stroke')).toBe('20');
      expect(progressRingElement.stroke).toBe(20);

      progressRingElement.progress = value;
      expect(progressRingElement.getAttribute('progress')).toBe('0');
      expect(progressRingElement.progress).toBe(0);
    });
  });
});

describe('testing progress ring script', () => {
  let progressRingElement;
  beforeEach(() => {
    progressRingElement = createElement('progress-ring', {
      radius: 100,
      stroke: 20,
      progress: 0,
      className: 'progress-ring',
    });
    document.body.innerHTML = '';
    document.body.appendChild(progressRingElement);
    initializeProgressRing(progressRingElement);
  });

  test('get functions', () => {
    // initial values
    expect(getRadius()).toBe(100);
    expect(getStroke()).toBe(20);
    expect(getProgress()).toBe(0);

    const values = new Array(101).fill(null).map((e, i) => i);
    values.forEach((value) => {
      progressRingElement.radius = value;
      progressRingElement.stroke = value;
      progressRingElement.progress = value;
      expect(getRadius()).toBe(value);
      expect(getStroke()).toBe(value);
      expect(getProgress()).toBe(value);
    });
  });

  test('if input valid, set function changes property', () => {
    const values = new Array(101).fill(null).map((e, i) => i);
    values.forEach((value) => {
      setRadius(value);
      setStroke(value);
      setProgress(value);
      expect(progressRingElement.radius).toBe(value);
      expect(progressRingElement.stroke).toBe(value);
      expect(progressRingElement.progress).toBe(value);
    });
  });

  test("if input invalid, set function doesn't change property", () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];
    invalidLengths.forEach((value) => {
      setRadius(value);
      setStroke(value);
      setProgress(value);
      expect(progressRingElement.radius).toBe(100);
      expect(progressRingElement.stroke).toBe(20);
      expect(progressRingElement.progress).toBe(0);
    });
  });
});
