/**
 * @file Entry point for application
 */

import '../styles/style.css';
import '../components/TaskList';
import '../components/ProgressRing';
import { initializeTaskList } from './taskList';
import {
  setProgress,
  setRadiusStroke,
  startProgressRing,
} from './progressRing';

window.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('#main');
  setRadiusStroke(Math.min(window.innerWidth / 4), 8);
  initializeTaskList(mainElement);

  startProgressRing(0.5, 60);
  setTimeout(() => {
    setProgress(50);
  }, 7000);
});
