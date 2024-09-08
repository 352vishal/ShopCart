import { Component } from '@angular/core';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { Product } from '../../../Core/Model/products';
import { priceSummary } from '../../../Core/Model/priceSummary';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

// Cart Product Display Propertie 
CartData: Product[] | undefined;

// Cart Product Summary Details Propertie
priceSummary: priceSummary= {
  price: 0,
  discount: 0,
  shipping: 0,
  totalPrice: 0
}

  constructor(private cart: CartService, private router: Router){}

  ngOnInit() {
    this.cart.currentCart().subscribe((result) =>{
      this.CartData = result;
      let price = 0;
      result.forEach((item) =>{
        price += item.productPrice * item.productQuantity;
      })
      this.priceSummary = {
        price,
        discount: 1000,
        shipping: 30,
        totalPrice: price + 30 - 1000
      }
      // console.warn(this.priceSummary);
    });
  }

  // Checkout routing navigate function
  Checkout(){
    this.router.navigate(['checkout']);
  }

}
