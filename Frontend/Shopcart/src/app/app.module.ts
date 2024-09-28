import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// prime Ng module
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

// Imports Modules
import { SellerAuthModule } from './Pages/seller-auth/seller-auth.module';
import { SellerModule } from './Pages/seller/seller.module';
import { HeaderModule } from './Core/header/header.module';
import { FooterModule } from './Core/footer/footer.module';
import { HomeModule } from './Pages/home/home.module';
import { ProductDetailModule } from './Pages/product-detail/product-detail.module';
import { UserAuthModule } from './Pages/user-auth/user-auth.module';
import { CartModule } from './Pages/cart/cart.module';
import { CheckoutModule } from './Pages/checkout/checkout.module';
import { OrderModule } from './Pages/order/order.module';
import { ErrorPageModule } from './Pages/error-page/error-page.module';
import { WishlistModule } from './Pages/wishlist/wishlist.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    SellerAuthModule,
    SellerModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    ProductDetailModule,
    UserAuthModule,
    CartModule,
    CheckoutModule,
    OrderModule,
    ErrorPageModule,
    WishlistModule],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
