import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { homeRedirect } from "@core/components/auth/store/actions/auth.actions";
import * as fromAuth from "@core/components/auth/store/reducers/auth.reducer";

@Injectable({
  providedIn: "root",
})
export class NoAuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.AuthState>) {}

  canActivate(): boolean {
    if (localStorage.getItem("token")) {
      this.store.dispatch(homeRedirect());
      return false;
    }
    return true;
  }
}
