let confirmationElement;

let sessionButton;
let confirmationPopup;
let noButton;
let yesButton;
let overlay;

let onAcceptFunction;
let onRejectFunction;

/**
 * @description Access all the shadow root elements and set the confirmation element
 * @param {HTMLElement} root - the settings element
 */
const setRoot = (root) => {
  confirmationElement = root;
  sessionButton = document.getElementById('session-button');
  confirmationPopup = confirmationElement.shadowRoot.querySelector(
    '#confirmation-popup',
  );
  noButton = confirmationElement.shadowRoot.querySelector('#no-button');
  yesButton = confirmationElement.shadowRoot.querySelector('#yes-button');
  overlay = confirmationElement.shadowRoot.querySelector('#overlay');
};

/**
 * Set the initial confirmation element
 * @param {HTMLElement} element - confirmation element
 * @param {Function} onAccept - function for when user accepts confirmation
 * @param {Function} onReject - function for when user reject confirmation
 */
const initializeConfirmation = (element, onAccept, onReject) => {
  setRoot(element);
  onAcceptFunction = onAccept;
  onRejectFunction = onReject;
  yesButton.addEventListener('click', onAcceptFunction);
  noButton.addEventListener('click', onRejectFunction);
};

/**
 * @function openConfirmation
 * @description Open the confirmation popup
 */
function openConfirmation() {
  if (confirmationPopup == null) {
    return;
  }
  confirmationPopup.classList.add('active');
  overlay.classList.add('active');
}

/**
 * @function closeConfirmation
 * @description Close the confirmation popup
 */
function closeConfirmation() {
  if (confirmationPopup == null) {
    return;
  }
  confirmationPopup.classList.remove('active');
  overlay.classList.remove('active');
}

export { initializeConfirmation, openConfirmation, closeConfirmation };
