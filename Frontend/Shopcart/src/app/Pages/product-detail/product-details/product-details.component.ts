import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../Core/Model/products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../Core/Services/Products/products.service';
import { isPlatformBrowser } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { Cart } from '../../../Core/Model/cart';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { WishlistService } from '../../../Core/Services/Wishlist/wishlist.service';
import { Wishlist } from '../../../Core/Model/wishlist';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {

  // Dialir
  dial: MenuItem[] | any;

  // Category product propertie
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  
  // Display User ID from Token
  private userPayload: any;

  // Product details propertie
  productData: undefined | Product;

  // Product Quantity Popertie
  productQuantity: number = 1;

  // Remove item from local storage cart propertie
  removeCart = false;

  // Remove Whishlist item propertie
  removeWishlist = false;

  // Remove item from MongoDb Databse cart propertie
  cartData:Product|undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    config: NgbCarouselConfig,
    private product: ProductsService,
    private cart: CartService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private messageService: MessageService,
    private wishlist: WishlistService
  ) {
    // Carousel code
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;

    // Display User ID from Token
    this.userPayload = this.decodedToken();
  }

  ngOnInit() {

    // Dialir icon
    this.dial = [
      {
          icon: 'pi pi-whatsapp',
          url: 'https://www.facebook.com/'
      },
      {
          icon: 'pi pi-facebook',
          url: 'https://www.facebook.com/'
      },
      {
          icon: 'pi pi-twitter',
          target:'_blank',
          url: 'https://www.twitter.com/'
      }
  ];

    // Category product items
    this.items = [
      { label: 'Fashion' },
      { label: 'Cloths' }, 
      { label: 'Shirt' }
  ];

  this.home = { icon: 'pi pi-home', routerLink: '/' };


    let datatId = this.activeRoute.snapshot.paramMap.get('id');
    datatId &&
      this.product.getSingleSellerProductsList(datatId)
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

  // Remove item from local Storage to cart Functionality
  removeToCart(productId: any) {
      if (!localStorage.getItem('UserToken')) {
        this.cart.removeItemFromLocalStorage(productId);
      } else {
        this.cart.removeToCart(productId).subscribe((result) => {
          console.warn(result);
        });
      }
      this.removeCart = false;
  }

  // Add To Whishlist Functionality
  addToWishlist() {
    if (this.productData) {
        let userId = this.userPayload._id;
        let cartData: Wishlist = {
          ...this.productData,
          userId,
        };
        // console.warn(cartData);
        this.wishlist.addToWishlist(cartData).subscribe((result) => {
          if (result) {
            this.wishlist.getsingleWishlistProduct(userId);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Item saved in my wishlist',
              key: 'tl',
            });
            this.removeWishlist = true;
          }
        });
      
    }
  }
  
  // Remove item Whishlist Functionality
  removeToWishlist(){
    this.removeWishlist = false;
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
