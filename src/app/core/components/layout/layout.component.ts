import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { syncLogin } from "@core/components/auth/store/actions/auth.actions";
import { selectIsLoggedIn } from "@core/components/auth/store/selectors/auth.selectors";
import * as fromAuth from "@core/components/auth/store/reducers/auth.reducer";
import { UnsubscribeOnDestroyAdapter } from "@core/utils/unsubscribe-on-destroy";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  loaded = true;
  isAuthenticated: boolean;

  constructor(private store: Store<fromAuth.AuthState>) {
    super();
    this.subs.sink = this.store
      .select(selectIsLoggedIn)
      .subscribe(state => (this.isAuthenticated = state));
  }

  ngOnInit(): void {
    let state: boolean;

    this.store.select(selectIsLoggedIn).subscribe(s => {
      state = s;
    });

    if (localStorage.getItem("token") !== null && !state) {
      this.store.dispatch(syncLogin());
    }
  }
}
