import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// Importing the PrimeNG Modules
import { MegaMenuModule } from 'primeng/megamenu';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    MegaMenuModule,
  ],
  exports: [
    HomeComponent
  ],
})
export class HomeModule { }
