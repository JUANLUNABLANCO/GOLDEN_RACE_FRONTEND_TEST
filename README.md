# GOLDEN RACE FRONTEND TEST 
# EXERCICE 01

## INSTRUCTIONS

This is an Angular Workspace with 4 applications, each of them is an exercise.

Complete all the exercises and upload the project to a Git server and give us access or send us the project zipped.

Install the dependencies as usual and run the apps with Angular CLI. For example:

`npx ng serve exercise1`

## REQUIREMENTS

- All the components, pipes, and services must have unit tests.
- CSS Frameworks or component libraries are not allowed.
- External dependencies like NPM packages, fonts, styles or scripts from CDNs are not allowed.
- The application must not throw unhandled errors on the console.
- All the code, documentation or UI must be written in English.
- The linter must work by running `npm run lint`.
- The build must work by running `npm run build`
- All the tests must pass by running `npm run test`

## THINGS WE VALUE

- Strongly typed code
- Documentation and well commented code
- The fewer external dependencies the better
- Angular forms and validators usage
- Prettier usage
- Advanced RxJS usage
- SCSS Variables or CSS Custom Properties usage
- CSS Flex or Grid usage
- Git usage

## EXPLAINNING DEVELOPMENT

### INTRODUCTION

I have reconsired removing each exercise in an independent project, more than anything because I am going to introduce some extra elements that may clash with each other, with the configurations that are in the original project, I hope this will not be any inconvenience.

In any case, I am going to put in each README.md the instructions to execute, compile, test and the steps that I am taking in the development one by one.

### Steps

#### Configurations, Instalations

First in the console, we made some structure for angular, git, nestjs, etc

create this file:
```bash
touch README.md
```

update npm
```bash
npm i -g  npm@9.7.2
```

initialize git
```bash
git init
touch .gitignore
```
I added something inside this file


NestJS global intallation
```bash
 npm install -g @nestjs/cli
```

Comprobación de versiones
```
npm --version  // v9.7.2
node --version // v16.17.0
nest --version // v10.0.5

Make folder projects
```bash
mkdir exercice1 exercice2 exercice3 exercice4
```

go to make project one
```bash
cd exercice1
nest new E01_Backend
```

delete .git inside e01_backend
```bash
rm -rf .exercice1/e01_backend/.git
```

add a doker file to use a simple container with postgresSQL
```bash
touch docker-compose.yml
```
 WARNING: This project will not work if you do not have a docker instance on your machine, if you are on Windows simply install docker desktop

I added here some configuration, we need to define some .env variables, and add some dependencies for backend like pg, typeorm, and some scripts in package json

installations needed
```bash
cd ./e01_backend
npm i --save @nestjs/config  // to use .env configuration
npm i --save @nestjs/typeorm typeorm pg
npm i --save @nestjs/jwt @nestjs/passport bcrypt passport passport-jwt uuid  // para login con jwt and passport
```

scripts
```package.json

    ...

    "nest": "nest start --watch",
    "nest:dev": "set NODE_ENV=dev&& npm run nest",
    "nest:test": "set NODE_ENV=test&& npm run nest",
    "nest:prod": "set NODE_ENV=prod&& node dist/main",
    "docker:db:dev": "docker compose --env-file ./config/.env.dev up",
    "docker:db:test": "rimraf ./postgres_data_test && docker compose --env-file ./config/.env.test up",

    ...

```

I have added two files for configuration in ./config

And I modified some thing in the .prettierrc because I got an error at the end of the line, I use CRLF.

```.eslintrc.js
rules: {
    ...

    "prettier/prettier": ["error",{
      "endOfLine": "auto"}
    ]
  },
```

test if all with backend it´s good
```bash
// bash 1
npm run docker:db:dev
```

```bash
// bash 2
npm run nest:dev
```


lets do some project with angular CLI
```bash
npm install -g @angular/cli
cd exercice1
ng new e01_frontend
cd e01_frontend
```

In the tsconfig.json inside the ng project I´ve added this line,
```tsconfig.json
"strictPropertyInitialization": false,
```
is a configuration option used to enable or disable strict property initialization checks in TypeScript.
This forces you to initialize even the constructors of the created classes, which is a bit cumbersome.

I added this scripts in th package.json
```package.json
    "ng:dev": "ng serve  --open",
    "build:prod": "ng build --configuration=production",
    "build:dev": "ng build --configuration development",
```

I have modified some configuration to make sure that when we build it, it´ll do correctly
```angular.json
production: { ...

"fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ] ...

development: {...
  "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.dev.ts"
                }
              ] ...
}
```
of course we have three environment variables for angular and we could configure another one for testing, if we need.

![variables de entorno angular](./documentation/screenshoots/Screenshot_01_ng-env.png)

##### others things
Although the exercise does not ask for it, to demonstrate other skills that are not in any of them I have decided to install angular material in this exercise and also make an access menu for users, I hope this is valued positively, in the other exercises I will stick exclusively to what is asked.

```bash
ng add @angular/material
npm install --save @auth0/angular-jwt
```

##### run

let´s serve ng project
```bash
npm run ng:dev
```
go to http://localhost:4200 in browser


##### testing
let´s do some unit testing for the app.component
```bash
ng test
```
![testing app component](./documentation/screenshoots/Screenshot_02_ng-test-app-component.png)

![ui right now](./documentation/screenshoots/Screenshot_03_ui-now.png)

##### Recapitulation
We have a service docker container with postgresSQL in port 5432, npm run docker:db:dev
We have a server with nest running in http://localhost:3000, npm run nest:dev
We have a frontend app web with angular running in http://localhost:4200, npm run nd:dev

We have a simple two modules in our api 'user' and 'auth', we´ll want after a product module too.


##### So in this point
we are going to create a repo in git hub for this and upload every thing

```bash
git add .
git commit -m "nest installations, configurations, some initial modules and docker postgresSQL, and ng project installation and configuration"
git branch -M main
git remote add origin https://github.com/JUANLUNABLANCO/GOLDEN_RACE_FRONTEND_TEST.git
git push -u origin main
```


time spent so far: Nest 3h + ng 1h


### EXERCISE 1

- Create a reactive form with two fields "product name" and "price"
- The price must be a number greater than 5 and less than 20
- The product name must be a string longer than 5 characters and smaller than 20
- After submitting the form, if the form is valid show a success message
- After submitting the form, if the form is invalid show the validation errors
- Hide the messages after the form reset
- Implement unit tests for the component


#### git flow
we are going to create a branch develop to upload our tasks and we´ll use git flow.
```bash
git branch develop
git checkout develop
git flow init
git flow feature start exercice1
```

#### create some components, services, guards, interceptors, module and routing

















### EXERCISE 2

- Create a new module with a component called "lazy"
- Use routing to lazy load the module and show the component when the route is "/lazy"
- Create a new module with a component called "secure"
- Use routing to lazy load the module and show the component when the route is "/secure"
- Use routing to protect "/secure" route and never let the user load it
- Add two navigation links on the AppComponent to test both routes

### EXERCISE 3

- Modify the DataService getNumbers method to return a random integer number between 0 and 10, once per second
- Implement unit tests for the service
- Modify the AppComponent to show the last number emitted by the service and update it every time it changes
- Implement unit tests for the component

### EXERCISE 4

- Transform the AppComponent to match the attached image by using flex or grid
- No CSS frameworks or external dependencies are allowed
- The result must be responsive
- When the viewport width is bigger than 900px, center the content
- When the viewport width is smaller than 400px, print all the elements stacked in the following order: Header, Sidebar, Featured, A, B

![layout](./projects/exercise4/src/assets/layout.png)