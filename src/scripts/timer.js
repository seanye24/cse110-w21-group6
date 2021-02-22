/* global myStorage: true */
/* eslint no-use-before-define: ["error", { "functions": false }] */

const WORK_SESSION = 25 * 60; // convert 25 minutes to seconds
const SHORT_BREAK = 5 * 60; // convert 5 minutes to seconds
const LONG_BREAK = 15 * 60; // convert 15 minutes to seconds

const workSession = 'Work';
const shortBreak = 'Short Break';
const longBreak = 'Long Break';
let currSession = workSession;

const startButton = 'START';
const stopButton = 'STOP';
const yesButton = 'Yes';

const timerButton = document.getElementById('timer-button');
const timeDisplay = document.getElementById('time-display');
const sessionDisplay = document.getElementById('session-display');
const finishedTask = document.getElementById('task-finished');

myStorage = window.localStorage;
myStorage.pomodoros = 0; // save number of pomodoros completed

let countdown;

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  const display = `${minutes < 10 ? '0' : ''}${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;

  timeDisplay.textContent = display;
  document.title = display; // set title of website with countdown
}

function updateSession() {
  if (currSession === longBreak || currSession === shortBreak) {
    currSession = workSession;
    timerButton.textContent = stopButton;
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

function timer(seconds) {
  displayTimeLeft(seconds); // fixes bug where initial time does not show
  sessionDisplay.textContent = currSession;

  let secondsLeft = seconds;

  countdown = setInterval(() => {
    secondsLeft -= 1;

    if (secondsLeft < 0) {
      clearInterval(countdown);

      if (currSession === workSession) {
        myStorage.pomodoros = parseInt(myStorage.pomodoros, 10) + 1;
        document.getElementById(
          'pom-completed',
        ).innerHTML = `Pomos completed: ${myStorage.pomodoros}`;
      }
      updateSession();
      loopTimer();
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

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

function startTimer() {
  if (timerButton.textContent === startButton) {
    sessionDisplay.innerText = currSession;
    timerButton.textContent = stopButton;

    timer(WORK_SESSION);
  } else if (timerButton.textContent === stopButton) {
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
 * Function that deletes first task added to the "queue"
 */
// function deleteTask() {}

/**
 * Function to reset pomodoro count
 * potentially usefull for end of day,
 * so next day starts fresh
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
