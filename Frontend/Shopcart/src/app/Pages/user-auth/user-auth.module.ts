import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from "primeng/floatlabel"  

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserPswResetComponent } from './user-psw-reset/user-psw-reset.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';


@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    UserPswResetComponent,
    UserForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule
  ],
  exports: [
    UserLoginComponent,
    UserRegisterComponent
  ]
})
export class UserAuthModule { }
