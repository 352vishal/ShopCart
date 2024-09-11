import { Component } from '@angular/core';
import { Order } from '../../../Core/Model/order';
import { OrderService } from '../../../Core/Services/Order/order.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { Cart } from '../../../Core/Model/cart';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  // Order Data Display Property
  orderData:Order[]|undefined

  constructor(private order:OrderService,private router:Router,
  private messageService: MessageService){}

  ngOnInit(): void {
    this.getOrderList();
  }

  // Get Order Data from order Service
  getOrderList(){
    this.order.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

  // Cancel Order Method
  cancelOrder(orderId:number|undefined){
    if(confirm('Are you sure you want to delete this order?'))
    orderId && this.order.cancelOrder(orderId).subscribe(      
      response => {
      this.getOrderList();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Your Order has been Delete" });
      console.log(response);
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    });
  }

  // Roting navigate Order Details page
  orderDetail(id: any){
    this.router.navigate(['order-detail', id]);
  }

}
