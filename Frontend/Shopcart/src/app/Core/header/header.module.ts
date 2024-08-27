import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';

// Angumar Material Modules
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {ChipModule } from 'primeng/chip';
import {SidebarModule } from 'primeng/sidebar';
import {ButtonModule } from 'primeng/button';
import {PanelMenuModule } from 'primeng/panelmenu';
import {ToolbarModule } from 'primeng/toolbar';
import {AvatarModule } from 'primeng/avatar';

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
    MatBadgeModule,
    ChipModule,
    SidebarModule,
    ButtonModule,
    PanelMenuModule,
    ToolbarModule,
    AvatarModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class HeaderModule { }
