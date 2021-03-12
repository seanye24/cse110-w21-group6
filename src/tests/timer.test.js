import { Timer } from '../components';
import { createElement } from '../utils/helpers';
import { initializeTimer, setTimer, getTime } from '../scripts/timer';

customElements.define('timer-component', Timer);

describe('testing script setTimer', () => {
  // initialize progress ring before each test
  beforeEach(() => {
    const timerElement = createElement('timer-component', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });
    initializeTimer(timerElement);
  });

  test('valid inputs are saved', () => {
    setTimer(0);
    expect(getTime()).toBe(0);
    setTimer(25);
    expect(getTime()).toBe(25);
    setTimer(60);
    expect(getTime()).toBe(60);
    setTimer(1000);
    expect(getTime()).toBe(1000);
    setTimer('7');
    expect(getTime()).toBe(7);
    setTimer(1499);
    expect(getTime()).toBe(1499);
  });

  test('invalid inputs are not saved', () => {
    setTimer(-100);
    expect(getTime()).toBe(1500);
    setTimer(3600);
    expect(getTime()).toBe(1500);
    setTimer(1000000);
    expect(getTime()).toBe(1500);
    setTimer('#%$%$#%');
    expect(getTime()).toBe(1500);
    setTimer('hello');
    expect(getTime()).toBe(1500);
    setTimer(NaN);
    expect(getTime()).toBe(1500);
  });
});

describe('testing setTime and setContainerRadius of timer component', () => {
  test('valid time inputs are saved', () => {
    const timerElement = createElement('timer-component', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });

    initializeTimer(timerElement);

    timerElement.time = 1;
    expect(timerElement.time).toBe(1);
    timerElement.time = 0;
    expect(timerElement.time).toBe(0);
    timerElement.time = 15;
    expect(timerElement.time).toBe(15);
    timerElement.time = 1999;
    expect(timerElement.time).toBe(1999);
    timerElement.time = 3599;
    expect(timerElement.time).toBe(3599);
  });

  test('invalid time inputs are not saved', () => {
    const timerElement = createElement('timer-component', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });

    initializeTimer(timerElement);

    timerElement.time = 'gferg';
    expect(timerElement.time).toBe(1500);
    timerElement.time = '#%@$%^';
    expect(timerElement.time).toBe(1500);
    timerElement.time = NaN;
    expect(timerElement.time).toBe(1500);
    timerElement.time = -1999;
    expect(timerElement.time).toBe(1500);
    timerElement.time = 1000000;
    expect(timerElement.time).toBe(1500);
    timerElement.time = null;
    expect(timerElement.time).toBe(1500);
  });

  test('valid container radius inputs are saved', () => {
    const timerElement = createElement('timer-component', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });

    initializeTimer(timerElement);

    timerElement.containerRadius = 1;
    expect(timerElement.containerRadius).toBe(1);
    timerElement.containerRadius = 0;
    expect(timerElement.containerRadius).toBe(0);
    timerElement.containerRadius = 159;
    expect(timerElement.containerRadius).toBe(159);
  });

  test('invalid container radius inputs are not saved', () => {
    const timerElement = createElement('timer-component', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });

    initializeTimer(timerElement);

    timerElement.containerRadius = 'gferg';
    expect(timerElement.containerRadius).toBe(10);
    timerElement.containerRadius = '#%@$%^';
    expect(timerElement.containerRadius).toBe(10);
    timerElement.containerRadius = NaN;
    expect(timerElement.containerRadius).toBe(10);
    timerElement.containerRadius = -1999;
    expect(timerElement.containerRadius).toBe(10);
    timerElement.containerRadius = null;
    expect(timerElement.containerRadius).toBe(10);
  });
});

describe('testing time and containerRadius attributes of timer component', () => {
  test('valid time inputs are saved', () => {
    const timerElement = createElement('timer-component', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });

    initializeTimer(timerElement);

    timerElement.setAttribute('time', 1);
    expect(timerElement.getAttribute('time')).toBe('1');
    timerElement.setAttribute('time', 0);
    expect(timerElement.getAttribute('time')).toBe('0');
    timerElement.setAttribute('time', 15);
    expect(timerElement.getAttribute('time')).toBe('15');
    timerElement.setAttribute('time', 1999);
    expect(timerElement.getAttribute('time')).toBe('1999');
    timerElement.setAttribute('time', 3599);
    expect(timerElement.getAttribute('time')).toBe('3599');
  });

  test('valid container radius inputs are saved', () => {
    const timerElement = createElement('timer-component', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });

    initializeTimer(timerElement);

    timerElement.setAttribute('containerRadius', 1);
    expect(timerElement.getAttribute('containerRadius')).toBe('1');
    timerElement.setAttribute('containerRadius', 0);
    expect(timerElement.getAttribute('containerRadius')).toBe('0');
    timerElement.setAttribute('containerRadius', 159);
    expect(timerElement.getAttribute('containerRadius')).toBe('159');
  });
});
