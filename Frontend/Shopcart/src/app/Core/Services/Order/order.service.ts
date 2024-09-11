import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../Model/order';
import { constant } from '../../Constant/constant';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  // Post Order Details
  orderNow(data: Order) {
    return this.http.post<Order>(`${constant.apiEndPoint.Order}`, data);
  }
  // Get Order Details
  orderList() {
    return this.http.get<Order[]>(`${constant.apiEndPoint.Order}`);
  }
  // Get single Order Details
  getOrderDetails(orderId:number){
    return this.http.get<Order>(`${constant.apiEndPoint.Order}/${orderId}`);
  }
  // Delete Order Details
  cancelOrder(orderId:number){
    return this.http.delete<Order>(`${constant.apiEndPoint.Order}/${orderId}`);
  }
}
