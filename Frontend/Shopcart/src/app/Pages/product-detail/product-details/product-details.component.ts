import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../Core/Model/products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../Core/Services/Products/products.service';
import { isPlatformBrowser } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Cart } from '../../../Core/Model/cart';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from '../../../Core/Services/Cart/cart.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  // Display User ID from Token
  private userPayload: any;

  // Product details propertie
  productData: undefined | Product;

  // Product Quantity Popertie
  productQuantity: number = 1;

  // Remove item from local storage cart propertie
  removeCart = false;

  // Remove item from MongoDb Databse cart propertie
  cartData:Product|undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    config: NgbCarouselConfig,
    private productSingleId: ProductsService,
    private cart: CartService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    // Carousel code
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;

    // Display User ID from Token
    this.userPayload = this.decodedToken();
  }

  ngOnInit() {
    let datatId = this.activeRoute.snapshot.paramMap.get('id');
    datatId &&
      this.productSingleId
        .getSingleSellerProductsList(datatId)
        .subscribe((result) => {
          this.productData = result;

          // Remove cart from Local Storage Code
          if (isPlatformBrowser(this.platformId)) {
            let cartData = localStorage.getItem('localCart');
            if (datatId && cartData) {
              let items = JSON.parse(cartData);
              items = items.filter((item: Product) => datatId === item._id);
              if (items.length) {
                this.removeCart = true;
              } else {
                this.removeCart = false;
              }
            }

            // Login user get Cart Data
            let user = localStorage.getItem('UserToken');
            if (user) {
              let userId = this.userPayload._id;
              this.cart.getCartList(userId);
              this.cart.cartData.subscribe((result) => {
                let item = result.filter((item: Product) => datatId === item._id);
                if (item.length) {
                  this.cartData=item[0];
                  this.removeCart = true;
                }
              });
            }
          }
        });
  }

  // Product Quantity
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  // Add To Cart Functionality
  addToCart() {
    if (this.productData) {
      this.productData.productQuantity = this.productQuantity;
      if (!localStorage.getItem('UserToken')) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product added in the cart',
          key: 'tl',
        });
        this.cart.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let userId = this.userPayload._id;
        let cartData: Cart = {
          ...this.productData,
          userId,
        };
        console.warn(cartData);
        this.cart.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.cart.getCartList(userId);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product added in the cart',
              key: 'tl',
            });
            this.removeCart = true;
          }
        });
      }
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

  // Remove item from local Storage to cart Functionality
  removeToCart(productId: any) {
    if (!localStorage.getItem('UserToken')) {
      this.cart.removeItemFromLocalStorage(productId);
    } else {
      this.cartData && this.cart.removeToCart(productId)
      .subscribe((result)=>{
        if (localStorage.getItem('UserToken')) {
          let userId = this.userPayload._id;
          this.cart.getCartList(userId)
        } 
      })
    }
    this.removeCart = false;
  }
}
