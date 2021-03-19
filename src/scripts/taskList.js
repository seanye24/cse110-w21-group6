/**
 * @file Manage tasklist for page
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

import { dispatch, subscribe } from '../models';
import { ACTIONS, INTERVALS, KEYS } from '../utils/constants';
import { createElement } from '../utils/helpers';
import { validateTask } from '../utils/taskList';

let tasks = [];
let taskList;
let taskListContainer;
let taskListItemContainer;
let taskItemForm;
let taskItemFormContainer;
let taskItemFormInputs;
let shouldTasklistBeUsable = true;

/**
 * Save current tasks to localStorage
 */
const saveTasks = () => {
  window.localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
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
 * @return {{delete: HTMLButtonElement}} - button elements object
 */
const getTaskItemButtons = (taskElement) => {
  const buttons = Array.from(
    taskElement.shadowRoot.querySelectorAll('.task-button'),
  );

  return {
    delete: buttons.find((btn) => btn.getAttribute('id') === 'delete-button'),
  };
};

/**
 * Add task object to DOM, add event listeners to task-item
 * @param {HTMLElement} newTaskElement - new task element to be added
 * @param {('start' | 'end' | HTMLElement)=} position - position in list to append
 * @return {HTMLElement} - new task element added to DOM
 */
const addTaskToDom = (newTaskElement, position = 'end') => {
  if (position !== 'end' && position !== 'start') {
    const { taskElement } = getTask(position);
    taskElement.before(newTaskElement);
  } else if (position === 'end') {
    taskListItemContainer.append(newTaskElement);
  } else if (position === 'start') {
    taskListItemContainer.prepend(newTaskElement);
  }
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
 * @return {Task} - updated task
 */
const updateTask = (prevTask, nextTask) => {
  const { taskIndex, taskElement } = getTask(prevTask);

  // update localStorage
  tasks[taskIndex] = nextTask;
  saveTasks();

  // update task in dom
  Object.getOwnPropertyNames(nextTask).forEach((key) => {
    taskElement[key] = nextTask[key];
  });
  return nextTask;
};

/**
 * Deleting existing task
 * @param {Task} taskToDelete - task to be deleted
 */
const deleteTask = (taskToDelete) => {
  // update localStorage
  const { taskIndex } = getTask(taskToDelete);
  tasks.splice(taskIndex, 1);
  window.localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
  removeTaskFromDom(taskToDelete);
};

/**
 * Get currently selected task
 */
const getCurrentSelectedTask = () => tasks.find((t) => t.selected);

/**
 * Select a task
 * @param {Task} task - task to be selected
 * @return {Task} - selected task
 */
const selectTask = (task) => {
  const prevSelectedTask = getCurrentSelectedTask();
  if (prevSelectedTask) {
    updateTask(prevSelectedTask, { ...prevSelectedTask, selected: false });
  }

  const { taskElement, taskIndex } = getTask(task);
  // move task to front of DOM list
  removeTaskFromDom(task);
  addTaskToDom(taskElement, 'start');

  // move task to front of tasks array
  tasks.splice(taskIndex, 1);
  tasks.unshift(task);

  // update selected property of task
  const updatedTask = { ...task, selected: true };
  dispatch(ACTIONS.changeSelectedTask, updatedTask);
  return updateTask(task, updatedTask);
};

/**
 * Disable task
 * @param {Task} task - task to disable
 */
const disableTask = (task) => {
  const { taskElement } = getTask(task);
  const { shadowRoot } = taskElement;
  const itemContainer = shadowRoot.querySelector('.item-container');
  const textContainer = shadowRoot.querySelector('.text-container');

  // disable item container
  if (shouldTasklistBeUsable) {
    itemContainer.classList.remove('disabled');
  } else {
    itemContainer.classList.add('disabled');
  }

  // disable select task listener
  if (shouldTasklistBeUsable && !task.completed) {
    textContainer.onclick = () => selectTask(task);
  } else {
    textContainer.onclick = null;
  }

  // disable buttons
  const buttons = getTaskItemButtons(taskElement);
  Object.values(buttons).forEach((btn) => {
    btn.disabled = !shouldTasklistBeUsable;
  });
};

/**
 * Create a task element from a task object
 * @param {Task} newTask - task to be created
 */
const createTaskElement = (newTask) => {
  const {
    name,
    usedPomodoros,
    estimatedPomodoros,
    selected,
    completed,
  } = newTask;

  // create html element
  const newTaskElement = createElement('task-item', {
    name,
    usedPomodoros,
    estimatedPomodoros,
    selected,
  });

  // add event listeners
  const textContainer = newTaskElement.shadowRoot.querySelector(
    '.text-container',
  );
  const { delete: deleteButton } = getTaskItemButtons(newTaskElement);
  if (!completed) {
    textContainer.onclick = () => selectTask(newTask);
  }
  deleteButton.onclick = () => deleteTask(newTask);
  return newTaskElement;
};

/**
 * Add new task to localStorage, append to DOM
 * @param {Task} newTask - new task to be added
 */
const addTask = (newTask) => {
  // update localStorage
  const newTaskElement = createTaskElement(newTask);
  const indexOfFirstCompleted = tasks.findIndex((t) => t.completed);
  if (indexOfFirstCompleted !== -1) {
    tasks.splice(indexOfFirstCompleted, 0, newTask);
    addTaskToDom(newTaskElement, tasks[indexOfFirstCompleted + 1]);
  } else {
    tasks.push(newTask);
    addTaskToDom(newTaskElement);
  }
  saveTasks();
  return newTask;
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
  const pomodoroNumber = Number(pomodoro);

  nameInput.focus();

  const newTask = addTask({
    name: trimmedName,
    estimatedPomodoros: pomodoroNumber,
    usedPomodoros: 0,
    selected: false,
    completed: false,
  });
  if (!shouldTasklistBeUsable) {
    disableTask(newTask);
  }
  Object.values(taskItemFormInputs).forEach((input) => {
    input.value = '';
  });
};

/**
 * Retrieve tasks from localStorage
 */
const restoreTasks = () => {
  let restoredTasks;
  try {
    restoredTasks = JSON.parse(window.localStorage.getItem(KEYS.tasks));
  } catch (e) {
    restoredTasks = null;
  }
  if (!restoredTasks) {
    window.localStorage.setItem(KEYS.tasks, JSON.stringify([]));
    restoredTasks = [];
  }

  restoredTasks = restoredTasks.filter(validateTask);
  tasks = restoredTasks;
  tasks.forEach((task) => addTaskToDom(createTaskElement(task)));
};

/**
 * Checks if task input is already in list
 * Sets error message for form
 * @param {InputEvent} e - input change from task item form
 */
const checkDuplicateTask = (e) => {
  const { value } = e.target;
  const trimmedName = value.trim();
  if (tasks.some((task) => task.name === trimmedName)) {
    e.target.setCustomValidity('Duplicate task.');
  } else {
    e.target.setCustomValidity('');
  }
};

/**
 * Increment the usedPomodoros for one task
 * @param {Task} task - task to be incremented
 * @return {Task} - incremented task
 */
const incrementTask = (task) => {
  const { usedPomodoros } = task;
  return updateTask(task, { ...task, usedPomodoros: usedPomodoros + 1 });
};

/**
 * Automatically select first task in the task list
 * @return {Task | null} returns first available task, if there are none, return null
 */
const selectFirstTask = () => {
  if (tasks.length > 0 && !tasks[0].completed) {
    return selectTask(tasks[0]);
  }
  return null;
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
const setTasklistUsability = (usability) => {
  shouldTasklistBeUsable = usability;
  tasks.forEach(disableTask);
};

/**
 * Mark task as complete
 * @param {Task} completedTask - task that has been completed
 */
const completeTask = (completedTask) => {
  const { taskIndex } = getTask(completedTask);

  // move task to bottom of list in DOM
  const removedTask = removeTaskFromDom(completedTask);
  addTaskToDom(removedTask, 'end');
  removedTask.shadowRoot.querySelector('.text-container').onclick = null;

  // move task to end of tasks array
  tasks.splice(taskIndex, 1);
  tasks.push(completedTask);
  /*
  const [removedTask] = tasks.splice(taskIndex, 1);
  tasks.push({ ...removedTask, selected: false, completed: true });
  */

  // update task
  return updateTask(completedTask, {
    ...completedTask,
    selected: false,
    completed: true,
  });
};

/**
 * Initialize element variables for different elements of task list
 * @param {HTMLElement} root - tasklist element
 */
const initializeElements = (root) => {
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
 * Initialize task list, add event listeners, restore saved tasks
 * @param {HTMLElement} root - task list element
 */
const initializeTaskList = (root) => {
  initializeElements(root);
  taskItemFormContainer.addEventListener('submit', handleTaskFormSubmit);
  restoreTasks();
  taskItemFormInputs.name.oninput = checkDuplicateTask;
  deselectAllTasks();

  subscribe({
    [ACTIONS.changeSession]: (sessionState) => {
      if (sessionState.session === 'inactive') {
        deselectAllTasks();
        setTasklistUsability(true);
      } else if (sessionState.session === 'active') {
        if (sessionState.currentSelectedTask === null) {
          selectFirstTask();
        }
        setTasklistUsability(false);
      }
    },
    [ACTIONS.changeCurrentInterval]: (sessionState) => {
      if (sessionState.session === 'active') {
        if (sessionState.currentInterval === INTERVALS.pomodoro) {
          if (sessionState.currentSelectedTask === null) {
            selectFirstTask();
          }
          setTasklistUsability(false);
        }
      }
    },
    [ACTIONS.incrementSelectedTask]: (sessionState) => {
      if (sessionState.session === 'active') {
        const incrementedTask = incrementTask(sessionState.currentSelectedTask);
        dispatch(ACTIONS.changeSelectedTask, incrementedTask);
      }
    },
    [ACTIONS.completeSelectedTask]: (sessionState) => {
      if (sessionState.session === 'active') {
        const completedTask = completeTask(sessionState.currentSelectedTask);
        dispatch(ACTIONS.changeSelectedTask, null);
        dispatch(ACTIONS.addToCompletedTasks, completedTask);
        setTasklistUsability(true);
      }
    },
  });
};

export {
  initializeTaskList,
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  incrementTask,
  selectTask,
  selectFirstTask,
  deselectAllTasks,
  getCurrentSelectedTask,
  setTasklistUsability,
  completeTask,
  handleTaskFormSubmit,
};
