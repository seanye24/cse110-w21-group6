// testing tasklist, crud operations

import { TaskList } from '../components';
import {
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
} from '../scripts/taskList';
import { KEYS } from '../utils/constants';
import { createElement } from '../utils/helpers';
import { validatePomodoro, validateTask } from '../utils/taskList';

customElements.define('task-list', TaskList);

describe('testing taskItem component', () => {
  let taskItem;
  beforeEach(() => {
    taskItem = createElement('task-item', {
      name: 'task1',
      usedPomodoros: 0,
      estimatedPomodoros: 1,
      selected: false,
      completed: false,
    });
  });

  test('get attribute', () => {
    expect(taskItem.getAttribute('name')).toBe('task1');
    expect(taskItem.getAttribute('used-pomodoros')).toBe('0');
    expect(taskItem.getAttribute('estimated-pomodoros')).toBe('1');
    expect(taskItem.getAttribute('selected')).toBe('false');
    expect(taskItem.getAttribute('completed')).toBe('false');
  });

  test('if input valid, set attribute changes attribute and property', () => {
    taskItem.setAttribute('name', 'task2');
    expect(taskItem.getAttribute('name')).toBe('task2');
    expect(taskItem.name).toBe('task2');

    taskItem.setAttribute('name', 'task3');
    expect(taskItem.getAttribute('name')).toBe('task3');
    expect(taskItem.name).toBe('task3');

    taskItem.setAttribute('used-pomodoros', 1);
    expect(taskItem.getAttribute('used-pomodoros')).toBe('1');
    expect(taskItem.usedPomodoros).toBe(1);

    taskItem.setAttribute('used-pomodoros', 2);
    expect(taskItem.getAttribute('used-pomodoros')).toBe('2');
    expect(taskItem.usedPomodoros).toBe(2);

    taskItem.setAttribute('estimated-pomodoros', 2);
    expect(taskItem.getAttribute('estimated-pomodoros')).toBe('2');
    expect(taskItem.estimatedPomodoros).toBe(2);

    taskItem.setAttribute('estimated-pomodoros', 3);
    expect(taskItem.getAttribute('estimated-pomodoros')).toBe('3');
    expect(taskItem.estimatedPomodoros).toBe(3);

    taskItem.setAttribute('selected', true);
    expect(taskItem.getAttribute('selected')).toBe('true');
    expect(taskItem.selected).toBe(true);

    taskItem.setAttribute('selected', false);
    expect(taskItem.getAttribute('selected')).toBe('false');
    expect(taskItem.selected).toBe(false);

    taskItem.setAttribute('completed', true);
    expect(taskItem.getAttribute('completed')).toBe('true');
    expect(taskItem.completed).toBe(true);

    taskItem.setAttribute('completed', false);
    expect(taskItem.getAttribute('completed')).toBe('false');
    expect(taskItem.completed).toBe(false);
  });

  test("if input invalid, set attribute doesn't change attribute and property", () => {
    const invalidPomodoros = ['as', null, undefined, NaN, {}, -10, true, false];
    const invalidBooleans = ['as', null, undefined, NaN, {}, -10, -1, 10, 1000];

    invalidPomodoros.forEach((value) => {
      taskItem.setAttribute('used-pomodoros', value);
      expect(taskItem.getAttribute('used-pomodoros')).toBe('0');
      expect(taskItem.usedPomodoros).toBe(0);

      taskItem.setAttribute('estimated-pomodoros', value);
      expect(taskItem.getAttribute('estimated-pomodoros')).toBe('1');
      expect(taskItem.estimatedPomodoros).toBe(1);
    });

    invalidBooleans.forEach((value) => {
      taskItem.setAttribute('selected', value);
      expect(taskItem.getAttribute('selected')).toBe('false');
      expect(taskItem.selected).toBe(false);

      taskItem.setAttribute('completed', value);
      expect(taskItem.getAttribute('completed')).toBe('false');
      expect(taskItem.completed).toBe(false);
    });
  });

  test('getter method', () => {
    expect(taskItem.name).toBe('task1');
    expect(taskItem.usedPomodoros).toBe(0);
    expect(taskItem.estimatedPomodoros).toBe(1);
    expect(taskItem.selected).toBe(false);
    expect(taskItem.completed).toBe(false);
  });

  test('if input valid, setter function changes attribute and property', () => {
    taskItem.name = 'task2';
    expect(taskItem.getAttribute('name')).toBe('task2');
    expect(taskItem.name).toBe('task2');

    taskItem.name = 'task3';
    // localhost:5000
    expect(taskItem.getAttribute('name')).toBe('task3');
    expect(taskItem.name).toBe('task3');

    taskItem.usedPomodoros = 1;
    expect(taskItem.getAttribute('used-pomodoros')).toBe('1');
    expect(taskItem.usedPomodoros).toBe(1);

    taskItem.usedPomodoros = 2;
    expect(taskItem.getAttribute('used-pomodoros')).toBe('2');
    expect(taskItem.usedPomodoros).toBe(2);

    taskItem.estimatedPomodoros = 2;
    expect(taskItem.getAttribute('estimated-pomodoros')).toBe('2');
    expect(taskItem.estimatedPomodoros).toBe(2);

    taskItem.estimatedPomodoros = 3;
    expect(taskItem.getAttribute('estimated-pomodoros')).toBe('3');
    expect(taskItem.estimatedPomodoros).toBe(3);

    taskItem.selected = true;
    expect(taskItem.getAttribute('selected')).toBe('true');
    expect(taskItem.selected).toBe(true);

    taskItem.selected = false;
    expect(taskItem.getAttribute('selected')).toBe('false');
    expect(taskItem.selected).toBe(false);

    taskItem.completed = true;
    expect(taskItem.getAttribute('completed')).toBe('true');
    expect(taskItem.completed).toBe(true);

    taskItem.completed = false;
    expect(taskItem.getAttribute('completed')).toBe('false');
    expect(taskItem.completed).toBe(false);
  });

  test("if input invalid, setter function doesn't change attribute and property", () => {
    const invalidStrings = [null, undefined, NaN, {}, -10, true, false];
    const invalidPomodoros = ['as', null, undefined, NaN, {}, -10, true, false];
    const invalidBooleans = ['as', null, undefined, NaN, {}, -10, -1, 10, 1000];

    invalidStrings.forEach((value) => {
      taskItem.name = value;
      expect(taskItem.getAttribute('name')).toBe('task1');
      expect(taskItem.name).toBe('task1');
    });

    invalidPomodoros.forEach((value) => {
      taskItem.usedPomodoros = value;
      expect(taskItem.getAttribute('used-pomodoros')).toBe('0');
      expect(taskItem.usedPomodoros).toBe(0);

      taskItem.estimatedPomodoros = value;
      expect(taskItem.getAttribute('estimated-pomodoros')).toBe('1');
      expect(taskItem.estimatedPomodoros).toBe(1);
    });

    invalidBooleans.forEach((value) => {
      taskItem.selected = value;
      expect(taskItem.getAttribute('selected')).toBe('false');
      expect(taskItem.selected).toBe(false);

      taskItem.completed = value;
      expect(taskItem.getAttribute('completed')).toBe('false');
      expect(taskItem.completed).toBe(false);
    });
  });
});

