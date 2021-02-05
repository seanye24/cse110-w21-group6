# Leaving Website when Tasks are Remaining

* Deciders: Baban Hamesalh, Dillan Merchant, Fernando Bracamonte, Sash Gollamudi, Sean Ye, Sharon Lei, Siddharth Nag, Sijie Wang
* Date: February 4th, 2021

## Context and Problem Statement

Suppose a user is in the situation where they have tasks remaining on their task list. What should happen if they attempt to leave the website before all of these tasks are completed?

## Considered Options

* Allow user to leave with no extra actions
* Notify the user with a pop-up indicating that their task list still has some tasks remaining
* Completely prevent users from closing the website until all tasks have been completed

## Pros and Cons of the Options 

### Option 1: Allow user to leave

* Good, because some users may need to rapidly close out of everything to get to other things
* Bad, because users who do so will lose the tasks they have created up to that point

### Option 2: Notify user when leaving

* Good, because it makes sure users know of the risk they are facing
* Bad, because users may be in a rush to close everything they are working on and a pop-up may slow that down

### Option 3: Prevent user from leaving

* Good, because it makes sure users finish all the tasks they have created
* Bad, because users may have to leave the website due to some outside force and won't be able to do so until all tasks are done
* Bad, because browsers may not allow websites to prevent themselves from being closed/exited.

## Decision Outcome

Chosen option: Option 2 (Notify user when leaving), because the choice acts a median among all three choices and is neither too lenient nor too harsh. In addition, a simple reminder is likely far better than forcing a choice upon a user.
