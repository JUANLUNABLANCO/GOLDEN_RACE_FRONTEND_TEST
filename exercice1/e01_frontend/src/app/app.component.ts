import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e01_frontend';
  entries = [
    {
      name: 'Login',
      link: 'login'
    },
    {
      name: 'Register',
      link: 'register'
    },
    {
      name: 'Update Profile',
      link: 'update-profile'
    }
  ];
  constructor (private router: Router) {
    console.log('Enviroment Control: ', environment.CONTROL); // only in development to see which environment we are running
  }
  // Menu logic
  navigateTo(value: string) {
    this.router.navigate(['../', value]);
  }
}
