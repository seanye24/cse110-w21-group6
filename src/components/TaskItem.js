/**
 * @file task-item web component
 */

import styles from '../styles/task-item.component.css';
import { subscribe } from '../models';
import { ACTIONS, INTERVALS } from '../utils/constants';
import {
  createElement,
  updateClassesByInterval,
  validateBoolean,
  validateString,
} from '../utils/helpers';
import { validatePomodoro } from '../utils/taskList';

/**
 * Custom web component representing a task item.
 * @extends HTMLElement
 * @param {number} name - name of task
 * @param {number} estimated-pomodoros - estimated number of pomodoros needed
 * @param {number} used-pomodoros - pomodoros used so far
 * @param {boolean} selected - indicates if the current task is selected
 * @param {boolean} completed - indicates if the current task is completed
 */
class TaskItem extends HTMLElement {
  static get observedAttributes() {
    return [
      'name',
      'estimated-pomodoros',
      'used-pomodoros',
      'selected',
      'completed',
    ];
  }

  constructor() {
    super();

    this._name = '';
    this._usedPomodoros = 0;
    this._estimatedPomodoros = 0;
    this._selected = false;
    this._completed = false;

    // create shadow root
    this.shadow = this.attachShadow({ mode: 'open' });

    this.styleElement = createElement('style', {
      innerText: styles.toString(),
    });

    this.materialIconLinkElement = createElement('link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    });

    this.itemContainerElement = createElement('div', {
      className: 'item-container pomodoro',
    });
    this.textContainerElement = createElement('button', {
      className: 'text-container',
      onmouseout: (e) => {
        e.target.blur();
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    });
    this.nameElement = createElement('p', {
      className: 'task-name',
    });
    this.pomodoroContainer = createElement('span', {
      className: 'task-pomodoro-container',
    });
    this.pomodoroLabel = createElement('label', {
      className: 'task-pomodoro-label',
      for: 'task-pomodoro',
      innerText: 'Pomodoros',
    });
    this.pomodoroElement = createElement('p', {
      className: 'task-pomodoro',
      id: 'task-pomodoro',
    });

    this.deleteTaskButton = createElement('button', {
      className: 'task-button',
      id: 'delete-button',
      onmouseout: (e) => {
        e.target.blur();
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    });
    this.deleteTaskIcon = createElement('span', {
      className: 'material-icons task-button-icon',
      innerText: 'delete',
    });

    this.shadow.append(
      this.materialIconLinkElement,
      this.styleElement,
      this.itemContainerElement,
    );
    this.itemContainerElement.append(
      this.textContainerElement,
      this.deleteTaskButton,
    );
    this.deleteTaskButton.appendChild(this.deleteTaskIcon);
    this.textContainerElement.append(this.nameElement, this.pomodoroContainer);
    this.pomodoroContainer.append(this.pomodoroLabel, this.pomodoroElement);

    const { currentInterval } = subscribe({
      [ACTIONS.changeSession]: (sessionState) => {
        if (sessionState.session === 'inactive') {
          updateClassesByInterval(INTERVALS.pomodoro, [
            this.itemContainerElement,
          ]);
        }
      },
      [ACTIONS.changeCurrentInterval]: (sessionState) => {
        if (sessionState.session === 'active') {
          updateClassesByInterval(sessionState.currentInterval, [
            this.itemContainerElement,
          ]);
        }
      },
    });
    updateClassesByInterval(currentInterval, [this.itemContainerElement]);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name': {
        const newName = validateString(newValue);

        this.nameElement.innerText = newName;
        this._name = newName;
        break;
      }
      case 'used-pomodoros': {
        const usedPomodoros = validatePomodoro(newValue);
        if (usedPomodoros === null) {
          this.setAttribute(name, oldValue);
          return;
        }

        this._usedPomodoros = usedPomodoros;
        this.pomodoroElement.innerText = `${this.usedPomodoros}/${this.estimatedPomodoros}`;
        break;
      }
      case 'estimated-pomodoros': {
        const estimatedPomodoros = validatePomodoro(newValue);
        if (estimatedPomodoros === null) {
          this.setAttribute(name, oldValue);
          return;
        }

        this._estimatedPomodoros = estimatedPomodoros;
        this.pomodoroElement.innerText = `${this.usedPomodoros}/${this.estimatedPomodoros}`;
        break;
      }
      case 'selected': {
        const selected = validateBoolean(newValue);
        if (selected === null) {
          this.setAttribute(name, oldValue);
          return;
        }

        this._selected = selected;
        if (selected) {
          this.itemContainerElement.classList.add('selected');
        } else {
          this.itemContainerElement.classList.remove('selected');
        }
        break;
      }
      case 'completed': {
        const completed = validateBoolean(newValue);
        if (completed === null) {
          this.setAttribute(name, oldValue);
          return;
        }

        this._completed = completed;
        if (completed) {
          this.itemContainerElement.classList.add('completed');
        } else {
          this.itemContainerElement.classList.remove('completed');
        }
        break;
      }
      default:
    }
  }

  get name() {
    return this._name;
  }

  set name(value) {
    const name = validateString(value);
    if (name === null) {
      return;
    }

    this._name = name;
    this.setAttribute('name', this._name);
  }

  get usedPomodoros() {
    return this._usedPomodoros;
  }

  set usedPomodoros(value) {
    const usedPomodoros = validatePomodoro(value);
    if (usedPomodoros === null) {
      return;
    }

    this._usedPomodoros = usedPomodoros;
    this.setAttribute('used-pomodoros', this._usedPomodoros);
  }

  get estimatedPomodoros() {
    return this._estimatedPomodoros;
  }

  set estimatedPomodoros(value) {
    const estimatedPomodoros = validatePomodoro(value);
    if (estimatedPomodoros === null) {
      return;
    }

    this._estimatedPomodoros = estimatedPomodoros;
    this.setAttribute('estimated-pomodoros', this._estimatedPomodoros);
  }

  get selected() {
    return this._selected;
  }

  set selected(value) {
    const selected = validateBoolean(value);
    if (selected === null) {
      return;
    }

    this._selected = selected;
    this.setAttribute('selected', this._selected);
  }

  get completed() {
    return this._completed;
  }

  set completed(value) {
    const completed = validateBoolean(value);
    if (completed === null) {
      return;
    }

    this._completed = completed;
    this.setAttribute('completed', this._completed);
  }
}

export default TaskItem;
