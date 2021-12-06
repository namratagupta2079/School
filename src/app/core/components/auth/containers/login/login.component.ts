import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Credentials } from "@core/models/user";
import * as fromAuth from "@core/components/auth/store/reducers";
import {
  selectLoginLoading,
  selectLoginError,
} from "@core/components/auth/store/selectors/auth.selectors";
import { login } from "@core/components/auth/store/actions/auth.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loading$ = this.store.select(selectLoginLoading);
  error$ = this.store.select(selectLoginError);

  constructor(private store: Store<fromAuth.AuthState>) {}

  ngOnInit(): void {}

  onSubmit(credentials: Credentials) {
    this.store.dispatch(login({ credentials }));
  }
}
