/**
 * @file Entry point for application
 */

import { initializeTaskList } from './taskList';
import { initializeProgressRing, startRing } from './progressRing';

window.addEventListener('DOMContentLoaded', () => {
  initializeProgressRing(
    document.body,
    Math.min(window.innerWidth / 2, window.innerHeight / 2),
    10,
    100,
  );
  startRing(0.5, 60);
  initializeTaskList(document.body);
});
