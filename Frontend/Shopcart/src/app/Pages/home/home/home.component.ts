import { Component } from '@angular/core';
import { ProductsService } from '../../../Core/Services/Seller Products/products.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

products: any

constructor(private product: ProductsService,config: NgbCarouselConfig) {
  // Carousel code
  config.interval = 2000;
  config.keyboard = true;
  config.pauseOnHover = true;
}

ngOnInit() {
  this.getHome();
}

getHome() {
  this.product.getSellerProductList().subscribe((data: any) => {
    this.products = data;
    // console.log(this.products);
  });
}
}
