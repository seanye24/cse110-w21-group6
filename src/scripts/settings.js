/**
 * @file Manage tasklist for page
 * @author Dillan Merchant
 */

import {
  initializeIntervalLengths,
  checkIfShortInputValid,
  checkIfLongInputValid,
  checkIfTimerAudioValid,
} from '../utils/utils';

let settingsElement;
let popupEl;
let saveButton;
let overlay;
let shortBreakInput;
let longBreakInput;
let soundInput;
let errorMessages;
const timerAudio = new Audio();
timerAudio.volume = 0.2;

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
const getTimerAudio = () => settingsElement.timerSound;

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
  window.localStorage.setItem('timerAudio', input);
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
  timerAudio.pause();
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
 * @param {() => void} saveSettingsCallback - callback for when settings are saved
 */
const initializePopup = (root, saveSettingsCallback) => {
  const { shortBreakLength, longBreakLength } = initializeIntervalLengths();
  initializeElements(root);
  setShortBreakLength(shortBreakLength);
  setLongBreakLength(longBreakLength);
  const savedAudio = window.localStorage.getItem('timerAudio');
  setTimerAudio(
    checkIfTimerAudioValid(savedAudio) ? savedAudio : 'assets/calm-alarm.mp3',
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
    timerAudio.pause();
    timerAudio.src = soundInput.value;
    timerAudio.play();
  };
};

export {
  initializePopup,
  openPopup,
  closePopup,
  getShortBreakLength,
  getLongBreakLength,
  getTimerAudio,
};
