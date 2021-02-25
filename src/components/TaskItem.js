/**
 * @file task-item web component
 */

import { createElement } from '../utils';

/**
 * Custom web component representing a task item.
 * @extends HTMLElement
 * @param {number} name - name of task
 * @param {number} estimated-pomodoros - estimated number of pomodoros needed
 * @param {number} used-pomodoros - pomodoros used so far
 */
class TaskItem extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'estimated-pomodoros', 'used-pomodoros'];
  }

  constructor() {
    super();

    // create shadow root
    this.shadow = this.attachShadow({ mode: 'open' });

    this.styleElement = document.createElement('style');
    this.styleElement.innerText = `
      .container {
        background: #fff;
        color: #555;
        margin: 1em;
        padding: 0.5em;
        position: relative;
        border-radius: 5px;
      }
      
      .name {
        font-size: 1rem;
      }

      .task-button {
        position: absolute;
        padding: 0.25em;
        color: rgba(51, 51, 51, 0.5);
        font-size: 1rem;
      }

      .task-button:hover {
        border-radius: 50%;
        background: rgba(200, 200, 200, 0.5);
        color: rgba(51, 51, 51, 1);
        cursor: pointer;
      }

      #edit-button {
        top: 0;
        right: 0;
      }

      #finish-button {
        bottom: 0;
        right: 1.5em;
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

    this.containerElement = createElement('div', {
      className: 'container',
    });
    this.nameElement = createElement('p', {
      className: 'name',
    });

    this.editTaskButton = createElement('span', {
      className: 'material-icons task-button',
      id: 'edit-button',
      innerText: 'mode',
    });

    this.finishTaskButton = createElement('span', {
      className: 'material-icons task-button',
      id: 'finish-button',
      innerText: 'done',
    });

    this.deleteTaskButton = createElement('span', {
      className: 'material-icons task-button',
      id: 'delete-button',
      innerText: 'delete',
    });

    this.shadow.append(
      this.materialIconLinkElement,
      this.styleElement,
      this.containerElement,
    );
    this.containerElement.append(
      this.nameElement,
      this.editTaskButton,
      this.finishTaskButton,
      this.deleteTaskButton,
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name':
        this.nameElement.innerText = newValue;
        break;
      case 'used-pomodoros':
        break;
      case 'estimated-pomodoros':
        break;
      default:
    }
  }
}

customElements.define('task-item', TaskItem);
