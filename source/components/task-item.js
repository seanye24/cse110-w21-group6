class TaskItem extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'description'];
  }

  constructor() {
    super();

    // create shadow root
    this.shadow = this.attachShadow({ mode: 'open' });

    this.styleLinkElement = document.createElement('link');
    this.styleLinkElement.setAttribute('rel', 'stylesheet');
    this.styleLinkElement.setAttribute('href', 'source/styles/task-item.css');

    this.materialIconLinkElement = document.createElement('link');
    this.materialIconLinkElement.setAttribute('rel', 'stylesheet');
    this.materialIconLinkElement.setAttribute(
      'href',
      'https://fonts.googleapis.com/icon?family=Material+Icons',
    );

    this.containerElement = document.createElement('div');
    this.containerElement.setAttribute('class', 'container');
    this.titleElement = document.createElement('h1');
    this.titleElement.setAttribute('class', 'title');
    this.descriptionElement = document.createElement('h2');
    this.descriptionElement.setAttribute('class', 'description');

    this.editTaskButton = document.createElement('span');
    this.editTaskButton.setAttribute('class', 'material-icons task-button');
    this.editTaskButton.setAttribute('id', 'edit-button');
    this.editTaskButton.innerText = 'mode';

    this.finishTaskButton = document.createElement('span');
    this.finishTaskButton.setAttribute('class', 'material-icons task-button');
    this.finishTaskButton.setAttribute('id', 'finish-button');
    this.finishTaskButton.innerText = 'done';

    this.deleteTaskButton = document.createElement('span');
    this.deleteTaskButton.setAttribute('class', 'material-icons task-button');
    this.deleteTaskButton.setAttribute('id', 'delete-button');
    this.deleteTaskButton.innerText = 'delete';

    this.shadow.append(this.containerElement);
    this.shadow.append(this.styleLinkElement);
    this.shadow.append(this.materialIconLinkElement);
    this.containerElement.append(this.titleElement);
    this.containerElement.append(this.descriptionElement);
    this.containerElement.append(this.editTaskButton);
    this.containerElement.append(this.finishTaskButton);
    this.containerElement.append(this.deleteTaskButton);
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
