import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthService } from '../../../Core/Services/User-Auth/user-auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrl: './user-forgot-password.component.css'
})
export class UserForgotPasswordComponent {

      // login form Validations Code
      loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      })
  
      constructor( private fb: FormBuilder,private user:UserAuthService,private messageService: MessageService) { }
  
      get email() {
        return this.loginForm.controls['email'];
      }
      
  
     // The forgotPassword function calls from the "sendEmail" method from the "auth" Service post request
      forgotPassword(data: any) {
        this.user.sendEmail(data).subscribe(
          response => {
            console.log(response);
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          }
        )
        setTimeout(() => {
          this.loginForm.reset();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Email Sent Succesfully" });
        }, 200);
        console.log(this.loginForm.value)
      }
      
}
