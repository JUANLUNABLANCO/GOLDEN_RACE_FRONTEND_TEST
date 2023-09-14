import { Component } from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-engine-button',
  templateUrl: './engine-button.component.html',
  styleUrls: ['./engine-button.component.scss']
})
export class EngineButtonComponent {
  engineButtonState: string = 'stop';
  stateTextButton: string = 'INIT';


  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerService.getEngineButtonState().subscribe(state => {
      // console.log('## STATE ngOnInit(): ', state);
      this.engineButtonState = state;
    });
  }
  setStateButtonClasses() {
    if (this.engineButtonState == 'init') this.stateTextButton = 'STOP';
    if (this.engineButtonState == 'stop') this.stateTextButton = 'INIT'
  }
  // the button click and the state of the button have a reaction
  engineTimer() {
      // console.log('### STATE engineTimer(): ', this.engineButtonState);
      if (this.engineButtonState == 'stop') {
        this.timerService.startTimer();
      } else if (this.engineButtonState == 'init') {
        this.timerService.stopTimer();
      }
      // console.log('### STATE engineTimer(): ', this.engineButtonState);
      this.setStateButtonClasses();
  }
}
