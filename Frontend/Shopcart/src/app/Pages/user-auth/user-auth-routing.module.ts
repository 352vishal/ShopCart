import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { UserPswResetComponent } from './user-psw-reset/user-psw-reset.component';

const routes: Routes = [
  {
    component: UserLoginComponent,
    path: 'user-login',
  },
  {
    component: UserRegisterComponent,
    path: 'user-register',
  },
  {
    component: UserForgotPasswordComponent,
    path: 'user-forgot-password',
  },
  {
    component: UserPswResetComponent,
    path: 'user-reset/:UserToken',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthRoutingModule { }
