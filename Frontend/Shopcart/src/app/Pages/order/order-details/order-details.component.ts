import { Component } from '@angular/core';
import { Product } from '../../../Core/Model/products';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { Cart } from '../../../Core/Model/cart';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {

orderProductData:Cart[]|undefined

constructor(public product:CartService ){}

ngOnInit(): void {
  this.product.currentCart().subscribe((result) =>{
    this.orderProductData = result;
  });
}

}
