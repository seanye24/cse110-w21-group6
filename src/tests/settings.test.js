import { Settings as SettingsPopup } from '../components';
import { createElement } from '../utils/helpers';
import {
  initializePopup,
  getShortBreakLength,
  getLongBreakLength,
  setShortBreakLength,
  setLongBreakLength,
  getTimerAudio,
  setTimerAudio,
  openPopup,
  closePopup,
  saveSettings,
  popupFunctions,
} from '../scripts/settings';
import {
  DEFAULT_LONG_BREAK_LENGTH,
  DEFAULT_SHORT_BREAK_LENGTH,
  DEFAULT_TIMER_AUDIO,
  KEYS,
  TIMER_AUDIOS,
} from '../utils/constants';
import {
  initializeIntervalLengths,
  validateShortBreakLength,
  validateLongBreakLength,
  validateTimerAudio,
} from '../utils/settings';

// add audio element api (jsdom doens't support video/audio elements right now)
window.HTMLMediaElement.prototype.load = jest.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = jest.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.addTextTrack = jest.fn(() =>
  Promise.resolve(),
);

customElements.define('settings-component', SettingsPopup);

describe('testing settings utils', () => {
  test('validateShortBreakLength returns short break length on valid input', () => {
    const lengths = [3, 4, 5];
    lengths.forEach((value) => {
      expect(validateShortBreakLength(value)).toBe(value);
    });
  });

  test('validateShortBreakLength returns null on invalid input', () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];
    invalidLengths.forEach((value) => {
      expect(validateShortBreakLength(value)).toBe(null);
    });
  });

  test('validateLongBreakLength returns short break length on valid input', () => {
    const lengths = new Array(16).fill(null).map((l, i) => i + 15);
    lengths.forEach((value) => {
      expect(validateLongBreakLength(value)).toBe(value);
    });
  });

  test('validateLongBreakLength returns null on invalid input', () => {
    const invalidLengths = ['as', null, undefined, NaN, {}, -10, true, false];
    invalidLengths.forEach((value) => {
      expect(validateLongBreakLength(value)).toBe(null);
    });
  });

  test('validateTimerAudio returns short break length on valid input', () => {
    Object.values(TIMER_AUDIOS).forEach((value) => {
      expect(validateTimerAudio(value)).toBe(value);
    });
  });

  test('validateTimerAudio returns null on invalid input', () => {
    const invalidAudios = ['as', null, undefined, NaN, {}, -10, true, false];
    invalidAudios.forEach((value) => {
      expect(validateTimerAudio(value)).toBe(null);
    });
  });
});

