import { PomodoroCircles } from '../components';
import { createElement } from '../utils/utils';
import {
  getCircleCount,
  initializePomodoroCircles,
  setCircleCount,
} from '../scripts/pomodoroCircles';

customElements.define('pomodoro-circles', PomodoroCircles);

describe('testing pomodoro circles', () => {
  // initialize pomodoro circles before each test
  beforeEach(() => {
    const pomodoroCirclesElement = createElement('pomodoro-circles', {
      className: 'pomodoro-circles',
    });
    document.body.innerHTML = '';
    document.body.appendChild(pomodoroCirclesElement);
    initializePomodoroCircles(pomodoroCirclesElement);
    // jest.useFakeTimers();
  });

  test('setCircleCount sets circleCount correctly', () => {
    setCircleCount(0);
    expect(getCircleCount()).toBe(0);
    setCircleCount(1);
    expect(getCircleCount()).toBe(1);
    setCircleCount(2);
    expect(getCircleCount()).toBe(2);
    setCircleCount(3);
    expect(getCircleCount()).toBe(3);
    setCircleCount(4);
    expect(getCircleCount()).toBe(4);
  });

  test('invalid circle counts are ignored', () => {
    setCircleCount(-1);
    expect(getCircleCount()).toBe(0);
    setCircleCount(5);
    expect(getCircleCount()).toBe(0);
    setCircleCount(3);
    setCircleCount(7);
    expect(getCircleCount()).toBe(3);
  });
});
