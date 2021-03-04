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
 * @property {boolean} completed          - whether task is completed
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
 * Save current tasks to localStorage
 */
const saveTasks = () => {
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
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
 * Add task object to DOM, add event listeners to task-item
 * @param {HTMLElement} newTaskElement - new task element to be added
 * @param {'start' | 'end'} position - position in list to append
 * @return {HTMLElement} - new task element added to DOM
 */
const addTaskToDom = (newTaskElement, position = 'end') => {
  if (position === 'end') taskListItemContainer.append(newTaskElement);
  else if (position === 'start') taskListItemContainer.prepend(newTaskElement);
  return newTaskElement;
};

/**
 * Remove task object from DOM
 * @param {Task} taskToRemove - task to be removed
 * @return {HTMLElement} - task element removed from DOM
 */
const removeTaskFromDom = (taskToRemove) => {
  const { taskElement } = getTask(taskToRemove);
  taskElement.remove();
  return taskElement;
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
  saveTasks();

  // update task in dom
  taskElement.setAttribute('name', nextName);
  taskElement.setAttribute('used-pomodoros', usedPomodoros);
  taskElement.setAttribute('estimated-pomodoros', estimatedPomodoros);
  taskElement.setAttribute('selected', selected);
};

/**
 * Deleting existing task
 * @param {Task} taskToDelete - task to be deleted
 */
const deleteTask = (taskToDelete) => {
  // update localStorage
  const { taskIndex } = getTask(taskToDelete);
  tasks.splice(taskIndex, 1);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
  removeTaskFromDom(taskToDelete);
};

/**
 * Get currently selected task
 */
const getCurrentlySelectedTask = () => tasks.find((t) => t.selected);

/**
 * Select a task
 * @param {Task} task - task to be selected
 */
const selectTask = (task) => {
  const prevSelectedTask = getCurrentlySelectedTask();
  if (prevSelectedTask)
    updateTask(prevSelectedTask, { ...prevSelectedTask, selected: false });

  const { taskElement, taskIndex } = getTask(task);
  // move task to front of DOM list
  removeTaskFromDom(task);
  addTaskToDom(taskElement, 'start');

  // move task to front of tasks array
  tasks.splice(taskIndex, 1);
  tasks.unshift(task);

  // update selected property of task
  updateTask(task, { ...task, selected: true });
};

function selectCallback() {
  selectTask(this);
}

/**
 * Create a task element from a task object
 * @param {Task} newTask - task to be created
 */
const createTaskElement = (newTask) => {
  const { name, usedPomodoros, estimatedPomodoros, selected } = newTask;

  // add task to dom
  const newTaskElement = createElement('task-item', {
    name,
    'used-pomodoros': usedPomodoros,
    'estimated-pomodoros': estimatedPomodoros,
    selected,
  });
  newTaskElement.shadowRoot
    .querySelector('.text-container')
    .addEventListener('click', selectCallback.bind(newTask));
  const buttons = getTaskItemButtons(newTaskElement);
  buttons.delete.addEventListener('click', () => deleteTask(newTask));
  buttons.edit.addEventListener('click', () => {
    // TODO: Add edit functionality
  });
  return newTaskElement;
};

/**
 * Add new task to localStorage, append to DOM
 * @param {Task} newTask - new task to be added
 */
const addTask = (newTask) => {
  // update localStorage
  tasks.push(newTask);
  saveTasks();
  const newTaskElement = createTaskElement(newTask);
  addTaskToDom(newTaskElement);
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
    // TODO: Update name label
    return;
  }
  if (!pomodoro) {
    // TODO: Update pomodoro label
    return;
  }

  // check if task already exists
  if (tasks.some((task) => task.name === trimmedName)) {
    // TODO: Update name label
    return;
  }

  nameInput.focus();

  addTask({
    name: trimmedName,
    estimatedPomodoros: pomodoro,
    usedPomodoros: 0,
    selected: false,
    completed: false,
  });
  Object.values(taskItemFormInputs).forEach((input) => {
    input.value = '';
  });
};

/**
 * Retrieve tasks from localStorage
 */
const restoreTasks = () => {
  if (!JSON.parse(window.localStorage.getItem('tasks'))) {
    window.localStorage.setItem('tasks', JSON.stringify([]));
  }
  tasks = JSON.parse(window.localStorage.getItem('tasks'));
  tasks.forEach((task) => addTaskToDom(createTaskElement(task)));
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
 * Automatically select first task in the task list
 */
const selectFirstTask = () => {
  if (tasks.length > 0) selectTask(tasks[0]);
  return tasks[0];
};

/**
 * Deselect all tasks
 */
const deselectAllTasks = () => {
  tasks.forEach((task) => {
    updateTask(task, { ...task, selected: false });
  });
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

/**
 * Mark task as complete
 * @param {Task} completedTask - task that has been completed
 */
const completeTask = (completedTask) => {
  const { taskIndex, taskElement } = getTask(completedTask);

  // mark task as completed and move it to end of DOM list
  removeTaskFromDom(completedTask);
  addTaskToDom(taskElement, 'end');
  taskElement.setAttribute('selected', false);
  taskElement.setAttribute('completed', true);
  taskElement.shadowRoot
    .querySelector('.text-container')
    .removeEventListener('click', selectCallback);

  // move task to end of tasks array
  tasks.splice(taskIndex, 1);
  tasks.push(completedTask);

  // update selected property of task
  updateTask(completedTask, {
    ...completedTask,
    selected: false,
    completed: true,
  });
};

export {
  initializeTaskList,
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  incrementPomodoro,
  selectTask,
  selectFirstTask,
  deselectAllTasks,
  getCurrentlySelectedTask,
  setTasklistUsability,
  completeTask,
};
