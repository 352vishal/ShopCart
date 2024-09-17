import { Component } from '@angular/core';
import { ProductsService } from '../../../Core/Services/Products/products.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MegaMenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

// Catagory Properties
items: MegaMenuItem[] | undefined; 

// Get Products List
products: any

// Remove Whishlist item propertie
removeWishlist = false;


constructor(private product: ProductsService,config: NgbCarouselConfig, private router: Router,
    private messageService: MessageService) {
  // Carousel code
  config.interval = 2000;
  config.keyboard = true;
  config.pauseOnHover = true;
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
                    items: [{ label: 'Accessories' }, { label: 'Armchair' }, { label: 'Coffee Table' }, { label: 'Couch' }, { label: 'TV Stand' }]
                }
            ],
            [
                {
                    label: 'Kitchen',
                    items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }]
                },
                {
                    label: 'Bathroom',
                    items: [{ label: 'Accessories' }]
                }
            ],
            [
                {
                    label: 'Bedroom',
                    items: [{ label: 'Bed' }, { label: 'Chaise lounge' }, { label: 'Cupboard' }, { label: 'Dresser' }, { label: 'Wardrobe' }]
                }
            ],
            [
                {
                    label: 'Office',
                    items: [{ label: 'Bookcase' }, { label: 'Cabinet' }, { label: 'Chair' }, { label: 'Desk' }, { label: 'Executive Chair' }]
                }
            ]
        ]
    },
    {
        label: 'Electronics',
        icon: 'pi pi-mobile',
        items: [
            [
                {
                    label: 'Computer',
                    items: [{ label: 'Monitor' }, { label: 'Mouse' }, { label: 'Notebook' }, { label: 'Keyboard' }, { label: 'Printer' }, { label: 'Storage' }]
                }
            ],
            [
                {
                    label: 'Home Theather',
                    items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
                }
            ],
            [
                {
                    label: 'Gaming',
                    items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
                }
            ],
            [
                {
                    label: 'Appliances',
                    items: [{ label: 'Coffee Machine' }, { label: 'Fridge' }, { label: 'Oven' }, { label: 'Vaccum Cleaner' }, { label: 'Washing Machine' }]
                }
            ]
        ]
    },
    {
        label: 'Sports',
        icon: 'pi pi-clock',
        items: [
            [
                {
                    label: 'Football',
                    items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }]
                }
            ],
            [
                {
                    label: 'Running',
                    items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }]
                }
            ],
            [
                {
                    label: 'Swimming',
                    items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }]
                }
            ],
            [
                {
                    label: 'Tennis',
                    items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }]
                }
            ]
        ]
    },
    {
      label: 'Grocery',
      icon: 'pi pi-shopping-bag',
      items: [
          [
              {
                  label: 'Living Room',
                  items: [{ label: 'Accessories' }, { label: 'Armchair' }, { label: 'Coffee Table' }, { label: 'Couch' }, { label: 'TV Stand' }]
              }
          ],
          [
              {
                  label: 'Kitchen',
                  items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }]
              },
              {
                  label: 'Bathroom',
                  items: [{ label: 'Accessories' }]
              }
          ],
          [
              {
                  label: 'Bedroom',
                  items: [{ label: 'Bed' }, { label: 'Chaise lounge' }, { label: 'Cupboard' }, { label: 'Dresser' }, { label: 'Wardrobe' }]
              }
          ],
          [
              {
                  label: 'Office',
                  items: [{ label: 'Bookcase' }, { label: 'Cabinet' }, { label: 'Chair' }, { label: 'Desk' }, { label: 'Executive Chair' }]
              }
          ]
      ]
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
]

  this.getHome();
}

getHome() {
  this.product.getSellerProductList().subscribe((data: any) => {
    this.products = data;
    // console.log(this.products);
  });
}
productDetails(id: number){
  this.router.navigate(['products-details',id]);
}

// Add To Whishlist Functionality
addToWishlist() {
   if(this.removeWishlist = true){
     this.messageService.add({severity: 'success',summary: 'Success',detail: 'Item saved in my whishlist'});
   }
    
}
  
// Remove item Whishlist Functionality
removeToWishlist(){
   this.removeWishlist = false;
}

}
