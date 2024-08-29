import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/Seller-Auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private AuthService:AuthService, @Inject(PLATFORM_ID) private platformId: Object){}
  // Guard redirection Protection code
  // without logging can not be redirected login page
  canActivate(
    // The function calls from the "UserGuard" method from the "auth" Service Get request
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return this.AuthService.isSellerLoggedIn;
      if (isPlatformBrowser(this.platformId)) {
      if(localStorage.getItem('token')){
        return true;
       }
      }
      return this.AuthService.isSellerLoggedIn;
  }
  
}