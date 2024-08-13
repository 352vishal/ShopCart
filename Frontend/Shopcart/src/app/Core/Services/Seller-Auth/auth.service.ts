import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Model/seller-auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { constant } from '../../Constant/constant';
import { MessageService } from 'primeng/api';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router, private msgService: MessageService) {
    this.userPayload = this.decodedToken();
   }
  
  // Guard redirection Protection code
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);

  // Display User FullName from Token
  private userPayload:any;


  /* The `registerUser` function sends a POST request to the server to register a new user with the 
   provided details. save on MongoDb Database*/
  registerSeller(sellerDetails: User) {
    return this.http.post<any>(`${constant.apiEndPoint.AuthUrl}/register`, sellerDetails);
  }

  /* The `postUserByEmail` function sends a POST request on the 
     Seller Valid login details to the server with the 
     provided details. save on MongoDb Database*/
  postSellerByEmail(seller: any) {
    return this.http.post<any>(`${constant.apiEndPoint.AuthUrl}/login`, seller)
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
    if(localStorage.getItem('token')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }

  // Reset password sendLink post method 
  sendEmail(email: string){
    return this.http.post<any>(`${constant.apiEndPoint.AuthUrl}/send-email`, email);
  }

  // Reset password Reset post method 
  resetPassword(resetObj: any){
    return this.http.post<any>(`${constant.apiEndPoint.AuthUrl}/reset-password`, resetObj);
  }

  // Display User FullName from Token
  getToken(){
    if(localStorage.getItem('token')){
      this.isSellerLoggedIn.next(true)
    }
    return localStorage.getItem('token');
  }
  // Display User FullName from Token
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }
  // Display User FullName from Token
  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }
}