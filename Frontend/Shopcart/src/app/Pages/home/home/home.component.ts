import { Component } from '@angular/core';
import { ProductsService } from '../../../Core/Services/Products/products.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

products: any

constructor(private product: ProductsService,config: NgbCarouselConfig, private router: Router) {
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
productDetails(id: number){
  this.router.navigate(['products-details',id]);
}
}
