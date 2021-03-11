/* eslint-disable no-await-in-loop */
import {
  DEFAULT_LONG_BREAK_LENGTH,
  DEFAULT_SHORT_BREAK_LENGTH,
} from '../utils/constants';
import {
  tick,
  validateNumber,
  getMinutesAndSeconds,
  createElement,
} from '../utils/utils';
import { initializeIntervalLengths } from '../utils/settings';

describe('testing initializeIntervalLengths', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('default lengths are set correctly', () => {
    const { shortBreakLength, longBreakLength } = initializeIntervalLengths();

    expect(shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);
  });

  test('saved lengths are retrieved correctly', () => {
    window.localStorage.setItem('shortBreakLength', 3);
    window.localStorage.setItem('longBreakLength', 30);

    const { shortBreakLength, longBreakLength } = initializeIntervalLengths();
    expect(shortBreakLength).toBe(3);
    expect(longBreakLength).toBe(30);
  });

  test('if invalid lengths are saved, correctly fallback to defaults', () => {
    window.localStorage.setItem('shortBreakLength', 10);
    window.localStorage.setItem('longBreakLength', 35);

    let { shortBreakLength, longBreakLength } = initializeIntervalLengths();
    expect(shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);

    window.localStorage.setItem('shortBreakLength', '$@#$');
    window.localStorage.setItem('longBreakLength', true);

    ({ shortBreakLength, longBreakLength } = initializeIntervalLengths());
    expect(shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);
  });
});

describe('testing validateNumber', () => {
  test('valid inputs are returned', () => {
    expect(validateNumber(5)).toBe(5);
    expect(validateNumber(5.3)).toBe(5.3);
    expect(validateNumber('10')).toBe(10);
    expect(validateNumber('10.5')).toBe(10.5);
    expect(validateNumber(0)).toBe(0);
    expect(validateNumber(-10)).toBe(-10);
    expect(validateNumber(0xabc)).toBe(2748);
    expect(validateNumber(0o567)).toBe(375);
    expect(validateNumber(0b101010)).toBe(42);
  });

  test('invalid inputs are returned null', () => {
    expect(validateNumber('p')).toBe(null);
    expect(validateNumber('#@!')).toBe(null);
    expect(validateNumber(NaN)).toBe(null);
    expect(validateNumber(0 / 0)).toBe(null);
    expect(validateNumber(null)).toBe(null);
    expect(validateNumber(undefined)).toBe(null);
  });
});

describe('testing getMinutesAndSeconds', () => {
  test('input correctly returns time of format MM:SS', () => {
    expect(getMinutesAndSeconds(0)).toBe('00:00');
    expect(getMinutesAndSeconds(25)).toBe('00:25');
    expect(getMinutesAndSeconds(60)).toBe('01:00');
    expect(getMinutesAndSeconds(1000)).toBe('16:40');
    expect(getMinutesAndSeconds(7)).toBe('00:07');
    expect(getMinutesAndSeconds(1499)).toBe('24:59');
  });
});

describe('testing tick', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const flushPromises = () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  test('tick correctly waits the specified amount of time', async () => {
    let a = 0;
    tick(1)
      .then(() => {
        a = 1;
        return tick(1);
      })
      .then(() => {
        a = 2;
        return tick(1);
      })
      .then(() => {
        a = 3;
      });

    for (let i = 0; i <= 3; i++) {
      expect(a).toBe(i);
      jest.advanceTimersByTime(500);
      await flushPromises();
      expect(a).toBe(i);
      jest.advanceTimersByTime(500);
      await flushPromises();
    }
    expect(a).toBe(3);
    jest.advanceTimersByTime(500);
    await flushPromises();
    expect(a).toBe(3);
  });
});

describe('testing createElement', () => {
  test('p element is created correctly', () => {
    const pElement = createElement('p', {
      innerHTML: 'Pomodoro timer',
      style: 'color: black',
    });

    expect(pElement.innerHTML).toBe('Pomodoro timer');
    expect(pElement.style.color).toBe('black');
  });

  test('div element is created correctly', () => {
    const divElement = createElement('div', {
      style: `
        width: 50px;
        height: 50px;
        background: red;
        color: green;
      `,
      innerHTML: 'Pomodoro timer',
    });

    expect(divElement.innerHTML).toBe('Pomodoro timer');
    expect(divElement.style.height).toBe('50px');
    expect(divElement.style.width).toBe('50px');
    expect(divElement.style.background).toBe('red');
    expect(divElement.style.color).toBe('green');
  });

  test('button element is created correctly', () => {
    const startBtnElement = createElement('button', {
      innerHTML: 'Start',
    });
    document.body.appendChild(startBtnElement);
    expect(startBtnElement.innerHTML).toBe('Start');

    const endBtnElement = createElement('Button', {
      innerHTML: 'End',
    });
    document.body.appendChild(endBtnElement);
    expect(endBtnElement.innerHTML).toBe('End');
    expect(document.hasChildNodes()).toBe(true);
  });
});
