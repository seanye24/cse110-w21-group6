# Week 10 Sprint Review #2 Meeting - (03/07/2021, 2:00 PM PST)

## Attendees
Dillan Merchant, Baban Hamesalh, Fernando Bracamonte, Sash Gollamudi, Sean Ye, Sharon Lei, Siddharth Nag, Sijie Wang

## Progress Made:
- Creation of a rough prototype for Pomodoro Circles web component (Sijie/Baban)
  - Behavior has been properly implemented but visual aspects are missing (i.e. the actual dots)
  - Tests have been implemented but are not able to be properly executed (fixed within this meeting)
  - Planned to display circles using different PNGs but now recommendation is changing to use div elements instead (border-radius = 50%)
  - Will aim to finish today/tomorrow
- Summary Pop-Up (Sharon)
  - Going to include completed tasks only
  - Will not include attempted tasks
  - If we want to include attempted, then have two tabs for completed and attempted
  - Tasks will be color-coded (red to indicate attempted and green to indicate completed)
- End Confirmation Pop-Up (Sid)
  - Functionality works but visual aspects have yet to be created
  - When use clicks “yes” - close the confirmation pop-up and open summary pop-up
  - Will work with Sharon to develop this pop-up alongside the summary pop-up since they show up one after the other
- Settings (Dillan)
  - Changed to be a component
  - Started unit tests for this component
  - Needs to link to index.js
  - Figured out createElement issue
  - Need to work on saving the changes
- Timer Tests (Fernando)
  - Mostly working and Sean approves
  - Just need to be accepted in regards to the pull requests that have been made
- Project Board (Sash)
  - Changed to be focused on urgency (labeled 1-5) in order to allow project members to be able to see what needs to be prioritized over everything else
  - Pull requests are not put onto the project board.
  - Only issues are added to the board to minimize confusion. 
  - If there is an open pull request, the related issues are put into “Under Review”
  - Labels created for Testing, Linking, etc. in order to organize issues
- Web Components (Sean)
  - Finished formatting and setting up most of the web components (not including Settings and Pomodoro Circles)
- Progress Ring (Sean)
  - Progress Bar has been created and is linked to the timer
  - Is updated every second rather than the old implementation of every 8-10 seconds

