import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

// nevbar section change when user logged in
menuType: string = 'default';

constructor(private route:Router){}
ngOnInit() {
  this.route.events.subscribe((val: any) => {
    if (val.url) {
      // check conditions if user 'token' store in local storage broswer then condtion work othwise not work
      if (localStorage.getItem('token') && val.url.includes('seller')) {
        this.menuType = 'seller';
      }
      else {
        this.menuType = 'default';
      }
    }
  });
};


// The `logout` function removes the 'token' from localStorage and navigates to the 'login' route.
logout(){
  localStorage.removeItem('token');
  this.route.navigate(['login']);
}

}
