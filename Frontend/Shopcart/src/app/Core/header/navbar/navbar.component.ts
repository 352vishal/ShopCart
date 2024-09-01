import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Seller-Auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { ProductsService } from '../../Services/Seller Products/products.service';
import { UserAuthService } from '../../Services/User-Auth/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

// Add to cart Propertie 
cartItems=0;  

// Sidenavbar properties 
leftSidebar: boolean = false;
sellerRightSidebar: boolean = false;
userRightSidebar: boolean = false;

// nevbar section change when user logged in
menuType: string = 'default';

// Display Seller FullName from Token
SellerfullName : string = "";

// Display User FullName from Token
UserfullName : string = "";

constructor(private route:Router, private seller:AuthService, private user:UserAuthService,
            @Inject(PLATFORM_ID) private platformId: Object, private product:ProductsService){}
ngOnInit() {
  this.route.events.subscribe((val: any) => {
    if (val.url) {
      // check conditions if user 'token' store in local storage broswer then condtion work othwise not work
      if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) {
        this.menuType = 'seller';
      }
      else if(localStorage.getItem('UserToken')){
        this.menuType='user';
      }
      else {
        this.menuType = 'default';
      }
    }
    }
  });
   // Add to cart Item code
  if (isPlatformBrowser(this.platformId)) {
    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems= items.length
    })
  }



  // Display Seller FullName from Token
   this.seller.getFullNameFromStore()
  .subscribe(val=>{
    const fullNameFromToken = this.seller.getfullNameFromToken();
        this.SellerfullName = val || fullNameFromToken
   });


  // Display User FullName from Token
  this.user.getFullNameFromStore()
  .subscribe(val=>{
    const fullNameFromToken = this.user.getfullNameFromToken();
        this.UserfullName = val || fullNameFromToken
   });
   
};


// The `logout` function removes the 'token' from localStorage and navigates to the 'login' route.
logout(){
  localStorage.removeItem('token');
  this.route.navigate(['login']);
  localStorage.clear();
  sessionStorage.clear();
}

UserLogout(){
  localStorage.removeItem('UserToken');
  this.route.navigate(['user-login']);
  localStorage.clear();
  sessionStorage.clear();
}

}
