/**
 * @file settings web component
 */

import { TIMER_AUDIOS } from '../utils/constants';
import { createElement } from '../utils/helpers';
import {
  validateShortBreakLength,
  validateLongBreakLength,
  validateTimerAudio,
} from '../utils/settings';

const timerAudioDescriptions = {
  calm: 'Calm Alarm',
  annoying: 'Original Alarm',
  kanye: 'Kanye Telling You to Stop',
};

/**
 * Custom web component representing the settings popup
 * @extends HTMLElement
 * @param {number} shortBreakLength - short break time
 * @param {number} longBreakLength - long break time
 * @param {string} timerAudio - pathway to sound file
 */
class Settings extends HTMLElement {
  static get observedAttributes() {
    return ['short-break-length', 'long-break-length', 'timer-audio'];
  }

  constructor() {
    super();

    this._shortBreakLength = 0;
    this._longBreakLength = 0;
    this._timerAudio = '';

    this.styleElement = createElement('style', {
      innerText: `
          .popup-container {
            position: fixed;
            z-index: 5;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            min-width: 500px;
            width: 80%;
            border-radius: 5px;
            padding: 1.5rem 3rem;
            transition: 200ms ease-in-out;
            background: white;
            font: 1.1rem 'Source Sans Pro', sans-serif;
            color: #2b2b2b;
          }
          
          .popup-container.active {
            transform: translate(-50%, -50%) scale(1);
          }
          
          .popup-title {
            margin: 0;
            font: 2rem 'Lato', sans-serif;
            color: #757575;
            opacity: 0.9;
          }
          
          .popup-title-hr {
            margin: 0 0 1rem 0;
          }

          .form-inputs-container {
            margin: 0 0 2rem 0;
          }
          
          .form-input-container {
            margin: 1rem 0 0 0;
            display: flex;
            align-items: center;
          }
          
          .form-input-label {
            width: 12ch;
            margin-right: 1rem;
          }

          .form-input {
            cursor: pointer;
            width: 4.5ch;
            border: none;
            border-radius: 5px;
            margin-right: 1rem;
            padding: 0.3em 0.5em;
            font: 1.1rem 'Source Sans Pro', sans-serif;
            color: #2b2b2b;
            background: #eee;
          }
          
          #timer-audio-input {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 30ch;
            background: url(assets/sound.png) 96% / 10% no-repeat #eee;
          }
          
          .break-input-bounds {
            color: #808080;
          }

          .error-message {
            margin: 0; 
            display: none;
            color: red;
          }
          
          .save-button {
            cursor: pointer;
            width: 75%;
            display: block;
            border: none;
            border-radius: 0.25rem;
            margin: 0 auto 0.5rem auto;
            padding: 0.5em;
            background: #b0b0b0;
            font: 1.1rem 'Duru Sans', sans-serif;
            text-align: center;
            color: #2b2b2b;
          }

          .save-button:hover {
            opacity: 0.9;
          }
          
          #overlay {
            position: fixed;
            z-index: 4;
            top: 0;
            width: 100vw;
            height: 100vh;
            transition: 200ms ease-in-out;
            visibility: hidden;
            background-color: rgba(0, 0, 0, 0.5);
          }
          
          #overlay.active {
            cursor: pointer;
            visibility: visible;
          }
        `,
    });

    // Opening Shadow DOM
    this.shadow = this.attachShadow({ mode: 'open' });

    // container elements
    this.popupContainer = createElement('div', {
      className: 'popup-container',
    });
    this.formInputsContainer = createElement('div', {
      className: 'form-inputs-container',
    });

    // title element
    this.popupTitle = createElement('h1', {
      className: 'popup-title',
      innerText: 'SETTINGS',
    });
    this.popupTitleHr = createElement('hr', {
      className: 'popup-title-hr',
    });

    // short break form
    this.shortBreakContainer = createElement('div', {
      className: 'form-input-container',
    });
    this.shortBreakLabel = createElement('label', {
      innerText: 'Short Break: ',
      for: 'short-break-input',
      className: 'form-input-label',
    });
    this.shortBreakInput = createElement('input', {
      id: 'short-break-input',
      className: 'form-input',
      name: 'short-break-input',
      type: 'number',
      min: '3',
      max: '5',
      value: this._shortBreakLength,
    });
    this.shortBreakBounds = createElement('span', {
      className: 'break-input-bounds',
      innerText: '3 - 5 minutes',
    });
    this.shortBreakError = createElement('p', {
      className: 'error-message',
      innerText: 'Please enter a valid short break length.',
    });

    // long break form
    this.longBreakContainer = createElement('div', {
      className: 'form-input-container',
    });
    this.longBreakLabel = createElement('label', {
      innerText: 'Long Break: ',
      for: 'long-break-input',
      className: 'form-input-label',
    });
    this.longBreakInput = createElement('input', {
      id: 'long-break-input',
      className: 'form-input',
      name: 'long-break-input',
      type: 'number',
      min: '15',
      max: '30',
      value: this._longBreakLength,
    });
    this.longBreakBounds = createElement('span', {
      className: 'break-input-bounds',
      innerText: '15 - 30 minutes',
    });
    this.longBreakError = createElement('p', {
      className: 'error-message',
      innerText: 'Please enter a valid long break length.',
    });

    // timer audio form
    this.timerAudioContainer = createElement('div', {
      className: 'form-input-container',
    });
    this.timerAudioLabel = createElement('label', {
      for: 'timer-audio-input',
      innerText: 'Sound: ',
      className: 'form-input-label',
    });
    this.timerAudioInput = createElement('select', {
      id: 'timer-audio-input',
      className: 'form-input',
      name: 'sound',
    });
    this.timerAudioOptions = Object.entries(TIMER_AUDIOS).map(([name, path]) =>
      createElement('option', {
        value: path,
        innerText: timerAudioDescriptions[name],
      }),
    );

    // save button
    this.saveButton = createElement('button', {
      innerText: 'SAVE',
      className: 'save-button',
      onmousedown: (e) => e.preventDefault(),
    });

    // popup overlay
    this.overlayEl = createElement('div', {
      id: 'overlay',
    });

    this.shadow.append(this.styleElement, this.popupContainer, this.overlayEl);
    this.popupContainer.append(
      this.popupTitle,
      this.popupTitleHr,
      this.formInputsContainer,
      this.saveButton,
    );
    this.formInputsContainer.append(
      this.shortBreakContainer,
      this.shortBreakError,
      this.longBreakContainer,
      this.longBreakError,
      this.timerAudioContainer,
    );
    this.shortBreakContainer.append(
      this.shortBreakLabel,
      this.shortBreakInput,
      this.shortBreakBounds,
    );
    this.longBreakContainer.append(
      this.longBreakLabel,
      this.longBreakInput,
      this.longBreakBounds,
    );
    this.timerAudioContainer.append(this.timerAudioLabel, this.timerAudioInput);
    this.timerAudioInput.append(...this.timerAudioOptions);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'short-break-length': {
        const shortBreakLength = validateShortBreakLength(newValue);
        if (shortBreakLength === null) {
          this.setAttribute(name, oldValue);
          return;
        }

        this._shortBreakLength = shortBreakLength;
        this.shortBreakInput.value = this._shortBreakLength;
        this.shortBreakError.visibility = 'hidden';
        break;
      }
      case 'long-break-length': {
        const longBreakLength = validateLongBreakLength(newValue);
        if (longBreakLength === null) {
          this.setAttribute(name, oldValue);
          return;
        }

        this._longBreakLength = longBreakLength;
        this.longBreakInput.value = this._longBreakLength;
        this.longBreakError.visibility = 'hidden';
        break;
      }
      case 'timer-audio': {
        const timerAudio = validateTimerAudio(newValue);
        if (timerAudio === null) {
          this.setAttribute(name, oldValue);
          return;
        }

        this._timerAudio = timerAudio;
        this.timerAudioInput.value = this._timerAudio;
        break;
      }
      default:
    }
  }

  get shortBreakLength() {
    return this._shortBreakLength;
  }

  set shortBreakLength(value) {
    const shortBreakLength = validateShortBreakLength(value);
    if (shortBreakLength === null) {
      return;
    }

    this._shortBreakLength = shortBreakLength;
    this.setAttribute('short-break-length', this._shortBreakLength);
  }

  get longBreakLength() {
    return this._longBreakLength;
  }

  set longBreakLength(value) {
    const longBreakLength = validateLongBreakLength(value);
    if (longBreakLength === null) {
      return;
    }

    this._longBreakLength = longBreakLength;
    this.setAttribute('long-break-length', this._longBreakLength);
  }

  get timerAudio() {
    return this._timerAudio;
  }

  set timerAudio(value) {
    const timerAudio = validateTimerAudio(value);
    if (timerAudio === null) {
      return;
    }

    this._timerAudio = timerAudio;
    this.setAttribute('timer-audio', this._timerAudio);
  }
}

export default Settings;
