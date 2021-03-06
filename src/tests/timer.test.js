import { Timer } from '../components';
import { createElement } from '../utils/utils';
import {
  initializeTimer,
  setTimer,
  getTime,
} from '../scripts/timer';
import{
  getMinutesAndSeconds,
  checkIfTimeValid,
} from '../utils/utils';


customElements.define('timer-component', Timer);

describe('testing timer', () => {
  // initialize progress ring before each test
  beforeEach(() => {
    
    const timerElement = createElement('timer', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });
    initializeTimer(timerElement);
  });

  test('set timer correctly', () => {
    setTimer(0);
    expect(getTime()).toBe(0);
    expect(getMinutesAndSeconds(0)).toBe('00:00');

    setTimer(25);
    expect(getTime()).toBe(25);
    expect(getMinutesAndSeconds(25)).toBe('00:25');

    setTimer(60);
    expect(getTime()).toBe(60);
    expect(getMinutesAndSeconds(60)).toBe('01:00');

    setTimer(1000);
    expect(getTime()).toBe(1000);
    expect(getMinutesAndSeconds(1000)).toBe('16:40');

    setTimer(7);
    expect(getTime()).toBe(7);
    expect(getMinutesAndSeconds(7)).toBe('00:07');

    setTimer(1499);
    expect(getTime()).toBe(1499);
    expect(getMinutesAndSeconds(1499)).toBe('24:59');
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
});


