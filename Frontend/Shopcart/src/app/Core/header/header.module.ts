import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';

// Angumar Material Modules
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';

// Components
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class HeaderModule { }
