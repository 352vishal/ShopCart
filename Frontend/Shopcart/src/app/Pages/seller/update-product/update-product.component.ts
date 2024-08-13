import { Component } from '@angular/core';
import { Product } from '../../../Core/Model/seller';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../Core/Services/Seller Products/products.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {

  // update product property
  update: undefined | Product
  
  constructor(private router:Router, private product:ProductsService, private route: ActivatedRoute,private messageService: MessageService){}

  ngOnInit(){
    // The function calls from the "getSingleProductsList" method from the "Product" Service Get request
    // to Get the Single Products "Id" used to update a product in API by its ID
    // this code generate "filled's" name on update page
    let datatId = this.route.snapshot.paramMap.get('id');
    this.product.getSingleSellerProductsList(datatId).subscribe((result) => {
      this.update = result
    })
  }

 // The updateFiled function calls from the "getProductList" method from the "Product" Service Put request
 // to Update data used to product Id put data from the mongoDb databse.
  updateFiled(data: any){
    if (this.update) {
      data.id = this.update._id;
    }
    this.product.updateProduct(data).subscribe(    response => {
      console.log(response);
      if(response){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Product Details Updated successfully" });
        this.router.navigate(['seller-home']);
      }
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    }
  )
  }

}
