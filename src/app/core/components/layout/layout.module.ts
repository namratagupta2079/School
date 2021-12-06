import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { SharedModule } from "@shared/shared.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { LogoutComponent } from "./logout/logout.component";
import { NavmenuComponent } from "./navmenu/navmenu.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";


@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    LogoutComponent,
    NavmenuComponent,
    BreadcrumbComponent
  ],
  imports: [CommonModule, LayoutRoutingModule, SharedModule]
})
export class LayoutModule { }
