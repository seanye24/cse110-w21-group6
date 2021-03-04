/**
 * @file Manage tasklist for page
 * @author Dillan Merchant
 */

// HTML Elements needed including the popups and elements within the popups
const openPopups = document.querySelectorAll('[data-popup-target]');
const closePopups = document.querySelectorAll('[data-save-button]');
const overlay = document.getElementById('overlay');
const shortBreakInput = document.getElementById('short-number');
const longBreakInput = document.getElementById('long-number');

/**
 * @function openPopup
 * @description Open the popup with the correct saved settings
 * @param {HTMLElement} popup - popup element
 */
function openPopup(popup) {
  if (popup == null) {
    return;
  }
  popup.classList.add('active');
  overlay.classList.add('active');
  shortBreakInput.value = JSON.parse(localStorage.getItem('shortbreak'));
  longBreakInput.value = JSON.parse(localStorage.getItem('longbreak'));
}

/**
 * @function closePopup
 * @description Close the popup while saving any changes into the local storage
 * @param {HTMLElement} popup - popup element
 */
function closePopup(popup) {
  if (popup == null) {
    return;
  }
  if (Number(shortBreakInput.value) < 3 || Number(shortBreakInput.value) > 5) {
    alert('Please enter valid short break entry (3 min - 5 min)');
    shortBreakInput.value = 5;
  } else if (
    Number(longBreakInput.value) < 15 ||
    Number(longBreakInput.value) > 30
  ) {
    alert('Please enter valid long break entry (15 min - 30 min)');
    longBreakInput.value = 30;
  } else {
    localStorage.setItem('shortbreak', shortBreakInput.value);
    localStorage.setItem('longbreak', longBreakInput.value);
    popup.classList.remove('active');
    overlay.classList.remove('active');
  }
}

/**
 * @function getShortBreakLength
 * @description Gets the current value of the short break
 * @return {number} - current short break value
 */
function getShortBreakLength() {
  return JSON.parse(localStorage.getItem('shortbreak'));
}

/**
 * @function getLongBreakLength
 * @description Gets the current value of the long break
 * @return {number} - current long break value
 */
function getLongBreakLength() {
  return JSON.parse(localStorage.getItem('longbreak'));
}

// Adds an event listener for each popup button
openPopups.forEach((li) => {
  li.addEventListener('click', function () {
    const popup = document.querySelector(li.dataset.popupTarget);
    openPopup(popup);
  });
});

// Adds an event listener to all buttons that close popups (Save button)
closePopups.forEach((button) => {
  button.addEventListener('click', function () {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

/**
 * @function initializeBreakLengths
 * @description If the local storage does not have a saved short or long break
 * length, set it to default
 */
function initializeBreakLengths() {
  if (
    localStorage.getItem('shortbreak') == null ||
    localStorage.getItem('longbreak') == null
  ) {
    localStorage.setItem('shortbreak', JSON.stringify(5));
    localStorage.setItem('longbreak', JSON.stringify(30));
  }
}

export {
  initializeBreakLengths,
  getShortBreakLength,
  getLongBreakLength,
  openPopup,
  closePopup,
};
