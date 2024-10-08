import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../../Core/Services/Cart/cart.service';
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

  // Order Stepper Prperties
  active: any | undefined = 0;

  name: any | undefined = null;

  email: any | undefined = null;

  password: any | undefined = null;

  option1: boolean | undefined = false;

  option2: boolean | undefined = false;

  option3: boolean | undefined = false;

  option4: boolean | undefined = false;

  option5: boolean | undefined = false;

  option6: boolean | undefined = false;

  option7: boolean | undefined = false;

  option8: boolean | undefined = false;

  option9: boolean | undefined = false;

  option10: boolean | undefined = false;

  // Display User ID from Token
  private userPayload: any;

  // Cart Product Display Propertie
  CartData: Cart[] | undefined;

  // total price propertie
  totalPrice: Order[] | undefined;

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
      productId: '',
      subtotal: 0,
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
    
    // Price Summary code
    this.cart.currentCart().subscribe((result) => {
      this.CartData = result;
      let price = 0;
      result.forEach((item) => {
        price += item.productPrice * item.productQuantity;
      });
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
        productId: '',
        subtotal: price,
        discount: 100,
        shipping: 30,
        totalPrice: price + 30 - 100,
      };
    });
  }

  // Order details post on mongo database
  orderNowProduct(data: any) {
    let userId = this.userPayload._id;
    if (this.productSummary.totalPrice) {
    let orderData: Order = {
      ...data,
      price: this.productSummary.productPrice,
      totalPrice: this.productSummary.totalPrice,
      shipping: this.productSummary.shipping,
      discount: this.productSummary.discount,
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
        }, 1000);
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
