import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then((m) => m.LazyModule) },
  {
    path: 'secure',
    loadChildren: () => import('./secure/secure.module').then((m) => m.SecureModule),
    canActivate: [AuthGuard], // I agregated here the guard to prevent its loading
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
