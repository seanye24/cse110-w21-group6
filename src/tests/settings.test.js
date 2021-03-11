import { Settings } from '../components';
import { createElement } from '../utils/utils';
import {
  initializePopup,
  getShortBreakLength,
  getLongBreakLength,
  setShortBreakLength,
  setLongBreakLength,
  getTimerAudio,
  setTimerAudio,
} from '../scripts/settings';
import {
  DEFAULT_LONG_BREAK_LENGTH,
  DEFAULT_SHORT_BREAK_LENGTH,
  DEFAULT_TIMER_AUDIO,
  TIMER_AUDIOS,
} from '../utils/constants';

customElements.define('settings-component', Settings);

describe('testing settings component', () => {
  // initialize settings popup element
  beforeEach(() => {
    window.localStorage.clear();
    const settingsElement = createElement('settings-component', {
      className: 'settings',
    });
    document.body.append(settingsElement);
    initializePopup(settingsElement);
  });

  test('initial values are correct', () => {
    expect(getShortBreakLength()).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(getLongBreakLength()).toBe(DEFAULT_LONG_BREAK_LENGTH);
    expect(getTimerAudio()).toBe(DEFAULT_TIMER_AUDIO);
  });

  test('valid input changes are reflected', () => {
    setShortBreakLength(4);
    expect(getShortBreakLength()).toBe(4);
    setLongBreakLength(17);
    expect(getLongBreakLength()).toBe(17);
    setTimerAudio(TIMER_AUDIOS.kanye);
    expect(getTimerAudio()).toBe(TIMER_AUDIOS.kanye);
  });

  test('invalid input changes are ignored', () => {
    setShortBreakLength(1);
    expect(getShortBreakLength()).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    setShortBreakLength(10);
    expect(getShortBreakLength()).toBe(DEFAULT_SHORT_BREAK_LENGTH);

    setLongBreakLength(10);
    expect(getLongBreakLength()).toBe(DEFAULT_LONG_BREAK_LENGTH);
    setLongBreakLength(50);
    expect(getLongBreakLength()).toBe(DEFAULT_LONG_BREAK_LENGTH);

    setTimerAudio('assets/invalid-item.mp3');
    expect(getTimerAudio()).toBe(DEFAULT_TIMER_AUDIO);
  });
});
