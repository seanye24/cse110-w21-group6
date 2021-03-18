/**
 * @file task-item-form web component
 */

import styles from '../styles/task-item-form.component.css';
import { subscribe } from '../models';
import { ACTIONS, INTERVALS } from '../utils/constants';
import { createElement } from '../utils/helpers';

/**
 * Custom web component representing a task item form.
 * @extends HTMLElement
 * @param {number} name - name of task
 * @param {number} estimated-pomodoros - estimated number of pomodoros needed
 */
class TaskItemForm extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    this.styleElement = createElement('style', {
      innerText: styles.toString(),
    });

    this.containerElement = createElement('form', {
      className: 'task-form',
    });

    this.fieldInputContainer = createElement('div', {
      className: 'field-input-container',
    });

    this.nameInputContainer = createElement('div', {
      className: 'name-input-container',
    });

    this.nameInputLabel = createElement('label', {
      className: 'task-input-label',
      id: 'name-input-label',
      for: 'name-input',
      innerText: 'Name',
    });

    this.nameInputElement = createElement('input', {
      className: 'task-input',
      id: 'name-input',
      type: 'text',
      name: 'name',
      placeholder: 'Task Description...',
      required: true,
    });

    this.pomodoroInputContainer = createElement('div', {
      className: 'pomodoro-input-container',
    });

    this.pomodoroInputLabel = createElement('label', {
      className: 'task-input-label',
      id: 'pomodoro-input-label',
      for: 'pomodoro-input',
      innerText: 'Est Pomodoros',
    });

    this.pomodoroInputElement = createElement('input', {
      className: 'task-input',
      id: 'pomodoro-input',
      type: 'number',
      name: 'pomodoro',
      placeholder: '#',
      min: '1',
      required: true,
    });

    this.submitInputElement = createElement('input', {
      className: 'task-input pomodoro',
      id: 'submit-input',
      type: 'submit',
      value: 'ADD',
    });

    this.shadow.append(this.styleElement, this.containerElement);
    this.containerElement.append(
      this.fieldInputContainer,
      this.submitInputElement,
    );
    this.fieldInputContainer.append(
      this.nameInputContainer,
      this.pomodoroInputContainer,
    );
    this.nameInputContainer.append(this.nameInputLabel, this.nameInputElement);
    this.pomodoroInputContainer.append(
      this.pomodoroInputLabel,
      this.pomodoroInputElement,
    );

    subscribe({
      [ACTIONS.changeSession]: (sessionState) => {
        if (sessionState.session === 'inactive') {
          this.submitInputElement.className = 'pomodoro';
        }
      },
      [ACTIONS.changeCurrentInterval]: (sessionState) => {
        if (sessionState.session === 'active') {
          switch (sessionState.currentInterval) {
            case INTERVALS.pomodoro:
              this.submitInputElement.className = 'pomodoro';
              break;
            case INTERVALS.shortBreak:
              this.submitInputElement.className = 'short-break';
              break;
            case INTERVALS.longBreak:
              this.submitInputElement.className = 'long-break';
              break;
            default:
              this.submitInputElement.className = 'pomodoro';
          }
        }
      },
    });
  }
}

export default TaskItemForm;
