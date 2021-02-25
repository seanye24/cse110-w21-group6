// testing tasklist, crud operations

const {
  initializeTaskList,
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../scripts/taskList');

let tasks = [{ name: 'task1' }, { name: 'task2' }];
window.localStorage.setItem('tasks', JSON.stringify(tasks));

test('retrieves tasks from localStorage', () => {
  initializeTaskList(document.body);
  expect(getTasks()).toStrictEqual(tasks);
});

test('add new task', () => {
  const newTask = { title: 'task3', description: 'description3' };
  addTask(newTask);
  tasks.push(newTask);
  expect(getTasks()).toStrictEqual(tasks);
});

test('update existing task', () => {
  const existingTask = tasks[1];
  const newTask = {
    title: 'task2modified',
    description: 'description2modified',
  };
  updateTask(existingTask, newTask);
  tasks[1] = newTask;
  expect(getTasks()).toStrictEqual(tasks);
});

test('delete existing task', () => {
  const existingTask = tasks[1];
  deleteTask(existingTask);
  tasks = [tasks[0], tasks[2]];
  expect(getTasks()).toStrictEqual(tasks);
});
