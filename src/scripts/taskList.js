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
 * @property {boolean} selected           - whether task is selected
 */

import { createElement } from '../utils/utils';
import '../components/TaskItem';
import '../components/TaskItemForm';
import '../components/TaskList';

let tasks = [];
let taskList;
let taskListContainer;
let taskListItemContainer;
let taskItemForm;
let taskItemFormContainer;
let taskItemFormInputs;

const setRoot = (root) => {
  taskList = root;
  taskListContainer = taskList.shadowRoot.querySelector('.container');
  taskListItemContainer = taskListContainer.querySelector(
    '.task-item-container',
  );
  taskItemForm = taskListContainer.querySelector('.task-item-form');
  taskItemFormContainer = taskItemForm.shadowRoot.querySelector('.task-form');
  taskItemFormInputs = {
    name: taskItemFormContainer.querySelector('#name-input'),
    pomodoro: taskItemFormContainer.querySelector('#pomodoro-input'),
  };
};

/**
 * Retrieve task from tasks and DOM
 * @param {Task} task - task
 * @return {{taskIndex: number, taskElement: HTMLElement}}
 */
const getTask = ({ name }) => ({
  taskIndex: tasks.findIndex((task) => task.name === name),
  taskElement: taskListItemContainer.querySelector(`[name="${name}"]`),
});

/**
 * Get button elements from task-item element
 * @param {HTMLElement} taskElement - task-item element
 * @return {{delete: HTMLButtonElement, edit: HTMLButtonElement}} - button elements object
 */
const getTaskItemButtons = (taskElement) => {
  const buttons = Array.from(
    taskElement.shadowRoot.querySelectorAll('.task-button'),
  );

  return {
    delete: buttons.find((btn) => btn.getAttribute('id') === 'delete-button'),
    edit: buttons.find((btn) => btn.getAttribute('id') === 'edit-button'),
  };
};

/**
 * Deleting existing task
 * @param {Task} taskToDelete - task to be deleted
 */
const deleteTask = (taskToDelete) => {
  // update localStorage
  const { taskIndex, taskElement } = getTask(taskToDelete);
  tasks.splice(taskIndex, 1);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));

  // remove task from dom
  taskElement.remove();
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
    selected: false,
  });
  const buttons = getTaskItemButtons(taskItem);
  buttons.delete.addEventListener('click', () => deleteTask(newTask));
  buttons.edit.addEventListener('click', () => {
    // TODO: Add edit functionality
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
  const {
    name: nextName,
    usedPomodoros,
    estimatedPomodoros,
    selected,
  } = nextTask;
  const { taskIndex, taskElement } = getTask(prevTask);

  // update localStorage
  tasks[taskIndex] = nextTask;
  window.localStorage.setItem('tasks', JSON.stringify(tasks));

  // update task in dom
  taskElement.setAttribute('name', nextName);
  taskElement.setAttribute('used-pomodoros', usedPomodoros);
  taskElement.setAttribute('estimated-pomodoros', estimatedPomodoros);
  taskElement.setAttribute('selected', selected);
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

  const { name: nameInput, pomodoro: pomodoroInput } = taskItemFormInputs;
  const { value: name } = nameInput;
  const { value: pomodoro } = pomodoroInput;

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

  nameInput.focus();

  addTask({
    name: trimmedName,
    estimatedPomodoros: pomodoro,
    usedPomodoros: 0,
    selected: false,
  });
  Object.values(taskItemFormInputs).forEach((input) => {
    input.value = '';
  });
};

/**
 * Retrieve tasks from localStorage
 */
const restoreTasks = () => {
  if (!window.localStorage.getItem('tasks')) {
    window.localStorage.setItem('tasks', JSON.stringify([]));
  }
  tasks = JSON.parse(window.localStorage.getItem('tasks'));
  tasks.forEach((task) => addTaskToDom(task));
};

/**
 * Set tasklist
 * @param {HTMLElement} element - task list element
 */
const initializeTaskList = (element) => {
  setRoot(element);
  taskItemFormContainer.addEventListener('submit', handleTaskFormSubmit);
  restoreTasks();
};
/**
 * Increment the usedPomodoros for one task
 * @param {Task} task - task to be incremented
 */
const incrementPomodoro = (task) => {
  const { usedPomodoros } = task;
  updateTask(task, { ...task, usedPomodoros: usedPomodoros + 1 });
};

/**
 * Select a task
 * @param {Task} task - task to be selected
 */
const selectPomodoro = (task) => {
  const prevSelectedTask = tasks.find((t) => t.selected);
  if (prevSelectedTask) {
    updateTask(prevSelectedTask, { ...prevSelectedTask, selected: false });
  }
  updateTask(task, { ...task, selected: true });
};

/**
 * Automatically select first task in the task list
 */
const selectFirstTask = () => {
  if (tasks.length > 0) selectPomodoro(tasks[0]);
};

/**
 * Disable task list
 * @param {boolean} shouldTasklistBeUsable - whether task list should be usable
 */
const setTasklistUsability = (shouldTasklistBeUsable) => {
  tasks.forEach((task) => {
    const buttons = getTaskItemButtons(getTask(task).taskElement);
    Object.values(buttons).forEach((btn) => {
      btn.disabled = !shouldTasklistBeUsable;
    });
  });
};

export {
  initializeTaskList,
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  incrementPomodoro,
  selectPomodoro,
  selectFirstTask,
  setTasklistUsability,
};
