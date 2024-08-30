import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    NgbModule
  ],
  exports: [
    ProductDetailRoutingModule
  ]
})
export class ProductDetailModule { }
