import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomNumberTimerComponent } from './components/random-number-timer/random-number-timer.component';

const routes: Routes = [
  {
    path: '',
    component: RandomNumberTimerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomNumberTimerRoutingModule { }
