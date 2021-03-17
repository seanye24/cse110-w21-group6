/**
 * @file Constants file
 */

// announcements
export const ANNOUNCEMENTS = {
  pomodoroInterval: 'Focus.',
  shortBreakInterval: 'Enjoy your short break!',
  longBreakInterval: 'Good work. Enjoy a longer break!',
  introduction: 'What do you need to work on today?',
  clickToStart: 'Hit start to begin your pomodoro session!',
  selectNewTask: 'Select another task.',
  taskCompletionQuestion: 'Did you finish the task?',
  endOfSession: 'Good work today!',
  noTasksAvailable: 'No work to be done.',
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
export const ACTIONS = {
  changeSession: 'change current session',
  changeCurrentTime: 'change current time',
  changeCurrentInterval: 'change current interval',
  changeCurrentSelectedTask: 'change currently selected task',
  incrementCurrentTask: 'increment current task',
  completeCurrentTask: 'complete current task',
  doNotCompleteCurrentTask: 'do not complete current task',
  incrementNumberOfPomodoros: 'increment number of pomodoros completed',
  incrementNumberOfTasks: 'increment number of tasks completed',
  changePomodoroLength: 'change pomodoro length',
  changeShortBreakLength: 'change short break length',
  changeLongBreakLength: 'change long break length',
  changeTimerAudio: 'change timer audio',
};
