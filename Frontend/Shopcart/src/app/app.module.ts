import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
// Components
import { AppComponent } from './app.component';

// prime Ng module
import { ToastModule } from 'primeng/toast';

// Imports Modules
import { SellerAuthModule } from './Pages/seller-auth/seller-auth.module';
import { SellerModule } from './Pages/seller/seller.module';
import { HeaderModule } from './Core/header/header.module';
import { FooterModule } from './Core/footer/footer.module';
import { HomeModule } from './Pages/home/home.module';
import { ProductDetailModule } from './Pages/product-detail/product-detail.module';


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
    ProductDetailModule],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
