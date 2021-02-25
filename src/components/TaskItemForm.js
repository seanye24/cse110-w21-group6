/**
 * @file task-item-form web component
 */

import { createElement } from '../utils';

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
        padding: 1em 20%;
        display: flex;
        flex-direction: column;
      }

      .field-input-container {
        margin-bottom: 1em;
        border-radius: 5px;
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
        right: 9px;
      }

      .task-input[type='text'],
      .task-input[type='number'] {
        padding: 1.5em 0.75em 0.75em 0.75em;
        border: none;
        font: 1rem 'Source Sans Pro', sans-serif;
        color: #444;
        box-sizing: border-box;
      }

      .task-input:focus {
        box-shadow: 0 0 0 2pt #48cae4;
        outline: none;
        z-index: 1;
        position: relative;
      }

      #name-input {
        width: 80%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      #pomodoro-input {
        width: 20%;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      .task-input[type='text']::placeholder,
      .task-input[type='number']::placeholder {
        color: #c8c8c8;
      }
      .task-input[type='number']::placeholder {
        text-align: center;
      }

      #submit-input {
        width: 50%;
        margin: auto;
        background: #4dcfe9;
        border-radius: 5px;
        outline: none;
        border: none;
        color: white;
        padding: 0.5em;
        font: 1.2rem 'Source Sans Pro', sans-serif;
      }

      #submit-input:hover {
        background: #48cae4;
        cursor: pointer;
      }
    `;

    this.containerElement = createElement('form', {
      className: 'task-form',
    });

    this.fieldInputContainer = createElement('div', {
      className: 'field-input-container',
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
    });

    this.pomodoroInputLabel = createElement('label', {
      className: 'task-input-label',
      id: 'pomodoro-input-label',
      for: 'pomodoro-input',
      innerText: 'Pomodoros',
    });

    this.pomodoroInputElement = createElement('input', {
      className: 'task-input',
      id: 'pomodoro-input',
      type: 'number',
      name: 'pomodoro',
      placeholder: '#',
      min: '1',
    });

    this.submitInputElement = createElement('input', {
      className: 'task-input',
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
      this.nameInputLabel,
      this.nameInputElement,
      this.pomodoroInputLabel,
      this.pomodoroInputElement,
    );
  }
}

customElements.define('task-item-form', TaskItemForm);
