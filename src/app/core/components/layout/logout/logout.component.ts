import { Component, ViewChild } from "@angular/core";
import { logout } from "@core/components/auth/store/actions/auth.actions";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromAuth from "@core/components/auth/store/reducers/auth.reducer";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent {
  private logoutSub: Subscription;
  private closeResult: string;
  @ViewChild("content", { static: true }) tplContent;

  constructor(
    private store: Store<fromAuth.AuthState>
  ) {}

  open(content) {

  }

  public exit() {
    this.store.dispatch(logout());
  }

  public getCloseResult() {
    return this.closeResult;
  }

  private getDismissReason(reason: any): string {
   return null;
  }
}

