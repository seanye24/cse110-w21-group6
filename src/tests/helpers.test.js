/* eslint-disable no-await-in-loop */
import {
  tick,
  validateString,
  validateNumber,
  getMinutesAndSeconds,
  getHoursMinutesAndSeconds,
  createElement,
} from '../utils/helpers';

describe('testing validateString', () => {
  test('valid inputs are returned', () => {
    expect(validateString('')).toBe('');
    expect(validateString('abc')).toBe('abc');
    expect(validateString('#$%!#')).toBe('#$%!#');
  });

  test('invalid inputs return null', () => {
    expect(validateString(1234)).toBe(null);
    expect(validateString(0xabc)).toBe(null);
    expect(validateString(true)).toBe(null);
    expect(validateString(false)).toBe(null);
    expect(validateString(null)).toBe(null);
    expect(validateString(undefined)).toBe(null);
    expect(validateString(NaN)).toBe(null);
    expect(validateString(0 / 0)).toBe(null);
    expect(validateString({})).toBe(null);
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

describe('testing getHoursMinutesAndSeconds', () => {
  test('input correctly returns time of format HHh MMm SSs', () => {
    expect(getHoursMinutesAndSeconds(0)).toBe('0s');
    expect(getHoursMinutesAndSeconds(1)).toBe('1s');
    expect(getHoursMinutesAndSeconds(25)).toBe('25s');
    expect(getHoursMinutesAndSeconds(60)).toBe('1m');
    expect(getHoursMinutesAndSeconds(100)).toBe('1m 40s');
    expect(getHoursMinutesAndSeconds(360)).toBe('6m');
    expect(getHoursMinutesAndSeconds(2500)).toBe('41m 40s');
    expect(getHoursMinutesAndSeconds(3600)).toBe('1h');
    expect(getHoursMinutesAndSeconds(3605)).toBe('1h 5s');
    expect(getHoursMinutesAndSeconds(3665)).toBe('1h 1m 5s');
    expect(getHoursMinutesAndSeconds(4540)).toBe('1h 15m 40s');
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
