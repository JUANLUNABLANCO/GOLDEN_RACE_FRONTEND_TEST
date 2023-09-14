import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomNumberTimerRoutingModule } from './random-number-timer-routing.module';
import { RandomNumberTimerComponent } from './components/random-number-timer/random-number-timer.component';

import { NumbersComponent } from './components/numbers/numbers.component';
import { EngineButtonComponent } from './components/engine-button/engine-button.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';


@NgModule({
  declarations: [
    RandomNumberTimerComponent,
    ScoreboardComponent,
    NumbersComponent,
    EngineButtonComponent
  ],
  imports: [
    CommonModule,
    RandomNumberTimerRoutingModule
  ]
})
export class RandomNumberTimerModule { }
