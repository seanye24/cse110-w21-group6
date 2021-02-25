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
    return ['title', 'description'];
  }

  constructor() {
    super();

    // create shadow root
    this.shadow = this.attachShadow({ mode: 'open' });

    this.styleElement = document.createElement('style');
    this.styleElement.innerText = `
      .container {
        background: lightblue;
        font-family: Roboto, sans-serif;
        margin: 1em;
        padding: 0.5em;
        position: relative;
        border-radius: 5px;
      }

      .title {
        font-size: 1.25rem;
      }

      .description {
        font-size: 1rem;
        color: darkgray;
      }

      .task-button {
        position: absolute;
        padding: 0.5em;
        color: rgba(51, 51, 51, 0.5);
      }

      .task-button:hover {
        border-radius: 50%;
        background: rgba(238, 238, 238, 0.5);
        color: rgba(51, 51, 51, 1);
        cursor: pointer;
      }

      #edit-button {
        display: none;
      }

      .container:hover > #edit-button {
        display: initial;
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
    this.titleElement = createElement('h1', {
      className: 'title',
    });
    this.descriptionElement = createElement('h2', {
      className: 'description',
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
      this.titleElement,
      this.descriptionElement,
      this.editTaskButton,
      this.finishTaskButton,
      this.deleteTaskButton,
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this.titleElement.innerText = newValue;
        break;
      case 'description':
        this.descriptionElement.innerText = newValue;
        break;
      default:
    }
  }
}

customElements.define('task-item', TaskItem);
