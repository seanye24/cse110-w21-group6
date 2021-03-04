// testing tasklist, crud operations

import '../components/TaskList';
import {
  initializeTaskList,
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  incrementPomodoro,
  selectPomodoro,
} from '../scripts/taskList';
import { createElement } from '../utils/utils';

describe('testing tasklist', () => {
  const tasks = [
    { name: 'task1', usedPomodoros: 0, estimatedPomodoros: 2, selected: false },
    { name: 'task2', usedPomodoros: 0, estimatedPomodoros: 2, selected: false },
  ];

  beforeEach(() => {
    window.localStorage.clear();
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    const taskListElement = createElement('task-list', {
      className: 'task-list',
    });
    document.body.innerHTML = '';
    document.body.appendChild(taskListElement);
    initializeTaskList(taskListElement);
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

  test('increment task pomodoro', () => {
    incrementPomodoro(tasks[1]);
    expect(getTasks()[1].usedPomodoros).toBe(tasks[1].usedPomodoros + 1);
  });

  test('select pomodoro', () => {
    selectPomodoro(tasks[1]);
    let newTasks = [{ ...tasks[1], selected: true }, tasks[0]];
    expect(getTasks()).toStrictEqual(newTasks);

    newTasks = [{ ...tasks[0], selected: true }, tasks[1]];
    selectPomodoro(tasks[0]);
    expect(getTasks()).toStrictEqual(newTasks);
  });
});
