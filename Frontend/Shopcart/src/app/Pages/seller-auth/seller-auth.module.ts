import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerAuthRoutingModule } from './seller-auth-routing.module';

// primeng modules
// import { MessageService } from 'primeng/api';


// Imports form Module
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

// Imports Components
import { ForgotPasswordComponent } from '../seller-auth/forgot-password/forgot-password.component';
import { LoginComponent } from '../seller-auth/login/login.component';
import { PswResetComponent } from '../seller-auth/psw-reset/psw-reset.component';
import { RegisterComponent } from '../seller-auth/register/register.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    PswResetComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SellerAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // MessageService
  ],
  exports: [
    ForgotPasswordComponent,
    LoginComponent,
    PswResetComponent,
    RegisterComponent
  ]
})
export class SellerAuthModule { }
