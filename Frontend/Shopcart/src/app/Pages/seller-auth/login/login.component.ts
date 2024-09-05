import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Core/Services/Seller-Auth/seller-auth.service';
import { isPlatformBrowser, PlatformLocation } from '@angular/common';

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

  constructor( private fb: FormBuilder,private authService: AuthService, 
  private router: Router,private platformLocation: PlatformLocation, @Inject(PLATFORM_ID) private platformId: Object)
  // This prevents the back button from navigating back to the login page.
  // Agter logout it disable back button to navigating back again to the seller-home page
   { 
    if (isPlatformBrowser(this.platformId)) {
      history.pushState(null,'',location.href);
      this.platformLocation.onPopState(()=> {
        history.pushState(null,'',location.href);
      });
    }
  }
                  

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