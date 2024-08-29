import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Seller-Auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

// Sidenavbar properties 
leftSidebar: boolean = false;
rightSidebar: boolean = false;

// nevbar section change when user logged in
menuType: string = 'default';

// Display User FullName from Token
fullName : string = "";

constructor(private route:Router, private auth:AuthService, @Inject(PLATFORM_ID) private platformId: Object){}
ngOnInit() {
  this.route.events.subscribe((val: any) => {
    if (val.url) {
      // check conditions if user 'token' store in local storage broswer then condtion work othwise not work
      if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) {
        this.menuType = 'seller';
      }
      else {
        this.menuType = 'default';
      }
    }
    }
  });


  // Display User FullName from Token
   this.auth.getFullNameFromStore()
  .subscribe(val=>{
    const fullNameFromToken = this.auth.getfullNameFromToken();
        this.fullName = val || fullNameFromToken
   });
   
};


// The `logout` function removes the 'token' from localStorage and navigates to the 'login' route.
logout(){
  localStorage.removeItem('token');
  this.route.navigate(['login']);
  localStorage.clear();
  sessionStorage.clear();
}

}
