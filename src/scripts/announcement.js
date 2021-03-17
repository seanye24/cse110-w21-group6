/**
 * @file Manage displaying announcements
 */

import { dispatch, subscribe } from '../models';
import { ACTIONS, ANNOUNCEMENTS, INTERVALS } from '../utils/constants';

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

  yesButton.onclick = () => dispatch(ACTIONS.completeCurrentTask);
  noButton.onclick = () => dispatch(ACTIONS.doNotCompleteCurrentTask);

  setAnnouncement(ANNOUNCEMENTS.introduction);
  subscribe({
    [ACTIONS.changeSession]: (sessionState) => {
      if (sessionState.session === 'inactive') {
        setButtonVisibility('hidden');
      } else if (sessionState.session === 'active') {
        setAnnouncement(ANNOUNCEMENTS.pomodoroInterval);
      }
    },
    [ACTIONS.changeCurrentInterval]: (sessionState) => {
      if (sessionState.session === 'active') {
        switch (sessionState.currentInterval) {
          case INTERVALS.pomodoro:
            setAnnouncement(ANNOUNCEMENTS.pomodoroInterval);
            [yesButton, noButton].forEach((btn) => {
              btn.classList.add('pomodoro');
              btn.classList.remove('short-break');
              btn.classList.remove('long-break');
            });
            break;
          case INTERVALS.shortBreak:
            setAnnouncement(ANNOUNCEMENTS.taskCompletionQuestion);
            setButtonVisibility('visible');
            [yesButton, noButton].forEach((btn) => {
              btn.classList.remove('pomodoro');
              btn.classList.add('short-break');
              btn.classList.remove('long-break');
            });
            break;
          case INTERVALS.longBreak:
            setAnnouncement(ANNOUNCEMENTS.longBreakInterval);
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
    [ACTIONS.changeCurrentSelectedTask]: (sessionState) => {
      if (
        sessionState.session === 'inactive' &&
        sessionState.currentSelectedTask !== null
      ) {
        setAnnouncement(ANNOUNCEMENTS.clickToStart);
      }
    },
  });
};

export { initializeAnnouncement, setAnnouncement, setButtonVisibility };
