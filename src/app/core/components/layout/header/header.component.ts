import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { UnsubscribeOnDestroyAdapter } from "@core/utils/unsubscribe-on-destroy";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  loaded = false;
  logo: string = null;
  private languageChanged: Subscription;
  userName: string;

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem("userName");
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("token") ? true : false;
  }

}
