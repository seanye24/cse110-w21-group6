// testing tasklist, crud operations

import { TaskList } from '../components';
import {
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
} from '../scripts/taskList';
import { createElement } from '../utils/helpers';

customElements.define('task-list', TaskList);

describe('testing tasklist', () => {
  let tasks;
  let taskListElement;
  beforeEach(() => {
    tasks = new Array(5).fill(null).map((t, i) => ({
      name: `task${i}`,
      usedPomodoros: 0,
      estimatedPomodoros: i,
      selected: false,
      completed: false,
    }));

    window.localStorage.clear();
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    taskListElement = createElement('task-list', {
      className: 'task-list',
    });
    const { shadowRoot } = taskListElement;
    document.body.innerHTML = '';
    document.body.appendChild(taskListElement);
    initializeTaskList(taskListElement);
  });

  test('retrieves tasks from localStorage', () => {
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('add new task', () => {
    const newTask = {
      title: 'task6',
      usedPomodoros: 0,
      estimatedPomodoros: 6,
      selected: false,
      completed: false,
    };
    addTask(newTask);
    expect(getTasks()).toStrictEqual([...tasks, newTask]);
  });

  test('update existing task', () => {
    const updatedTask = {
      ...tasks[1],
      usedPomodoros: 2,
      selected: true,
      completed: true,
    };
    updateTask(tasks[1], updatedTask);
    tasks[1] = updatedTask;
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('delete existing task', () => {
    deleteTask(tasks[3]);
    tasks.splice(3, 1);
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('increment task pomodoro', () => {
    incrementPomodoro(tasks[2]);
    tasks[2].usedPomodoros++;
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('select random pomodoro', () => {
    selectTask(tasks[1]);
    let [selectedTask] = tasks.splice(1, 1);
    selectedTask.selected = true;
    tasks.unshift(selectedTask);
    expect(getTasks()).toStrictEqual(tasks);

    selectTask(tasks[3]);
    tasks[0].selected = false;
    [selectedTask] = tasks.splice(3, 1);
    selectedTask.selected = true;
    tasks.unshift(selectedTask);
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('select first pomodoro', () => {
    selectFirstTask();
    tasks[0] = { ...tasks[0], selected: true };
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('deselect all tasks', () => {
    selectTask(tasks[0]);
    selectTask(tasks[1]);
    selectTask(tasks[2]);
    deselectAllTasks();

    tasks = [
      ...tasks
        .slice(0, 3)
        .map((t) => ({ ...t, selected: true }))
        .reverse(),
      ...tasks.slice(3),
    ];
    tasks = tasks.map((t) => ({ ...t, selected: false }));
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('get currently selected task', () => {
    selectTask(tasks[2]);
    tasks.unshift({ ...tasks.splice(2, 1)[0], selected: true });
    expect(getCurrentlySelectedTask()).toStrictEqual(tasks[0]);

    selectTask(tasks[3]);
    tasks.unshift({ ...tasks.splice(3, 1)[0], selected: true });
    expect(getCurrentlySelectedTask()).toStrictEqual(tasks[0]);

    selectTask(tasks[1]);
    tasks.unshift({ ...tasks.splice(1, 1)[0], selected: true });
    expect(getCurrentlySelectedTask()).toStrictEqual(tasks[0]);
  });

  test('setTasklistUsability(false) disables task list', () => {
    setTasklistUsability(false);

    const taskElements = taskListElement.shadowRoot
      .querySelector('.task-item-container')
      .querySelectorAll('task-item');
    Array.from(taskElements).forEach((task) => {
      const itemContainer = task.shadowRoot.querySelector('.item-container');
      const textContainer = task.shadowRoot.querySelector('.text-container');

      expect(itemContainer.classList.contains('disabled')).toBe(true);
      expect(textContainer.onclick).toBeNull();
      Array.from(itemContainer.querySelectorAll('.task-button')).forEach(
        (btn) => {
          expect(btn.disabled).toBe(true);
        },
      );
    });
  });

  test('setTasklistUsability(true) enables task list', () => {
    setTasklistUsability(false);
    setTasklistUsability(true);

    const taskElements = taskListElement.shadowRoot
      .querySelector('.task-item-container')
      .querySelectorAll('task-item');
    Array.from(taskElements).forEach((task) => {
      const itemContainer = task.shadowRoot.querySelector('.item-container');
      const textContainer = task.shadowRoot.querySelector('.text-container');

      expect(itemContainer.classList.contains('disabled')).toBe(false);
      expect(textContainer.onclick).not.toBeNull();
      Array.from(itemContainer.querySelectorAll('.task-button')).forEach(
        (btn) => {
          expect(btn.disabled).toBe(false);
        },
      );
    });
  });

  test('complete task', () => {
    completeTask(tasks[2]);
    let [completedTask] = tasks.splice(2, 1);
    tasks.push({ ...completedTask, selected: false, completed: true });
    expect(getTasks()).toStrictEqual(tasks);

    selectTask(tasks[1]);
    tasks.unshift({ ...tasks.splice(1, 1)[0], selected: true });
    completeTask(tasks[0]);
    [completedTask] = tasks.splice(0, 1);
    tasks.push({ ...completedTask, selected: false, completed: true });
    expect(getTasks()).toStrictEqual(tasks);
  });
});
