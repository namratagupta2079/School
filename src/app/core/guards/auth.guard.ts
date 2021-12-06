import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { loginRedirect } from "@core/components/auth/store/actions/auth.actions";
import * as fromAuth from "@core/components/auth/store/reducers/auth.reducer";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.AuthState>) {}

  canActivate(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    }
    this.store.dispatch(loginRedirect());
    return false;
  }
}
