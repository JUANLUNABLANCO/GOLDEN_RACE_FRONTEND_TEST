import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerSubject = new BehaviorSubject<number>(0);
  private randomNumberSubject = new BehaviorSubject<number>(0);
  private engineButtonStateSubject = new BehaviorSubject<string>('stop');

  // Method to start the timer and change the button state
  startTimer() {
    this.engineButtonStateSubject.next('init');
    let countTimer = 0;
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 10 + 1); // from 1 to 10
      this.randomNumberSubject.next(randomValue); // we emit random Number
      countTimer++;
      this.timerSubject.next(countTimer); // we emit +1 s.
    }, 1000);

    // Stop the timer when the 'engine' button is pressed
    this.engineButtonStateSubject.subscribe(state => {
      if (state === 'stop') {
        clearInterval(interval);
      }
    });
  }

  // Method to engine the timer and change the button state to stop
  stopTimer() {
    this.engineButtonStateSubject.next('stop');
  }

  // Get the current state of the 'engine' button
  getEngineButtonState(): Observable<string> {
    return this.engineButtonStateSubject.asObservable();
  }
  

  // Get the timer values, 0,1,2,3 it are seconds
  getTimerValues(): Observable<number> {
    return this.timerSubject.asObservable();
  }
  // Get random Numbersemitted
  getRandomNumberValues(): Observable<number> {
    return this.randomNumberSubject.asObservable();
  }
}
