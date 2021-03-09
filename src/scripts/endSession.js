// HTML Elements needed including the popups and elements within the popups
const openPopups = document.querySelectorAll('[data-popup-target]');
const closePopups = document.querySelectorAll('[data-save-button]');
const overlay = document.getElementById('overlay');

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
  popup.classList.remove('active');
  overlay.classList.remove('active');
  if (popup.id === 'end') {
    openPopup(popup);
  }
}

// Adds an event listener for each popup button
openPopups.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = document.querySelector(button.dataset.popupTarget);
    openPopup(popup);
  });
});

// Adds an event listener to all buttons that close popups (Save button)
closePopups.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});
