import { ProgressRing } from '../components';
import { createElement } from '../utils/helpers';
import {
  initializeProgressRing,
  getProgress,
  setProgress,
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
});
