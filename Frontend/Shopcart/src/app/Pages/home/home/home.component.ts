import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../../Core/Services/Products/products.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { WishlistService } from '../../../Core/Services/Wishlist/wishlist.service';
import { Wishlist } from '../../../Core/Model/wishlist';
import { Product } from '../../../Core/Model/products';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  // Display User ID from Token
  private userPayload: any;
    
  // Catagory Properties
  items: MegaMenuItem[] | undefined;

  // Get Products List
  products: any | Product;

  // Remove Whishlist item propertie
  removeWishlist = false;

  constructor(
    private product: ProductsService,
    config: NgbCarouselConfig,
    private router: Router,
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
    
    // Catagory Items List
    this.items = [
      {
        label: 'Furniture',
        icon: 'pi pi-box',
        items: [
          [
            {
              label: 'Living Room',
              items: [
                { label: 'Accessories' },
                { label: 'Armchair' },
                { label: 'Coffee Table' },
                { label: 'Couch' },
                { label: 'TV Stand' },
              ],
            },
          ],
          [
            {
              label: 'Kitchen',
              items: [
                { label: 'Bar stool' },
                { label: 'Chair' },
                { label: 'Table' },
              ],
            },
            {
              label: 'Bathroom',
              items: [{ label: 'Accessories' }],
            },
          ],
          [
            {
              label: 'Bedroom',
              items: [
                { label: 'Bed' },
                { label: 'Chaise lounge' },
                { label: 'Cupboard' },
                { label: 'Dresser' },
                { label: 'Wardrobe' },
              ],
            },
          ],
          [
            {
              label: 'Office',
              items: [
                { label: 'Bookcase' },
                { label: 'Cabinet' },
                { label: 'Chair' },
                { label: 'Desk' },
                { label: 'Executive Chair' },
              ],
            },
          ],
        ],
      },
      {
        label: 'Electronics',
        icon: 'pi pi-mobile',
        items: [
          [
            {
              label: 'Computer',
              items: [
                { label: 'Monitor' },
                { label: 'Mouse' },
                { label: 'Notebook' },
                { label: 'Keyboard' },
                { label: 'Printer' },
                { label: 'Storage' },
              ],
            },
          ],
          [
            {
              label: 'Home Theather',
              items: [
                { label: 'Projector' },
                { label: 'Speakers' },
                { label: 'TVs' },
              ],
            },
          ],
          [
            {
              label: 'Gaming',
              items: [
                { label: 'Accessories' },
                { label: 'Console' },
                { label: 'PC' },
                { label: 'Video Games' },
              ],
            },
          ],
          [
            {
              label: 'Appliances',
              items: [
                { label: 'Coffee Machine' },
                { label: 'Fridge' },
                { label: 'Oven' },
                { label: 'Vaccum Cleaner' },
                { label: 'Washing Machine' },
              ],
            },
          ],
        ],
      },
      {
        label: 'Sports',
        icon: 'pi pi-clock',
        items: [
          [
            {
              label: 'Football',
              items: [
                { label: 'Kits' },
                { label: 'Shoes' },
                { label: 'Shorts' },
                { label: 'Training' },
              ],
            },
          ],
          [
            {
              label: 'Running',
              items: [
                { label: 'Accessories' },
                { label: 'Shoes' },
                { label: 'T-Shirts' },
                { label: 'Shorts' },
              ],
            },
          ],
          [
            {
              label: 'Swimming',
              items: [
                { label: 'Kickboard' },
                { label: 'Nose Clip' },
                { label: 'Swimsuits' },
                { label: 'Paddles' },
              ],
            },
          ],
          [
            {
              label: 'Tennis',
              items: [
                { label: 'Balls' },
                { label: 'Rackets' },
                { label: 'Shoes' },
                { label: 'Training' },
              ],
            },
          ],
        ],
      },
      {
        label: 'Grocery',
        icon: 'pi pi-shopping-bag',
        items: [
          [
            {
              label: 'Living Room',
              items: [
                { label: 'Accessories' },
                { label: 'Armchair' },
                { label: 'Coffee Table' },
                { label: 'Couch' },
                { label: 'TV Stand' },
              ],
            },
          ],
          [
            {
              label: 'Kitchen',
              items: [
                { label: 'Bar stool' },
                { label: 'Chair' },
                { label: 'Table' },
              ],
            },
            {
              label: 'Bathroom',
              items: [{ label: 'Accessories' }],
            },
          ],
          [
            {
              label: 'Bedroom',
              items: [
                { label: 'Bed' },
                { label: 'Chaise lounge' },
                { label: 'Cupboard' },
                { label: 'Dresser' },
                { label: 'Wardrobe' },
              ],
            },
          ],
          [
            {
              label: 'Office',
              items: [
                { label: 'Bookcase' },
                { label: 'Cabinet' },
                { label: 'Chair' },
                { label: 'Desk' },
                { label: 'Executive Chair' },
              ],
            },
          ],
        ],
      },
      {
        label: 'Fashion',
        icon: 'pi pi-barcode',
      },
      {
        label: 'Home & Furniture',
        icon: 'pi pi pi-box',
      },
      {
        label: 'Appliances',
        icon: 'pi pi-wrench',
      },
      {
        label: 'Travel',
        icon: 'pi pi-car',
      },
      {
        label: 'Toys',
        icon: 'pi pi-gift',
      },
    ];

    this.getHome();
  }

  getHome() {
    this.product.getSellerProductList().subscribe((data: any) => {
      this.products = data;
      // console.log(this.products);
    });
  }
  productDetails(id: number) {
    this.router.navigate(['products-details', id]);
  }

  // Add To Whishlist Functionality
  addToWishlist() {
    if(this.products){
      if (!localStorage.getItem('UserToken')) {
        this.router.navigate(['user-login']);
      } else{
        let userId = this.userPayload._id;
        let cartData: Wishlist = {
          // display all 13 numbers array 
          userId: userId,
          productId: this.products[0]._id,
          productName: this.products[0].productName,
          productPrice: this.products[0].productPrice,
          productColour: this.products[0].productColour,
          productQuantity: this.products[0].productQuantity,
          productCategory: this.products[0].productCategory,
          productImage: this.products[0].productImage,
          productDescription: this.products[0].productDescription,
        };
        this.wishlist.addToWishlist(cartData).subscribe((result) => {
          if (result) {
            this.wishlist.getsingleWishlistProduct(userId);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Item saved in my wishlist',
            });
            this.removeWishlist = true;
            console.warn(result);
          }
        });
      }
    }
  }

  // Remove item Whishlist Functionality
  removeToWishlist() {
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
