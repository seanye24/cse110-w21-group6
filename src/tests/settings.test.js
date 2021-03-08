import { Settings } from '../components';
import {
  createElement,
  checkIfShortInputValid,
  checkIfLongInputValid,
} from '../utils/utils';
import {
  initializeSettings,
  getShortBreak,
  getLongBreak,
  setShort,
  setLong,
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
    initializeSettings(settingsElement);
  });

  test('see if initial values are setting correctly', () => {
    expect(Number(getShortBreak())).toBe(300);
    expect(Number(getLongBreak())).toBe(900);
  });

  test('testing change in input', () => {
    setShort(240);
    expect(Number(getShortBreak())).toBe(240);
    setLong(1020);
    expect(Number(getLongBreak())).toBe(1020);
  });

  test('invalid entries are captured', () => {
    setShort(120);
    expect(checkIfShortInputValid(Number(getShortBreak()) / 60)).toBe(false);
    setShort(360);
    expect(checkIfShortInputValid(Number(getShortBreak()) / 60)).toBe(false);
    setLong(1860);
    expect(checkIfLongInputValid(Number(getLongBreak()) / 60)).toBe(false);
    setLong(840);
    expect(checkIfLongInputValid(Number(getLongBreak()) / 60)).toBe(false);
  });
});
