import { Component } from '@angular/core';

@Component({
  selector: 'app-dark-light',
  templateUrl: './dark-light.component.html',
  styleUrls: ['./dark-light.component.scss']
})
export class DarkLightComponent {
  isDarkMode = false;
  modeMessage = 'Light Mode';

  toggleTheme() {
    if (this.isDarkMode) {
      this.applyDarkTheme();
      this.modeMessage = 'Dark Mode';
    } else {
      this.applyLightTheme();
      this.modeMessage = 'Light Mode';
    }
  }
  // toggleTheme() {
  //   this.isDarkMode = !this.isDarkMode;
  //   this.modeMessage = this.isDarkMode ? 'Dark Mode' : 'Light Mode';
  //   this.applyThemeClass();
  // }

  private applyDarkTheme() {
    // Set dark theme colors
    document.documentElement.style.setProperty('--primary-color', '#000000');
    document.documentElement.style.setProperty('--primary-variant-color', '#333333');
    document.documentElement.style.setProperty('--secondary-color', '#03dac6');
    document.documentElement.style.setProperty('--secondary-variant-color', '#018786');
    document.documentElement.style.setProperty('--background-color', '#0a0310');
    document.documentElement.style.setProperty('--surface-color', '#333333');
    document.documentElement.style.setProperty('--error-color', '#cf6679');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color-light', '#fafafa');
  }

  private applyLightTheme() {
    // Set light theme colors
    document.documentElement.style.setProperty('--primary-color', '#6200ee');
    document.documentElement.style.setProperty('--primary-variant-color', '#3700b3');
    document.documentElement.style.setProperty('--secondary-color', '#03dac6');
    document.documentElement.style.setProperty('--secondary-variant-color', '#018786');
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--surface-color', '#fafafa');
    document.documentElement.style.setProperty('--error-color', '#b00020');
    document.documentElement.style.setProperty('--text-color', '#333333');
    document.documentElement.style.setProperty('--text-color-light', '#353232');
  }

  private applyThemeClass() {
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
}
