import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { Product } from '../../../Core/Model/products';
import { priceSummary } from '../../../Core/Model/priceSummary';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
import { Order } from '../../../Core/Model/order';
import { Cart } from '../../../Core/Model/cart';
import { OrderService } from '../../../Core/Services/Order/order.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  // Display User ID from Token
  private userPayload: any;

  // Cart Product Display Propertie
  CartData: Cart[] | undefined;

  // total price propertie
  totalPrice: Order[] | undefined;

  // Cart Product Summary Details Propertie
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    shipping: 0,
    totalPrice: 0,
  };

  constructor(
    private cart: CartService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private order: OrderService,
    private messageService: MessageService,
    private router: Router
  ) {
    // Display User ID from Token
    this.userPayload = this.decodedToken();
  }
  ngOnInit() {
    this.cart.currentCart().subscribe((result) => {
      this.CartData = result;
      let price = 0;
      result.forEach((item) => {
        price += item.productPrice * item.productQuantity;
      });
      this.priceSummary = {
        price,
        discount: 1000,
        shipping: 30,
        totalPrice: price + 30 - 1000,
      };
    });
  }

  orderNowProduct(data: any) {
    let userId = this.userPayload._id;
    if (this.priceSummary.totalPrice) {
    let orderData: Order = {
      ...data,
      totalPrice: this.priceSummary.totalPrice,
      userId,
    };

    this.order.orderNow(orderData).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Your Order has been Placed',
        });
        console.log(response);
        setTimeout(() => {
          this.router.navigate(['/order']);
        }, 2000);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      }
    );
    }
  }

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
}
