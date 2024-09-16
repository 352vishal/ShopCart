import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductDetailsComponent } from './product-details/product-details.component';

// prime-ng module
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SpeedDialModule } from 'primeng/speeddial';


@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    NgbModule,
    ToastModule,
    BreadcrumbModule,
    SpeedDialModule
  ],
  exports: [
    ProductDetailRoutingModule
  ]
})
export class ProductDetailModule { }
