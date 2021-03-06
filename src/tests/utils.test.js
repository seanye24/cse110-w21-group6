// import { initializeTimer } from '../scripts/timer';
import {
  initializeIntervalLengths,
  tick,
  validateNumber,
} from '../utils/utils';

describe('test intervals', () => {
  beforeEach(() => {
    localStorage.removeItem('pomodoroLength');
    localStorage.removeItem('shortBreakLength');
    localStorage.removeItem('longBreakLength');
  });

  test('default pomodoro intervals', () => {
    initializeIntervalLengths();

    expect(window.localStorage.getItem('pomodoroLength')).toBe('1500'); // 25 minutes
    expect(window.localStorage.getItem('shortBreakLength')).toBe('300'); // 5 minutes
    expect(window.localStorage.getItem('longBreakLength')).toBe('900'); // 15 minutes
  });

  test('custum intervals', () => {
    window.localStorage.setItem('pomodoroLength', 2100); // 35 minutes
    window.localStorage.setItem('shortBreakLength', 120); // 2 minutes
    window.localStorage.setItem('longBreakLength', 1800); // 30 minutes

    initializeIntervalLengths();

    expect(window.localStorage.getItem('pomodoroLength')).toBe('2100'); // 35 minutes
    expect(window.localStorage.getItem('shortBreakLength')).toBe('120'); // 2 minutes
    expect(window.localStorage.getItem('longBreakLength')).toBe('1800'); // 30 minutes
  });
});

describe('valid number', () => {
  test('validate number', () => {
    expect(validateNumber(5)).toBe(5);
    expect(validateNumber(1555)).toBe(1555);
    expect(validateNumber(35)).toBe(35);
    expect(validateNumber('5')).toBe(5);
    expect(validateNumber(0)).toBe(0);
    expect(validateNumber('p')).toBe(null);
    expect(validateNumber(-1)).toBe(-1);
    expect(validateNumber('#')).toBe(null);
  });

  describe('test ticking', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    test('called once, lasts 1 second', () => {
      tick(1);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    });

    test('called once, lasts 10 seconds', () => {
      tick(10);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
    });
  });
});
