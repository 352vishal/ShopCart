import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthService } from '../../../Core/Services/User-Auth/user-auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser, PlatformLocation } from '@angular/common';
import { CartService } from '../../../Core/Services/Cart/cart.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {

  // Conform Password visibility Properties
  eye: string | undefined;
  show = false;

  // login form Validations Code
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private user: UserAuthService,
    private router: Router,
    private platformLocation: PlatformLocation,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cart: CartService // This prevents the back button from navigating back to the login page. // Agter logout it disable back button to navigating back again to the seller-home page
  ) {
    if (isPlatformBrowser(this.platformId)) {
      history.pushState(null, '', location.href);
      this.platformLocation.onPopState(() => {
        history.pushState(null, '', location.href);
      });
    }
  }

  ngOnInit(): void {
    // `reloadSeller` function checks if a token is stored in local storage and updates the seller
    // The "this.authService.reloadSeller()" function calls from the "reloadSeller" method from the "auth" Service
    this.user.reloadUser();
  }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  // The `loginUser` function is sends valid email & password on server
  // The loginUser function calls from the "postUserByEmail" method from the "auth" Service "Post" request
  loginUser() {
    if (this.loginForm.valid) {
      this.user.postUserByEmail(this.loginForm.value);
      // Get Display name from token
      this.user.getToken();
      // authGauard use for "auth.guard.ts" file protection
      this.user.isSellerLoggedIn.subscribe((res) => {
        this.loginForm.reset();
      });
    }
  }

  // The `forgotPsw` function navigates to the 'forgot-password' route using the Angular router.
  forgotPsw() {
    this.router.navigate(['user-forgot-password']);
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
