import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomNumberTimerComponent } from './random-number-timer.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { DarkLightComponent } from 'src/app/componets/dark-light/dark-light.component';
import { NumbersComponent } from '../numbers/numbers.component';
import { EngineButtonComponent } from '../engine-button/engine-button.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RandomNumberTimerModule } from '../../random-number-timer.module';

describe('RandomNumberTimerComponent', () => {
  let component: RandomNumberTimerComponent;
  let fixture: ComponentFixture<RandomNumberTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        RandomNumberTimerModule
      ],
      declarations: [RandomNumberTimerComponent, ScoreboardComponent, DarkLightComponent, NumbersComponent, EngineButtonComponent]
    });
    fixture = TestBed.createComponent(RandomNumberTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
