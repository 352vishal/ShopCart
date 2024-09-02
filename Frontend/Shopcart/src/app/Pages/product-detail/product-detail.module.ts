import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    NgbModule,
    ToastModule
  ],
  exports: [
    ProductDetailRoutingModule
  ]
})
export class ProductDetailModule { }
