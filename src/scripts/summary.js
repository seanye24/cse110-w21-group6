/**
 * @file Manage Summary Pop-up for page
 * @author Siddharth Nag
 */

import {
    createElement,
} from '../utils/utils';

let summaryElement;

let summaryPopup;
let summaryTasks;
let actualPomos;
let estimatedPomos;
let closeSummaryButton;
let overlay;

let onCloseFunction;

/**
 * @description Access all the shadow root elements and set the summary element
 * @param {HTMLElement} root - the summary element
 */
const setRoot = (root) => {
    summaryElement = root;
    summaryPopup = summaryElement.shadowRoot.querySelector('#summary-popup');
    summaryTasks = summaryElement.shadowRoot.querySelector('#summary-tasks');
    actualPomos = summaryElement.shadowRoot.querySelector('#summary-actual-pomos');
    estimatedPomos = summaryElement.shadowRoot.querySelector('#summary-estimated-pomos');
    closeSummaryButton = summaryElement.shadowRoot.querySelector('#summary-close-button');
    overlay = summaryElement.shadowRoot.querySelector('#overlay');
};

/**
 * Set the initial confirmation element
 * @param {HTMLElement} element - summary element
 */
const initializeSummary = (element, onClose) => {
    setRoot(element);
    onCloseFunction = onClose;
    closeSummaryButton.addEventListener('click', onCloseFunction);
};

/**
 * @function openSummary
 * @description Open the summary popup
 */
function openSummary() {
    summaryPopup.classList.add('active');
    overlay.classList.add('active');
}

/**
 * @function closeSummary
 * @description Close the summary popup
 */
function closeSummary() {
    summaryPopup.classList.remove('active');
    overlay.classList.remove('active');
}

/**
 * @function displaySummary
 * @description Display the tasklist in the summary popup
 */
function displaySummary(tasklist) {
    if (tasklist == null) {
      return;
    }
    tasklist.forEach(task => {
        summaryTasks.append(addTask(task));
    });
  }
  
function addTask(newTask) {
    const {
        name,
        usedPomodoros,
        estimatedPomodoros,
        completed,
    } = newTask;
  
    // create html element
    const taskElement = createElement('task', {
      name,
      'used-pomodoros': usedPomodoros,
      'estimated-pomodoros': estimatedPomodoros,
      completed,
    });
  
    if (completed) {
      taskElement.style.backgroundColor = green;
    } else {
        taskElement.style.backgroundColor = red;
    }
  
    return taskElement;
}  

export { initializeSummary, openSummary, closeSummary, displaySummary };