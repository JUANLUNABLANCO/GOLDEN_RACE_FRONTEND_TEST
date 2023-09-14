## Exercice 03

### Requirements
- Modify the DataService getNumbers method to return a random integer number between 0 and 10, once per second
- Implement unit tests for the service
- Modify the AppComponent to show the last number emitted by the service and update it every time it changes
- Implement unit tests for the component

### making the project

First I created a new app called exercice_02
```bash
ng new exercice_03
cd exercice_03
```

I executed it
```bash
npm run start
```

build it
```bash
npm run build
```

I run the tests
```bash
npm run test
```
run test coverage
```bash
npm run test:coverage
```

Everything it´s ok

![app running](../screenshoots/Screenshot_10_app-running.png)

![first tests](../screenshoots/Screenshot_11_tfirst-tests.png)


### scafolding

I follow this steps to make an angular project with th stablished conditions:
**Step 1: Create a new Angular project**

I run the following command to create a new Angular project named "exercise_03" using Angular CLI:
```bash
ng new exercise_03 --style=scss
```

This command will create the initial project structure with SCSS as the stylesheet format.

**Step 2: Navigate to the project folder**

Change your current directory to the newly created project folder:
```bash
cd exercise_03
```

**Step 3: Generate components, modules, services, etc.**

Now, we'll generate the necessary components, modules, services, and other files as required. Below are the commands to generate each of them:

```bash
# Generate DataService
ng generate service services/data

# Generate a module to encompass everything
ng generate module RandomNumberTimer --routing

# Generate the random-number-timer.component that includes inside others sub components
ng generate component RandomNumberTimer/components/random-number-timer --module=random-number-timer

# Generate Timer component
ng generate component RandomNumberTimer/components/scoreboard --module=random-number-timer

# Generate Numbers component
ng generate component RandomNumberTimer/components/numbers --module=random-number-timer

# Generate Start component
ng generate component RandomNumberTimer/components/engine-button --module=random-number-timer

# Generate dark-night component to change aplette of colors
ng g c components/dark-night
```




**Step 4: Implement the DataService**

Modify the `data.service.ts` file to implement the DataService. Here, we'll use an RxJS `BehaviorSubject` to emit random integer numbers between 0 and 10 every second. Be sure to add comments and use TypeScript strongly typed code:

```typescript
// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private numbersSubject = new BehaviorSubject<number[]>([]);
  numbers$ = this.numbersSubject.asObservable();

  constructor() {
    interval(1000).subscribe(() => {
      const randomInt = Math.floor(Math.random() * 11);
      const currentNumbers = this.numbersSubject.value;
      currentNumbers.push(randomInt);

      if (currentNumbers.length === 11) {
        // All numbers are emitted, stop the interval
        this.numbersSubject.complete();
      } else {
        this.numbersSubject.next(currentNumbers);
      }
    });
  }
}
```

**Step 5: Implement unit tests for the service**

Create a unit test for the `data.service.ts` file using Angular CLI:

```bash
ng generate service data --name=data --skipTests=false
```

This will generate a test file. Implement the unit tests for the DataService in this file.

**Step 6: Implement the AppComponent**

Modify the `app.component.ts` file to show the last number emitted by the service and update it every time it changes. Add comments and use TypeScript strongly typed code:

```typescript
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lastNumber = 0;
  numbers: number[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.numbers$.subscribe(numbers => {
      this.numbers = numbers;
      this.lastNumber = numbers[numbers.length - 1];
    });
  }
}
```

**Step 7: Implement unit tests for the component**

Create a unit test for the `app.component.ts` file using Angular CLI:

```bash
ng generate component app --skipTests=false
```

This will generate a test file. Implement the unit tests for the AppComponent in this file.

**Step 8: Implement the user interface**

Modify the HTML files (`app.component.html`, `timer.component.html`, `numbers.component.html`, `start.component.html`) to create the user interface as described. Use CSS Flex or Grid for layout and SCSS variables for styling. Make sure it is responsive and centered with a maximum width of 900px.

**Step 9: Run the application**

You can now run the Angular application using the following command:

```bash
ng serve
```

The application will be available at `http://localhost:4200`. You can access it in your web browser.

Please note that this is a high-level overview of the steps. You will need to implement the details and styling according to your project's requirements.


