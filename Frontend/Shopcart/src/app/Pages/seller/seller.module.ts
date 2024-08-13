import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';

// Form Module
import { FormsModule , ReactiveFormsModule } from '@angular/forms';


// Angumar Material Modules
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';


// Components
import { AddProductComponent } from './add-product/add-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({
  declarations: [
    AddProductComponent,
    SellerHomeComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
    MatInputModule
  ],
  providers: [
    MatTableDataSource
  ],
  exports: [
    AddProductComponent,
    SellerHomeComponent,
    UpdateProductComponent,
  ],
})
export class SellerModule { }
