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

import { subscribe } from '../models';
import {
  createElement,
  getHoursMinutesAndSeconds,
  getTotalSessionTime,
} from '../utils/helpers';

let summaryOverlay;
let summaryPopup;
let taskSummaryList;
let pomodorosStatsElement;
let tasksStatsElement;
let sessionTimeElement;
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
  const { name, usedPomodoros, estimatedPomodoros, status } = task;

  const taskSummary = createElement('div', {
    className: `task-summary-item ${status}`,
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
 * @param {Task[]} allTasks - all tasks
 * @param {Task[]} completedTasks - completed tasks
 */
const createTaskSummaryList = (allTasks, completedTasks) => {
  const completedUnderBudgetTasks = allTasks
    .filter(
      (task) =>
        task.completed &&
        task.usedPomodoros <= task.estimatedPomodoros &&
        completedTasks.some((otherTask) => otherTask.name === task.name),
    )
    .map((t) => ({
      ...t,
      status: 'complete under-budget',
    }));
  const completedOverBudgetTasks = allTasks
    .filter(
      (task) =>
        task.completed &&
        task.usedPomodoros > task.estimatedPomodoros &&
        completedTasks.some((otherTask) => otherTask.name === task.name),
    )
    .map((t) => ({
      ...t,
      status: 'complete over-budget',
    }));
  const inProgressTasks = allTasks
    .filter((t) => !t.completed && t.usedPomodoros > 0)
    .map((t) => ({ ...t, status: 'in-progress' }));
  const notStartedTasks = allTasks
    .filter((t) => !t.completed && t.usedPomodoros === 0)
    .map((t) => ({ ...t, status: 'not-started' }));
  const completedDuringPastTasks = allTasks
    .filter(
      (task) =>
        task.completed &&
        !completedTasks.some((otherTask) => otherTask.name === task.name),
    )
    .map((t) => ({ ...t, status: 'complete old' }));
  [
    ...completedUnderBudgetTasks,
    ...completedOverBudgetTasks,
    ...inProgressTasks,
    ...notStartedTasks,
    ...completedDuringPastTasks,
  ].forEach((task) => {
    const taskSummary = createTaskSummary(task);
    taskSummaryList.append(taskSummary);
  });
};

/**
 * @description Access all the shadow root elements and set the summary element
 * @param {HTMLElement} root - the summary element
 */
const initializeElements = (root) => {
  summaryOverlay = root;
  summaryPopup = summaryOverlay.querySelector('#summary-popup');
  taskSummaryList = summaryOverlay.querySelector('.task-summary-list');
  pomodorosStatsElement = summaryOverlay.querySelector('#summary-pomodoros');
  tasksStatsElement = summaryOverlay.querySelector('#summary-tasks');
  sessionTimeElement = summaryOverlay.querySelector('#summary-time');
  closeSummaryButton = summaryOverlay.querySelector('.summary-close-button');
};

/**
 * Initialize popup
 * @param {HTMLElement} root - summary popup element
 * @param {Task[]} tasks - tasks to summarize
 */
const initializePopup = (root, tasks) => {
  initializeElements(root);
  const {
    currentInterval,
    currentTime,
    completedTasks,
    numberOfPomodorosCompleted,
  } = subscribe();

  createTaskSummaryList(tasks, completedTasks);
  const totalSessionTime = getTotalSessionTime({
    intervalName: currentInterval,
    timeRemaining: currentTime,
  });
  pomodorosStatsElement.innerText = `Number of pomodoros completed: ${numberOfPomodorosCompleted}`;
  tasksStatsElement.innerText = `Number of tasks completed: ${completedTasks.length}`;
  sessionTimeElement.innerText = `Total session time: ${getHoursMinutesAndSeconds(
    totalSessionTime,
  )}`;

  closeSummaryButton.onclick = closePopup;
  closeSummaryButton.onmousedown = (e) => e.preventDefault();
  summaryOverlay.onclick = closePopup;
  summaryPopup.onclick = (e) => e.stopPropagation();
};

export { initializePopup, openPopup, closePopup };
