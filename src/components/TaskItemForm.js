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
        border-radius: 5px;
      }

      .task-input[type='text'] {
        margin-bottom: 1em;
        padding: 0.75em;
        border-radius: 5px;
        border: none;
        font: 1rem 'Source Sans Pro', sans-serif;
        color: #444;
      }

      .task-input[type='text']:focus {
        outline: none;
        box-shadow: 0 0 0 2pt #48cae4;
      }

      .task-input[type='text']::placeholder {
        color: #777;
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

    this.nameInputElement = createElement('input', {
      className: 'task-input',
      id: 'name-input',
      type: 'text',
      name: 'name',
      placeholder: 'Task Description...',
    });

    this.submitInputElement = createElement('input', {
      className: 'task-input',
      id: 'submit-input',
      type: 'submit',
      value: 'ADD',
    });

    this.shadow.append(this.styleElement, this.containerElement);
    this.containerElement.append(
      this.nameInputElement,
      this.submitInputElement,
    );
  }
}

customElements.define('task-item-form', TaskItemForm);
