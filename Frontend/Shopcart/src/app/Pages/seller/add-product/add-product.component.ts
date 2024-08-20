import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductsService } from '../../../Core/Services/Seller Products/products.service';
import { Product } from '../../../Core/Model/seller';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

products: undefined | Product[]

constructor(private product:ProductsService, private router:Router,private messageService: MessageService){}

// Product Form Validations Code
addProduct = new FormGroup({
productId: new FormControl('',Validators.required),
productName: new FormControl('',Validators.required),
productPrice: new FormControl('',Validators.required),
productColour: new FormControl('',Validators.required),  
productQuantity: new FormControl('',Validators.required),
productCategory: new FormControl('',Validators.required),
productImage: new FormControl(null),
productDescription: new FormControl('',Validators.required)
})

get productId(){
  return this.addProduct.get('productId');
}

get productName(){
  return this.addProduct.get('productName');
}

get productPrice(){
  return this.addProduct.get('productPrice');
}

get productColour(){
  return this.addProduct.get('productColour');
}

get productQuantity(){
  return this.addProduct.get('productQuantity');
}

get productCategory(){
  return this.addProduct.get('productCategory');
}

get productDescription(){
  return this.addProduct.get('productDescription');
}

// The sellerProduct function calls from the "postProducts" method from the "Product" Service post request
// to save the seller product details data on the mongoDb databse.
sellerProduct(){
  const frmData:Product= Object.assign(this.addProduct.value);
  frmData.productImage=this.productImage;
  this.product.postSellerProducts(frmData).subscribe(
    response => {
      console.log(response);
      if(response){
        this.router.navigate(['seller-home']);
      }
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    }
  )
    setTimeout(() => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Product Details Submitted successfully" });
  }, 200);
}




// Image Picker
productImage!:any;
img = '';
selectFile(event: any){
  this.productImage=event.target.files[0];
  console.warn(this.productImage);
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.img = e.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}

}

