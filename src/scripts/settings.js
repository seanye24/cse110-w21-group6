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
let popupEl;
let saveButton;
let overlay;
let shortBreakInput;
let longBreakInput;
let timerAudioInput;
let soundInput;
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

  popupEl.classList.add('active');
  overlay.classList.add('active');

  shortBreakInput.value = getShortBreakLength();
  longBreakInput.value = getLongBreakLength();
  soundInput.value = getTimerAudio();
};

/**
 * Close settings popup
 */
const closePopup = () => {
  timerAudioElement.pause();
  popupEl.classList.remove('active');
  overlay.classList.remove('active');
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

  errorMessages[0].style.visibility = isNewShortBreakLengthValid
    ? 'hidden'
    : 'visible';
  errorMessages[1].style.visibility = isNewLongBreakLengthValid
    ? 'hidden'
    : 'visible';
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
  popupEl = shadowRoot.querySelector('.popup');
  saveButton = shadowRoot.querySelector('.save-button');
  overlay = shadowRoot.querySelector('#overlay');
  shortBreakInput = shadowRoot.querySelector('#short-number');
  longBreakInput = shadowRoot.querySelector('#long-number');
  timerAudioInput = shadowRoot.querySelector('#sound');
  soundInput = shadowRoot.querySelector('#sound');
  errorMessages = shadowRoot.querySelectorAll('.error');
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

  soundInput.onchange = () => {
    timerAudioElement.pause();
    timerAudioElement.src = soundInput.value;
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
