/**
 * @file Entry point for application
 */

import '../styles/style.css';
import {
  Timer,
  ProgressRing,
  TaskList,
  PomodoroCircles,
  Settings,
} from '../components';
import { initializeTaskList } from './taskList';
import { initializeProgressRing } from './progressRing';
import { initializeTimer } from './timer';
import { initializePomodoroCircles } from './pomodoroCircles';
import { initializePopup as initializeSettingsPopup } from './settings';
import { initializeAnnouncement } from './announcement';
import { initializePopup as initializeConfirmationPopup } from './confirmationPopup';
import initializeController from './controller';

customElements.define('timer-component', Timer);
customElements.define('progress-ring', ProgressRing);
customElements.define('task-list', TaskList);
customElements.define('settings-component', Settings);
customElements.define('pomodoro-circles', PomodoroCircles);

window.addEventListener('DOMContentLoaded', () => {
  const progressRingElement = document.querySelector('.progress-ring');
  const timerElement = progressRingElement.shadowRoot.querySelector('.timer');
  const circlesElement = progressRingElement.shadowRoot.querySelector(
    '.circles',
  );
  const announcementElement = document.querySelector('.announcement-container');
  const taskListElement = document.querySelector('.task-list');
  const confirmationOverlay = document.querySelector('#confirmation-overlay');
  const settingsElement = document.querySelector('.settings');

  initializeProgressRing(progressRingElement);
  initializeTimer(timerElement);
  initializePomodoroCircles(circlesElement);
  initializeAnnouncement(announcementElement);
  initializeTaskList(taskListElement);
  initializeConfirmationPopup(confirmationOverlay);
  initializeSettingsPopup(settingsElement);
  initializeController();

  // adjust nav bar color on scroll
  const navBar = document.querySelector('.navbar');
  window.onscroll = () => {
    if (window.scrollY === 0) {
      navBar.classList.remove('scrolled');
    } else {
      navBar.classList.add('scrolled');
    }
  };
});
