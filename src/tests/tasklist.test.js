// testing tasklist, crud operations

import {
  initializeTaskList,
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../scripts/taskList';

describe('testing tasklist', () => {
  const tasks = [{ name: 'task1' }, { name: 'task2' }];
  beforeEach(() => {
    window.localStorage.clear();
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    initializeTaskList(document.body);
  });
  test('retrieves tasks from localStorage', () => {
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('add new task', () => {
    const newTask = { title: 'task3', description: 'description3' };
    addTask(newTask);
    expect(getTasks()).toStrictEqual([...tasks, newTask]);
  });

  test('update existing task', () => {
    const newTask = {
      title: 'task2modified',
      description: 'description2modified',
    };
    updateTask(tasks[1], newTask);
    expect(getTasks()).toStrictEqual([tasks[0], newTask]);
  });

  test('delete existing task', () => {
    deleteTask(tasks[1]);
    expect(getTasks()).toStrictEqual([tasks[0]]);
  });
});
