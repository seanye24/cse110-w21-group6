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
export const SET_SESSION = 'set session';
export const SET_CURR_INTERVAL = 'set current interval';
export const SET_CURR_SELECTED_TASK = 'set currently selected task';
export const SET_NUM_POMODOROS = 'set number of pomodoros';
export const SET_POMODORO_LENGTH = 'set pomodoro length';
export const SET_SHORT_BREAK_LENGTH = 'set short break length';
export const SET_LONG_BREAK_LENGTH = 'set long break length';
export const SET_TIMER_AUDIO = 'set timer audio';
