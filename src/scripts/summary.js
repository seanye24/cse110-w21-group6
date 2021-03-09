/**
 * @file Manage Summary Pop-up for page
 * @author Siddharth Nag
 */

let summaryElement;

let summaryPopup;
let summaryTasks;
let actualPomos;
let estimatedPomos;
let closeSummaryButton;
let overlay;


/**
 * @description Access all the shadow root elements and set the summary element
 * @param {HTMLElement} root - the summary element
 */
const setRoot = (root) => {
    summaryElement = root;
    summaryPopup = summaryElement.shadowRoot.querySelector('#confirmation-popup');
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
const initializeSummary = (element) => {
    setRoot(element);
    closeSummaryButton.addEventListener('click', function);
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

function displaySummary(tasklist) {
    if (tasklist == null) {
      return;
    }
    tasklist.forEach(task => {
        summaryTasks.append(addTask(task));
    });
  }
  
function addTask(task) {
 /*   const {
        name,
        usedPomodoros,
        estimatedPomodoros,
        completed,
    } = task;*/
  
    // create html element
    const taskElement = createElement('task-item', {
      'name': "HW",
      'used-pomodoros': 2,
      'estimated-pomodoros': 3,
      'completed': 0,
    });
  
 /*   if (completed) {
      // set color to green
    } else {
      // set color to red
    }*/
  
    return taskElement;
}  

export { initializeSummary, openSummary, closeSummary, displaySummary };
