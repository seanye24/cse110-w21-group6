/**
 * @file Manage tasklist for page
 * @author Dillan Merchant
 */

import {
  initializeIntervalLengths,
  checkIfShortInputValid,
  checkIfLongInputValid,
} from '../utils/utils';

let settingsElement;
let popupEl;
let saveButton;
let overlay;
let shortBreakInput;
let longBreakInput;
let soundInput;
let errorMessages;

/**
 * Initialize element variables for different elements of settings component
 * @param {HTMLElement} root - root element of settings component
 */
const setRoot = (root) => {
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
const getTimerAudio = () => settingsElement.getAttribute('timerSound');

/**
 * Set short break length
 * @param {number} shortBreakLength - new short break length
 */
const setShortBreakLength = (shortBreakLength) => {
  settingsElement.shortBreakLength = shortBreakLength;
};

/**
 * Set long break length
 * @param {number} longBreakLength - new long break length
 */
const setLongBreakLength = (longBreakLength) => {
  settingsElement.longBreakLength = longBreakLength;
};

/**
 * Set url of audio
 * @param {number} input - pathway to sound
 */
const setTimerAudio = (input) => {
  settingsElement.timerSound = input;
};

/**
 * Open settings popup
 */
const openSettingsPopup = () => {
  popupEl.classList.add('active');
  overlay.classList.add('active');

  shortBreakInput.value = getShortBreakLength();
  longBreakInput.value = getLongBreakLength();
  soundInput.value = getTimerAudio();
};

/**
 * Close settings popup
 */
const closeSettingsPopup = () => {
  popupEl.classList.remove('active');
  overlay.classList.remove('active');
};

/**
 * Save interval length / audio settings, display error if invalid
 * @return {[number, number] | null} - new interval lengths, null if error occurs
 */
const saveSettings = () => {
  const newShortBreakLength = shortBreakInput.value;
  const newLongBreakLength = longBreakInput.value;
  const isShortInputValid = checkIfShortInputValid(newShortBreakLength);
  const isLongInputValid = checkIfLongInputValid(newLongBreakLength);

  errorMessages[0].style.visibility = isShortInputValid ? 'hidden' : 'visible';
  errorMessages[1].style.visibility = isLongInputValid ? 'hidden' : 'visible';
  if (!isShortInputValid || !isLongInputValid) {
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
 * Set the initial settings element
 * @param {HTMLElement} element - settings element
 * @param {() => void} saveSettingsCallback - callback for when settings are saved
 */
const initializeSettings = (element, saveSettingsCallback) => {
  const { shortBreakLength, longBreakLength } = initializeIntervalLengths();
  setRoot(element);
  setShortBreakLength(shortBreakLength);
  setLongBreakLength(longBreakLength);
  setTimerAudio('assets/calm-alarm.mp3'); // TODO: pull from localstorage

  saveButton.addEventListener('click', () => {
    const newBreakLengths = saveSettings();
    if (!newBreakLengths) {
      return;
    }
    closeSettingsPopup();
    saveSettingsCallback(...newBreakLengths);
  });

  soundInput.onchange = () => {
    const audio = new Audio(soundInput.value);
    audio.volume = 0.2;
    audio.play();
  };
};

export {
  initializeSettings,
  getShortBreakLength,
  getLongBreakLength,
  setShortBreakLength,
  setLongBreakLength,
  openSettingsPopup,
  closeSettingsPopup,
  getTimerAudio,
  setTimerAudio,
};
