/**
 * @file task-item-form web component
 */

import { subscribe } from '../models';
import { ACTIONS, INTERVALS } from '../utils/constants';
import { createElement } from '../utils/helpers';

/**
 * Custom web component representing a task item form.
 * @extends HTMLElement
 * @param {number} name - name of task
 * @param {number} estimated-pomodoros - estimated number of pomodoros needed
 */
class TaskItemForm extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    this.styleElement = document.createElement('style');
    this.styleElement.innerText = `
      .task-form {
        margin: 1em;
        padding: 1em ;
        display: flex;
        flex-direction: column;
      }

      .field-input-container {
        margin-bottom: 1em;
        border-radius: 5px;
        position: relative;
        width: 100%;
        display: flex;
      }

      .name-input-container {
        flex: 4;
        position: relative;
      }

      .pomodoro-input-container {
        flex: 1;
        min-width: 95px;
        position: relative;
      }

      .task-input-label {
        position: absolute;
        z-index: 2;
        font: 0.8rem 'Source Sans Pro', sans-serif;
        color: #777;
      }

      #name-input-label {
        top: 0.2em;
        left: 0.75em;
      }

      #pomodoro-input-label {
        top: 0.2em;
        left: 0.75em;
      }

      .task-input[type='text'],
      .task-input[type='number'] {
        padding: 1.5em 0.75em 0.75em 0.75em;
        border: none;
        font: 1rem 'Source Sans Pro', sans-serif;
        color: #444;
        box-sizing: border-box;
        width: 100%;
      }

      .task-input:focus {
        box-shadow: 0 0 0 2pt #c8c8c8;
        outline: none;
        z-index: 1;
        position: relative;
      }

      #name-input {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      #pomodoro-input {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      .task-input[type='text']::placeholder,
      .task-input[type='number']::placeholder {
        color: #c8c8c8;
      }

      #submit-input {
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 50%;
        margin: auto;
        border-radius: 5px;
        outline: none;
        border: none;
        color: white;
        padding: 0.5em;
        font: 1.1rem 'Duru Sans', sans-serif;
      }

      #submit-input.pomodoro {
        background: rgb(77, 207, 233);
      }

      #submit-input.short-break {
        background: #69da00;
      }

      #submit-input.long-break {
        background: #f98f38;
      }

      #submit-input.pomodoro:hover {
        background: rgb(112, 216, 237);
        cursor: pointer;
      }

      #submit-input.short-break:hover {
        background: #7ce407;
        cursor: pointer;
      }

      #submit-input.long-break:hover {
        background: #f99e3d;
        cursor: pointer;
      }
    `;

    this.containerElement = createElement('form', {
      className: 'task-form',
    });

    this.fieldInputContainer = createElement('div', {
      className: 'field-input-container',
    });

    this.nameInputContainer = createElement('div', {
      className: 'name-input-container',
    });

    this.nameInputLabel = createElement('label', {
      className: 'task-input-label',
      id: 'name-input-label',
      for: 'name-input',
      innerText: 'Name',
    });

    this.nameInputElement = createElement('input', {
      className: 'task-input',
      id: 'name-input',
      type: 'text',
      name: 'name',
      placeholder: 'Task Description...',
      required: true,
    });

    this.pomodoroInputContainer = createElement('div', {
      className: 'pomodoro-input-container',
    });

    this.pomodoroInputLabel = createElement('label', {
      className: 'task-input-label',
      id: 'pomodoro-input-label',
      for: 'pomodoro-input',
      innerText: 'Est Pomodoros',
    });

    this.pomodoroInputElement = createElement('input', {
      className: 'task-input',
      id: 'pomodoro-input',
      type: 'number',
      name: 'pomodoro',
      placeholder: '#',
      min: '1',
      required: true,
    });

    this.submitInputElement = createElement('input', {
      className: 'task-input pomodoro',
      id: 'submit-input',
      type: 'submit',
      value: 'ADD',
    });

    this.shadow.append(this.styleElement, this.containerElement);
    this.containerElement.append(
      this.fieldInputContainer,
      this.submitInputElement,
    );
    this.fieldInputContainer.append(
      this.nameInputContainer,
      this.pomodoroInputContainer,
    );
    this.nameInputContainer.append(this.nameInputLabel, this.nameInputElement);
    this.pomodoroInputContainer.append(
      this.pomodoroInputLabel,
      this.pomodoroInputElement,
    );

    subscribe({
      [ACTIONS.changeSession]: (sessionState) => {
        if (sessionState.session === 'inactive') {
          this.submitInputElement.className = 'pomodoro';
        }
      },
      [ACTIONS.changeCurrentInterval]: (sessionState) => {
        if (sessionState.session === 'active') {
          switch (sessionState.currentInterval) {
            case INTERVALS.pomodoro:
              this.submitInputElement.className = 'pomodoro';
              break;
            case INTERVALS.shortBreak:
              this.submitInputElement.className = 'short-break';
              break;
            case INTERVALS.longBreak:
              this.submitInputElement.className = 'long-break';
              break;
            default:
              this.submitInputElement.className = 'pomodoro';
          }
        }
      },
    });
  }
}

export default TaskItemForm;
