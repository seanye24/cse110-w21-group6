/**
 * @file task-list web component
 */

import { createElement } from '../utils';

/**
 * Custom web component representing a task list.
 * @extends HTMLElement
 */
class TaskList extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.styleElement = document.createElement('style');
    this.styleElement.innerText = `
      .container {
        margin: 1em;
        font-family: Roboto, sans-serif;
        border: 1px solid #aaa;
        border-radius: 5px;
      }

      .title {
        text-align: center;
      }
    `;

    this.containerElement = createElement('div', {
      className: 'container',
    });

    this.titleElement = createElement('h1', {
      className: 'title',
      innerText: 'Task List',
    });

    this.taskItemListContainerElement = createElement('div', {
      className: 'task-item-container',
    });

    this.taskItemFormElement = createElement('task-item-form', {
      className: 'task-item-form',
    });

    this.shadow.append(this.styleElement, this.containerElement);
    this.containerElement.append(
      this.titleElement,
      this.taskItemListContainerElement,
      this.taskItemFormElement,
    );
  }
}

customElements.define('task-list', TaskList);
