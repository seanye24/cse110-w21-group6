/**
 * @file Entry point for application
 */

import { initializeTaskList } from './taskList';
import {
  initializeProgressRing,
  setProgress,
  startProgressRing,
} from './progressRing';

window.addEventListener('DOMContentLoaded', () => {
  initializeProgressRing(
    document.body,
    Math.min(window.innerWidth / 3, window.innerHeight / 3),
    10,
    100,
  );
  initializeTaskList(document.body);
  startProgressRing(0.5, 60);
  setTimeout(() => {
    setProgress(50);
  }, 7000);
});