describe('testing settings component', () => {
  // initialize settings popup element
  let settingsElement;
  beforeEach(() => {
    window.localStorage.clear();
    settingsElement = createElement('settings-component', {
      className: 'settings',
    });
    document.body.append(settingsElement);
    initializePopup(settingsElement);
  });

  test('get attribute', () => {
    expect(settingsElement.getAttribute('short-break-length')).toBe(
      `${DEFAULT_SHORT_BREAK_LENGTH}`,
    );
    expect(settingsElement.getAttribute('long-break-length')).toBe(
      `${DEFAULT_LONG_BREAK_LENGTH}`,
    );
    expect(settingsElement.getAttribute('timer-audio')).toBe(
      DEFAULT_TIMER_AUDIO,
    );
  });

  test('if input valid, set attribute changes attribute and property', () => {
    const values = [
      [4, 20, TIMER_AUDIOS.annoying],
      [3, 29, TIMER_AUDIOS.kanye],
      [5, 17, TIMER_AUDIOS.calm],
    ];

    values.forEach(([sbl, lbl, ta]) => {
      settingsElement.setAttribute('short-break-length', sbl);
      expect(settingsElement.getAttribute('short-break-length')).toBe(`${sbl}`);
      expect(settingsElement.shortBreakLength).toBe(sbl);

      settingsElement.setAttribute('long-break-length', lbl);
      expect(settingsElement.getAttribute('long-break-length')).toBe(`${lbl}`);
      expect(settingsElement.longBreakLength).toBe(lbl);

      settingsElement.setAttribute('timer-audio', ta);
      expect(settingsElement.getAttribute('timer-audio')).toBe(ta);
      expect(settingsElement.timerAudio).toBe(ta);
    });
  });

  test("if input invalid, set attribute doesn't change attribute and property", () => {
    const invalidValues = ['as', null, undefined, NaN, {}, -10, true, false];

    invalidValues.forEach((value) => {
      settingsElement.setAttribute('short-break-length', value);
      expect(settingsElement.getAttribute('short-break-length')).toBe(
        `${DEFAULT_SHORT_BREAK_LENGTH}`,
      );
      expect(settingsElement.shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);

      settingsElement.setAttribute('long-break-length', value);
      expect(settingsElement.getAttribute('long-break-length')).toBe(
        `${DEFAULT_LONG_BREAK_LENGTH}`,
      );
      expect(settingsElement.longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);

      settingsElement.setAttribute('timer-audio', value);
      expect(settingsElement.getAttribute('timer-audio')).toBe(
        DEFAULT_TIMER_AUDIO,
      );
      expect(settingsElement.timerAudio).toBe(DEFAULT_TIMER_AUDIO);
    });
  });

  test('getter functions', () => {
    expect(settingsElement.shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(settingsElement.longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);
    expect(settingsElement.timerAudio).toBe(DEFAULT_TIMER_AUDIO);
  });

  test('if input valid, setter function changes attribute and property', () => {
    const values = [
      [4, 20, TIMER_AUDIOS.annoying],
      [3, 29, TIMER_AUDIOS.kanye],
      [5, 17, TIMER_AUDIOS.calm],
    ];

    values.forEach(([sbl, lbl, ta]) => {
      settingsElement.shortBreakLength = sbl;
      expect(settingsElement.getAttribute('short-break-length')).toBe(`${sbl}`);
      expect(settingsElement.shortBreakLength).toBe(sbl);

      settingsElement.longBreakLength = lbl;
      expect(settingsElement.getAttribute('long-break-length')).toBe(`${lbl}`);
      expect(settingsElement.longBreakLength).toBe(lbl);

      settingsElement.timerAudio = ta;
      expect(settingsElement.getAttribute('timer-audio')).toBe(ta);
      expect(settingsElement.timerAudio).toBe(ta);
    });
  });

  test("if input invalid, setter function doesn't change attribute and property", () => {
    const invalidValues = ['as', null, undefined, NaN, {}, -10, true, false];

    invalidValues.forEach((value) => {
      settingsElement.shortBreakLength = value;
      expect(settingsElement.getAttribute('short-break-length')).toBe(
        `${DEFAULT_SHORT_BREAK_LENGTH}`,
      );
      expect(settingsElement.shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);

      settingsElement.longBreakLength = value;
      expect(settingsElement.getAttribute('long-break-length')).toBe(
        `${DEFAULT_LONG_BREAK_LENGTH}`,
      );
      expect(settingsElement.longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);

      settingsElement.timerAudio = value;
      expect(settingsElement.getAttribute('timer-audio')).toBe(
        DEFAULT_TIMER_AUDIO,
      );
      expect(settingsElement.timerAudio).toBe(DEFAULT_TIMER_AUDIO);
    });
  });

  test('initial values are correct', () => {
    expect(settingsElement.shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(settingsElement.longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);
    expect(settingsElement.timerAudio).toBe(DEFAULT_TIMER_AUDIO);
  });

  test('valid input changes are reflected', () => {
    settingsElement.shortBreakLength = 4;
    settingsElement.longBreakLength = 17;
    settingsElement.timerAudio = TIMER_AUDIOS.kanye;

    expect(settingsElement.shortBreakLength).toBe(4);
    expect(settingsElement.longBreakLength).toBe(17);
    expect(settingsElement.timerAudio).toBe(TIMER_AUDIOS.kanye);
  });

  test('invalid input changes are ignored', () => {
    settingsElement.shortBreakLength = 1;
    settingsElement.longBreakLength = 10;
    settingsElement.timerAudio = 'invalid/path';

    expect(settingsElement.shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(settingsElement.longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);
    expect(settingsElement.timerAudio).toBe(DEFAULT_TIMER_AUDIO);

    settingsElement.shortBreakLength = 100;
    settingsElement.longBreakLength = -4;
    settingsElement.timerAudio = 'invalid/path';

    expect(settingsElement.shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(settingsElement.longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);
    expect(settingsElement.timerAudio).toBe(DEFAULT_TIMER_AUDIO);
  });
});

describe('testing initializeIntervalLengths', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('default lengths are set correctly', () => {
    const { shortBreakLength, longBreakLength } = initializeIntervalLengths();

    expect(shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);
  });

  test('saved lengths are retrieved correctly', () => {
    window.localStorage.setItem(KEYS.shortBreakLength, 3);
    window.localStorage.setItem(KEYS.longBreakLength, 30);

    const { shortBreakLength, longBreakLength } = initializeIntervalLengths();
    expect(shortBreakLength).toBe(3);
    expect(longBreakLength).toBe(30);
  });

  test('if invalid lengths are saved, correctly fallback to defaults', () => {
    window.localStorage.setItem(KEYS.shortBreakLength, 10);
    window.localStorage.setItem(KEYS.longBreakLength, 35);

    let { shortBreakLength, longBreakLength } = initializeIntervalLengths();
    expect(shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);

    window.localStorage.setItem(KEYS.shortBreakLength, '$@#$');
    window.localStorage.setItem(KEYS.longBreakLength, true);

    ({ shortBreakLength, longBreakLength } = initializeIntervalLengths());
    expect(shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);
  });
});

describe('testing get functions from script file', () => {
  let settingsPopupElement;
  beforeEach(() => {
    settingsPopupElement = createElement('settings-component');
    initializePopup(settingsPopupElement);
  });

  test('shortBreakLength is retrieved correctly', () => {
    settingsPopupElement.shortBreakLength = 3;
    expect(getShortBreakLength()).toBe(3);

    settingsPopupElement.shortBreakLength = 5;
    expect(getShortBreakLength()).toBe(5);
  });

  test('longBreakLength is retrieved correctly', () => {
    settingsPopupElement.longBreakLength = 15;
    expect(getLongBreakLength()).toBe(15);

    settingsPopupElement.longBreakLength = 20;
    expect(getLongBreakLength()).toBe(20);
  });

  test('timerAudio is retrieved correctly', () => {
    settingsPopupElement.timerAudio = TIMER_AUDIOS.calm;
    expect(getTimerAudio()).toBe(TIMER_AUDIOS.calm);

    settingsPopupElement.timerAudio = TIMER_AUDIOS.kanye;
    expect(getTimerAudio()).toBe(TIMER_AUDIOS.kanye);
  });
});

describe('testing set functions from script file', () => {
  let settingsPopupElement;
  beforeEach(() => {
    settingsPopupElement = createElement('settings-component');
    initializePopup(settingsPopupElement);
  });

  test('shortBreakLength is set correctly', () => {
    setShortBreakLength(3);
    expect(settingsPopupElement.shortBreakLength).toBe(3);

    setShortBreakLength(5);
    expect(settingsPopupElement.shortBreakLength).toBe(5);

    setShortBreakLength(7);
    expect(settingsPopupElement.shortBreakLength).toBe(5);
  });

  test('longBreakLength is set correctly', () => {
    setLongBreakLength(15);
    expect(settingsPopupElement.longBreakLength).toBe(15);

    setLongBreakLength(20);
    expect(settingsPopupElement.longBreakLength).toBe(20);

    setLongBreakLength(35);
    expect(settingsPopupElement.longBreakLength).toBe(20);
  });

  test('timerAudio is set correctly', () => {
    setTimerAudio(TIMER_AUDIOS.kanye);
    expect(settingsPopupElement.timerAudio).toBe(TIMER_AUDIOS.kanye);

    setTimerAudio(TIMER_AUDIOS.annoying);
    expect(settingsPopupElement.timerAudio).toBe(TIMER_AUDIOS.annoying);

    setTimerAudio('wrong/path');
    expect(settingsPopupElement.timerAudio).toBe(TIMER_AUDIOS.annoying);
  });
});

describe('testing popup actions', () => {
  let settingsPopupElement;
  let popupElement;
  let shortBreakInputElement;
  let longBreakInputElement;
  let timerAudioInputElement;
  let saveButton;
  let overlayElement;
  const saveSettingsSpy = jest.spyOn(popupFunctions, 'saveSettings');
  const closePopupSpy = jest.spyOn(popupFunctions, 'closePopup');
  beforeEach(() => {
    window.localStorage.clear();
    settingsPopupElement = createElement('settings-component');
    initializePopup(settingsPopupElement);
    const { shadowRoot } = settingsPopupElement;
    popupElement = shadowRoot.querySelector('.popup-container');
    shortBreakInputElement = shadowRoot.querySelector('#short-break-input');
    longBreakInputElement = shadowRoot.querySelector('#long-break-input');
    timerAudioInputElement = shadowRoot.querySelector('#timer-audio-input');
    saveButton = shadowRoot.querySelector('.save-button');
    overlayElement = shadowRoot.querySelector('#overlay');
  });

  test('popup opens correctly with default settings', () => {
    openPopup();
    expect(popupElement.classList.contains('active')).toBe(true);
    expect(overlayElement.classList.contains('active')).toBe(true);
    expect(shortBreakInputElement.value).toBe(
      String(DEFAULT_SHORT_BREAK_LENGTH),
    );
    expect(longBreakInputElement.value).toBe(String(DEFAULT_LONG_BREAK_LENGTH));
    expect(timerAudioInputElement.value).toBe(DEFAULT_TIMER_AUDIO);
  });

  test('popup opens correctly with modified settings', () => {
    settingsPopupElement.shortBreakLength = 3;
    settingsPopupElement.longBreakLength = 20;
    settingsPopupElement.timerAudio = TIMER_AUDIOS.kanye;

    openPopup();
    expect(popupElement.classList.contains('active')).toBe(true);
    expect(overlayElement.classList.contains('active')).toBe(true);
    expect(shortBreakInputElement.value).toBe('3');
    expect(longBreakInputElement.value).toBe('20');
    expect(timerAudioInputElement.value).toBe(TIMER_AUDIOS.kanye);
  });

  test('popup closes correctly', () => {
    closePopup();
    expect(popupElement.classList.contains('active')).toBe(false);
    expect(overlayElement.classList.contains('active')).toBe(false);
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  test('changing audio plays sound', () => {
    timerAudioInputElement.dispatchEvent(new Event('change'));
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  test('save button saves and closes when no errors are present', () => {
    openPopup();
    saveButton.click();

    expect(saveSettingsSpy).toHaveBeenCalled();
    expect(saveSettingsSpy.mock.results[0]).toEqual({
      type: 'return',
      value: [DEFAULT_SHORT_BREAK_LENGTH, DEFAULT_LONG_BREAK_LENGTH],
    });
    expect(closePopupSpy).toHaveBeenCalled();
  });

  test("save button doesn't close when errors are present", () => {
    const nullSaveSettingsSpy = jest
      .spyOn(popupFunctions, 'saveSettings')
      .mockImplementation(() => null);
    openPopup();
    saveButton.click();

    expect(nullSaveSettingsSpy).toHaveBeenCalled();
    expect(nullSaveSettingsSpy.mock.results[0]).toEqual({
      type: 'return',
      value: null,
    });
    expect(closePopupSpy).not.toHaveBeenCalled();
  });
});

describe('testing save actions', () => {
  let settingsPopupElement;
  let shortBreakInputElement;
  let longBreakInputElement;
  let timerAudioInputElement;
  let errorMessageElements;
  beforeEach(() => {
    window.localStorage.clear();
    initializeIntervalLengths();
    settingsPopupElement = createElement('settings-component');
    initializePopup(settingsPopupElement);
    const { shadowRoot } = settingsPopupElement;
    shortBreakInputElement = shadowRoot.querySelector('#short-break-input');
    longBreakInputElement = shadowRoot.querySelector('#long-break-input');
    timerAudioInputElement = shadowRoot.querySelector('#timer-audio-input');
    errorMessageElements = shadowRoot.querySelectorAll('.error-message');
  });

  test('valid inputs are saved correctly', () => {
    shortBreakInputElement.value = 4;
    longBreakInputElement.value = 17;
    timerAudioInputElement.value = TIMER_AUDIOS.annoying;
    saveSettings();

    expect(settingsPopupElement.shortBreakLength).toBe(4);
    expect(settingsPopupElement.longBreakLength).toBe(17);
    expect(settingsPopupElement.timerAudio).toBe(TIMER_AUDIOS.annoying);
    expect(window.localStorage.getItem(KEYS.shortBreakLength)).toBe('4');
    expect(window.localStorage.getItem(KEYS.longBreakLength)).toBe('17');
    expect(window.localStorage.getItem(KEYS.timerAudio)).toBe(
      TIMER_AUDIOS.annoying,
    );
  });

  test('invalid inputs are not saved', () => {
    shortBreakInputElement.value = 10;
    longBreakInputElement.value = 34;
    timerAudioInputElement.value = 'wrong/path';
    saveSettings();

    expect(settingsPopupElement.shortBreakLength).toBe(
      DEFAULT_SHORT_BREAK_LENGTH,
    );
    expect(settingsPopupElement.longBreakLength).toBe(
      DEFAULT_LONG_BREAK_LENGTH,
    );
    expect(settingsPopupElement.timerAudio).toBe(DEFAULT_TIMER_AUDIO);
    expect(window.localStorage.getItem(KEYS.shortBreakLength)).toBe(
      String(DEFAULT_SHORT_BREAK_LENGTH),
    );
    expect(window.localStorage.getItem(KEYS.longBreakLength)).toBe(
      String(DEFAULT_LONG_BREAK_LENGTH),
    );
    expect(window.localStorage.getItem(KEYS.timerAudio)).toBe(
      DEFAULT_TIMER_AUDIO,
    );
  });

  test('invalid inputs trigger error messages', () => {
    shortBreakInputElement.value = 10;
    longBreakInputElement.value = 34;
    saveSettings();
    Array.from(errorMessageElements).forEach((el) =>
      expect(el.style.display).toBe('initial'),
    );

    shortBreakInputElement.value = 10;
    longBreakInputElement.value = 29;
    saveSettings();
    errorMessageElements[0].style.display = 'none';
    errorMessageElements[1].style.display = 'initial';

    shortBreakInputElement.value = 5;
    longBreakInputElement.value = 10;
    saveSettings();
    errorMessageElements[0].style.display = 'none';
    errorMessageElements[1].style.display = 'initial';
  });
});
