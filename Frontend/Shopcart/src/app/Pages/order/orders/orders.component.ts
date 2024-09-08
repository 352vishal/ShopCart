import { Component } from '@angular/core';
import { Order } from '../../../Core/Model/order';
import { OrderService } from '../../../Core/Services/Order/order.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orderData:Order[]|undefined

  constructor(private order:OrderService, private messageService: MessageService){}

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(){
    this.order.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

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

}
