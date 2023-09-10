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
  // important to save the cors, when they are not still in production enabled. 
  // This configuration causes localhost:3000 to behave as if it were localhost:4200, allowing the server to pass the request as if it were internal
  "options": {
            "proxyConfig": "src/proxy.conf.json"
          },
}
```
the content of the file proxy.conf.json is that
```proxy.conf.json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```
any request made from angular that starts in api/...
will transform it directly to http://localhost:3000/api


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

Let´s create a module for admin
```
ng g m admin --routing
```
This module, will be charged by lazy loading. We need a component inside this module, let´s create it.

```bash
ng g c components/overview --module=admin
```

If you go to admin button you can see overview works!

if you run tests, you can see every thing is ok, we have tested the overview component adding in the html some ref data property
```bash
ng test
```

#### Recapitulation
we have app component, admin module with lazy loading, some routing for some components (login, register, user profile) but we dont have this components, let´s make it.

But beofre it´the best moment to upload some changes
```bash
git status
git add .
git commit -m "admin module with routing and lazy loading, unit testing ok"
git push
```


#### We create all the components we need and the routing
Creemos los componentes que necesitamos
```
ng g c components/login
ng g c components/register
ng g c components/user-profile
ng g c components/products
ng g c components/product-detail
```

#### We´ll create the logic and the ui for every component
begin for login, register and user profile, to make some others things like authguards, interfaces, interceptors, etc.

Let´s create a service for authenticacion
```bash
ng g s services/auth/authentication
```

we need some interfaces for login and register
```bash
ng g interface interfaces/auth
```

the user service
```bash
ng g s services/user/user
```

and the user interface
```bash
ng g interface interfaces/user
```

#### Guards and interceptors
Let´s create a guard for auth
```bash
ng g guard guards/auth
```
choose canActivate

you should have instaled @auth0/angular-jwt
if not ...
```bash
npm i @auth0/angular-jwt
```

```bash
ng generate guard guards/admin
```
To make the fun complete, we are going to generate an interceptor that adds the access_token to all the routes, from the moment the user logs in. This way we can check in our guards if the user is authenticated or not, also for greater security we should check if the user who is trying to update their profile, for example, is the user themselves, but this is already going too far.
```bash
ng g interceptor interceptors/jwt
```
and I modify the app.module to use it
```app.module.ts

// # INTERCEPTORS
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

      ...

providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
```

One thing more to intercept http-errors from api
```bash
ng g interceptor interceptors/htt-error
```
of course we have to put it in the app.module, like this
```bash
    ...
  providers: [
    ...
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
```

And we have to manage http response errors in backend too


#### Recapitulation
we have all of our components, except the logic of the products. We can register and login with any user,
```some.json
{
  name: test1,
  email: test@test.com,
  password: test12345678
}
```
we can register an admin-user
```some.json
{
  name: test2,
  email: admin@admin.com,
  password: test12345678
}
```
we can login with the admin and try to go to the route '/admin'


upload changes
```bash
git status
git add .
git commit -m "register, login, auth, guards, interceptors"
git push
```

#### TIME INVESTED SO FAR

Nest     10h
ng       5h
TESTING  1H
Others   2H
------------
total    18H


#### I´m going to do some Unit Tests, for some components and services



// PENDIENTE PARA MAÑANA
testing ng services, coverage
testing e2e cypress
testing backend postman
documentation
delete all the console.logs

products with images, ...
product logic component of exercice1


// POSIBLES MEJORAS
user-profile access by jwtoken.decoded -> user.id
sign-off
si el login corresponde al admin conducirlo a '/admin', si es un usuario al profile del usuario



#### FUNCTIONING

console 1: postgres DB
```bash
cd exercice1/e01_backend
npm run docker:db:dev
```

console 2: nestJS backend
```bash
cd exercice1/e01_backend
npm run nest:dev
```

console 3: ng frontned
```bash
cd exercice1/e01_frontend
npm run ng:dev
```

console 4: ng testing
```bash
cd exercice1/e01_frontend
ng test
```







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