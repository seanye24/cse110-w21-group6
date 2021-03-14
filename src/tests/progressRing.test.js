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
    jest.useFakeTimers();
  });

  test('get attribute', () => {
    expect(progressRingElement.getAttribute('radius')).toBe('100');
    expect(progressRingElement.getAttribute('stroke')).toBe('20');
    expect(progressRingElement.getAttribute('progress')).toBe('0');
  });

  test('if input valid, set attribute changes attribute and property', () => {
    progressRingElement.setAttribute('radius', 50);
    expect(progressRingElement.getAttribute('radius')).toBe('50');
    expect(progressRingElement.radius).toBe(50);

    progressRingElement.setAttribute('radius', 25);
    expect(progressRingElement.getAttribute('radius')).toBe('25');
    expect(progressRingElement.radius).toBe(25);

    progressRingElement.setAttribute('stroke', 50);
    expect(progressRingElement.getAttribute('stroke')).toBe('50');
    expect(progressRingElement.stroke).toBe(50);

    progressRingElement.setAttribute('stroke', 25);
    expect(progressRingElement.getAttribute('stroke')).toBe('25');
    expect(progressRingElement.stroke).toBe(25);

    progressRingElement.setAttribute('progress', 50);
    expect(progressRingElement.getAttribute('progress')).toBe('50');
    expect(progressRingElement.progress).toBe(50);

    progressRingElement.setAttribute('progress', 25);
    expect(progressRingElement.getAttribute('progress')).toBe('25');
    expect(progressRingElement.progress).toBe(25);
  });

  test('invalid attributes are ignored', () => {
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

  test('invalid attributes are ignored', () => {
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

  test('get functions of progress ring script', () => {
    expect(getRadius()).toBe(100);
    progressRingElement.radius = 10;
    expect(getRadius()).toBe(10);
    progressRingElement.radius = 20;
    expect(getRadius()).toBe(20);

    expect(getStroke()).toBe(20);
    progressRingElement.stroke = 10;
    expect(getStroke()).toBe(10);
    progressRingElement.stroke = 20;
    expect(getStroke()).toBe(20);

    expect(getProgress()).toBe(0);
    progressRingElement.progress = 10;
    expect(getProgress()).toBe(10);
    progressRingElement.progress = 20;
    expect(getProgress()).toBe(20);
  });

  test('set functions of progress ring script', () => {
    setRadius(100);
    expect(progressRingElement.radius).toBe(100);
    setRadius(50);
    expect(progressRingElement.radius).toBe(50);
    setRadius(25);
    expect(progressRingElement.radius).toBe(25);

    setStroke(100);
    expect(progressRingElement.stroke).toBe(100);
    setStroke(50);
    expect(progressRingElement.stroke).toBe(50);
    setStroke(25);
    expect(progressRingElement.stroke).toBe(25);

    setProgress(100);
    expect(progressRingElement.progress).toBe(100);
    setProgress(50);
    expect(progressRingElement.progress).toBe(50);
    setProgress(25);
    expect(progressRingElement.progress).toBe(25);
  });

  test('invalid input to set functions are ignored', () => {
    setRadius('asdf');
    expect(progressRingElement.radius).toBe(100);
    setRadius(null);
    expect(progressRingElement.radius).toBe(100);
    setRadius(NaN);
    expect(progressRingElement.radius).toBe(100);
    setRadius(false);
    expect(progressRingElement.radius).toBe(100);
    setRadius(undefined);
    expect(progressRingElement.radius).toBe(100);
    setRadius({ hello: 'world' });
    expect(progressRingElement.radius).toBe(100);

    setStroke('asdf');
    expect(progressRingElement.stroke).toBe(20);
    setStroke(null);
    expect(progressRingElement.stroke).toBe(20);
    setStroke(NaN);
    expect(progressRingElement.stroke).toBe(20);
    setStroke(false);
    expect(progressRingElement.stroke).toBe(20);
    setStroke(undefined);
    expect(progressRingElement.stroke).toBe(20);
    setStroke({ hello: 'world' });
    expect(progressRingElement.stroke).toBe(20);

    setProgress(50);
    setProgress('asdf');
    expect(progressRingElement.progress).toBe(50);
    setProgress(null);
    expect(progressRingElement.progress).toBe(50);
    setProgress(NaN);
    expect(progressRingElement.progress).toBe(50);
    setProgress(false);
    expect(progressRingElement.progress).toBe(50);
    setProgress(undefined);
    expect(progressRingElement.progress).toBe(50);
    setProgress({ hello: 'world' });
    expect(progressRingElement.progress).toBe(50);
  });
});
