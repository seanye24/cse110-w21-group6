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
  TIMER_AUDIOS,
} from '../utils/constants';
import { initializeIntervalLengths } from '../utils/settings';

// add audio element api (jsdom doens't support video/audio elements right now)
window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.addTextTrack = jest.fn();

customElements.define('settings-component', SettingsPopup);

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
    window.localStorage.setItem('shortBreakLength', 3);
    window.localStorage.setItem('longBreakLength', 30);

    const { shortBreakLength, longBreakLength } = initializeIntervalLengths();
    expect(shortBreakLength).toBe(3);
    expect(longBreakLength).toBe(30);
  });

  test('if invalid lengths are saved, correctly fallback to defaults', () => {
    window.localStorage.setItem('shortBreakLength', 10);
    window.localStorage.setItem('longBreakLength', 35);

    let { shortBreakLength, longBreakLength } = initializeIntervalLengths();
    expect(shortBreakLength).toBe(DEFAULT_SHORT_BREAK_LENGTH);
    expect(longBreakLength).toBe(DEFAULT_LONG_BREAK_LENGTH);

    window.localStorage.setItem('shortBreakLength', '$@#$');
    window.localStorage.setItem('longBreakLength', true);

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
  let overlayElement;
  let shortBreakInputElement;
  let longBreakInputElement;
  let timerAudioInputElement;
  let saveButton;
  const mockSaveSettingsCallback = jest.fn();
  const saveSettingsSpy = jest.spyOn(popupFunctions, 'saveSettings');
  const closePopupSpy = jest.spyOn(popupFunctions, 'closePopup');
  beforeEach(() => {
    window.localStorage.clear();
    settingsPopupElement = createElement('settings-component');
    initializePopup(settingsPopupElement, mockSaveSettingsCallback);
    const { shadowRoot } = settingsPopupElement;
    popupElement = shadowRoot.querySelector('.popup');
    overlayElement = shadowRoot.querySelector('#overlay');
    shortBreakInputElement = shadowRoot.querySelector('#short-number');
    longBreakInputElement = shadowRoot.querySelector('#long-number');
    timerAudioInputElement = shadowRoot.querySelector('#sound');
    saveButton = shadowRoot.querySelector('.save-button');
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
    expect(mockSaveSettingsCallback).toHaveBeenCalled();
    expect(mockSaveSettingsCallback).toHaveBeenCalledWith(
      DEFAULT_SHORT_BREAK_LENGTH,
      DEFAULT_LONG_BREAK_LENGTH,
    );
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
    expect(mockSaveSettingsCallback).not.toHaveBeenCalled();
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
    shortBreakInputElement = shadowRoot.querySelector('#short-number');
    longBreakInputElement = shadowRoot.querySelector('#long-number');
    timerAudioInputElement = shadowRoot.querySelector('#sound');
    errorMessageElements = shadowRoot.querySelectorAll('.error');
  });

  test('valid inputs are saved correctly', () => {
    shortBreakInputElement.value = 4;
    longBreakInputElement.value = 17;
    timerAudioInputElement.value = TIMER_AUDIOS.annoying;
    saveSettings();

    expect(settingsPopupElement.shortBreakLength).toBe(4);
    expect(settingsPopupElement.longBreakLength).toBe(17);
    expect(settingsPopupElement.timerAudio).toBe(TIMER_AUDIOS.annoying);
    expect(window.localStorage.getItem('shortBreakLength')).toBe('4');
    expect(window.localStorage.getItem('longBreakLength')).toBe('17');
    expect(window.localStorage.getItem('timerAudio')).toBe(
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
    expect(window.localStorage.getItem('shortBreakLength')).toBe(
      String(DEFAULT_SHORT_BREAK_LENGTH),
    );
    expect(window.localStorage.getItem('longBreakLength')).toBe(
      String(DEFAULT_LONG_BREAK_LENGTH),
    );
    expect(window.localStorage.getItem('timerAudio')).toBe(DEFAULT_TIMER_AUDIO);
  });

  test('invalid inputs trigger error messages', () => {
    shortBreakInputElement.value = 10;
    longBreakInputElement.value = 34;
    saveSettings();
    Array.from(errorMessageElements).forEach((el) =>
      expect(el.style.visibility).toBe('visible'),
    );

    shortBreakInputElement.value = 10;
    longBreakInputElement.value = 29;
    saveSettings();
    errorMessageElements[0].style.visibility = 'visible';
    errorMessageElements[1].style.visibility = 'hidden';

    shortBreakInputElement.value = 5;
    longBreakInputElement.value = 10;
    saveSettings();
    errorMessageElements[0].style.visibility = 'hidden';
    errorMessageElements[1].style.visibility = 'visible';
  });
});
