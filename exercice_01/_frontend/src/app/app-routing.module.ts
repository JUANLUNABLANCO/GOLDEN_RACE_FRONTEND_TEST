import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    children:[
      // FOR EXAMPLE THE ADMIN NEED TO SEND MESSAGES TO USERS
      // {
      //   path: '',
      //   component: UsersComponent,
      //   canActivate: [AdminGuard]
      // },
      {
        path: ':id',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductsComponent
      },{
        path: ':id',
        component: ProductDetailComponent
      }
    ]
  },
  // NEXT STEEPS, one user need to update his profile
  // {
  //   path: 'update-profile',
  //   component: UpdateUserProfileComponent,
  //   canActivate: [AuthGuard, userIsUserGuard]
  // }
  {
    // routes that not exists prevent errors in console
    path: '**',
    redirectTo: '/' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
