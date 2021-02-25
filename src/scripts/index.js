/**
 * @file Entry point for application
 */

import { initializeTaskList } from './taskList';
import { initializeProgressRing, startProgressRing } from './progressRing';

window.addEventListener('DOMContentLoaded', () => {
  initializeProgressRing(
    document.body,
    Math.min(window.innerWidth / 3, window.innerHeight / 3),
    10,
    100,
  );
  startProgressRing(0.5, 60);
  initializeTaskList(document.body);
});
