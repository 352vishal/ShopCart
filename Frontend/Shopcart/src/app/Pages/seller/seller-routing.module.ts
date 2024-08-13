import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { authGuard } from '../../Core/guards/auth.guard';

const routes: Routes = [
  {
    component: SellerHomeComponent,
    path: 'seller-home',
    canActivate: [authGuard]
  },
  {
    component: AddProductComponent,
    path: 'add-product',
  },
  {
    component: UpdateProductComponent,
    path: 'update-product/:id',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
