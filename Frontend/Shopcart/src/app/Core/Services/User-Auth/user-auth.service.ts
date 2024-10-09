import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { constant } from '../../Constant/constant';
import { MessageService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../Model/user-auth';
import { Product } from '../../Model/products';
import { Cart } from '../../Model/cart';
import { CartService } from '../Cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private msgService: MessageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cart: CartService
  ) {
    this.userPayload = this.decodedToken();
  }

  // Display User FullName from Token
  private userPayload: any;

  // Display User FullName from Token
  private name$ = new BehaviorSubject<string>('');

  // Display User FullName from Token
  public getFullNameFromStore() {
    return this.name$.asObservable();
  }
  // Display User FullName from Token
  public setFullNameForStore(name: any) {
    this.name$.next(name);
  }

  // Guard redirection Protection code
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  /* The `registerUser` function sends a POST request to the server to register a new user with the 
provided details. save on MongoDb Database*/
  registerUser(userDetails: User) {
    return this.http.post<any>(
      `${constant.apiEndPoint.AuthUser}/register`,
      userDetails
    );
  }

  /* The `postUserByEmail` function sends a POST request on the 
Seller Valid login details to the server with the 
provided details. save on MongoDb Database*/
  postUserByEmail(user: any) {
    return this.http
      .post<any>(`${constant.apiEndPoint.AuthUser}/login`, user)
      .subscribe(
        (res) => {
          localStorage.setItem('UserToken', res.token);
          this.isSellerLoggedIn.next(true);
          this.router.navigate(['/']);

          // User Product Data Added in the Cart 
          let data = localStorage.getItem('localCart');
          let user = localStorage.getItem('UserToken');
          let userId = this.getUserIdFromToken()
          
          if(data){
            let cartDataList = JSON.parse(data);
            cartDataList.forEach((product:Product, index: any)=>{
              let cartData:Cart={
                ...product,
                productId:product.id,
                userId,
                subtotal: product.productPrice * product.productQuantity,
                discount: 100,
                shipping: 30,
                totalPrice: product.productPrice * product.productQuantity + 30 - 100,
                }
              setTimeout(() => {
                this.cart.addToCart(cartData).subscribe((result)=>{
                  if(result){
                    // console.warn("data is stored in DB");
                  }
                })
              }, 500);
              if(cartDataList.length===index+1){
                localStorage.removeItem('localCart')
              }
            })
          }
          setTimeout(() => {
             this.cart.getCartList(userId)
            }, 2000);
        
        },
        (error) => {
          this.msgService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
  }

  /*The `reloadSeller` function checks if a token is stored in local storage and updates the seller
login status accordingly.*/

  reloadUser() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('UserToken')) {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['/']);
      }
    }
  }

  // Reset password sendLink post method
  sendEmail(email: string) {
    return this.http.post<any>(
      `${constant.apiEndPoint.AuthUser}/send-email`,
      email
    );
  }

  // Reset password Reset post method
  resetPassword(resetObj: any) {
    return this.http.post<any>(
      `${constant.apiEndPoint.AuthUser}/reset-password`,
      resetObj
    );
  }

  // Display User FullName from Token
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('UserToken')) {
        this.isSellerLoggedIn.next(true);
      }
    }
    return localStorage.getItem('UserToken');
  }
  // Display User FullName from Token
  decodedToken() {
    if (isPlatformBrowser(this.platformId)) {
      const jwtHelper = new JwtHelperService();
      const token = this.getToken()!;
      // console.log(jwtHelper.decodeToken(token))
      return jwtHelper.decodeToken(token);
    }
  }
  // Display User FullName from Token
  getfullNameFromToken() {
    if (this.userPayload) return this.userPayload.name;
  }
  // Display User ID from Token
  getUserIdFromToken() {
      if (this.userPayload) return this.userPayload._id;
    }
}
