import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerAuthRoutingModule } from './seller-auth-routing.module';


// prime Ng module
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from "primeng/floatlabel"  

// primeng modules
import { MessageService } from 'primeng/api';

// Imports form Module
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    ReactiveFormsModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbModule,
    FontAwesomeModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    PasswordModule,
    FloatLabelModule,
  ],
  providers: [
    MessageService
  ],
  exports: [
    ForgotPasswordComponent,
    LoginComponent,
    PswResetComponent,
    RegisterComponent
  ]
})
export class SellerAuthModule { }
