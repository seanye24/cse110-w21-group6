/**
 * @file Constants file
 */
import calm from '../assets/calm-alarm.mp3';
import annoying from '../assets/original-alarm.mp3';
import kanye from '../assets/kanye-stop.mp3';

// announcements
export const ANNOUNCEMENTS = {
  pomodoroInterval: 'Focus.',
  shortBreakInterval: 'Enjoy your short break!',
  longBreakInterval: 'Good work. Enjoy a longer break!',
  introduction: 'What do you need to work on today?',
  clickToStart: 'Hit start to begin your pomodoro session!',
  selectNewTask: 'Select a new task!',
  taskCompletionQuestion: 'Did you finish the task?',
  endOfSession: 'Good work today!',
  noTasksAvailable: 'Add a task to get started!',
};

// interval names
export const INTERVALS = {
  pomodoro: 'pomodoroInterval',
  shortBreak: 'shortBreakInterval',
  longBreak: 'longBreakInterval',
};

// localStorage keys
export const KEYS = {
  shortBreakLength: 'shortBreakLength',
  longBreakLength: 'longBreakLength',
  timerAudio: 'timerAudio',
  tasks: 'tasks',
};

// timer audio paths
export const TIMER_AUDIOS = {
  calm,
  annoying,
  kanye,
};

// default settings
export const DEFAULT_POMODORO_LENGTH = 25;
export const DEFAULT_SHORT_BREAK_LENGTH = 5;
export const DEFAULT_LONG_BREAK_LENGTH = 15;
export const DEFAULT_TIMER_AUDIO = TIMER_AUDIOS.calm;

// actions
export const ACTIONS = {
  changeSession: 'change current session',
  changeTotalSessionTime: 'change total session time',
  changeCurrentTime: 'change current time',
  changeCurrentInterval: 'change current interval',
  changeNumberOfPomodoros: 'change number of pomodoros completed',
  changePomodoroLength: 'change pomodoro length',
  changeShortBreakLength: 'change short break length',
  changeLongBreakLength: 'change long break length',
  changeTimerAudio: 'change timer audio',
  changeSelectedTask: 'change currently selected task',
  incrementSelectedTask: 'increment current task',
  completeSelectedTask: 'complete current task',
  doNotCompleteSelectedTask: 'do not complete current task',
  addToCompletedTasks: 'add to completed tasks',
  clearCompletedTasks: 'clear completed tasks',
};
