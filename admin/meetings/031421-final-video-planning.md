# Week 11 Group Meeting #1 - (03/14/2021, 3:00 PM PST)

## Attendees
Dillan Merchant, Baban Hamesalh, Fernando Bracamonte, Sash Gollamudi, Sean Ye, Sharon Lei, Siddharth Nag, Sijie Wang

## Agenda
- Changes for testing branch (Fernando) almost complete but Sean added some new ones which will be dealt with today
- Tests have started to be written for Pomodoro Circles but not yet finished
  - Discussion regarding how to run these tests and also certain bug fixes
  - Need to strive for 100% coverage or as close as possible to it
- Validations have been created for most components
- Unit Tests finished Settings, Progress Ring, and Task List
- All components now have a check in the attributeChangedCallback where if something is invalid, the attribute is set to its previous value such that tests can be performed more easily
- Tests to include for each component:
  - If a component has validators or utils, create a separate ‘describe’ for each of them (fill array with all valid inputs and another array with invalid inputs and test each of them)
  - getAttribute/getters (check that default values are correct) and setAttribute/setters (test valid values first and then invalid values)
- sessionState will hold the various variables that are necessary for a user session 
- Public Video
  - Will be shown off to the class 
  - Team Name and Number
  - Brief mention on video or with a picture of each member and their role(s)
  - A quick tour of your Pomo product (make that part sizzle to show off any features or things you are proud of)
  - A brief retrospective of what challenges you faced, what things you felt you overcame and anything you feel you would do differently now that you are done
  - Conclude your video with a brief point of advice for the next students (victims) of 110 projects so they crush the project
- Private Video
  - Will be used to grade the project as a whole
  - Team Name and Number
  - Each team member should be present and in their own words state what they did on the project, what they are proud of and what they feel they could improve upon or address beyond the class (assume around ~30seconds per member)
  - A video discussion about how to access your repo, a tour of the repo organization and a demonstration of making a small change to the repo and the completion of the build process.  You may need to write a more detailed discussion of building or onboarding the product than the video supports.  If so create a markdown file called "onboard.md" and put it in your documentation which goes into more details.
  - A more involved retrospective about how your Agile practices were conducted and what challenges and victories the team faced.  Honesty is the best course of action here as we are more likely to be lenient if we understand you are aware of what you didn't do well on the project and practices.  
  - Conclude your video with a discussion of what things a team taking on your project should do next.  Discuss the features not built yet, improvements to the build pipeline or anything else you would have gotten to given another quarter worth of work.
- Discussion about how to go through making both the public and private videos
