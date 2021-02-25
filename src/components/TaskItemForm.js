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
        font-family: Roboto, sans-serif;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
      }

      .task-input[type='text'] {
        margin-bottom: 1em;
        padding: 0.75em;
        border-radius: 5px;
        border: 1px solid #777;
        font-size: 0.9rem;
        color: #444;
      }

      .task-input[type='text']:focus {
        border: 2px solid #0077b6;
        outline: none;
        box-shadow: none;
      }

      .task-input[type='text']::placeholder {
        color: #777;
      }

      #submit-input {
        width: 100%;
        margin: auto;
        background: rgba(51, 51, 51, 0.75);
        border-radius: 5px;
        outline: none;
        border: none;
        color: white;
        padding: 1em;
        font-size: 1rem;
      }

      #submit-input:hover {
        cursor: pointer;
        background: rgba(51, 51, 51, 1);
      }
    `;

    this.containerElement = createElement('form', {
      className: 'task-form',
    });

    this.titleInputLabel = createElement('label', {
      for: 'title-input',
      innerText: 'Title',
    });

    this.titleInputElement = createElement('input', {
      className: 'task-input',
      id: 'title-input',
      type: 'text',
      name: 'title',
      placeholder: 'task title',
    });

    this.descriptionInputLabel = createElement('label', {
      for: 'description-input',
      innerText: 'Description',
    });

    this.descriptionInputElement = createElement('input', {
      className: 'task-input',
      id: 'description-input',
      type: 'text',
      name: 'description',
      placeholder: 'task description',
    });

    this.submitInputElement = createElement('input', {
      className: 'task-input',
      id: 'submit-input',
      type: 'submit',
      value: 'Add',
    });

    this.shadow.append(this.styleElement, this.containerElement);
    this.containerElement.append(
      this.titleInputLabel,
      this.titleInputElement,
      this.descriptionInputLabel,
      this.descriptionInputElement,
      this.submitInputElement,
    );
  }
}

customElements.define('task-item-form', TaskItemForm);
