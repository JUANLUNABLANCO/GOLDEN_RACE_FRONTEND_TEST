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

### REQUIREMENTS EXERCISE 1

- Create a componet with reactive form with two fields for product "name" and "price"
- The price must be a number greater than 5 and less than 20
- The product name must be a string longer than 5 characters and smaller than 20
- After submitting the form, if the form is valid show a success message
- After submitting the form, if the form is invalid show the validation errors
- Hide the messages after the form reset
- Implement unit tests for the component

### FUNCTIONING

Run app in DEV MODE
console 1: postgres DB
```bash
cd exercice1/_backend
npm run docker:db:dev
```

console 2: nestJS backend
```bash
cd exercice1/_backend
npm run nest:dev
```

console 3: ng frontned
```bash
cd exercice1/_frontend
npm run ng:open
```

console 4: ng testing 
```bash
cd exercice1/_frontend
ng test
```

Run app: in TEST MODE, to run cypress tests
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

### MORE INFO ABOUT DEVELOPMENT

[more info](./documentation/exercice_01/explainning-development.md)



## EXERCISE 2

- Create a new module with a component called "lazy"
- Use routing to lazy load the module and show the component when the route is "/lazy"
- Create a new module with a component called "secure"
- Use routing to lazy load the module and show the component when the route is "/secure"
- Use routing to protect "/secure" route and never let the user load it
- Add two navigation links on the AppComponent to test both routes

### FUNCTIONING
### MORE INFO ABOUT DEVELOPMENT


### EXERCISE 3

- Modify the DataService getNumbers method to return a random integer number between 0 and 10, once per second
- Implement unit tests for the service
- Modify the AppComponent to show the last number emitted by the service and update it every time it changes
- Implement unit tests for the component

### FUNCTIONING
### MORE INFO ABOUT DEVELOPMENT

### EXERCISE 4

- Transform the AppComponent to match the attached image by using flex or grid
- No CSS frameworks or external dependencies are allowed
- The result must be responsive
- When the viewport width is bigger than 900px, center the content
- When the viewport width is smaller than 400px, print all the elements stacked in the following order: Header, Sidebar, Featured, A, B

![layout](./projects/exercise4/src/assets/layout.png)


### FUNCTIONING
### MORE INFO ABOUT DEVELOPMENT

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

