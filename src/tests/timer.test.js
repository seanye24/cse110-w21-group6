import { Timer } from '../components';
import { createElement } from '../utils/helpers';
import { initializeTimer, setTimer, getTime } from '../scripts/timer';
import { validateTime, validateContainerRadius } from '../utils/timer';

customElements.define('timer-component', Timer);

describe('testing timer utils', () => {
  test('validateTime returns time on valid inputs', () => {
    // set array to largest value of 3599
    const time = new Array(3600).fill(null).map((e, i) => i);
    time.forEach((value) => {
      expect(validateTime(value)).toBe(value);
    });
  });

  test('validateTime returns null on invalid inputs', () => {
    const invalidTimes = [
      '$%^#^$',
      'hello',
      null,
      undefined,
      NaN,
      {},
      -1,
      -10,
      3600,
      5645646,
      true,
      false,
    ];
    invalidTimes.forEach((value) => {
      expect(validateTime(value)).toBe(null);
    });
  });

  test('validateContainerRadius returns container radius on valid inputs', () => {
    const radius = new Array(100).fill(null).map((e, i) => i);
    radius.forEach((value) => {
      expect(validateContainerRadius(value)).toBe(value);
    });
  });

  test('validateContainerRadius returns null on invalid inputs', () => {
    const invalidRadius = [
      '$%^#^$',
      'hello',
      null,
      undefined,
      NaN,
      {},
      -1,
      -10,
      true,
      false,
    ];
    invalidRadius.forEach((value) => {
      expect(validateContainerRadius(value)).toBe(null);
    });
  });
});

describe('testing timer component', () => {
  let timerElement;

  beforeEach(() => {
    timerElement = createElement('timer-component', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });
  });

  test('get attribute', () => {
    expect(timerElement.getAttribute('time')).toBe('1500');
    expect(timerElement.getAttribute('container-radius')).toBe('10');
  });

  test('if input valid, set attribute changes attribute and property', () => {
    const values = new Array(3600).fill(null).map((e, i) => i);
    values.forEach((value) => {
      timerElement.setAttribute('time', value);
      expect(timerElement.getAttribute('time')).toBe(`${value}`);
      expect(timerElement.time).toBe(value);

      timerElement.setAttribute('container-radius', value);
      expect(timerElement.getAttribute('container-radius')).toBe(`${value}`);
      expect(timerElement.containerRadius).toBe(value);
    });
  });

  test("if input invalid, set attribute doesn't change attribute and property", () => {
    const invalidTimes = [
      '$%^#^$',
      'hello',
      null,
      undefined,
      NaN,
      {},
      -1,
      -10,
      3600,
      5645646,
      true,
      false,
    ];
    const invalidRadius = [
      '$%^#^$',
      'hello',
      null,
      undefined,
      NaN,
      {},
      -1,
      -10,
      true,
      false,
    ];

    invalidTimes.forEach((value) => {
      timerElement.setAttribute('time', value);
      expect(timerElement.getAttribute('time')).toBe('1500');
      expect(timerElement.time).toBe(1500);
    });

    invalidRadius.forEach((value) => {
      timerElement.setAttribute('container-radius', value);
      expect(timerElement.getAttribute('container-radius')).toBe('10');
      expect(timerElement.containerRadius).toBe(10);
    });
  });

  test('getter functions', () => {
    expect(timerElement.time).toBe(1500);
    expect(timerElement.containerRadius).toBe(10);
  });

  test('if input valid, setter function changes attribute and property', () => {
    const values = new Array(3600).fill(null).map((e, i) => i);
    values.forEach((value) => {
      timerElement.time = value;
      expect(timerElement.getAttribute('time')).toBe(`${value}`);
      expect(timerElement.time).toBe(value);

      timerElement.containerRadius = value;
      expect(timerElement.getAttribute('container-radius')).toBe(`${value}`);
      expect(timerElement.containerRadius).toBe(value);
    });
  });

  test("if input invalid, setter function doesn't change attribute and property", () => {
    const invalidTimes = [
      '$%^#^$',
      null,
      undefined,
      NaN,
      {},
      -1,
      -10,
      3600,
      5645646,
      true,
      false,
    ];
    const invalidRadius = [
      '$%^#^$',
      null,
      undefined,
      NaN,
      {},
      -1,
      -10,
      true,
      false,
    ];

    invalidTimes.forEach((value) => {
      timerElement.time = value;
      expect(timerElement.getAttribute('time')).toBe('1500');
      expect(timerElement.time).toBe(1500);
    });

    invalidRadius.forEach((value) => {
      timerElement.containerRadius = value;
      expect(timerElement.getAttribute('container-radius')).toBe('10');
      expect(timerElement.containerRadius).toBe(10);
    });
  });
});

describe('testing timer script', () => {
  let timerElement;

  beforeEach(() => {
    timerElement = createElement('timer-component', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });

    initializeTimer(timerElement);
  });

  test('get function', () => {
    const values = new Array(3600).fill(null).map((e, i) => i);
    values.forEach((value) => {
      timerElement.time = value;
      expect(getTime()).toBe(value);
    });
  });

  test('if input valid, set function changes property', () => {
    const values = new Array(3600).fill(null).map((e, i) => i);
    values.forEach((value) => {
      setTimer(value);
      expect(timerElement.time).toBe(value);
    });
  });

  test('if input invalid, set function does not change property', () => {
    timerElement.time = 1500;
    const invalidTimes = [
      '$%^#^$',
      null,
      undefined,
      NaN,
      {},
      -1,
      -10,
      3600,
      5645646,
      true,
      false,
    ];
    invalidTimes.forEach((value) => {
      setTimer(value);
      expect(timerElement.time).toBe(1500);
    });
  });
});
