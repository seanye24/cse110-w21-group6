# Week 8 Group Meeting #2 - (02/25/2021, 4:00 PM PST)

## Attendees
Dillan Merchant, Baban Hamesalh, Fernando Bracamonte, Sash Gollamudi, Sean Ye, Sharon Lei, Siddharth Nag, Sijie Wang

## Agenda
- Start by discussing the overall wireframe design
  - Change Start/Stop button to be outside of the progress bar circle
  - Orange and Green colors changed to be darker to match the color palette
  - Removal of completed task list and instead keep completed tasks in the same list but crossed off and moved to the bottom of the list
  - Can only select one task during each pomodoro - lock the highlighted task while timer is running
  - Order of tasks is based on insert order
  - When user selects a task, the task is highlighted to indicate chosen task
  - Then user presses start button
  - Selected task will be moved to top while timer is running to clearly see the task at hand
  - Once the timer is done, user should indicate whether they finished task (it will be moved to the bottom of list)
  - [ ] Yes or no button
  - [ ] Get rid of checklist
  - [ ] If user does not select a new task, we either continue the unfinished task if any or we default to the first task in the list

- If they run out of tasks, we give a dialogue asking if they’re done for the day (3 main states)
  - When the user enters the page and the page is fresh, dialogue with “what do you want to do today?”
  - Then user adds some tasks
  - 1 pomo goes by and they still have tasks left - “good job! Do you have any more tasks?”
  - They run out of tasks - “are you done for the day?”
- Discussing empty space and resizing of webpage
  - Change entire format on Figma to landscape
  - Possibly have timer and task list side-by-side
- Keep the pomodoro circles but move them within the progress bar circle
- Settings page (dialogue)
  - How long should the two types of breaks be
  - Customize colors (if time permits)
  - When it pops up, background is grayed out
  - Scale pop up to be smaller than page
- Make a palette with all the style colors
- ADR - get rid of completed task list tab
- Discussed changing project board backlog to be based off of point system
- Discussed how to read and understand the generated JSDocs
- Discussed how to get coverage reports for testing