describe('testing taskList script', () => {
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
    window.localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
    taskListElement = createElement('task-list', {
      className: 'task-list',
    });
    document.body.innerHTML = '';
    document.body.appendChild(taskListElement);
    initializeTaskList(taskListElement);
  });

  test('if localStorage is empty, use an empty array', () => {
    window.localStorage.clear();
    initializeTaskList(taskListElement);
    expect(JSON.parse(window.localStorage.getItem(KEYS.tasks))).toStrictEqual(
      [],
    );
    expect(getTasks()).toStrictEqual([]);
  });

  test('if localStorage is corrupted, use an empty array', () => {
    window.localStorage.setItem(KEYS.tasks, 'asd;fjlka[fasdf;lkj;kl]}');
    initializeTaskList(taskListElement);
    expect(JSON.parse(window.localStorage.getItem(KEYS.tasks))).toStrictEqual(
      [],
    );
    expect(getTasks()).toStrictEqual([]);
  });

  test('if retrieved task has corrupted field, ignore it', () => {
    tasks[1].selected = 'asdf';
    delete tasks[2].usedPomodoros;
    tasks[3].estimatedPomodoros = 'asdf';
    window.localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
    expect(JSON.parse(window.localStorage.getItem(KEYS.tasks))).toStrictEqual(
      tasks,
    );

    initializeTaskList(taskListElement);
    tasks.splice(1, 3);
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('retrieves tasks from localStorage', () => {
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('adding new task', () => {
    const newTask = {
      name: 'task6',
      usedPomodoros: 0,
      estimatedPomodoros: 6,
      selected: false,
      completed: false,
    };
    tasks.push(newTask);
    addTask(newTask);
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('adding new task will put task before completed tasks', () => {
    completeTask(tasks[1]);
    tasks.push({ ...tasks.splice(1, 1)[0], completed: true });

    const newTask = {
      name: 'task6',
      usedPomodoros: 0,
      estimatedPomodoros: 6,
      selected: false,
      completed: false,
    };
    addTask(newTask);
    tasks.splice(4, 0, newTask);
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('updating existing task', () => {
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
    incrementTask(tasks[2]);
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

  test('when no pomodoros are available, select first returns null', () => {
    tasks.forEach(completeTask);
    expect(selectFirstTask()).toBeNull();
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
    expect(getCurrentSelectedTask()).toStrictEqual(tasks[0]);

    selectTask(tasks[3]);
    tasks.unshift({ ...tasks.splice(3, 1)[0], selected: true });
    expect(getCurrentSelectedTask()).toStrictEqual(tasks[0]);

    selectTask(tasks[1]);
    tasks.unshift({ ...tasks.splice(1, 1)[0], selected: true });
    expect(getCurrentSelectedTask()).toStrictEqual(tasks[0]);
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

  test('submitting valid task form adds new task', () => {
    const taskForm = taskListElement.shadowRoot.querySelector(
      '.task-item-form',
    );
    const nameInput = taskForm.shadowRoot.querySelector('#name-input');
    const pomoInput = taskForm.shadowRoot.querySelector('#pomodoro-input');
    const submitInput = taskForm.shadowRoot.querySelector('#submit-input');
    nameInput.value = 'task7';
    pomoInput.value = 7;
    submitInput.click();
    tasks.push({
      name: 'task7',
      usedPomodoros: 0,
      estimatedPomodoros: 7,
      completed: false,
      selected: false,
    });
    expect(getTasks()).toStrictEqual(tasks);
  });

  test('submitting blank task triggers validity error', () => {
    const taskForm = taskListElement.shadowRoot.querySelector(
      '.task-item-form',
    );
    const nameInput = taskForm.shadowRoot.querySelector('#name-input');

    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    expect(nameInput.validity.valid).toBe(false);
  });

  test('submitting duplicate task triggers validity error', () => {
    const taskForm = taskListElement.shadowRoot.querySelector(
      '.task-item-form',
    );
    const nameInput = taskForm.shadowRoot.querySelector('#name-input');

    nameInput.value = 'task4';
    nameInput.dispatchEvent(new Event('input'));
    expect(nameInput.validity.valid).toBe(false);
  });

  test('submitting invalid pomodoro number triggers validity error', () => {
    const taskForm = taskListElement.shadowRoot.querySelector(
      '.task-item-form',
    );
    const pomoInput = taskForm.shadowRoot.querySelector('#pomodoro-input');

    expect(pomoInput.validity.valid).toBe(false); // initial blank value should be invalid too
    pomoInput.value = 'asdf';
    pomoInput.dispatchEvent(new Event('input'));
    expect(pomoInput.validity.valid).toBe(false);
  });

  test('fixing duplicate task resolves validity error', () => {
    const taskForm = taskListElement.shadowRoot.querySelector(
      '.task-item-form',
    );
    const nameInput = taskForm.shadowRoot.querySelector('#name-input');

    nameInput.value = 'task4';
    nameInput.dispatchEvent(new Event('input'));
    expect(nameInput.validity.valid).toBe(false);

    nameInput.value = 'task6';
    nameInput.dispatchEvent(new Event('input'));
    expect(nameInput.validity.valid).toBe(true);
  });
});

describe('testing taskList utils', () => {
  test('validatePomodoro returns pomodoros on valid input', () => {
    expect(validatePomodoro(0)).toBe(0);
    expect(validatePomodoro(1)).toBe(1);
    expect(validatePomodoro(5)).toBe(5);
    expect(validatePomodoro(10000)).toBe(10000);
  });

  test('validatePomodoro returns null on invalid input', () => {
    expect(validatePomodoro(-1)).toBe(null);
    expect(validatePomodoro(-1000)).toBe(null);
    expect(validatePomodoro('asdf')).toBe(null);
    expect(validatePomodoro(NaN)).toBe(null);
    expect(validatePomodoro(null)).toBe(null);
    expect(validatePomodoro(undefined)).toBe(null);
    expect(validatePomodoro({})).toBe(null);
  });

  test('validateTask returns task on valid input', () => {
    const tasks = new Array(5).fill(null).map((t, i) => ({
      name: `task${i}`,
      usedPomodoros: 0,
      estimatedPomodoros: i,
      selected: false,
      completed: false,
    }));
    tasks.forEach((task) => expect(validateTask(task)).toStrictEqual(task));
  });

  test('validateTask returns null on invalid input', () => {
    expect(validateTask(null)).toBeNull();
    expect(validateTask(undefined)).toBeNull();
    expect(validateTask('')).toBeNull();
    expect(validateTask({})).toBeNull();
    expect(
      validateTask({
        name: 'asdf',
        usedPomodoros: 'hello',
        estimatedPomodoros: 0,
        selected: true,
        completed: true,
      }),
    ).toBeNull();
  });
});
