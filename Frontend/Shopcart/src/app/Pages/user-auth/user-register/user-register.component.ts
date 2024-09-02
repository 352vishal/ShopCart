import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { passwordMatchValidator } from '../../../shared/password-match.directive';
import { UserAuthService } from '../../../Core/Services/User-Auth/user-auth.service';
import { User } from '../../../Core/Model/user-auth';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  // registration form validation code
  UserRegisterForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private user: UserAuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  get name() {
    return this.UserRegisterForm.controls['name'];
  }

  get email() {
    return this.UserRegisterForm.controls['email'];
  }

  get password() {
    return this.UserRegisterForm.controls['password'];
  }

  get confirmPassword() {
    return this.UserRegisterForm.controls['confirmPassword'];
  }

// The submitDetails function calls from the "registerUser" method from the "auth" Service post request.
// It post register seller signUp details on the server from mongodb Database.
UsersubmitDetails() {
    const postData = { ...this.UserRegisterForm.value };
    // confirm password code
    delete postData.confirmPassword;
    this.user.registerUser(postData as User)
    .subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
        this.router.navigate(['user-login'])
      },
      error => {
        if(error.error.userName){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.userName});
        }
        else if(error.error.userEmail){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.userEmail});
        }
      }
    )
  }
}
