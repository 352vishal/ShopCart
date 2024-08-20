import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../Core/Services/Seller-Auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

    // login form Validations Code
    loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })

    constructor( private fb: FormBuilder,private auth:AuthService,private messageService: MessageService) { }

    get email() {
      return this.loginForm.controls['email'];
    }
    

   // The forgotPassword function calls from the "sendEmail" method from the "auth" Service post request
    forgotPassword(data: any) {
      this.auth.sendEmail(data).subscribe(
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
