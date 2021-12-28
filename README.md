# Employee Manager

## Features and Description
- Features
  - CRUD operations
  - Error tolerant
  - Using Observables
  - Has option to view app in different locale
  - Code coverage: 100% Branch coverage: 93%
- Built using
  - Angular 10
  - PrimeFaces
  - json-server
  - i18n for localization
  - jasmine for Unit tests
  - This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Run the Development server on your local machine

  - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## For using the json-server
This app uses the [json-server](https://www.npmjs.com/package/json-server) package from npm to mock the rest api endpoints consumed by its services
, it can be used with any other backed apis by modifying the services file
  
## For localization
 By default, the app will open with en-us locale, to switch to a different local run `ng serve --configuration=<prefered_locale>`
- available locales :
  - hi
  - en

more locales can be added and configured with respective translations in `angular.json`

## For running the unit tests
  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

