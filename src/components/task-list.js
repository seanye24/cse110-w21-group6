import { createElement } from '../utils/index.js';

class TaskList extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    this.stylesLinkElement = createElement({
      element: 'link',
      rel: 'stylesheet',
      href: 'source/styles/task-list.css',
    });

    this.containerElement = createElement({
      element: 'div',
      class: 'container',
    });

    this.titleElement = createElement({
      element: 'h1',
      class: 'title',
      innerText: 'Task List',
    });

    this.taskItemListContainerElement = createElement({
      element: 'div',
      class: 'task-item-container',
    });

    this.taskItemFormElement = createElement({
      element: 'task-item-form',
      class: 'task-item-form',
    });

    this.shadow.append(this.stylesLinkElement, this.containerElement);
    this.containerElement.append(
      this.titleElement,
      this.taskItemListContainerElement,
      this.taskItemFormElement,
    );
  }
}

customElements.define('task-list', TaskList);
