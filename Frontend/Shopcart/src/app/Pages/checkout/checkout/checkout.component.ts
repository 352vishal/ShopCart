import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../../Core/Services/Cart/cart.service';
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

  // Product Summary Details
    productSummary: Cart = {
      _id: '',
      userId: '',
      productName: '',
      productPrice: 0,
      productColour: '',
      productQuantity: 0,
      productCategory: '',
      productImage: undefined,
      productDescription: '',
      productId: ''
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
    
    // Price Summary code
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
      this.productSummary = {
        _id: '',
        userId: '',
        productName: this.productSummary.productName = this.CartData[0].productName,
        productPrice: this.productSummary.productPrice = this.CartData[0].productPrice,
        productColour: this.productSummary.productColour = this.CartData[0].productColour,
        productQuantity: this.productSummary.productQuantity = this.CartData[0].productQuantity,
        productCategory: this.productSummary.productCategory = this.CartData[0].productCategory,
        productImage: this.productSummary.productImage = this.CartData[0].productImage,
        productDescription: this.productSummary.productDescription = this.CartData[0].productDescription,
        productId: ''
      };
    });
  }

  // Order details post on mongo database
  orderNowProduct(data: any) {
    let userId = this.userPayload._id;
    if (this.priceSummary.totalPrice) {
    let orderData: Order = {
      ...data,
      price: this.priceSummary.price,
      totalPrice: this.priceSummary.totalPrice,
      shipping: this.priceSummary.shipping,
      discount: this.priceSummary.discount,
      productName: this.productSummary.productName,
      productImage: this.productSummary.productImage,
      productDescription: this.productSummary.productDescription,
      productPrice: this.productSummary.productPrice,
      productColour: this.productSummary.productColour,
      productQuantity: this.productSummary.productQuantity,
      productCategory: this.productSummary.productCategory,
      userId,
    };

    // order cart item delete after completed to place the order
    this.CartData?.forEach((item) => {
      this.cart.deleteCartItems(item._id);
    })

    // order cart item store in database
    this.order.orderNow(orderData).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Your Order has been Placed',
        });
        setTimeout(() => {
          this.router.navigate(['/order']);
        }, 2000);
        console.warn(response);
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
