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
import { initializeBreakLengths } from './settings';

window.addEventListener('DOMContentLoaded', () => {
  initializeProgressRing(document.querySelector('.progress-ring'));
  initializeTaskList(document.querySelector('.task-list'));
  initializeBreakLengths();

  setRadiusStroke(180, 8);
  startProgressRing(0.5, 60);
  setTimeout(() => {
    setProgress(50);
  }, 7000);
});
