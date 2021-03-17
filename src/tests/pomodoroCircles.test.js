import { PomodoroCircles } from '../components';
import { createElement } from '../utils/helpers';
import {
  getCircleCount,
  initializePomodoroCircles,
  setCircleCount,
} from '../scripts/pomodoroCircles';
import { validateCircleCount } from '../utils/pomodoroCircles';

customElements.define('pomodoro-circles', PomodoroCircles);

describe('testing pomodoro circle utils', () => {
  test('validateCircleCount returns progress on valid input', () => {
    const lengths = new Array(5).fill(null).map((e, i) => i);
    lengths.forEach((value) => {
      expect(validateCircleCount(value)).toBe(value);
    });
  });

  test('validateCircleCount returns null on invalid input', () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];
    invalidLengths.forEach((value) => {
      expect(validateCircleCount(value)).toBe(null);
    });
  });
});

describe('testing pomodoro circles', () => {
  let circlesElement;
  // initialize pomodoro circles before each test
  beforeEach(() => {
    circlesElement = createElement('pomodoro-circles', {
      circleCount: 0,
      className: 'pomodoro-circles',
    });
    document.body.innerHTML = '';
    document.body.appendChild(circlesElement);
    initializePomodoroCircles(circlesElement);
    jest.useFakeTimers();
  });

  test('get attribute', () => {
    expect(circlesElement.getAttribute('circle-count')).toBe('0');
  });

  test('if input valid, set attribute changes attribute and property', () => {
    const values = new Array(5).fill(null).map((e, i) => i);
    values.forEach((value) => {
      circlesElement.setAttribute('circle-count', value);
      expect(circlesElement.getAttribute('circle-count')).toBe(`${value}`);
      expect(circlesElement.circleCount).toBe(value);
    });
  });

  test("if input invalid, set attribute doesn't change attribute and property", () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];

    invalidLengths.forEach((value) => {
      circlesElement.setAttribute('circle-count', value);
      expect(circlesElement.getAttribute('circle-count')).toBe('0');
      expect(circlesElement.circleCount).toBe(0);
    });
  });

  test('getter functions', () => {
    expect(circlesElement.circleCount).toBe(0);
  });

  test('if input valid, setter function changes attribute and property', () => {
    const values = new Array(5).fill(null).map((e, i) => i);
    values.forEach((value) => {
      circlesElement.circleCount = value;
      expect(circlesElement.getAttribute('circle-count')).toBe(`${value}`);
      expect(circlesElement.circleCount).toBe(value);
    });
  });

  test("if input invalid, setter function doesn't change attribute and property", () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];

    invalidLengths.forEach((value) => {
      circlesElement.circleCount = value;
      expect(circlesElement.getAttribute('circle-count')).toBe('0');
      expect(circlesElement.circleCount).toBe(0);
    });
  });
});

describe('testing pomodoro circle script', () => {
  let circlesElement;
  // initialize pomodoro circles before each test
  beforeEach(() => {
    circlesElement = createElement('pomodoro-circles', {
      circleCount: 0,
      className: 'pomodoro-circles',
    });
    document.body.innerHTML = '';
    document.body.appendChild(circlesElement);
    initializePomodoroCircles(circlesElement);
    jest.useFakeTimers();
  });

  test('get functions', () => {
    // initial values
    expect(getCircleCount()).toBe(0);

    const values = new Array(5).fill(null).map((e, i) => i);
    values.forEach((value) => {
      circlesElement.circleCount = value;
      expect(getCircleCount()).toBe(value);
    });
  });

  test('if input valid, set function changes property', () => {
    const values = new Array(5).fill(null).map((e, i) => i);
    values.forEach((value) => {
      setCircleCount(value);
      expect(circlesElement.circleCount).toBe(value);
    });
  });

  test("if input invalid, set function doesn't change property", () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];
    invalidLengths.forEach((value) => {
      setCircleCount(value);
      expect(circlesElement.circleCount).toBe(0);
    });
  });
});
