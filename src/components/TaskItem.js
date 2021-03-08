/**
 * @file task-item web component
 */

import { createElement } from '../utils/utils';

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

    this.usedPomodoros = 0;
    this.estimatedPomodoros = 0;

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

      .selected {
        background: #90e0ef;
      }

      .text-container {
        background: #fff;
        color: #555;
        position: relative;
        padding: 0.5em;
        border-radius: 5px;
        font-size: 1rem;
        display: flex;
        align-items: center;
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

      .item-container:hover > .task-button,
      .task-button:focus {
        opacity: 1;
      }

      .task-button:focus {
        outline: none;
        box-shadow: inset 0 0 0 1pt #48cae4;
        z-index: 1;
        position: absolute;
      }

      .task-button:hover {
        border-radius: 50%;
        color: rgba(255, 255, 255, 0.3); 
        cursor: pointer;
      }

      .task-button:disabled {
        opacity: 0 !important;
      }

      .task-button-icon {
        font-size: 1.2rem;
      }

      #edit-button {
        top: 0;
        right: 0;
      }

      #delete-button {
        bottom: 0;
        right: 0;
      }
    `;

    this.materialIconLinkElement = createElement('link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    });

    this.textContainerElement = createElement('div', {
      className: 'text-container',
    });
    this.itemContainerElement = createElement('div', {
      className: 'item-container',
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

    this.editTaskButton = createElement('button', {
      className: 'task-button',
      id: 'edit-button',
      onmouseout: (e) => {
        e.target.blur();
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    });
    this.editTaskIcon = createElement('span', {
      className: 'material-icons task-button-icon',
      innerText: 'mode',
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
      this.editTaskButton,
      this.deleteTaskButton,
    );
    this.editTaskButton.appendChild(this.editTaskIcon);
    this.deleteTaskButton.appendChild(this.deleteTaskIcon);
    this.textContainerElement.append(this.nameElement, this.pomodoroContainer);
    this.pomodoroContainer.append(this.pomodoroLabel, this.pomodoroElement);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name':
        this.nameElement.innerText = newValue;
        break;
      case 'used-pomodoros':
        this.usedPomodoros = newValue;
        this.pomodoroElement.innerText = `${this.usedPomodoros}/${this.estimatedPomodoros}`;
        break;
      case 'estimated-pomodoros':
        this.estimatedPomodoros = newValue;
        this.pomodoroElement.innerText = `${this.usedPomodoros}/${this.estimatedPomodoros}`;
        break;
      case 'selected':
        if (newValue === 'true')
          this.itemContainerElement.classList.add('selected');
        else this.itemContainerElement.classList.remove('selected');
        break;
      case 'completed':
        if (newValue === 'true')
          this.itemContainerElement.classList.add('completed');
        else this.itemContainerElement.classList.remove('completed');
        break;
      default:
    }
  }
}

customElements.define('task-item', TaskItem);
export default TaskItem;
