import { Component, NgZone } from '@angular/core';
import { AuthenticationService } from './services/auth/authentication.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 1 })), // Estado inicial (elemento oculto)
      transition('void <=> *', animate(500)), // Transición de 0 a 1 o de 1 a 0 (500 ms)
    ]),
  ],
})
export class AppComponent {
  title = 'exercice_02';

  showAccessDeniedMessage = false;
  accessDeniedMessage = 'You should do login in, first!';

  constructor(
    private authService: AuthenticationService,
    private ngZone: NgZone,
    private router: Router
  ) {}
  onSecureButtonClick() {
    if (this.authService.isAuthenticated()) {
      this.ngZone.run(() => {
        this.router.navigate(['/secure']);
      });
    } else {
      this.accessDeniedMessage = 'You should do login in, first!'
      this.showAccessDeniedMessage = true;
      setTimeout(()=> this.resetMessage(), 3000);
    }
  }
  resetMessage() {
    this.accessDeniedMessage = ''
    this.showAccessDeniedMessage = false;
    this.ngZone.run(() => {
      this.router.navigate(['/login']);
    });
  }
  onSelectChange(event: any) {
    const selectedValue = event.target.value;

    switch (selectedValue) {
      case 'home':
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        break;
      case 'login':
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        });
        break;
      case 'logout':
        this.logout();
        break;
      default:
        // other options
        break;
    }
  }
  logout() {
    this.authService.logout();
  }
}
