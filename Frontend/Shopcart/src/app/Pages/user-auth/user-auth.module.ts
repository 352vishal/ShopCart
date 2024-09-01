import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';


@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserLoginComponent,
    UserRegisterComponent
  ]
})
export class UserAuthModule { }
