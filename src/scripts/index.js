/* eslint-disable no-await-in-loop */
/**
 * @file Entry point for application
 */

import '../styles/style.css';
import { TaskList, ProgressRing } from '../components';
import { initializeTaskList } from './taskList';
import { initializeProgressRing, setProgress } from './progressRing';
import {
  POMODORO_ANNOUNCEMENT,
  SHORT_BREAK_ANNOUNCEMENT,
  LONG_BREAK_ANNOUNCEMENT,
  POMODORO_INTERVAL,
  SHORT_BREAK_INTERVAL,
  LONG_BREAK_INTERVAL,
} from '../utils/constants';
import {
  getMinutesAndSeconds,
  initializeIntervalLengths,
  setAnnouncement,
  tick,
} from '../utils/utils';

const setTimer = (currTime) => {
  const timer = document.querySelector('.timer');
  const [min, sec] = getMinutesAndSeconds(currTime);
  timer.innerText = `${min < 10 ? `0${min}` : min} : ${
    sec < 10 ? `0${sec}` : sec
  }`;
};

let isSessionOngoing = true;

/**
 * Starts and runs interval until interval is completed
 * @param {number} intervalLength - length of interval (in seconds)
 * @return {Promise<void>} - implicitly returns Promise after currTime reaches 0
 */
const startInterval = async (intervalLength) => {
  let currTime = intervalLength;
  while (currTime >= 0) {
    // quit if session stops
    if (!isSessionOngoing) {
      setTimer(0);
      setProgress(0);
      return;
    }
    const currProgress = Math.round((100 * currTime) / intervalLength);
    setTimer(currTime);
    setProgress(currProgress);
    await tick(1);
    currTime--;
  }
};

/**
 * Handles pomodoro app, dispatches actions to components depending on the current interval
 */
const startSession = async () => {
  const {
    pomodoroLength,
    shortBreakLength,
    longBreakLength,
  } = initializeIntervalLengths();

  const announcementElement = document.querySelector('.announcement');
  let currInterval = POMODORO_INTERVAL;
  let numPomodoros = 0;
  let selectedTask = '';

  // continue looping if session has not been ended
  while (isSessionOngoing) {
    // pick interval to start
    switch (currInterval) {
      case POMODORO_INTERVAL:
        await startInterval(pomodoroLength);
        break;
      case SHORT_BREAK_INTERVAL:
        await startInterval(shortBreakLength);
        break;
      case LONG_BREAK_INTERVAL:
        await startInterval(longBreakLength);
        break;
      default:
    }

    // set next interval and announcements
    if (currInterval === POMODORO_INTERVAL) {
      numPomodoros++;

      // check if break should be short or long
      const shouldBeLongBreak = numPomodoros > 0 && numPomodoros % 4 === 0;
      if (shouldBeLongBreak) {
        currInterval = LONG_BREAK_INTERVAL;
        setAnnouncement(announcementElement, LONG_BREAK_ANNOUNCEMENT);
      } else {
        currInterval = SHORT_BREAK_INTERVAL;
        setAnnouncement(announcementElement, SHORT_BREAK_ANNOUNCEMENT);
      }
    } else {
      currInterval = POMODORO_INTERVAL;
      setAnnouncement(announcementElement, POMODORO_ANNOUNCEMENT);
    }

    // reset progress and give it time to reset (progress-ring transition is 35s)
    setProgress(100);
    await tick(1);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  initializeProgressRing(document.querySelector('.progress-ring'));
  initializeTaskList(document.querySelector('.task-list'));

  // start session when start button is clicked
  const startButton = document.querySelector('.start-button');
  startButton.addEventListener('click', (e) => {
    if (e.target.innerText === 'Start') {
      startSession();
    } else {
      isSessionOngoing = false;
      // TODO: stop session
      // TODO: display metrics
    }
  });
});
