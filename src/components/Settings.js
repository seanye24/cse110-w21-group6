/**
 * @file settings web component
 */

import {
  createElement,
  checkIfShortInputValid,
  checkIfLongInputValid,
} from '../utils/utils';

/**
 * Custom web component representing the settings popup
 * @extends HTMLElement
 * @param {number} shortBreakLength - short break time
 * @param {number} longBreakLength - long break time
 */
class Settings extends HTMLElement {
  static get observedAttributes() {
    return ['shortBreakLength', 'longBreakLength'];
  }

  constructor() {
    super();

    this._shortBreak = this.getAttribute('shortBreakLength');
    this._longBreak = this.getAttribute('longBreakLength');

    this.styleElement = createElement('style', {
      innerText: `
        .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            transition: 200ms ease-in-out;
            border-radius: 10px;
            z-index: 10;
            background-color: white;
            width: 700px;
            max-width: 80%;
          }
          
          .popup.active {
            transform: translate(-50%, -50%) scale(1);
          }
          
          .settings-title {
            font: 2rem 'Source Sans Pro', sans-serif;
            color: #777;
            letter-spacing: 0.1em;
          }
          
          .settings-hr {
            margin-top: -1em;
            margin-bottom: 2em;
          }
          
          .content {
            font: 1.1rem 'Duru Sans', sans-serif;
            padding: 20px;
          }
          
          .content .form-input input {
            text-decoration: none;
            font: 1.1rem 'Duru Sans', sans-serif;
            border: none;
            text-align: center;
            margin-left: 0.5em;
          }
          
          .content .form-input {
            text-align: center;
            margin-bottom: 1.5em;
            display: flex;
            justify-content: center;
          }
          
          .content .form-input .bounds {
            color: #808080;
            margin-left: 1em;
          }
          
          .content button {
            background-color: #48cae4;
            border: none;
            border-radius: 20px;
            color: white;
            letter-spacing: 10px;
            font: 1.1rem 'Duru Sans', sans-serif;
            text-align: center;
            text-decoration: none;
            margin-top: 0;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 1.5em;
            display: block;
            width: 75%;
            cursor: pointer;
          }
          
          .content .error {
            color: red;
            position: absolute;
            margin-top: 50px;
            visibility: hidden;
          }
          
          #overlay {
            position: fixed;
            opacity: 0;
            transition: 200ms ease-in-out;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            pointer-events: none;
          }
          
          #overlay.active {
            opacity: 1;
            pointer-events: all;
          }
        `,
    });

    // Opening Shadow DOM
    this.shadow = this.attachShadow({ mode: 'open' });

    // Creating all the elements
    this.popupContainer = createElement('div', {
      className: 'popup',
      id: 'popup',
    });
    this.contentContainer = createElement('div', {
      className: 'content',
    });
    this.popupTitle = createElement('h1', {
      className: 'settings-title',
      innerText: 'SETTINGS',
    });
    this.popupTitleLine = createElement('hr', {
      className: 'settings-hr',
    });
    this.inputContainerShort = createElement('div', {
      className: 'form-input',
    });
    this.inputLabelShort = createElement('p', {
      innerText: 'Short Break: ',
    });
    this.inputBoxShort = createElement('input', {
      id: 'short-number',
      name: 'short-number',
      type: 'number',
      min: '3',
      max: '5',
      value: this._shortBreak,
    });
    this.inputBoundShort = createElement('p', {
      className: 'bounds',
      innerText: '3 - 5 minutes',
    });
    this.inputErrorShort = createElement('p', {
      className: 'error',
      innerText: 'Please enter valid entry',
    });
    this.inputErrorShort.style.visibility = 'hidden';
    this.inputContainerLong = createElement('div', {
      className: 'form-input',
    });
    this.inputLabelLong = createElement('p', {
      innerText: 'Long Break: ',
    });
    this.inputBoxLong = createElement('input', {
      id: 'long-number',
      name: 'long-number',
      type: 'number',
      min: '15',
      max: '30',
      value: this._longBreak,
    });
    this.inputBoundLong = createElement('p', {
      className: 'bounds',
      innerText: '15 - 30 minutes',
    });
    this.inputErrorLong = createElement('p', {
      className: 'error',
      innerText: 'Please enter valid entry',
    });
    this.inputErrorLong.style.visibility = 'hidden';
    this.inputContainerSound = createElement('div', {
      className: 'form-input',
    });
    this.inputLabelSound = createElement('p', {
      innerText: 'Sound: ',
    });
    this.inputBoxSound = createElement('select', {
      name: 'sound',
      id: 'sound',
    });
    this.soundOption1 = createElement('option', {
      value: 'mp3',
      innerText: 'Calm Alarm',
    });
    this.soundOption2 = createElement('option', {
      value: 'mp3',
      innerText: 'Orginal Alarm',
    });
    this.soundOption3 = createElement('option', {
      value: 'mp3',
      innerText: 'Kanye Telling You to Stop',
    });
    this.saveButton = createElement('button', {
      innerText: 'SAVE',
      className: 'save-button',
    });
    this.overlayEl = createElement('div', {
      id: 'overlay',
    });

    this.inputContainerShort.append(
      this.inputLabelShort,
      this.inputBoxShort,
      this.inputBoundShort,
      this.inputErrorShort,
    );

    this.inputContainerLong.append(
      this.inputLabelLong,
      this.inputBoxLong,
      this.inputBoundLong,
      this.inputErrorLong,
    );

    this.inputBoxSound.append(
      this.soundOption1,
      this.soundOption2,
      this.soundOption3,
    );

    this.inputContainerSound.append(this.inputLabelSound, this.inputBoxSound);

    this.contentContainer.append(
      this.popupTitle,
      this.popupTitleLine,
      this.inputContainerShort,
      this.inputContainerLong,
      this.inputContainerSound,
      this.saveButton,
    );

    this.popupContainer.append(this.contentContainer);

    this.shadow.append(this.styleElement, this.popupContainer, this.overlayEl);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const isShortInputValid = checkIfShortInputValid(newValue);
    const isLongInputValid = checkIfLongInputValid(newValue);
    switch (name) {
      case 'shortBreakLength':
        if (isShortInputValid) {
          this._shortBreak = newValue;
          this.inputBoxShort.value = newValue;
          this.inputErrorShort.visibility = 'hidden';
        }
        break;
      case 'longBreakLength':
        if (isLongInputValid) {
          this._longBreak = newValue;
          this.inputBoxLong.value = newValue;
          this.inputErrorLong.visibility = 'hidden';
        }
        break;
      default:
    }
  }

  get shortBreak() {
    return this._shortBreak;
  }

  set shortBreak(shortBreak) {
    this._shortBreak = shortBreak;
    this.setAttribute('shortBreakLength', this._shortBreak);
  }

  get longBreak() {
    return this._longBreak;
  }

  set longBreak(longBreak) {
    this._longBreak = longBreak;
    this.setAttribute('longBreakLength', this._longBreak);
  }
}

export default Settings;
