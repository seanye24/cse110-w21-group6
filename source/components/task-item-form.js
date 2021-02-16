import { createElement } from '../utils/index.js';

class TaskItemForm extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    this.styleLinkElement = createElement({
      element: 'link',
      rel: 'stylesheet',
      href: 'source/styles/task-item-form.css',
    });

    this.containerElement = createElement({
      element: 'form',
      class: 'task-form',
    });

    this.titleInputLabel = createElement({
      element: 'label',
      for: 'title-input',
      innerText: 'Title',
    });

    this.titleInputElement = createElement({
      element: 'input',
      class: 'task-input',
      id: 'title-input',
      type: 'text',
      name: 'title',
      placeholder: 'task title',
    });

    this.descriptionInputLabel = createElement({
      element: 'label',
      for: 'description-input',
      innerText: 'Description',
    });

    this.descriptionInputElement = createElement({
      element: 'input',
      class: 'task-input',
      id: 'description-input',
      type: 'text',
      name: 'description',
      placeholder: 'task description',
    });

    this.submitInputElement = createElement({
      element: 'input',
      class: 'task-input',
      id: 'submit-input',
      type: 'submit',
      value: 'Add',
    });

    this.shadow.append(this.styleLinkElement, this.containerElement);
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
