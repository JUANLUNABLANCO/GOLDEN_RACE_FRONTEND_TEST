import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.scss']
})
export class NumbersComponent implements OnInit {
  numbers: number[] = [];  // List of numbers from 0 to 10

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.resetArray();
    this.timerService.getRandomNumberValues().subscribe(randomValue => {
      // console.log('## RANDOM NUMBER: ', randomValue);
      // Extract the random number from the list
      this.numbers = this.numbers.filter(number => number !== randomValue);
      if (this.numbers.length == 0 ) {
        this.timerService.stopTimer();
        this.resetArray();
      }
      // console.log('## NUMBERS: ', this.numbers);
    });
  }
  resetArray() {
    this.numbers = Array.from({ length: 10 }, (_, i) => i + 1);
    // console.log('## NUMBERS: ', this.numbers);
  }
}
