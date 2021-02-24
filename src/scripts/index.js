/**
 * @file Entry point for application
 */

import { initializeTaskList } from './task-list';
import ProgressRing from '../components/progress-ring';

window.customElements.define('progress-ring', ProgressRing);

window.addEventListener('DOMContentLoaded', () => {
  initializeTaskList(document.body);
});
