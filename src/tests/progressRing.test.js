import {
  initializeProgressRing,
  getProgress,
  setProgress,
  startProgressRing,
} from '../scripts/progressRing';

describe('testing progress ring', () => {
  // initialize progress ring before each test
  beforeEach(() => {
    initializeProgressRing(document.body, 100, 10, 0);
    jest.useFakeTimers();
  });

  test('setProgress sets progress correctly', () => {
    setProgress(100);
    expect(getProgress()).toBe(100);
  });

  test('ticks and stops correctly', () => {
    const startProgress = 100;
    setProgress(startProgress);

    const tickLength = 1;
    const tickFrequency = 2000;
    expect(getProgress()).toBe(startProgress);
    startProgressRing(tickLength, tickFrequency);

    for (let i = startProgress; i >= 0; i -= tickLength) {
      expect(getProgress()).toBe(i);
      jest.advanceTimersByTime(tickFrequency);
    }

    // ensure it doesn't tick past 0
    expect(getProgress()).toBe(0);
    jest.advanceTimersByTime(tickFrequency);
    expect(getProgress()).toBe(0);
  });
});
