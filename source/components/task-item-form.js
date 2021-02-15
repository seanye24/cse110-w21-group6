class TaskItemForm extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.styleLinkElement = document.createElement('link');
    this.styleLinkElement.setAttribute('rel', 'stylesheet');
    this.styleLinkElement.setAttribute(
      'href',
      'source/styles/task-item-form.css',
    );

    this.containerElement = document.createElement('form');
    this.containerElement.setAttribute('class', 'task-form');

    this.titleInputLabel = document.createElement('label');
    this.titleInputLabel.setAttribute('for', 'task-title-input');
    this.titleInputLabel.innerText = 'Title';

    this.titleInputElement = document.createElement('input');
    this.titleInputElement.setAttribute('class', 'task-input');
    this.titleInputElement.setAttribute('id', 'task-title-input');
    this.titleInputElement.setAttribute('type', 'text');
    this.titleInputElement.setAttribute('name', 'title');
    this.titleInputElement.setAttribute('placeholder', 'task title');

    this.descriptionInputLabel = document.createElement('label');
    this.descriptionInputLabel.setAttribute('for', 'task-description-input');
    this.descriptionInputLabel.innerText = 'Description';

    this.descriptionInputElement = document.createElement('input');
    this.descriptionInputElement.setAttribute('class', 'task-input');
    this.descriptionInputElement.setAttribute('id', 'task-description-input');
    this.descriptionInputElement.setAttribute('type', 'text');
    this.descriptionInputElement.setAttribute('name', 'description');
    this.descriptionInputElement.setAttribute(
      'placeholder',
      'task description',
    );

    this.submitInputElement = document.createElement('input');
    this.submitInputElement.setAttribute('class', 'task-input');
    this.submitInputElement.setAttribute('id', 'submit-input');
    this.submitInputElement.setAttribute('type', 'submit');
    this.submitInputElement.setAttribute('value', 'Add');

    this.shadow.append(this.containerElement);
    this.shadow.append(this.styleLinkElement);
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
