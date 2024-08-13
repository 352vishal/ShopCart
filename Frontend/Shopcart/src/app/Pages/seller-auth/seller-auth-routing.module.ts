import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from '../seller-auth/forgot-password/forgot-password.component';
import { LoginComponent } from '../seller-auth/login/login.component';
import { PswResetComponent } from '../seller-auth/psw-reset/psw-reset.component';
import { RegisterComponent } from '../seller-auth/register/register.component';


const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: RegisterComponent,
    path: 'register',
  },
  {
    component: ForgotPasswordComponent,
    path: 'forgot-password',
  },
  {
    component: PswResetComponent,
    path: 'reset/:token',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerAuthRoutingModule { }
