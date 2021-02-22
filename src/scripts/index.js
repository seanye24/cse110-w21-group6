/**
 * @file Entry point for application
 */

import { initializeTaskList } from './task-list';

window.addEventListener('DOMContentLoaded', () => {
  initializeTaskList(document.body);
});
