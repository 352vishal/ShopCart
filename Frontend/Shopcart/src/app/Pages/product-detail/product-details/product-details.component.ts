import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../Core/Model/seller';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../Core/Services/Seller Products/products.service';
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

    constructor(private activeRoute:ActivatedRoute,config: NgbCarouselConfig, private product: ProductsService){
    // Carousel code
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
}

    ngOnInit() {
      let datatId = this.activeRoute.snapshot.paramMap.get('id');
      console.warn(datatId)
      datatId && this.product.getSingleSellerProductsList(datatId).subscribe((result)=>{
        console.warn(result);
        this.productData= result;
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

    }

}
