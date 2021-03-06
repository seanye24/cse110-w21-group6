import {
  initializeIntervalLengths,
  tick,
  validateNumber,
  getMinutesAndSeconds,
  checkIfTimeValid,
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

describe('valid time and number', () => {
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

  test('check if valid time', () => {
    expect(checkIfTimeValid(5)).toBe(true);
    expect(checkIfTimeValid(1500)).toBe(true);
    expect(checkIfTimeValid(59)).toBe(true);
    expect(checkIfTimeValid(569)).toBe(true);
    expect(checkIfTimeValid('5')).toBe(true);
    expect(checkIfTimeValid(-5)).toBe(false);
    expect(checkIfTimeValid(-1)).toBe(false);
    expect(checkIfTimeValid('p')).toBe(false);
    expect(checkIfTimeValid('#')).toBe(false);
  });

  test('test for correct time string', () => {
    expect(getMinutesAndSeconds(0)).toBe('00:00');
    expect(getMinutesAndSeconds(25)).toBe('00:25');
    expect(getMinutesAndSeconds(60)).toBe('01:00');
    expect(getMinutesAndSeconds(1000)).toBe('16:40');
    expect(getMinutesAndSeconds(7)).toBe('00:07');
    expect(getMinutesAndSeconds(1499)).toBe('24:59');
  });
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

// TODO: add more tests for tick using await/.then()

// TODO: add tests for createElement
