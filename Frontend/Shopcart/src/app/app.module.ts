import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';



// prime Ng module
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

// Angumar Material Modules
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';




// Imports
import { HttpClientModule } from '@angular/common/http';
import { NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


// Imports Modules
import { SellerAuthModule } from './Pages/seller-auth/seller-auth.module';
import { SellerModule } from './Pages/seller/seller.module';
import { HeaderModule } from './Core/header/header.module';
import { FooterModule } from './Core/footer/footer.module';
import { HomeModule } from './Pages/home/home.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbCollapseModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatInputModule,
    SellerAuthModule,
    SellerModule,
    HeaderModule,
    FooterModule,
    HomeModule],
  providers: [MessageService,MatTableDataSource],
  bootstrap: [AppComponent]
})
export class AppModule { }
