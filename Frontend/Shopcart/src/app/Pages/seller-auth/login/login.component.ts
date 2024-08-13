import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../Core/Services/Seller-Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  // login form Validations Code
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor( private fb: FormBuilder,private authService: AuthService, private router: Router,
               private msgService: MessageService) { }
                  

 ngOnInit(): void {
  // `reloadSeller` function checks if a token is stored in local storage and updates the seller
  // The "this.authService.reloadSeller()" function calls from the "reloadSeller" method from the "auth" Service
    this.authService.reloadSeller()
}             

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  // The `loginUser` function is sends valid email & password on server 
  // The loginUser function calls from the "postUserByEmail" method from the "auth" Service "Post" request
  loginUser() {
    if (this.loginForm.valid) {
      this.authService.postSellerByEmail(this.loginForm.value)
      // Get Display name from token
      this.authService.getToken()
      // authGauard use for "auth.guard.ts" file protection
      this.authService.isSellerLoggedIn.subscribe(
        res => {
          this.loginForm.reset();
       }
      );
    }
  }
 
  // The `forgotPsw` function navigates to the 'forgot-password' route using the Angular router.
  forgotPsw(){
    this.router.navigate(['forgot-password'])
  }

}