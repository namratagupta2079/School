import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingComponent } from "./landing.component";
import { LandingRoutingModule } from "./landing-routing.module";
import { SharedModule } from './../../../shared/shared.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [SharedModule, CommonModule, LandingRoutingModule]
})


export class LandingModule {}
