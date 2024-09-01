import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Seller } from '../../Model/seller-auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { constant } from '../../Constant/constant';
import { MessageService } from 'primeng/api';
import {JwtHelperService} from '@auth0/angular-jwt'
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router, private msgService: MessageService,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userPayload = this.decodedToken();
   }
  
  // Display User FullName from Token
  private userPayload:any;

    // Display User FullName from Token
    private name$ = new BehaviorSubject<string>("");

    // Display User FullName from Token
    public getFullNameFromStore(){
      return this.name$.asObservable();
    }
    // Display User FullName from Token
    public setFullNameForStore(name:any){
      this.name$.next(name)
    }

  // Guard redirection Protection code
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);


  /* The `registerUser` function sends a POST request to the server to register a new user with the 
   provided details. save on MongoDb Database*/
  registerSeller(sellerDetails: Seller) {
    return this.http.post<any>(`${constant.apiEndPoint.AuthSeller}/register`, sellerDetails);
  }

  /* The `postUserByEmail` function sends a POST request on the 
     Seller Valid login details to the server with the 
     provided details. save on MongoDb Database*/
  postSellerByEmail(seller: any) {
    return this.http.post<any>(`${constant.apiEndPoint.AuthSeller}/login`, seller)
    .subscribe(
      res => {
          localStorage.setItem("token", res.token);
          this.isSellerLoggedIn.next(true)
          this.router.navigate(["seller-home"])
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    }
   
    );
  }

/*The `reloadSeller` function checks if a token is stored in local storage and updates the seller
  login status accordingly.*/

  reloadSeller(){
    if (isPlatformBrowser(this.platformId)) {
     if(localStorage.getItem('token')){
    this.isSellerLoggedIn.next(true)
    this.router.navigate(['seller-home'])
    }
  }
  }

  // Reset password sendLink post method 
  sendEmail(email: string){
    return this.http.post<any>(`${constant.apiEndPoint.AuthSeller}/send-email`, email);
  }

  // Reset password Reset post method 
  resetPassword(resetObj: any){
    return this.http.post<any>(`${constant.apiEndPoint.AuthSeller}/reset-password`, resetObj);
  }

  // Display User FullName from Token
  getToken(){
    if (isPlatformBrowser(this.platformId)) {
       if(localStorage.getItem('token')){
       this.isSellerLoggedIn.next(true)
     }
   }
   return localStorage.getItem('token');
  }
  // Display User FullName from Token
  decodedToken(){
    if (isPlatformBrowser(this.platformId)) {
      const jwtHelper = new JwtHelperService();
      const token = this.getToken()!;
      console.log(jwtHelper.decodeToken(token))
      return jwtHelper.decodeToken(token)
  }
  }
  // Display User FullName from Token
  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }
}