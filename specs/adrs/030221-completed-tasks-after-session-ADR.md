# What should happen to completed tasks after an entire session ends?

* Deciders: Dillan Merchant, Baban Hamesalh, Fernando Bracamonte, Sash Gollamudi, Sean Ye, Sharon Lei, Siddharth Nag, Sijie Wang
* Date: March 2nd, 2021

## Context and Problem Statement

When a task is completed in a session, it gets crossed off. What should happen to these tasks after the entire session has ended?

## Considered Options

* Option 1: Leave the tasks on the list
* Option 2: Remove the tasks from the list

## Pros and Cons of the Options 

### Option 1: Leave on list

* Good, because the user will not lose any information unless they choose to delete it
* Bad, because the user will have to manually click to delete each task

### Option 2: Remove from list

* Good, because it eases the number of actions that the user has to do in a standard workflow
* Bad, because the user may lose information about the completed tasks after a session

## Decision Outcome

Chosen option: Option 2 (Remove from list), because the loss of information will dealt with by using a summary page after the session and it is important to make the website easy to use
