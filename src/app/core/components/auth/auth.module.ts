import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "@shared/shared.module";
import * as fromAuth from "@core/components/auth/store/reducers";

import { AuthEffects } from "@core/components/auth/store/effects/auth.effects";
import { LoginComponent } from "./containers/login/login.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

@NgModule({
  declarations: [LoginComponent, LoginPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule { }
