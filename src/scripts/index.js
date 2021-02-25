/**
 * @file Entry point for application
 */

import '../styles/style.css';
import '../components/TaskList';
import '../components/ProgressRing';
import { initializeTaskList } from './taskList';
import {
  initializeProgressRing,
  setProgress,
  setRadiusStroke,
  startProgressRing,
} from './progressRing';

window.addEventListener('DOMContentLoaded', () => {
  initializeProgressRing(document.querySelector('.progress-ring'));
  initializeTaskList(document.querySelector('.task-list'));

  setRadiusStroke(Math.min(window.innerWidth / 4), 8);
  startProgressRing(0.5, 60);
  setTimeout(() => {
    setProgress(50);
  }, 7000);
});
