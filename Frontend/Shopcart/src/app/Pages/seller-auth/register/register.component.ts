import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../Core/Services/Seller-Auth/seller-auth.service';
import { Seller } from '../../../Core/Model/seller-auth';
import { passwordMatchValidator } from '../../../shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Password Strong Inputed Properties
  value: string | undefined;

  // Conform Password visibility Properties
  eye: string | undefined;
  show = false;

  // registration form validation code
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  get name() {
    return this.registerForm.controls['name'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

// The submitDetails function calls from the "registerUser" method from the "auth" Service post request.
// It post register seller signUp details on the server from mongodb Database.
  submitDetails() {
    const postData = { ...this.registerForm.value };
    // confirm password code
    delete postData.confirmPassword;
    this.authService.registerSeller(postData as Seller)
    .subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
        this.router.navigate(['login'])
      },
      error => {
        if(error.error.sellerName){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.sellerName});
        }
        else if(error.error.sellerEmail){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.sellerEmail});
        }
      }
    )
  }

  // Conform Password visibility function
  onClick() {
      if (this.eye === 'password') {
        this.eye = 'text';
        this.show = true;
      } else {
        this.eye = 'password';
        this.show = false;
      }
  }

}