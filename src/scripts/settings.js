/**
 * @file Manage tasklist for page
 */

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
  window.localStorage.setItem('timerAudio', timerAudio);
};

/**
 * Open settings popup
 */
const openPopup = () => {
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
  const newShortBreakLength = shortBreakInput.value;
  const newLongBreakLength = longBreakInput.value;
  const isNewShortBreakLengthValid =
    validateShortBreakLength(newShortBreakLength) === null;
  const isNewLongBreakLengthValid =
    validateLongBreakLength(newLongBreakLength) === null;

  errorMessages[0].style.visibility = isNewShortBreakLengthValid
    ? 'hidden'
    : 'visible';
  errorMessages[1].style.visibility = isNewLongBreakLengthValid
    ? 'hidden'
    : 'visible';
  if (!isNewShortBreakLengthValid || !isNewLongBreakLengthValid) {
    return null;
  }

  setTimerAudio(soundInput.value);
  setShortBreakLength(newShortBreakLength);
  setLongBreakLength(newLongBreakLength);
  localStorage.setItem('shortBreakLength', newShortBreakLength);
  localStorage.setItem('longBreakLength', newLongBreakLength);
  return [newShortBreakLength, newLongBreakLength];
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
  soundInput = shadowRoot.querySelector('#sound');
  errorMessages = shadowRoot.querySelectorAll('.error');
};

/**
 * Set the initial settings element
 * @param {HTMLElement} root - settings element
 * @param {Function} saveSettingsCallback - callback for when settings are saved
 */
const initializePopup = (root, saveSettingsCallback) => {
  const { shortBreakLength, longBreakLength } = initializeIntervalLengths();
  initializeElements(root);
  setShortBreakLength(shortBreakLength);
  setLongBreakLength(longBreakLength);
  const savedTimerAudio = window.localStorage.getItem('timerAudio');
  setTimerAudio(
    validateTimerAudio(savedTimerAudio) === null
      ? 'assets/calm-alarm.mp3'
      : savedTimerAudio,
  );

  overlay.onclick = closePopup;

  saveButton.addEventListener('click', () => {
    const newBreakLengths = saveSettings();
    if (!newBreakLengths) {
      return;
    }
    closePopup();
    saveSettingsCallback(...newBreakLengths);
  });

  soundInput.onchange = () => {
    timerAudioElement.pause();
    timerAudioElement.src = soundInput.value;
    timerAudioElement.play();
  };
};

export {
  initializePopup,
  openPopup,
  closePopup,
  getShortBreakLength,
  getLongBreakLength,
  getTimerAudio,
  setShortBreakLength,
  setLongBreakLength,
  setTimerAudio,
};
