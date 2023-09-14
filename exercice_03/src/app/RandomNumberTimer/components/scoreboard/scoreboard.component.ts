import { Component } from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  extractedRandomNumber: number= 0;
  timeSeconds: number = 0;
  timeMinutes: number = 0;
  turns: number = 0;
  
  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerService.getTimerValues().subscribe(time => {
      // Extract the random number from the list
      this.timeSeconds = time;
      this.tick();
      // console.log('## TIME: ', time);
    });
    this.timerService.getRandomNumberValues().subscribe(randomNumber => {
      this.extractedRandomNumber = randomNumber;
      this.turns++;
      // console.log('## random number: ', randomNumber);
    });
  }
  tick() {
    // this.timeSeconds++;
    if (this.timeSeconds === 60) {
      this.timeSeconds = 0;
      this.timeMinutes++;
    }
  }
}
