import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/Seller-Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private AuthService:AuthService){}
  // Guard redirection Protection code
  // without logging can not be redirected login page
  canActivate(
    // The function calls from the "UserGuard" method from the "auth" Service Get request
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AuthService.isSellerLoggedIn;
  }
  
}