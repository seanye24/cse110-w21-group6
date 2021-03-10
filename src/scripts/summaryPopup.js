/**
 * @file Manage Summary Pop-up for page
 */

/**
 * A task object containing a name and pomodoros stats
 * @typedef {Object} Task
 * @property {string} name                - name of the task
 * @property {number} usedPomodoros       - pomodoros used so far
 * @property {number} estimatedPomodoros  - estimated number of pomos needed
 * @property {boolean} selected           - whether task is selected
 * @property {boolean} completed          - whether task is completed
 */

import { createElement } from '../utils/utils';

let summaryOverlay;
let summaryPopup;
let taskSummaryList;
let actualPomosElement;
let estimatedPomosElement;
let closeSummaryButton;

/**
 * Open summary popup
 */
const openPopup = () => {
  summaryOverlay.classList.add('active');
};

/**
 * Close summary popup
 */
const closePopup = () => {
  summaryOverlay.classList.remove('active');
  taskSummaryList.innerHTML = '';
};

/**
 * Create task summary element
 * @param {Task} task - task to summarize
 * @return {HTMLElement} - task summary element
 */
const createTaskSummary = (task) => {
  const { name, usedPomodoros, estimatedPomodoros, completed } = task;

  const taskSummary = createElement('div', {
    className: `task-summary-item ${completed ? 'completed' : 'incompleted'}`,
  });
  const nameElement = createElement('span', {
    className: 'task-summary-name',
    innerText: name,
  });
  const pomodorosElement = createElement('span', {
    className: 'task-summary-pomodoros',
    innerText: `${usedPomodoros}/${estimatedPomodoros}`,
  });
  taskSummary.append(nameElement, pomodorosElement);

  return taskSummary;
};

/**
 * Create summary of tasks
 * @param {Task[]} taskList - tasks to summarize
 */
const createTaskSummaryList = (taskList) => {
  const completedTasks = taskList.filter((task) => task.completed);
  const incompletedTasks = taskList.filter((task) => !task.completed);
  [...completedTasks, ...incompletedTasks].forEach((task) => {
    const taskSummary = createTaskSummary(task);
    taskSummaryList.append(taskSummary);
  });
};

/**
 * @description Access all the shadow root elements and set the summary element
 * @param {HTMLElement} root - the summary element
 */
const setRoot = (root) => {
  summaryOverlay = root;
  summaryPopup = summaryOverlay.querySelector('.summary-popup');
  taskSummaryList = summaryOverlay.querySelector('.task-summary-list');
  actualPomosElement = summaryOverlay.querySelector('.summary-actual-pomos');
  estimatedPomosElement = summaryOverlay.querySelector(
    '.summary-estimated-pomos',
  );
  closeSummaryButton = summaryOverlay.querySelector('.summary-close-button');
};

/**
 * Initialize popup
 * @param {HTMLElement} element - summary popup element
 * @param {Task[]} tasks - tasks to summarize
 */
const initializePopup = (element, tasks) => {
  setRoot(element);
  createTaskSummaryList(tasks);
  const { actual, estimated } = tasks.reduce(
    (acc, task) => ({
      actual: acc.actual + task.usedPomodoros,
      estimated: acc.estimated + task.estimatedPomodoros,
    }),
    { actual: 0, estimated: 0 },
  );
  actualPomosElement.innerText = `Actual: ${actual}`;
  estimatedPomosElement.innerText = `Estimated: ${estimated}`;

  closeSummaryButton.onclick = closePopup;
  closeSummaryButton.onmousedown = (e) => e.preventDefault();
  summaryOverlay.onclick = closePopup;
  summaryPopup.onclick = (e) => e.stopPropagation();
};

export { initializePopup, openPopup, closePopup };
