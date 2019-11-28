# NgSwissArmyKnife

This library provides common Tools, Helpers, Directives, Components, Services and Pipes
that are often used in different angular projects.

So it should be a swiss army knife for angular developers ;-D

But it also contains a lot of useful stuff for just javascript developers or css styling
_If you find something missing or have suggestions please let me know._

I work on different angular projects and will update this library frequently.
## Installation

run  `npm i ng-swiss-army-knife --save`

## API

### Pipes:
**roundNumber pipe**
takes one argument, the digits to round the number
e.g. {{0.123123 | roundNumber:2}}

### SCSS Styles:
You can include the atoms.scss to be able to do atom-styling, meaning
you have one css class for one styling property, e.g.:
`<div class="marginT20 cursorPointer padding5"></div>`

### Angular Typescript:

[Click here for the full documentation](https://nickwinger.github.io/ng-swiss-army-knife/)

## Usage
For simplicity you can typ SwissArmyKnife anywhere
in your application and the intellisense will show you
everything that the knife has to offer.
![Intellisense1](https://raw.githubusercontent.com/nickwinger/ng-swiss-army-knife/master/assets/intellisense1.png "Intellisense1")

(technically we made a class with static members, so all
the helpers, services, etc. are at one place and you don't have
to guess the names...)

Also you can find all the helpers if you typ Helper(dot)
We find this very handy, as you don't remember all the helper function
names if the are just loose.
![Intellisense2](https://raw.githubusercontent.com/nickwinger/ng-swiss-army-knife/master/assets/intellisense2.png "Intellisense2")



## Development
* When checkin to GIT run "npm run compodoc" before
* To create a new version and automatically deploy to NPM: 
* 1. manually update the version in the projects/ng-swiss-army-knife/package.json
  2. GIT Commit
  3. "npm version NEW_VERSION" in project root
  (git push --follow-tags may not work inside npm, then you have to type it manually)
  4. Commit and Push to Git
  
bit4bit
