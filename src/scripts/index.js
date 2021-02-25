/**
 * @file Entry point for application
 */

import '../styles/style.css';
import { initializeTaskList } from './taskList';
import {
  initializeProgressRing,
  setProgress,
  startProgressRing,
} from './progressRing';

window.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('#main');
  initializeProgressRing(
    mainElement,
    Math.min(window.innerWidth / 3, window.innerHeight / 3),
    10,
    100,
  );
  initializeTaskList(mainElement);
  startProgressRing(0.5, 60);
  setTimeout(() => {
    setProgress(50);
  }, 7000);
});
