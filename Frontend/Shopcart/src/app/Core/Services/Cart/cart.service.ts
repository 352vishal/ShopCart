import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Product } from '../../Model/products';
import { Cart } from '../../Model/cart';
import { constant } from '../../Constant/constant';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private httpOptions = {};
  
  // Display User ID from Token
  private userPayload: any;

  // Add to cart EventEmitter
  cartData = new EventEmitter<Product[] | []>();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userPayload = this.decodedToken();
  }

  // The `addToCart` function sends a POST request on the server
  // to save the Cart details data on the mongoDb databse.
  addToCart(cartData: Cart) {
    return this.http.post<Cart>(constant.apiEndPoint.Cart, cartData);
  }

  // Add to cart functionality
  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  // Remove item from local Storage to cart functionality
  removeItemFromLocalStorage(productId: any) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item._id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  getCartList(userId: number) {
    return this.http
      .get<Product[]>(`${constant.apiEndPoint.Cart}?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((result) => {
        // console.warn(result);
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  // Remove item from MongoDb DataBase to cart functionality
  removeToCart(cartId: number) {
    return this.http.delete(`${constant.apiEndPoint.Cart}/${cartId}`,
      this.httpOptions = {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("auth-token", "" + localStorage.getItem("token")) // Add JWT token to the request header.
          
      }
    );
  }

  // Display Products on Cart Page
  currentCart() {
    let userId = this.getIdFromToken();
    return this.http.get<Product[]>(
      `${constant.apiEndPoint.Cart}?userId=${userId}`
    );
  }

  // Get user id
  // Display User ID from Token
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('UserToken')) {
      }
    }
    return localStorage.getItem('UserToken');
  }
  // Display User ID from Token
  decodedToken() {
    if (isPlatformBrowser(this.platformId)) {
      const jwtHelper = new JwtHelperService();
      const token = this.getToken()!;
      // console.log(jwtHelper.decodeToken(token))
      return jwtHelper.decodeToken(token);
    }
  }
  // Display User FullName from Token
  getIdFromToken() {
    if (this.userPayload) return this.userPayload.id;
  }
}
