import { Component } from '@angular/core';
import { WishlistService } from '../../../Core/Services/Wishlist/wishlist.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

// Get Products List
products: any

constructor(private wishlist: WishlistService, private router: Router,
private messageService: MessageService){}

ngOnInit() {
  this.wishlistItems();
}

// Get Products List
wishlistItems() {
  this.wishlist.getWishlistProducts().subscribe((data: any) => {
    this.products = data;
    // console.log(this.products);
  });
}

// Delete Item from Wishlist
DeleteItem(id: number){
  confirm(`Are you sure you want to delete`);
  this.wishlist.deleteWishlistProduct(id).subscribe(
    response => {
      // console.log(response);
      this.wishlistItems();
      this.messageService.add({severity: 'success',summary: 'Success',detail: 'Item removed in my whishlist'});
    }
  )
}

// Navigate to Product Details Page
productDetails(id: number){
  this.router.navigate(['products-details',id]);
}

}
