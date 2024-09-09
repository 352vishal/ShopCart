import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { authGuard } from '../../Core/guards/auth.guard';

const routes: Routes = [
  {
    path:"order",
    component: OrdersComponent,
    canActivate: [authGuard]
  },
  {
    path:"order-detail",
    component: OrderDetailsComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
