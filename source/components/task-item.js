import { createElement } from '../utils/index.js';

class TaskItem extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'description'];
  }

  constructor() {
    super();

    // create shadow root
    this.shadow = this.attachShadow({ mode: 'open' });

    this.styleLinkElement = createElement({
      element: 'link',
      rel: 'stylesheet',
      href: 'source/styles/task-item.css',
    });

    this.materialIconLinkElement = createElement({
      element: 'link',
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    });

    this.containerElement = createElement({
      element: 'div',
      class: 'container',
    });
    this.titleElement = createElement({
      element: 'h1',
      class: 'title',
    });
    this.descriptionElement = createElement({
      element: 'h2',
      class: 'description',
    });

    this.editTaskButton = createElement({
      element: 'span',
      class: 'material-icons task-button',
      id: 'edit-button',
      innerText: 'mode',
    });

    this.finishTaskButton = createElement({
      element: 'span',
      class: 'material-icons task-button',
      id: 'finish-button',
      innerText: 'done',
    });

    this.deleteTaskButton = createElement({
      element: 'span',
      class: 'material-icons task-button',
      id: 'delete-button',
      innerText: 'delete',
    });

    this.shadow.append(
      this.materialIconLinkElement,
      this.styleLinkElement,
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
