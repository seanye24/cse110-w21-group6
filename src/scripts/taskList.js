/**
 * @file Manage tasklist for page
 * @author Sean Ye
 */

/**
 * A task object containing a name and pomodoros stats
 * @typedef {Object} Task
 * @property {string} name                - name of the task
 * @property {number} usedPomodoros       - pomodoros used so far
 * @property {number} estimatedPomodoros  - estimated number of pomos needed
 */

import { createElement } from '../utils';
import '../components/TaskItem';
import '../components/TaskItemForm';
import '../components/TaskList';

let tasks = [];

// task-list element
// task-list container element
// container element for task-list-item
const taskList = createElement('task-list', {});
const taskListContainer = Array.from(taskList.shadowRoot.childNodes).find(
  (elem) => elem.className === 'container',
);
const taskListItemContainer = taskListContainer.querySelector(
  '.task-item-container',
);

// task-item-form element
// task-item-form container element
// task-item-form text input elements
const taskItemForm = taskListContainer.querySelector('.task-item-form');
const taskItemFormContainer = Array.from(
  taskItemForm.shadowRoot.childNodes,
).find((elem) => elem.className === 'task-form');
const taskItemFormInputs = Array.from(
  taskItemFormContainer.querySelectorAll(
    '.task-input[type="text"], .task-input[type="number"]',
  ),
).reduce((acc, elem) => ({ ...acc, [elem.name]: elem }), {});

/**
 * Get button elements from task-item element
 * @param {Task} task - task-item element
 * @return {{finish: HTMLButtonElement, delete: HTMLButtonElement, edit: HTMLButtonElement}} - button elements object
 */
const getTaskItemButtons = (task) => {
  const buttons = Array.from(
    Array.from(task.shadowRoot.childNodes)
      .find((elem) => elem.className.includes('item-container'))
      .querySelectorAll('.task-button'),
  );

  return {
    finish: buttons.find((btn) => btn.getAttribute('id') === 'finish-button'),
    delete: buttons.find((btn) => btn.getAttribute('id') === 'delete-button'),
    edit: buttons.find((btn) => btn.getAttribute('id') === 'edit-button'),
  };
};

/**
 * Deleting existing task
 * @param {Task} taskToDelete - task to be deleted
 */
const deleteTask = (taskToDelete) => {
  const { name } = taskToDelete;

  // update localStorage
  const taskIndex = tasks.findIndex((task) => task.name === name);
  tasks.splice(taskIndex, 1);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));

  // remove task from dom
  const taskItem = taskListItemContainer.querySelector(`[name="${name}"]`);
  taskItem.remove();
};

/**
 * Add task object to DOM, add event listeners to task-item
 * @param {Task} newTask - new task to be added
 */
const addTaskToDom = (newTask) => {
  const { name, usedPomodoros, estimatedPomodoros } = newTask;

  // add task to dom
  const taskItem = createElement('task-item', {
    name,
    'used-pomodoros': usedPomodoros,
    'estimated-pomodoros': estimatedPomodoros,
    selected: true,
  });
  const buttons = getTaskItemButtons(taskItem);
  // buttons.finish.addEventListener('click', () => deleteTask(newTask));
  buttons.delete.addEventListener('click', () => deleteTask(newTask));
  buttons.edit.addEventListener('click', () => {
    console.log('editing task!');
  });
  taskListItemContainer.append(taskItem);
};

/**
 * Add new task to localStorage
 * @param {Task} newTask - new task to be added
 */
const addTask = (newTask) => {
  // update localStorage
  tasks.push(newTask);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
  addTaskToDom(newTask);
};

/**
 * Update existing task
 * @param {Task} prevTask - task to be updated
 * @param {Task} nextTask - updated task
 */
const updateTask = (prevTask, nextTask) => {
  const { name: prevName } = prevTask;
  const { name: nextName } = nextTask;

  // update localStorage
  const taskIndex = tasks.findIndex((task) => task.name === prevName);
  tasks[taskIndex] = nextTask;
  window.localStorage.setItem('tasks', JSON.stringify(tasks));

  // update task in dom
  const taskItem = taskListItemContainer.querySelector(`[name="${prevName}"]`);
  taskItem.setAttribute('name', nextName);
};

/**
 * Get tasklist
 * @return {Task[]} - current list of tasks
 */
const getTasks = () => {
  return tasks;
};

/**
 * Handle form submission, validate input
 * @param {Event} e - submit event
 */
const handleTaskFormSubmit = (e) => {
  e.preventDefault(); // prevent page reload

  const {
    name: { value: name },
    pomodoro: { value: pomodoro },
  } = taskItemFormInputs;
  const trimmedName = name.trim();

  // check if fields are non-empty
  if (!trimmedName) {
    console.error('task name cannot be empty');
    return;
  }
  if (!pomodoro) {
    console.error('task pomodoros cannot be empty');
    return;
  }

  // check if task already exists
  if (tasks.some((task) => task.name === trimmedName)) {
    console.error({ name: trimmedName }, ' already defined');
    return;
  }

  addTask({
    name: trimmedName,
    estimatedPomodoros: pomodoro,
    usedPomodoros: 0,
  });
  Object.values(taskItemFormInputs).forEach((input) => {
    input.value = '';
  });
};

/**
 * Initialize tasklist on page
 * Retrieve tasks from localStorage
 * @param {HTMLElement} containerElement - container for task list
 */
const initializeTaskList = (containerElement) => {
  containerElement.appendChild(taskList);
  taskItemFormContainer.addEventListener('submit', handleTaskFormSubmit);

  // retrive and add tasks from localStorage
  if (!window.localStorage.getItem('tasks')) {
    window.localStorage.setItem('tasks', JSON.stringify([]));
  }
  tasks = JSON.parse(window.localStorage.getItem('tasks'));
  tasks.forEach((task) => addTaskToDom(task));
};

export { initializeTaskList, addTask, getTasks, updateTask, deleteTask };
