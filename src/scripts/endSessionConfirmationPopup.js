/**
 * @file Manage Confirmation Pop-up for page
 */

let confirmationPopup;
let noButton;
let yesButton;

/**
 * Initialize element variables for different elements of confirmation popup
 * @param {HTMLElement} root - confirmation popup
 * @param {() => void} onAcceptCallback - callback when confirmation is accepted
 */
const setRoot = (root) => {
  confirmationPopup = root;
  noButton = confirmationPopup.querySelector('.confirmation-no-button');
  yesButton = confirmationPopup.querySelector('.confirmation-yes-button');
};

/**
 * Open the confirmation popup
 */
const openConfirmationPopup = () => {
  confirmationPopup.classList.add('active');
};

/**
 * Close the confirmation popup
 */
const closeConfirmationPopup = () => {
  confirmationPopup.classList.remove('active');
};

/**
 * Set the initial confirmation element
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
};

export {
  initializeConfirmation,
  openConfirmationPopup,
  closeConfirmationPopup,
};
