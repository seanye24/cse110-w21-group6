/**
 * @file Manage displaying announcements
 */

import { dispatch, subscribe } from '../models';
import { ACTIONS, ANNOUNCEMENTS, INTERVALS } from '../utils/constants';
import { updateClassesByInterval } from '../utils/helpers';

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

  yesButton.onclick = () => dispatch(ACTIONS.completeSelectedTask);
  noButton.onclick = () => dispatch(ACTIONS.doNotCompleteSelectedTask);

  setAnnouncement(ANNOUNCEMENTS.introduction);
  subscribe({
    [ACTIONS.changeSession]: (sessionState) => {
      if (sessionState.session === 'inactive') {
        if (
          sessionState.currentSelectedTask !== null ||
          sessionState.completedTasks.length > 0
        ) {
          setAnnouncement(ANNOUNCEMENTS.endOfSession);
        } else {
          setAnnouncement(ANNOUNCEMENTS.noTasksAvailable);
        }
        setButtonVisibility('hidden');
      } else if (sessionState.session === 'active') {
        setAnnouncement(ANNOUNCEMENTS.pomodoroInterval);
      }
    },
    [ACTIONS.changeCurrentInterval]: (sessionState) => {
      if (sessionState.session === 'active') {
        updateClassesByInterval(sessionState.currentInterval, [
          yesButton,
          noButton,
        ]);
        switch (sessionState.currentInterval) {
          case INTERVALS.pomodoro:
            setAnnouncement(ANNOUNCEMENTS.pomodoroInterval);
            break;
          case INTERVALS.shortBreak:
            setAnnouncement(ANNOUNCEMENTS.taskCompletionQuestion);
            setButtonVisibility('visible');
            break;
          case INTERVALS.longBreak:
            setAnnouncement(ANNOUNCEMENTS.taskCompletionQuestion);
            setButtonVisibility('visible');
            break;
          default:
        }
      }
    },
    [ACTIONS.changeSelectedTask]: (sessionState) => {
      if (sessionState.currentSelectedTask !== null) {
        if (sessionState.session === 'inactive') {
          setAnnouncement(ANNOUNCEMENTS.clickToStart);
        } else if (sessionState.session === 'active') {
          if (sessionState.currentInterval === INTERVALS.shortBreak) {
            setAnnouncement(ANNOUNCEMENTS.shortBreakInterval);
          } else if (sessionState.currentInterval === INTERVALS.longBreak) {
            setAnnouncement(ANNOUNCEMENTS.longBreakInterval);
          }
        }
      }
    },
    [ACTIONS.completeSelectedTask]: () => {
      setButtonVisibility('hidden');
      setAnnouncement(ANNOUNCEMENTS.selectNewTask);
    },
    [ACTIONS.doNotCompleteSelectedTask]: (sessionState) => {
      setButtonVisibility('hidden');
      if (sessionState.currentInterval === INTERVALS.shortBreak) {
        setAnnouncement(ANNOUNCEMENTS.shortBreakInterval);
      } else if (sessionState.currentInterval === INTERVALS.longBreak) {
        setAnnouncement(ANNOUNCEMENTS.longBreakInterval);
      }
    },
  });
};

export { initializeAnnouncement, setAnnouncement, setButtonVisibility };
