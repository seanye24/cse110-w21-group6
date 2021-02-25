/* global myStorage: true */
/* eslint no-use-before-define: ["error", { "functions": false }] */

/**
 * @author Fernando Bracamonte
 * @file Timer script used to emulate the pomodoro process
 */

const WORK_SESSION = 25 * 60; // convert 25 minutes to seconds
const SHORT_BREAK = 5 * 60; // convert 5 minutes to seconds
const LONG_BREAK = 15 * 60; // convert 15 minutes to seconds

// Variables to save the pomodoro sessions
const workSession = 'Work';
const shortBreak = 'Short Break';
const longBreak = 'Long Break';
let currSession = workSession;

// variables to store the text for the pomodoro timer
const startButton = 'START';
const endButton = 'endButton';
const yesButton = 'Yes';

// Variables used to modify HTML elements
const timerButton = document.getElementById('timer-button');
const timeDisplay = document.getElementById('time-display');
const sessionDisplay = document.getElementById('session-display');
const finishedTask = document.getElementById('task-finished');

myStorage = window.localStorage;
myStorage.pomodoros = 0; // save number of pomodoros completed

let countdown; // variable used to clear the time Interval if needed

/**
 * @param {number} seconds variable that contains seconds left in the timer
 * @function displayTimeLeft 
 * @description Helper function that takes seconds left and displays it
 * into minutes and seconds left, as 00:00.
 */
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  const display = `${minutes < 10 ? '0' : ''}${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;

  timeDisplay.textContent = display; // set html timer display with correct time left
  document.title = display; // set title of website with countdown
}

/**
 * @function updateSession 
 * @description Helper function that updates to the correct pomodoro sessison
 * @example If current session is 'work session', then we must either change it to
 * 'long break' or 'short break' depending on how many pomodoros have been completed
 */
function updateSession() {
  if (currSession === longBreak || currSession === shortBreak) {
    currSession = workSession;
    timerButton.textContent = endButton;
    finishedTask.textContent = '';
  } else if (currSession === workSession) {
    if (
      parseInt(myStorage.pomodoros, 10) % 4 === 0 &&
      parseInt(myStorage.pomodoros, 10) !== 0
    ) {
      currSession = longBreak;
      timerButton.textContent = yesButton;
      finishedTask.textContent = 'Did you complete your task?';
    } else {
      currSession = shortBreak;
      timerButton.textContent = yesButton;
      finishedTask.textContent = 'Did you complete your task?';
    }
  }
}

/**
 *
 * @param {number} seconds
 * @function timer 
 * @description Function that handles the updating of the time, second by second
 */
function timer(seconds) {
  displayTimeLeft(seconds); // fixes bug where initial time does not show
  sessionDisplay.textContent = currSession;

  let secondsLeft = seconds;

  // set interval that counts down until 00:00, and it takes 1 second
  // to decrement each second passed
  countdown = setInterval(() => {
    secondsLeft -= 1;

    if (secondsLeft < 0) {
      clearInterval(countdown);

      // Increment pomodoros completed
      if (currSession === workSession) {
        myStorage.pomodoros = parseInt(myStorage.pomodoros, 10) + 1;
        document.getElementById(
          'pom-completed',
        ).innerHTML = `Pomodoros completed: ${myStorage.pomodoros}`;
      }
      updateSession();
      loopTimer();
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

/**
 * @function loopTimer 
 * @description Helper function that basically creates an infinite loop,
 * where after each session, it determines which session would be the next and
 * calls the timer function
 */
function loopTimer() {
  timerButton.disabled = false;

  if (currSession === workSession) {
    timer(WORK_SESSION);
  }
  if (currSession === longBreak) {
    timer(LONG_BREAK);
  }
  if (currSession === shortBreak) {
    timer(SHORT_BREAK);
  }
}

/**
 * @function startTimer 
 * @description Function that is called when the timer button is clicked. 
 * It handles the different scenarios of whether to disable button, or end timer, etc.
 */
function startTimer() {
  if (timerButton.textContent === startButton) {
    sessionDisplay.innerText = currSession;
    timerButton.textContent = endButton;

    timer(WORK_SESSION);
  } else if (timerButton.textContent === endButton) {
    clearInterval(countdown);
    displayTimeLeft(WORK_SESSION);
    timerButton.textContent = startButton;
    currSession = workSession;
  } else if (timerButton.textContent === yesButton) {
    // deleteTask(); //call fucntion to delete task
    timerButton.disabled = true;
  }
}

/**
 * @function deleteTask 
 * @description Function that deletes first task added to the "queue"
 */
// function deleteTask() {}

/**
 * @function resetPomodoroCount 
 * @description Function to reset pomodoro count,
 * potentially usefull for end of day, so next day starts with 0 pomodoros completed
 *
function resetPomodoroCount() {
  myStorage.pomodoros = 0;
} */

timerButton.addEventListener('click', startTimer);

/*
<!-- HTML ADDED IF NEEDED TO TEST CODE -->

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Pomodoro-Timer</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
<div id="wrapper">
	<h2 id="time-display">25:00</h2>
  <p id="task-finished"></p>
	<button id="timer-button">START</button><br><br>
  <p id="session-display">Work</p>
  <p id="pom-completed"></p>

</div>
<script src="timer_new.js"></script>
</body>
</html>

 */
