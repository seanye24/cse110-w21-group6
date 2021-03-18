/**
 * @file Manage tasklist for page
 */

import { dispatch } from '../models';
import { ACTIONS, KEYS, TIMER_AUDIOS } from '../utils/constants';
import {
  validateShortBreakLength,
  validateLongBreakLength,
  validateTimerAudio,
  initializeIntervalLengths,
} from '../utils/settings';

let settingsElement;
let popupElement;
let saveButton;
let overlay;
let shortBreakInput;
let longBreakInput;
let timerAudioInput;
let errorMessages;
const timerAudioElement = new Audio();
timerAudioElement.volume = 0.2;

/**
 * Get short break length
 * @return {number} - short break length
 */
const getShortBreakLength = () => settingsElement.shortBreakLength;

/**
 * Get long break length
 * @return {number} - long break length
 */
const getLongBreakLength = () => settingsElement.longBreakLength;

/**
 * Get pathway to sound file
 * @return {string} - audio url
 */
const getTimerAudio = () => settingsElement.timerAudio;

/**
 * Set short break length
 * @param {number} value - new short break length
 */
const setShortBreakLength = (value) => {
  const shortBreakLength = validateShortBreakLength(value);
  if (shortBreakLength === null) {
    return;
  }

  settingsElement.shortBreakLength = shortBreakLength;
};

/**
 * Set long break length
 * @param {number} longBreakLength - new long break length
 */
const setLongBreakLength = (value) => {
  const longBreakLength = validateLongBreakLength(value);
  if (longBreakLength === null) {
    return;
  }

  settingsElement.longBreakLength = longBreakLength;
};

/**
 * Set url of audio
 * @param {number} input - pathway to sound
 */
const setTimerAudio = (value) => {
  const timerAudio = validateTimerAudio(value);
  if (timerAudio === null) {
    return;
  }

  settingsElement.timerAudio = timerAudio;
};

/**
 * Open settings popup
 */
const openPopup = () => {
  // enable audio element, ignore if interrupted
  timerAudioElement.src = '';
  timerAudioElement.play().catch(() => true);

  popupElement.classList.add('active');
  overlay.classList.add('active');

  shortBreakInput.value = getShortBreakLength();
  longBreakInput.value = getLongBreakLength();
  timerAudioInput.value = getTimerAudio();
};

/**
 * Close settings popup
 */
const closePopup = () => {
  timerAudioElement.pause();
  popupElement.classList.remove('active');
  overlay.classList.remove('active');
  errorMessages.forEach((msg) => {
    msg.style.display = 'none';
  });
};

/**
 * Save interval length / audio settings, display error if invalid
 * @return {(number[] | null)} - new interval lengths, null if error occurs
 */
const saveSettings = () => {
  const newShortBreakLength = validateShortBreakLength(shortBreakInput.value);
  const newLongBreakLength = validateLongBreakLength(longBreakInput.value);
  const timerAudio = validateTimerAudio(timerAudioInput.value);
  const isNewShortBreakLengthValid = newShortBreakLength !== null;
  const isNewLongBreakLengthValid = newLongBreakLength !== null;

  errorMessages[0].style.display = isNewShortBreakLengthValid
    ? 'none'
    : 'initial';
  errorMessages[1].style.display = isNewLongBreakLengthValid
    ? 'none'
    : 'initial';
  if (!isNewShortBreakLengthValid || !isNewLongBreakLengthValid) {
    return null;
  }

  setShortBreakLength(newShortBreakLength);
  setLongBreakLength(newLongBreakLength);
  setTimerAudio(timerAudio);
  dispatch(ACTIONS.changeShortBreakLength, newShortBreakLength);
  dispatch(ACTIONS.changeLongBreakLength, newLongBreakLength);
  dispatch(ACTIONS.changeTimerAudio, timerAudio);
  window.localStorage.setItem(KEYS.shortBreakLength, newShortBreakLength);
  window.localStorage.setItem(KEYS.longBreakLength, newLongBreakLength);
  window.localStorage.setItem(KEYS.timerAudio, timerAudio);
  return [newShortBreakLength, newLongBreakLength];
};

// object to hold function references
// mainly for mocking in jest
const popupFunctions = {
  openPopup,
  closePopup,
  saveSettings,
};

/**
 * Initialize element variables for different elements of settings component
 * @param {HTMLElement} root - root element of settings component
 */
const initializeElements = (root) => {
  settingsElement = root;
  const { shadowRoot } = settingsElement;
  popupElement = shadowRoot.querySelector('.popup-container');
  shortBreakInput = shadowRoot.querySelector('#short-break-input');
  longBreakInput = shadowRoot.querySelector('#long-break-input');
  timerAudioInput = shadowRoot.querySelector('#timer-audio-input');
  errorMessages = shadowRoot.querySelectorAll('.error-message');
  saveButton = shadowRoot.querySelector('.save-button');
  overlay = shadowRoot.querySelector('#overlay');
};

/**
 * Set the initial settings element
 * @param {HTMLElement} root - settings element
 */
const initializePopup = (root) => {
  const { shortBreakLength, longBreakLength } = initializeIntervalLengths();
  initializeElements(root);
  setShortBreakLength(shortBreakLength);
  setLongBreakLength(longBreakLength);
  dispatch(ACTIONS.changeShortBreakLength, shortBreakLength);
  dispatch(ACTIONS.changeLongBreakLength, longBreakLength);

  const savedTimerAudio = window.localStorage.getItem(KEYS.timerAudio);
  if (validateTimerAudio(savedTimerAudio) === null) {
    setTimerAudio(TIMER_AUDIOS.calm);
    window.localStorage.setItem(KEYS.timerAudio, TIMER_AUDIOS.calm);
    dispatch(ACTIONS.changeTimerAudio, TIMER_AUDIOS.calm);
  } else {
    setTimerAudio(savedTimerAudio);
    dispatch(ACTIONS.changeTimerAudio, savedTimerAudio);
  }

  overlay.onclick = closePopup;

  saveButton.addEventListener('click', () => {
    const newBreakLengths = popupFunctions.saveSettings();
    if (!newBreakLengths) {
      return;
    }
    popupFunctions.closePopup();
    dispatch(ACTIONS.changeShortBreakLength, newBreakLengths[0]);
    dispatch(ACTIONS.changeLongBreakLength, newBreakLengths[1]);
  });

  timerAudioInput.onchange = () => {
    timerAudioElement.pause();
    timerAudioElement.src = timerAudioInput.value;
    timerAudioElement.play().catch(() => true); // ignore if interrupted
  };
};

export {
  initializePopup,
  openPopup,
  closePopup,
  saveSettings,
  popupFunctions,
  getShortBreakLength,
  getLongBreakLength,
  getTimerAudio,
  setShortBreakLength,
  setLongBreakLength,
  setTimerAudio,
};
