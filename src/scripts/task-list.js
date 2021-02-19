/**
 * @file Manage tasklist for page
 * @author Sean Ye
 */

/**
 * A task object containing a title and description
 * @typedef {Object} Task
 * @property {string} title       - title of the task
 * @property {string} description - description of the task
 */

import { createElement } from '../utils/index.js';
import '../components/task-item.js';
import '../components/task-item-form.js';
import '../components/task-list.js';

let tasks = [];

// task-list element
// task-list container element
// container element for task-list-item
const taskList = createElement({
  element: 'task-list',
});
const taskListContainer = Array.from(taskList.shadowRoot.childNodes).find(
  (elem) => elem.getAttribute('class') === 'container',
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
).find((elem) => elem.getAttribute('class') === 'task-form');
const taskItemFormInputs = Array.from(
  taskItemFormContainer.querySelectorAll('.task-input[type="text"]'),
).reduce((acc, elem) => ({ ...acc, [elem.name]: elem }), {});

/**
 * Get button elements from task-item element
 * @param {Task} task - task-item element
 * @return {{finish: HTMLButtonElement, delete: HTMLButtonElement, edit: HTMLButtonElement}} - button elements object
 */
const getTaskItemButtons = (task) => {
  const buttons = Array.from(
    Array.from(task.shadowRoot.childNodes)
      .find((elem) => elem.getAttribute('class') === 'container')
      .querySelectorAll('.task-button'),
  );

  return {
    finish: buttons.find((btn) => btn.getAttribute('id') === 'finish-button'),
    delete: buttons.find((btn) => btn.getAttribute('id') === 'delete-button'),
    edit: buttons.find((btn) => btn.getAttribute('id') === 'edit-button'),
  };
};

/**
 * Add task object to DOM, add event listeners to task-item
 * @param {Task} newTask - new task to be added
 */
const addTaskToDom = (newTask) => {
  const { title, description } = newTask;

  // add task to dom
  const taskItem = createElement({
    element: 'task-item',
    title,
    description,
  });
  const buttons = getTaskItemButtons(taskItem);
  buttons.finish.addEventListener('click', () => deleteTask(newTask));
  buttons.delete.addEventListener('click', () => deleteTask(newTask));
  buttons.edit.addEventListener('click', () => window.alert('editting task!'));
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
  const { title: prevTitle, description: prevDescription } = prevTask;
  const { title: nextTitle, description: nextDescription } = nextTask;

  // update localStorage
  const taskIndex = tasks.findIndex(
    ({ title, description }) =>
      prevTitle === title && prevDescription === description,
  );
  tasks[taskIndex] = nextTask;
  window.localStorage.setItem('tasks', JSON.stringify(tasks));

  // update task in dom
  const taskItem = taskListItemContainer.querySelector(
    `[title="${prevTitle}"][description="${prevDescription}"]`,
  );
  taskItem.setAttribute('title', nextTitle);
  taskItem.setAttribute('description', nextDescription);
};

/**
 * Deleting existing task
 * @param {Task} taskToDelete - task to be deleted
 */
const deleteTask = (taskToDelete) => {
  const { title, description } = taskToDelete;

  // update localStorage
  const taskIndex = tasks.findIndex(
    ({ title: t, description: d }) => title === t && description === d,
  );
  tasks.splice(taskIndex, 1);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));

  // remove task from dom
  const taskItem = taskListItemContainer.querySelector(
    `[title="${title}"][description="${description}"]`,
  );
  taskItem.remove();
};
  
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
    title: { value: title },
    description: { value: description },
  } = taskItemFormInputs;
  let [trimmedTitle, trimmedDescription] = [title.trim(), description.trim()];

  // check if fields are non-empty
  if (!trimmedTitle || !trimmedDescription) {
    console.error('task fields cannot be empty');
    return;
  }

  // check if task already exists
  if (
    tasks.some(
      ({ title, description }) =>
        trimmedTitle === title && trimmedDescription === description,
    )
  ) {
    console.error(
      { title: trimmedTitle, description: trimmedDescription },
      ' already defined',
    );
    return;
  }

  addTask({ title: trimmedTitle, description: trimmedDescription });
  Object.values(taskItemFormInputs).forEach((input) => (input.value = ''));
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
