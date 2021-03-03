/**
 * @file task-list web component
 */

import { createElement } from '../utils/utils';

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
        padding: 1em;
        font: normal 1rem 'Source Sans Pro', sans-serif;
        border-radius: 5px;
        background: #00b4d8;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }

      .task-item-container {
        flex: 1;
        overflow: auto;
      }

      .title {
        text-align: center;
        color: #fff;
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

export default TaskList;
