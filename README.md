# GOLDEN RACE FRONTEND TEST 

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


## EXERCICE_01

### FUNCTIONING

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

### REQUIREMENTS EXERCISE 1

- Create a reactive form with two fields "product name" and "price"
- The price must be a number greater than 5 and less than 20
- The product name must be a string longer than 5 characters and smaller than 20
- After submitting the form, if the form is valid show a success message
- After submitting the form, if the form is invalid show the validation errors
- Hide the messages after the form reset
- Implement unit tests for the component
### EXPLAINNING DEVELOPMENT

#### INTRODUCTION

I have reconsired removing each exercise in an independent project, more than anything because I am going to introduce some extra elements that may clash with each other, with the configurations that are in the original project, I hope this will not be any inconvenience.

In any case, I am going to put in each README.md the instructions to execute, compile, test and the steps that I am taking in the development one by one.

#### Steps

##### Configurations, Instalations

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

##### Firsts tests
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



##### git flow
we are going to create a branch develop to upload our tasks and we´ll use git flow.
```bash
git branch develop
git checkout develop
git flow init
git flow feature start exercice1
```

##### create some components, services, guards, interceptors, module and routing

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

##### Recapitulation
we have app component, admin module with lazy loading, some routing for some components (login, register, user profile) but we dont have this components, let´s make it.

But beofre it´the best moment to upload some changes
```bash
git status
git add .
git commit -m "admin module with routing and lazy loading, unit testing ok"
git push
```


##### We create all the components we need and the routing
Creemos los componentes que necesitamos
```
ng g c components/login
ng g c components/register
ng g c components/user-profile
ng g c components/products
ng g c components/product-detail
```

##### We´ll create the logic and the ui for every component
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

##### Guards and interceptors
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


##### Recapitulation
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

##### TIME INVESTED SO FAR

Nest     10h
ng       5h
TESTING  1H
Others   2H
------------
total    18H for now


##### I´m going to do some Unit Tests, for some components and services, not for all

###### for example in register.component.ts I have make it the next Tets an actions:

1. Clear comments: The code is well-commented, making it easy to understand what each test does. Comments help other developers understand the purpose of each test case. It´not necesary to comment what do it althought why I do that.

2. Initial setup: The configuration of the spies and providers in the initial beforeEach is asynchronous. I´m Ensured that services and the router are configured as spies is essential to simulate the desired behavior in the tests.

3. Form validity tests: Tests related to form validation (nameField, emailField, passwordField, confirmPasswordField) are important and I ensured that the form initializes correctly and is marked as invalid when appropriate.

4. Redirection tests: The test that verifies redirection to the login page after successful registration (should navigate to /login on successful registration) is crucial to ensure that navigation works as expected.

5. Form error tests: The test that checks that no redirection occurs when the form is invalid is important to confirm that the component does not redirect if the data is not valid.

6. Custom validation tests: Tests that validate that the custom validator CustomValidators.passwordsMatch works correctly are essential. This ensures that custom validation is set up correctly and returns the expected results.

7. Asynchronous validation tests: The test that verifies that a validation error is returned for an existing email (should call userExist and return validation error for existing email) is necessary to ensure that the asynchronous validator userExist is functioning correctly.

###### And for the user.service.ts I have created that Tests an actions:

1. Initial Configuration: The setup of the testing module and dependency injection is done in the beforeEach, which is a good practice.

2. HTTP Request Verification: Using HttpClientTestingModule and HttpTestingController to simulate HTTP requests and verify that requests are handled properly is a solid practice. Additionally, the verification of pending HTTP requests in afterEach ensures that no requests are left open between tests.

3. Commented Test Cases: Each test case is well-commented, making it easy to understand what is being tested in each one. This is essential for test maintainability as the code evolves.

4. Error Handling: The test that handles errors when checking for user existence is a good practice. It ensures that your service handles error situations properly, which is important for the robustness of the application.

5. Clear Expectations: Expectations (expect) are set up clearly and concisely in each test case, making it easy to identify issues when a test fails.

6. Mock Values: Mock values for HTTP responses are used correctly in req.flush() to simulate server responses.


##### Postman tests

