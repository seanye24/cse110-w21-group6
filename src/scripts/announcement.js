/**
 * @file Manage displaying announcements
 */

let announcementContainer;
let announcementElement;
let yesButton;
let noButton;

/**
 * Initialize announcement element
 * @param {HTMLElement} announcementElement - announcement element
 */
const initializeAnnouncement = (containerElement) => {
  announcementContainer = containerElement;
  announcementElement = announcementContainer.querySelector('.announcement');
  yesButton = announcementContainer.querySelector('.yes-button');
  noButton = announcementContainer.querySelector('.no-button');
  yesButton.onmousedown = (e) => e.preventDefault();
  noButton.onmousedown = (e) => e.preventDefault();
};

/**
 * Set an announcement
 * @param {string} announcement - announcement to display
 */
const setAnnouncement = (announcement) => {
  announcementElement.innerText = announcement;
};

/**
 * Set yes button on click callback
 * @param {() => void} callback - yes button onclick callback
 */
const setYesButtonCallback = (callback) => {
  yesButton.onclick = callback;
};

/**
 * Set no button on click callback
 * @param {() => void} callback - no button onclick callback
 */
const setNoButtonCallback = (callback) => {
  noButton.onclick = callback;
};

/**
 * Toggle visibility of buttons
 * @param {'visible' | 'hidden'} visibility - button visibility
 */
const setButtonVisibility = (visibility) => {
  if (visibility === 'visible') {
    yesButton.classList.remove('hidden');
    noButton.classList.remove('hidden');
  } else {
    yesButton.classList.add('hidden');
    noButton.classList.add('hidden');
  }
};

export {
  initializeAnnouncement,
  setAnnouncement,
  setYesButtonCallback,
  setNoButtonCallback,
  setButtonVisibility,
};
