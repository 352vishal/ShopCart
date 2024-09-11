import { Component } from '@angular/core';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { Order } from '../../../Core/Model/order';
import { OrderService } from '../../../Core/Services/Order/order.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../../Core/Services/User-Auth/user-auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {

orderProductData:Order[]|undefined

// Display User FullName from Token
UserfullName : string = "";

constructor(public product:CartService, private order:OrderService,
private activeRoute: ActivatedRoute, private user:UserAuthService){}

ngOnInit(): void {
// get single order data
  this.activeRoute.params.subscribe(params => {
    this.order.getOrderDetails(params['id']).subscribe((result) => {
      this.orderProductData = [result];
      console.warn(result);
    });
  });

    // Display User FullName from Token
    this.user.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.user.getfullNameFromToken();
          this.UserfullName = val || fullNameFromToken
     });
}
  
}
