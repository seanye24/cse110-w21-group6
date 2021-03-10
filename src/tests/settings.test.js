import { Settings } from '../components';
import {
  createElement,
  checkIfShortInputValid,
  checkIfLongInputValid,
} from '../utils/utils';
import {
  initializePopup,
  getShortBreakLength,
  getLongBreakLength,
  setShortBreakLength,
  setLongBreakLength,
  getTimerAudio,
  setTimerAudio,
} from '../scripts/settings';

customElements.define('settings-component', Settings);

describe('testing settings values', () => {
  // initialize settings element before each test
  beforeEach(() => {
    const settingsElement = createElement('settings-component', {
      className: 'settings',
    });
    const settingsButton = createElement('button', {
      id: 'open-popup',
    });
    document.body.appendChild(settingsElement);
    document.body.appendChild(settingsButton);
    initializePopup(settingsElement);
  });

  test('see if initial values are setting correctly', () => {
    expect(Number(getShortBreakLength())).toBe(5);
    expect(Number(getLongBreakLength())).toBe(15);
    expect(getTimerAudio()).toBe('assets/calm-alarm.mp3');
  });

  test('testing change in input', () => {
    setShortBreakLength(4);
    expect(Number(getShortBreakLength())).toBe(4);
    setLongBreakLength(17);
    expect(Number(getLongBreakLength())).toBe(17);
    setTimerAudio('assets/kanye-stop.mp3');
    expect(getTimerAudio()).toBe('assets/kanye-stop.mp3');
  });

  test('invalid entries are captured', () => {
    setShortBreakLength(120);
    expect(checkIfShortInputValid(Number(getShortBreakLength()))).toBe(false);
    setShortBreakLength(360);
    expect(checkIfShortInputValid(Number(getShortBreakLength()))).toBe(false);
    setLongBreakLength(1860);
    expect(checkIfLongInputValid(Number(getLongBreakLength()))).toBe(false);
    setLongBreakLength(840);
    expect(checkIfLongInputValid(Number(getLongBreakLength()))).toBe(false);
  });
});
