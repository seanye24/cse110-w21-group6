/**
 * @file task-list web component
 */

import styles from '../styles/task-list.component.css';
import { createElement } from '../utils/helpers';
import TaskItem from './TaskItem';
import TaskItemForm from './TaskItemForm';
import { subscribe } from '../models';
import { ACTIONS, INTERVALS } from '../utils/constants';

customElements.define('task-item', TaskItem);
customElements.define('task-item-form', TaskItemForm);

/**
 * Custom web component representing a task list.
 * @extends HTMLElement
 */
class TaskList extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.styleElement = createElement('style', {
      innerText: styles.toString(),
    });

    this.containerElement = createElement('div', {
      className: 'container pomodoro',
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

    subscribe({
      [ACTIONS.changeSession]: (sessionState) => {
        if (sessionState.session === 'inactive') {
          this.containerElement.className = 'container pomodoro';
        }
      },
      [ACTIONS.changeCurrentInterval]: (sessionState) => {
        if (sessionState.session === 'active') {
          switch (sessionState.currentInterval) {
            case INTERVALS.pomodoro:
              this.containerElement.className = 'container pomodoro';
              break;
            case INTERVALS.shortBreak:
              this.containerElement.className = 'container short-break';
              break;
            case INTERVALS.longBreak:
              this.containerElement.className = 'container long-break';
              break;
            default:
              this.containerElement.className = 'container pomodoro';
          }
        }
      },
    });
  }
}

export default TaskList;
