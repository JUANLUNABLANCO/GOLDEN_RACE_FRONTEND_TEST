## EXERCICE_01

### FUNCTIONING
You must to have installed Node v15^
You must to have installed Docker Desktop
You must to have installed Angular v16^
You must to have installed npm 9^
OS: win32 64
typescript 5.1.3

I used angular CLI 16.1.4 in the frontned

nestJS v10.0.5

I used @nestjs/cli in the backend


To Run app: in dev mode
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
npm run ng:open
```

console 4: ng testing
```bash
cd exercice1/e01_frontend
ng test
```

to Run app: in test mode, to run cypress tests
console 1: postgres DB
```bash
cd exercice1/_backend
npm run docker:db:test
```

console 2: nestJS backend
```bash
cd exercice1/_backend
npm run nest:test
```

console 3: ng frontned
```bash
cd exercice1/_frontend
npm run ng:open
```

console 4: e2e testing
```bash
cd exercice1/_e2e-tests
npm run cypress:open
```

### If you need to create users, login, etc
You should create this two users in development mode, each user created it´s mainteined in DB
```user1.json
{
  name: test1,
  email: test@test.com,
  password: test12345678
}
```
we can register an admin-user
```suser2.json
{
  name: test2,
  email: admin@admin.com,
  password: test12345678
}
```
in TEST MODE you don´t need to create anything, the DB is reset in each test

### REQUIREMENTS EXERCISE 1

- Create a componet with reactive form with two fields for product "name" and "price"
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
    "ng:open": "ng serve  --open",
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
_____________________
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
1. You must run 'npm run docker:db:test' in a console and 'npm run nest:test' in other, and of corurse 'npm run ng:open' in other, before you run cypress
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
Linter                                    1H
Others (investigations, queries, doubts)  3H
_______________________________________________________
total                                     29 H for now


##### Time to upload changes

```bash
git add .
git commit -m "ng testing, backend testing with postman, e2e tests with cypress, linter"
git push
```

##### Let´s go with produts, prdouct, product-detail, products.service etc

First in environment i put a 'api_url' variable, that get products from an external api, with images


I created a service for products and an interface
```bash
ng g interface inetrfaces/product.interface
ng g s services/products/products
```
I created a product component it will be part fo products component.
I created a product-detail component for when we click on a product.

```bash
ng g c components/product
ng g c components/product-detail
```

I created a card service that have a BehaviorSubject of an array of Products
```bash
ng g s services/cart/cart
```
In summary, this code defines a CartService class that is used to manage a shopping cart in our app. It allows adding products to the cart and notifying interested components about changes in the cart through the use of observables, thanks for Behavior Subject that it maintains and always emits the most recent value to its subscribers.
```cart.service.ts
export class CartService {

  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  addCart(product: Product) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
}
```
I design some css with flex-box, and some 3d special effect with text

##### Time to uploap

```bash
git status
git add .
git commit -m "products, product, @Input(), SubjectBehavior, product-detail, product-service, cart-service ,css flex-box, responsive"
git push
```

##### Spending time so far

Nest development                          10h
ng development                            5h + 4h
NG Make and pass TESTS                    4H
POSTMAN  Make and pass tests              3H
E2E tests Cypress                         3H
Linter                                    1H
CSS                                       1H
Others (investigations, queries, doubts)  3H
______________________________________________________
total                                     34 H for now


##### I make the logic, html and css of the Exercice_01
I created a form, responsive with the fields: name, price, description and validations, and a message when the submit it´s ok
I do the logout logic in frontend and in backend
I reset the Behavior subject for cart when i do logout and reset localStorage

##### Time to finish
```bash
git status
git add .
git commit -m "finish exercice_01"
git push
git flow feature finish
git push
```

##### Spending time so far

Nest development                          10h
ng development                            9h + 2H (app.component --> EXERCICE_01)
NG Make and pass TESTS                    4H + 1H
POSTMAN  Make and pass tests              3H
E2E tests Cypress                         3H
Linter                                    1H
CSS                                       1H + 1H (app.component --> EXERCICE_01)
Others (investigations, queries, doubts)  3H
_______________________________________________________
total                                     38 H for now

##### Recapitulation

We have 100% nest app backend.
We have an ui that can register and login a user, validate all the formas, and do an asynchronous validation for available emails.
We have a navigation routes in diferent parts of the UI, access part for login, register, admin access, store access.
We have guards for userAuth, admin.
We have interceptors for jwt and for httResponse errrors.
We have diferent services for user and auth.
We have interfaces for user and auth-login and auth-register.
We have 100% ng app frontend.
We have a diferent kinds of tests for components, services, etc.
We have a docker service for BD in postgresSQL.
We have tests in postman for all the hhtp requests.
We have an integradted and responsive app with angular material.
We have e2e tests in cypress in ./e2e-tests and the coverage documentation in ./documentation/mochawesome-report
We have a css responsive app, between angular material and flex-box
We have a docker container with a service of DB postgresSQL, with diferents configurations.
We have a system to do logout in frontned and a base to do logout in backend, adding 1ms to the expires jwt of the request.

##### POSSIBLE IMPROVEMENTS
delete all the console.logs
sign-off
If the login corresponds to the admin, take it to '/admin', if it is a user, to the user's profile
Create the Order route to see the selected products and the purchase total
Refactor code

##### Conclusions
The exercise was very simple, so I wanted to add more things consuming more hours, just so that you can appreciate my knowledge of Angular and other technologies, of course, this is not a common behavior, I always stick to the requirements although sometimes If I see that something is being proposed in a different way than I would do it, I can comment with those responsible, to provide possible improvements, because in my time at fullsatck I have had to carry out all kinds of tasks that I have already internalized, such as analysis and design. ..

I have enjoyed doing this little project, of course it can be greatly improved and it is also unfinished, but what I intended was just that, to show some of my skills.

I Know that in this first exercice I doit some thing diferent that you don´t asked me and I have skipped some requirements like 'The fewer external dependencies the better', But as I say, if I had done exactly that, you would not have been able to appreciate my full potential, I promise to respect it in the other exercises.

