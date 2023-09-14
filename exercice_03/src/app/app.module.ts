import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DarkLightComponent } from './componets/dark-light/dark-light.component';

import { FormsModule } from '@angular/forms';
import { RandomNumberTimerModule } from './RandomNumberTimer/random-number-timer.module';

@NgModule({
  declarations: [
    AppComponent,
    DarkLightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RandomNumberTimerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
