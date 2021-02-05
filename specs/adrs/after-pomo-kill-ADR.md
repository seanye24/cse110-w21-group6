# Actions to Take after a Pomodoro has been Killed

* Deciders: Baban Hamesalh, Dillan Merchant, Fernando Bracamonte, Sash Gollamudi, Sean Ye, Sharon Lei, Siddharth Nag, Sijie Wang
* Date: February 4th, 2021

## Context and Problem Statement

After a pomodoro has been killed by the user, what should be done by the website immediately afterwards?

## Considered Options

* Allow users to take time before starting the next pomodoro
* Immediately start the next pomodoro

## Pros and Cons of the Options 

### Option 1: Wait for user response

* Good, because it allows the user to take the time to deal with the distraction that caused them to kill the pomodoro in the first place
* Bad, because it could allow for the user to exploit the system and end up taking a break when they're not supposed to

### Option 2: Immediately start next pomodoro

* Good, because it guarantees that users cannot exploit it to get extra breaks
* Bad, because it does not allow users to deal with the distraction at hand

## Decision Outcome

Chosen option: Option 1 (Wait for user response), because if a new pomodoro were to start right after one was killed, users would not be able to deal with their distraction which will then persist onward to the next pomodoro as well.
