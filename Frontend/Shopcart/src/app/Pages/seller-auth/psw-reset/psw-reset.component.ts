import { Component } from '@angular/core';
import { AuthService } from '../../../Core/Services/Seller-Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../shared/password-match.directive';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-psw-reset',
  templateUrl: './psw-reset.component.html',
  styleUrl: './psw-reset.component.css'
})
export class PswResetComponent {

  // Getting token for local storage stores
  token!: string;

 // login reset password form Validations Code
  resetForm = this.fb.group({
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required]},
  {
    validators: passwordMatchValidator
  })

  constructor(private auth: AuthService, private router:Router,private fb: FormBuilder, 
    private route: ActivatedRoute ,private messageService: MessageService){}

  get password() {
    return this.resetForm.controls['password'];
  }

  get confirmPassword() {
    return this.resetForm.controls['confirmPassword'];
  }

  ngOninit() {
    // It retrieves the value of the 'token' to store on local storage
    // when user redirect new password page then genreate token
    // tokon generated from backend server and it will be store in local storage on browser
    this.route.params.subscribe(val => {
      this.token = val['token'];
      console.warn(this.token);
    });
  }

  // The resetPassowrd function calls from the "resetPassword" method from the "auth" Service post request
  resetPassowrd(){
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }
      this.auth.resetPassword(resetObj).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
  }
}
