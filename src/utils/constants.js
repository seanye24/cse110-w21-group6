/**
 * @file Constants file
 */

// announcements
export const POMODORO_ANNOUNCEMENT = 'Focus.';
export const SHORT_BREAK_ANNOUNCEMENT = 'Enjoy your short break!';
export const LONG_BREAK_ANNOUNCEMENT = 'Good work. Enjoy a longer break!';
export const INTRO_ANNOUNCEMENT = 'What do you need to work on today?';
export const INTRO_SELECT_TASK_ANNOUNCEMENT = 'Select a task then hit start!';
export const NEW_SELECT_TASK_ANNOUNCEMENT = 'Select another task.';
export const CONTINUING_SELECT_TASK_ANNOUNCEMENT =
  'Select another task if you would like.';
export const TASK_COMPLETION_QUESTION = 'Did you finish the task?';
export const END_OF_SESSION_ANNOUNCEMENT = 'Good work today!';
export const NO_TASKS_ANNOUNCEMENT = 'No work to be done.';

// various names (mainly for localStorage)
export const POMODORO_INTERVAL = 'pomodoroInterval';
export const SHORT_BREAK_INTERVAL = 'shortBreakInterval';
export const LONG_BREAK_INTERVAL = 'longBreakInterval';
export const TIMER_AUDIO = 'timerAudio';

// timer audio paths
export const TIMER_AUDIOS = {
  calm: 'assets/calm-alarm.mp3',
  annoying: 'assets/original-alarm.mp3',
  kanye: 'assets/kanye-stop.mp3',
};

// default settings
export const DEFAULT_POMODORO_LENGTH = 25;
export const DEFAULT_SHORT_BREAK_LENGTH = 5;
export const DEFAULT_LONG_BREAK_LENGTH = 15;
export const DEFAULT_TIMER_AUDIO = TIMER_AUDIOS.calm;

// actions
const CHANGE_SESSION = 'change current session';
const CHANGE_TIME = 'change current time';
const CHANGE_INTERVAL = 'change current interval';
const SELECT_TASK = 'select task';
const INCREMENT_CURRENT_TASK = 'increment current task';
const COMPLETE_CURRENT_TASK = 'complete current task';
const DID_NOT_COMPLETE_CURRENT_TASK = "didn't complete current task";
const SET_NUM_POMODOROS = 'set number of pomodoros';
const SET_POMODORO_LENGTH = 'set pomodoro length';
const SET_SHORT_BREAK_LENGTH = 'set short break length';
const SET_LONG_BREAK_LENGTH = 'set long break length';
const SET_TIMER_AUDIO = 'set timer audio';
export const ACTIONS = {
  CHANGE_SESSION,
  CHANGE_TIME,
  CHANGE_INTERVAL,
  SELECT_TASK,
  INCREMENT_CURRENT_TASK,
  COMPLETE_CURRENT_TASK,
  DID_NOT_COMPLETE_CURRENT_TASK,
  SET_NUM_POMODOROS,
  SET_POMODORO_LENGTH,
  SET_SHORT_BREAK_LENGTH,
  SET_LONG_BREAK_LENGTH,
  SET_TIMER_AUDIO,
};
