/**
 * @file Manage displaying announcements
 */

import { dispatch, subscribe } from '../models';
import {
  ACTIONS,
  LONG_BREAK_INTERVAL,
  POMODORO_ANNOUNCEMENT,
  POMODORO_INTERVAL,
  SHORT_BREAK_INTERVAL,
  TASK_COMPLETION_QUESTION,
} from '../utils/constants';

let announcementContainer;
let announcementElement;
let yesButton;
let noButton;

/**
 * Set an announcement
 * @param {string} announcement - announcement to display
 */
const setAnnouncement = (announcement) => {
  announcementElement.innerText = announcement;
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

/**
 * Initialize announcement element
 * @param {HTMLElement} announcementElement - announcement element
 */
const initializeAnnouncement = (containerElement) => {
  announcementContainer = containerElement;
  announcementElement = announcementContainer.querySelector('.announcement');
  yesButton = announcementContainer.querySelector('.announcement-yes-button');
  noButton = announcementContainer.querySelector('.announcement-no-button');
  yesButton.onmousedown = (e) => e.preventDefault();
  noButton.onmousedown = (e) => e.preventDefault();

  yesButton.onclick = () => dispatch(ACTIONS.COMPLETE_CURRENT_TASK);
  noButton.onclick = () => dispatch(ACTIONS.DID_NOT_COMPLETE_CURRENT_TASK);

  subscribe({
    [ACTIONS.CHANGE_SESSION]: (sessionState) => {
      if (sessionState.session === 'inactive') {
        setButtonVisibility('hidden');
      } else if (sessionState.session === 'active') {
        setAnnouncement(POMODORO_ANNOUNCEMENT);
      }
    },
    [ACTIONS.CHANGE_INTERVAL]: (sessionState) => {
      if (sessionState.session === 'active') {
        switch (sessionState.currInterval) {
          case POMODORO_INTERVAL:
            setAnnouncement(POMODORO_ANNOUNCEMENT);
            [yesButton, noButton].forEach((btn) => {
              btn.classList.add('pomodoro');
              btn.classList.remove('short-break');
              btn.classList.remove('long-break');
            });
            break;
          case SHORT_BREAK_INTERVAL:
            setAnnouncement(TASK_COMPLETION_QUESTION);
            setButtonVisibility('visible');
            [yesButton, noButton].forEach((btn) => {
              btn.classList.remove('pomodoro');
              btn.classList.add('short-break');
              btn.classList.remove('long-break');
            });
            break;
          case LONG_BREAK_INTERVAL:
            setAnnouncement(TASK_COMPLETION_QUESTION);
            setButtonVisibility('visible');
            [yesButton, noButton].forEach((btn) => {
              btn.classList.remove('pomodoro');
              btn.classList.remove('short-break');
              btn.classList.add('long-break');
            });
            break;
          default:
        }
      }
    },
  });
};

export { initializeAnnouncement, setAnnouncement, setButtonVisibility };