[documentation](https://documenter.postman.com/preview/4575834-ef31d4bf-de1b-4d49-85c3-7b996715e78e?environment=&versionTag=latest&apiName=CURRENT&version=latest&documentationLayout=classic-double-column&documentationTheme=light&logo=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&logoDark=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&right-sidebar=303030&top-bar=FFFFFF&highlight=FF6C37&right-sidebar-dark=303030&top-bar-dark=212121&highlight-dark=FF6C37)

Exists a postman collection for developers in './documentation/postman-tests-collections'

##### e2e tests with cypress

install cypress
```bash
cd ./exercie_01/_e2e-tests
npm install cypress --save-dev
```

some dependencies
```bash
npm install --save-dev @faker-js/faker
npm install eslint-plugin-cypress --save-dev
```

run cypress
1. You must run 'npm run docker:db:test' in a console and 'npm run nest:test' in other, and of corurse 'npm run ng:dev' in other, before you run cypress
```bash
npx cypress open
```

I have configurated cypress in these file:
```cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
});
```

And in the cypress.json
```cypress.json
{
  "baseUrl": "http://localhost:4200"
}
```

```some.test.cy.js
  cy.visit('/')  // it goes to http://localhost:4200
```

```cypress.env.json
{
  "DB_CONNECT_URL": "postgres://postgres_test:test123@localhost:5432/blogTest"
}
```

I have created a plugin for the db in ./exercice_01/_e2e-tests/cypress/plugins/index.js
All the fixtures and images needed are in ./exercice_01/_e2e-tests/cypress/fixtures
Some interfaces and fake-data in ./exercice_01/_e2e-tests/cypress/utilities
Tyhe video from the coverage in ./exercice_01/_e2e-tests/cypress/videos

and the tests in ./exercice_01/_e2e-tests/cypress/e2e


I have do a reporter coverage:
```bash
  npm i mochawesome mochawesome-merge mochawesome-report-generator --save-dev
  npm i fs-extra --save-dev
```

The result for the coverage is in mochawesome-report

We need to modify and cretae some files
update cypress.json
```cypress.json
  {
    "DB_CONNECT_URL": "postgres://postgres_test:test123@localhost:5432/blogTest",
    "reporter": "mochawesome",
    "reporterOptions": {
      "overwrite": false,
      "html": false,
      "json": true
    }
  }
```

I created the file that will configure and launch the reporter
```run-reporter.js
  const cypress = require('cypress');
  const fse = require('fs-extra');
  const { merge } = require('mochawesome-merge');
  const generator = require('mochawesome-report-generator');

  const options = {
    files: ["./mochawesome-report/*.json"],
    overwrite: false,
    html: false,
    json: true
  };

  async function runTests() {
    await fse.emptyDir('mochawesome-report');
    const { totalFailed } = await cypress.run({reporter: "mochawesome"});  // importante sino no funciona
    const jsonReport = await merge(options);  // y las opciones debes incluir el files, antes llamado reportDir
    await generator.create(jsonReport, {inline: true});
    process.exit(totalFailed);
  }

  runTests();
```

some scripts to run reporter
```package.json
  "scripts": {
    ...
    "cypress": "npx cypress open",
    "cypress:report": "node run-reporter.js"
  },
```

run it
```bash
npm run cypress:report
```

The result is a folder with the report './mochawesome-report', which contains a json, an html and an assets folder, and another folder ./videos has been created within cypress, with the results of the tests visually.

I move all the coverage and videos to the folder './documentation'

I hve do it end to end test for:
  1. http://localhost:3000/api api works fine
  2. create one user
  3. login user
  4. email
  5. roles aver is created like 'user'
  6. admin update one role user
  7. behavior of register and login components
  8. Update user roles by admin (we dont have doid the fronend UI, so TDD)
  9. User profile, (we dont have doid the fronend UI, so TDD)

##### eslint and prettier

Instalation
```bash
cd exercice_01/_frontend
ng add @angular-eslint/schematics
```
run
```bash
ng lint
```

We corrected the 14 errors, relationed with 'any' definitions of types, so I implemented the LoginResponse, RegisterResponse, JwtDecoded.
Everything is OK.

##### Recapitulation

We have 100% nest app backend.
We have an ui that can register and login a user, validate all the formas, and hace an asynchronous validation for available emails.
We have a navigation routes in diferent parts of the UI, access part for login, register, admin access, store access.
We have guards for userAuth, admin.
We have interceptors for jwt and for httResponse errrors.
We have diferent services for user and auth.
We have interfaces for user and auth-login and auth-register.
We have 90% ng app frontend, we have to do product and the exercice_01 requirements.
We have a diferent kinds of tests for components, services, etc.
We have a docker service for BD in postgresSQL.
We have tests in postman for all the hhtp requests.
We have an integradted and responsive app with angular material.
We have e2e tests in cypress in ./e2e-tests and the coverage documentation in ./documentation/mochawesome-report



##### Spending time so far

Nest development                          10h
ng development                            5h
NG Make and pass TESTS                    4H
POSTMAN  Make and pass tests              3H
E2E tests Cypress                         3H
Others (investigations, queries, doubts)  3H
-----------------------------------------------------
total                                     28H for now


##### Time to upload changes

```bash
git add .
git commit -m "ng testing, backend testing with postman, e2e tests with cypress, linter"
git push
```

// PENDIENTE PARA MAÑANA

documentation
delete all the console.logs

products with images, ...
product logic component of exercice1


// POSIBLES MEJORAS
sign-off
si el login corresponde al admin conducirlo a '/admin', si es un usuario al profile del usuario




















## EXERCISE 2

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

## Conclusions

### SOLID PRINCIPLES APPLICATED IN NG PROJECT
1. Single Responsibility Principle (SRP):

Components: Angular components should have a single responsibility. They should handle the presentation and specific view logic. Any additional logic should be moved to services.

2. Open/Closed Principle (OCP):

Directives and Pipes: In Angular, you can extend existing directives and pipes to add additional functionality without modifying the original source code. This follows the "open for extension, closed for modification" principle.

3. Liskov Substitution Principle (LSP):

Inheritance and Polymorphism: In TypeScript, which is the primary language of Angular, you can apply the Liskov principle by using inheritance and polymorphism. This means that subclasses should be able to replace their base classes without changing the expected behavior.

4. Interface Segregation Principle (ISP):

Interfaces: Angular uses interfaces to define the structure that a class or component should follow. Interfaces should be small and specific to avoid unnecessary implementation of unused methods or properties.

5. Dependency Inversion Principle (DIP):

Dependency Injection (DI): Angular promotes dependency inversion through its dependency injection system. Angular components and services should depend on abstractions rather than concrete implementations. This allows for flexibility and facilitates unit testing.

6. Other SOLID Principles:

6. 1.  Composite Principle: Angular favors the composition of components and services to build applications. Components can be composed and reused easily throughout the application.

6. 2. Separation of Concerns: Angular encourages the separation of concerns by using components to separate presentation logic from business logic. Services are used to handle business logic in isolation.

