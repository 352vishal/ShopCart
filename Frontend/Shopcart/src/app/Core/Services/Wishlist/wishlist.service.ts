import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { constant } from '../../Constant/constant';
import { Wishlist } from '../../Model/wishlist';
import { Product } from '../../Model/products';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  // Add to cart EventEmitter
  cartData = new EventEmitter<Product[] | []>();

  constructor(private http: HttpClient) { }

  // Add to wishlist items
  addToWishlist(WishlistData: Wishlist) {
    return this.http.post<Wishlist>(constant.apiEndPoint.Wishlist, WishlistData);
  }

  // Get single wishlist item
  getsingleWishlistProduct(userId: number) {
    return this.http.get<Wishlist>(`${constant.apiEndPoint.Wishlist}/${userId}`);
  }

  // Get whishlist products
  getWishlistProducts() {
    return this.http.get<Wishlist[]>(`${constant.apiEndPoint.Wishlist}`);
  }

  // Delete whishlist products
  deleteWishlistProduct(productId: number) {
    return this.http.delete<Wishlist>(`${constant.apiEndPoint.Wishlist}/${productId}`);
  }
  
}
