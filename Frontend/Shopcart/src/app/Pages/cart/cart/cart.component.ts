import { Component } from '@angular/core';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { priceSummary } from '../../../Core/Model/priceSummary';
import { Router } from '@angular/router';
import { Cart } from '../../../Core/Model/cart';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

// Cart Product Display Propertie 
CartData: Cart[] | undefined;

// Cart Product Summary Details Propertie
priceSummary: priceSummary= {
  price: 0,
  discount: 0,
  shipping: 0,
  totalPrice: 0
}

  constructor(private cart: CartService, private router: Router,
  private messageService: MessageService){}

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails(){
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
      // if your cart is empty then redirect home page
      if(!this.CartData.length){
        this.router.navigate(['/'])
      }
    });
  }

  removeToCartItem(orderId: any){
    if(confirm('Are you sure you want to delete this order?'))
    this.cart.removeToCart(orderId).subscribe(      
      response => {
      this.loadDetails();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Your cart item has been removed" });
      console.log(response);
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    });
  }
  // Checkout routing navigate function
  Checkout(){
    this.router.navigate(['checkout']);
  }

}
