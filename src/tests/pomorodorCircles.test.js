import { PomodoroCircles } from '../components';
import { createElement } from '../utils/utils';
import {
  getCircleCount,
  initializeCircleCount,
  setCircleCount,
} from '../scripts/pomodoroCircles';

customElements.define('pomodoro-circles', PomodoroCircles);

describe('testing pomodoro circles', () => {
  // initialize pomodoro circles before each test
  beforeEach(() => {
    const pomodoroCirclesElement = createElement('pomodoro-circles', {
      circleCount: 0,
      className: 'pomodoro-circles',
    });
    document.body.innerHTML = '';
    document.body.appendChild(pomodoroCirclesElement);
    initializeCircleCount(pomodoroCirclesElement);
    jest.useFakeTimers();
  });

  test('setCircleCount sets circleCount correctly', () => {
    setCircleCount(1);
    expect(getCircleCount()).toBe(1);
    setCircleCount(2);
    expect(getCircleCount()).toBe(2);
    setCircleCount(3);
    expect(getCircleCount()).toBe(3);
    setCircleCount(4);
    expect(getCircleCount()).toBe(4);
  });
});
