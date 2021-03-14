/**
 * @file task-item web component
 */

import {
  createElement,
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

    this.styleElement = document.createElement('style');
    this.styleElement.innerText = `
      .item-container {
        margin-bottom: 1em;
        padding: 0.5em 2em;
        border-radius: 5px;
        position: relative;
        cursor: pointer;
      }

      .item-container:focus {
        outline: none;
      }

      .item-container.selected {
        background: #90e0ef;
      }

      .text-container {
        background: rgba(255, 255, 255, 1);
        color: #555;
        position: relative;
        padding: 0.5em;
        border-radius: 5px;
        width: 100%;
        text-align: left;
        font: 1rem Source Sans Pro, sans-serif;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      .item-container:not(.disabled):not(.selected) > .text-container:hover {
        background: rgba(255, 255, 255, 0.8);
      }

      .text-container:focus {
        outline: none;
        box-shadow: 0 0 0 2pt #90e0ef;
      }

      .item-container.selected > .text-container:focus {
        box-shadow: 0 0 0 2pt #00b4d8;
      }
      
      .completed .name {
        text-decoration: line-through;
      }

      .name {
        width: 80%;
        display: inline-block;
        margin: 0.5em 0;
      }
      
      .pomodoro-container {
        width: 20%;
        height: 100%;
        display: inline-block;
        position: relative;
        text-align: right;
      }

      .pomodoro-label {
        position: absolute;
        top: -0.5em;
        right: 0;
        font: 0.8rem 'Source Sans Pro', sans-serif;
        color: #777;
      }

      .pomodoro {
        display: inline-block;
        margin: 1em 0 0 0;
      }

      .task-button {
        opacity: 0;
        position: absolute;
        border: none;
        padding: 0.25em;
        color: rgba(255, 255, 255, 1); 
        background: transparent;
        border-radius: 50%;
      }

      .item-container:hover:not(.disabled) > .task-button,
      .task-button:focus {
        opacity: 1;
      }

      .task-button:focus {
        outline: none;
        z-index: 1;
        position: absolute;
      }

      .task-button:focus {
        box-shadow: inset 0 0 0 2pt #90e0ef;
      }

      .item-container.selected > .task-button:focus {
        box-shadow: inset 0 0 0 2pt #00b4d8;
      }

      .task-button:hover {
        border-radius: 50%;
        color: rgba(255, 255, 255, 0.8); 
        cursor: pointer;
        background: rgba(255, 255, 255, 0.3);
      }

      .item-container.selected > .task-button,
      .item-container.selected > .task-button:hover {
        color: rgba(0, 0, 0, 0.54);
      }

      .task-button:disabled {
        opacity: 0;
      }

      .task-button-icon {
        font-size: 1.2rem;
      }

      #delete-button {
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
      }
    `;

    this.materialIconLinkElement = createElement('link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    });

    this.itemContainerElement = createElement('div', {
      className: 'item-container',
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
      className: 'name',
    });
    this.pomodoroContainer = createElement('span', {
      className: 'pomodoro-container',
    });
    this.pomodoroLabel = createElement('label', {
      className: 'pomodoro-label',
      for: 'pomodoro',
      innerText: 'Pomodoros',
    });
    this.pomodoroElement = createElement('p', {
      className: 'pomodoro',
      id: 'pomodoro',
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
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name':
        this.nameElement.innerText = newValue;
        break;
      case 'used-pomodoros': {
        const usedPomodoros = validatePomodoro(newValue);
        if (usedPomodoros === null) {
          return;
        }

        this._usedPomodoros = usedPomodoros;
        this.pomodoroElement.innerText = `${this.usedPomodoros}/${this.estimatedPomodoros}`;
        break;
      }
      case 'estimated-pomodoros': {
        const estimatedPomodoros = validatePomodoro(newValue);
        if (estimatedPomodoros === null) {
          return;
        }

        this._estimatedPomodoros = estimatedPomodoros;
        this.pomodoroElement.innerText = `${this.usedPomodoros}/${this.estimatedPomodoros}`;
        break;
      }
      case 'selected': {
        const selected = validateBoolean(newValue);
        if (selected === null) {
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
