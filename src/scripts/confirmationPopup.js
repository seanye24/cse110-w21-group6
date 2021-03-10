/**
 * @file Manage Confirmation Pop-up for page
 */

let confirmationOverlay;
let confirmationPopup;
let noButton;
let yesButton;

/**
 * Open the confirmation popup
 */
const openConfirmationPopup = () => {
  confirmationOverlay.classList.add('active');
};

/**
 * Close the confirmation popup
 */
const closeConfirmationPopup = () => {
  confirmationOverlay.classList.remove('active');
};

/**
 * Initialize element variables for different elements of confirmation popup
 * @param {HTMLElement} root - confirmation popup
 * @param {() => void} onAcceptCallback - callback when confirmation is accepted
 */
const setRoot = (root) => {
  confirmationOverlay = root;
  confirmationPopup = confirmationOverlay.querySelector('#confirmation-popup');
  noButton = confirmationPopup.querySelector('.confirmation-no-button');
  yesButton = confirmationPopup.querySelector('.confirmation-yes-button');
  noButton.onmousedown = (e) => e.preventDefault();
  yesButton.onmousedown = (e) => e.preventDefault();
};

/**
 * Initialize popup
 * @param {HTMLElement} element - confirmation element
 * @param {() => void} onAcceptCallback - callback when confirmation is accepted
 */
const initializeConfirmation = (element, onAcceptCallback) => {
  setRoot(element);
  yesButton.onclick = () => {
    closeConfirmationPopup();
    onAcceptCallback();
  };
  noButton.onclick = closeConfirmationPopup;
  confirmationOverlay.onclick = closeConfirmationPopup;
  confirmationPopup.onclick = (e) => e.stopPropagation();
};

export {
  initializeConfirmation,
  openConfirmationPopup,
  closeConfirmationPopup,
};
