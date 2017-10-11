# CORPSCharacterBuilder
This is a web tier character builder for CORPS (Combat Oriented Role Playing System)
More information regarding CORPS and its development please visit herf: http://nortain.net or find us on facebook at href: https://www.facebook.com/CORPSGaming/ You can even go as far as to scour twitter using the hashtag #CORPSGaming.

## Docker and the Dockerfile
This project is being developed with deployment in mind so is meant to be ran inside of a docker container.

to build with docker you can visit here:
Once you have docker setup on your system you should be able to build using: <br>
`docker build -t corps-character-builder:dev .` <br>
to run using: <br>
`docker run -d --name corps-character-builder -p 4200:4200 corps-character-builder:dev` <br>
and to stop using: <br>
`docker stop corps-character-builder`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# CORPS-Character-Builder
