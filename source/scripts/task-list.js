import { createElement } from '../utils/index.js';

let tasks = [];

// task-list element
const taskList = createElement({
  element: 'task-list',
});

// task-list container element
const taskListContainer = Array.from(taskList.shadowRoot.childNodes).find(
  (elem) => elem.getAttribute('class') === 'container',
);
// task-list item list container element
const taskItemListContainer = taskListContainer.querySelector(
  '.task-item-container',
);

// task-item-form element
const taskItemForm = taskListContainer.querySelector('.task-item-form');
// task-item-form container element
const taskItemFormContainer = Array.from(
  taskItemForm.shadowRoot.childNodes,
).find((elem) => elem.getAttribute('class') === 'task-form');
// task-item-form text input elements
const taskItemFormInputs = Array.from(
  taskItemFormContainer.querySelectorAll('.task-input[type="text"]'),
).reduce((acc, elem) => ({ ...acc, [elem.name]: elem }), {});

/**
 * Get button elements from task-item element
 * @param {task-item} task - task-item element
 * @return {[button-role]: button} - button elements object
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
 * @param {task} newTask - new task to be added
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
  taskItemListContainer.append(taskItem);
};

/**
 * Add new task to localStorage
 * @param {task} newTask - new task to be added
 */
const addTask = (newTask) => {
  // update localStorage
  tasks.push(newTask);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
  addTaskToDom(newTask);
};

/**
 * Deleting existing task
 * @param {task} newTask - task to be deleted
 */
const deleteTask = (taskToDelete) => {
  const { title, description } = taskToDelete;

  // update localStorage
  const taskIndex = tasks.findIndex(
    ({ t, d }) => title === t && description === d,
  );
  tasks.splice(taskIndex, 1);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));

  // remove task from dom
  const taskItem = taskItemListContainer.querySelector(
    `[title="${title}"][description="${description}"]`,
  );
  taskItem.remove();
};

/**
 * Update existing task
 * @param {task} newTask - task to be updated
 */
const updateTask = (prevTask, nextTask) => {
  const { prevTitle, prevDescription } = prevTask;
  const { nextTitle, nextDescription } = nextTask;

  // update localStorage
  const taskIndex = tasks.findIndex(
    ({ t, d }) => prevTitle === t && prevDescription === d,
  );
  tasks[taskIndex] = nextTask;
  window.localStorage.setItem('tasks', JSON.stringify(tasks));

  // update task in dom
  const taskItem = taskItemContainer.querySelector(
    `[title="${prevTitle}"][description="${prevDescription}"]`,
  );
  taskItem.setAttribute('title', nextTitle);
  taskItem.setAttribute('description', nextDescription);
};

/**
 * Handle form submission, validate input
 * @param {Event} e - submit event
 * @param {Task} newTask - new task to be submitted
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

document.addEventListener('DOMContentLoaded', async () => {
  document.body.appendChild(taskList);
  taskItemFormContainer.addEventListener('submit', handleTaskFormSubmit);

  // retrive and add tasks from localStorage
  if (!window.localStorage.getItem('tasks')) {
    window.localStorage.setItem('tasks', JSON.stringify([]));
  }
  tasks = JSON.parse(window.localStorage.getItem('tasks'));
  tasks.forEach((task) => addTaskToDom(task));
});
