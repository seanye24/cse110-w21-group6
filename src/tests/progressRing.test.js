import { ProgressRing } from '../components';
import { createElement } from '../utils/utils';
import {
  getProgress,
  initializeProgressRing,
  setProgress,
  setRadiusStroke,
  getRadius,
  getStroke,
} from '../scripts/progressRing';

customElements.define('progress-ring', ProgressRing);

describe('testing progress ring', () => {
  // initialize progress ring before each test
  beforeEach(() => {
    const progressRingElement = createElement('progress-ring', {
      radius: 100,
      stroke: 10,
      progress: 0,
      className: 'progress-ring',
    });
    document.body.innerHTML = '';
    document.body.appendChild(progressRingElement);
    initializeProgressRing(progressRingElement);
    jest.useFakeTimers();
  });

  test('setProgress sets progress correctly', () => {
    setProgress(100);
    expect(getProgress()).toBe(100);
    setProgress(50);
    expect(getProgress()).toBe(50);
    setProgress(25);
    expect(getProgress()).toBe(25);
  });

  test('setRadiusStroke sets radius and stroke correctly', () => {
    setRadiusStroke(50, 5);
    expect(getRadius()).toBe(50);
    expect(getStroke()).toBe(5);

    setRadiusStroke(75, 7);
    expect(getRadius()).toBe(75);
    expect(getStroke()).toBe(7);

    setRadiusStroke(100, 19);
    expect(getRadius()).toBe(100);
    expect(getStroke()).toBe(19);
  });
});
