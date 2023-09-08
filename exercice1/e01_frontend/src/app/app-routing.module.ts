import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)
  },
  // {
  //   path: 'register',
  //   // component: RegisterComponent
  // },
  // {
  //   path: 'login',
  //   // component: LoginComponent
  // },
  // {
  //   path: 'users',
  //   children:[
  //     {
  //       path: '',
  //       // component: UsersComponent
  //     },
  //     {
  //       path: ':id',
  //       // component: UserProfileComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
