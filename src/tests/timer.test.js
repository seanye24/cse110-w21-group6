import { Timer } from '../components';
import { createElement } from '../utils/utils';
import { initializeTimer, setTimer, getTime } from '../scripts/timer';

customElements.define('timer-component', Timer);

describe('testing timer', () => {
  // initialize progress ring before each test
  beforeEach(() => {
    const timerElement = createElement('timer-component', {
      time: 1500,
      containerRadius: 10,
      className: 'timer',
    });
    initializeTimer(timerElement);
  });

  test('set timer correctly', () => {
    setTimer(0);
    expect(getTime()).toBe(0);

    setTimer(25);
    expect(getTime()).toBe(25);

    setTimer(60);
    expect(getTime()).toBe(60);

    setTimer(1000);
    expect(getTime()).toBe(1000);

    setTimer(7);
    expect(getTime()).toBe(7);

    setTimer(1499);
    expect(getTime()).toBe(1499);
  });
  
});
