import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import * as fromAuth from "@core/components/auth/store/reducers/auth.reducer";
import { selectIsLoggedIn } from "@core/components/auth/store/selectors/auth.selectors";
import { UnsubscribeOnDestroyAdapter } from "@core/utils/unsubscribe-on-destroy";


@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent extends UnsubscribeOnDestroyAdapter {
  isLoggedIn: boolean;
  constructor(private store: Store<fromAuth.AuthState>) {
    super();
    this.subs.sink = this.store.select(selectIsLoggedIn).subscribe(state => {
      this.isLoggedIn = state;
    });
  }
}