import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../Core/Model/seller';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../Core/Services/Seller Products/products.service';
import { isPlatformBrowser } from '@angular/common';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

 // Product details propertie 
productData:undefined | Product;

// Product Quantity Popertie
productQuantity:number=1;

// Remove cart propertie
removeCart=false;

    constructor(private activeRoute:ActivatedRoute,config: NgbCarouselConfig, 
    private product: ProductsService,@Inject(PLATFORM_ID) private platformId: Object,
    private messageService: MessageService){
    // Carousel code
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
}

    ngOnInit() {
      let datatId = this.activeRoute.snapshot.paramMap.get('id');
      datatId && this.product.getSingleSellerProductsList(datatId).subscribe((result)=>{
        this.productData= result;

        // Remove cart Code
        if (isPlatformBrowser(this.platformId)) {
          let cartData= localStorage.getItem('localCart');
          if(datatId && cartData){
            let items = JSON.parse(cartData);
            items = items.filter((item:Product)=>datatId=== item._id);
            if(items.length){
              this.removeCart=true
            }else{
              this.removeCart=false
            }
          }
        }
      });
    }

    // Product Quantity
    handleQuantity(val:string){
      if(this.productQuantity<20 && val==='plus'){
        this.productQuantity+=1;
      }else if(this.productQuantity>1 && val==='min'){
        this.productQuantity-=1;
      }
    }

    // Add To Cart Functionality
    addToCart(){
      if(this.productData){
        this.productData.quantity = this.productQuantity;
        if(!localStorage.getItem('token')){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Product added in the cart" });
          this.product.localAddToCart(this.productData);
          this.removeCart=true
        }
        else{
          alert('Login user cant add products.');
        }
      } 
    }

     // Remove cart Functionality
    removeToCart(productId: any){
      this.product.removeItemFromCart(productId)
      this.removeCart=false
    }

}
