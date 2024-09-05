import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Product } from '../../Model/products';
import { constant } from '../../Constant/constant';
import { Cart } from '../../Model/cart';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    // Http Options
    // delete or update data from mongodb database
    // private httpOptions = {
    //   headers: new HttpHeaders()
    //     .set("Content-Type", "application/json")
    //     .set("auth-token", "" + localStorage.getItem("token")) // Add JWT token to the request header.
        
    // };

  private httpOptions = {};

  constructor(private http:HttpClient) { }

  // The `postProducts` function sends a POST request on the server
  // to save the seller product details data on the mongoDb databse.
  postSellerProducts(seller: Product) {
    const formData = new FormData();
    formData.append("productName",seller.productName);
    formData.append("productPrice",seller.productPrice.toString());
    formData.append("productColour",seller.productColour);
    formData.append("productQuantity",seller.productQuantity.toString());
    formData.append("productCategory",seller.productCategory);
    formData.append('productImage', seller.productImage??"");
    formData.append("productDescription",seller.productDescription);
    return this.http.post<Product>(constant.apiEndPoint.SellerProductUrl, formData); 
  }

  // The `getProductList` function Get request on the server
  // to get the seller product details data on the mongoDb databse.
  getSellerProductList(){
    return this.http.get(constant.apiEndPoint.SellerProductUrl);
  }

  // The `getSingleProductsList` function Get request on the server
  // to Get the Single Products "Id" used to update a product in API by its ID
  getSingleSellerProductsList(id : any) {
    return this.http.get<Product>(`${constant.apiEndPoint.SellerProductUrl}/${id}`)
  }

  // The `getDeleteProduct` function Delete request on the server
  // to Delete the seller product details data on the mongoDb databse.
  DeleteProduct(id:number) {
    return this.http.delete(`${constant.apiEndPoint.SellerProductUrl}/${id}`,
      this.httpOptions = {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("auth-token", "" + localStorage.getItem("token")) // Add JWT token to the request header.
          
      }
    )
  }

  // The `updateProduct` function Put request on the server
  // to Update data used to product Id put data from the mongoDb databse.
  updateProduct(seller: Product) {
    return this.http.put<Product>(`${constant.apiEndPoint.SellerProductUrl}/${seller.id}`, seller, 
      this.httpOptions = {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("auth-token", "" + localStorage.getItem("token")) // Add JWT token to the request header.
          
      }
    )
  }

}
