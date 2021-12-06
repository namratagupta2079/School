import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// CoreModule must only be imported in AppModule, not anywhere else.
import { CoreModule } from "@core/core.module";

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { metaReducers, ROOT_REDUCERS } from "./core/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "@environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { ConfigService, configFactory } from "@core/services/config/config.service";
import { AuthEffects } from "@core/components/auth/store/effects/auth.effects";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    TranslateModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    // StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects]),
    // EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument({ name: "Customer Bank App" })
      : [],
  ],
  providers: [ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }

// Load translation files from assets/i18n/{lang}.json
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
