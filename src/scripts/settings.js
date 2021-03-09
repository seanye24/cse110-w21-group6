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

let settingsButton;
let popupEl;
let saveButton;
let overlay;
let shortBreakInput;
let longBreakInput;
let soundInput;
let errorMessages;

/**
 * @description Access all the shadow root elements and set the settings element
 * @param {HTMLElement} root - the settings element
 */
const setRoot = (root) => {
  settingsElement = root;
  settingsButton = document.getElementById('open-popup');
  popupEl = settingsElement.shadowRoot.querySelector('.popup');
  saveButton = settingsElement.shadowRoot.querySelector('.save-button');
  overlay = settingsElement.shadowRoot.querySelector('#overlay');
  shortBreakInput = settingsElement.shadowRoot.querySelector('#short-number');
  longBreakInput = settingsElement.shadowRoot.querySelector('#long-number');
  soundInput = settingsElement.shadowRoot.querySelector('#sound');
  errorMessages = settingsElement.shadowRoot.querySelectorAll('.error');
};

/**
 * Get short break length
 * @return {number} - short break length
 */
const getShortBreak = () => settingsElement.getAttribute('shortBreakLength');

/**
 * Get long break length
 * @return {number} - long break length
 */
const getLongBreak = () => settingsElement.getAttribute('longBreakLength');

/**
 * Get pathway to sound file
 * @return {string} - pathway to current sound
 */
const getTimerSound = () => settingsElement.getAttribute('timerSound');

/**
 * Set short break length
 * @param {number} input - length to set the short break length
 */
const setShort = (input) => {
  settingsElement.setAttribute('shortBreakLength', input);
};

/**
 * Set long break length
 * @param {number} input - length to set the long break length
 */
const setLong = (input) => {
  settingsElement.setAttribute('longBreakLength', input);
};

/**
 * Set pathway to sound file
 * @param {number} input - pathway to sound
 */
const setTimerSound = (input) => {
  settingsElement.setAttribute('timerSound', input);
};

/**
 * @function openPopup
 * @description Open the popup with the correct saved settings
 */
function openPopup() {
  if (popupEl == null) {
    return;
  }
  popupEl.classList.add('active');
  overlay.classList.add('active');
  shortBreakInput.value = getShortBreak() / 60;
  longBreakInput.value = getLongBreak() / 60;
  soundInput.value = getTimerSound();
}

/**
 * @function saveAndClose
 * @description Close the popup while saving any changes into the
 * local storage and show error messages when needed
 */
function saveAndClose() {
  if (popupEl == null) {
    return;
  }
  if (!checkIfShortInputValid(shortBreakInput.value)) {
    errorMessages[0].style.visibility = 'visible';
  } else {
    errorMessages[0].style.visibility = 'hidden';
  }
  if (!checkIfLongInputValid(longBreakInput.value)) {
    errorMessages[1].style.visibility = 'visible';
  } else {
    errorMessages[1].style.visibility = 'hidden';
  }
  if (
    checkIfShortInputValid(shortBreakInput.value) &&
    checkIfLongInputValid(longBreakInput.value)
  ) {
    errorMessages.forEach((message) => {
      message.style.visibility = 'hidden';
    });
    const newShort = shortBreakInput.value * 60;
    const newLong = longBreakInput.value * 60;
    setShort(newShort);
    setLong(newLong);
    setTimerSound(soundInput.value);
    localStorage.setItem('shortBreakLength', newShort);
    localStorage.setItem('longBreakLength', newLong);
    localStorage.setItem('timerSound', soundInput.value);
    popupEl.classList.remove('active');
    overlay.classList.remove('active');
  }
}

/**
 * Set the initial settings element
 * @param {HTMLElement} element - settings element
 */
const initializeSettings = (element) => {
  setRoot(element);
  saveButton.addEventListener('click', () => {
    saveAndClose();
  });
  settingsButton.addEventListener('click', () => {
    openPopup();
  });
  soundInput.addEventListener('change', () => {
    const audio = new Audio(soundInput.value);
    audio.play();
  });
  const {
    pomodoroLength,
    shortBreakLength,
    longBreakLength,
  } = initializeIntervalLengths();
  settingsElement.setAttribute('shortBreakLength', shortBreakLength);
  settingsElement.setAttribute('longBreakLength', longBreakLength);
  settingsElement.setAttribute('timerSound', soundInput.value);
};

export {
  initializeSettings,
  getShortBreak,
  getLongBreak,
  getTimerSound,
  setShort,
  setLong,
  setTimerSound,
  openPopup,
  saveAndClose,
};
