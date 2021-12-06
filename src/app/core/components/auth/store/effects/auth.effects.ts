import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { catchError, map, tap, exhaustMap, switchMapTo } from "rxjs/operators";
import { of, fromEvent, merge, timer } from "rxjs";

import * as AuthActions from "../actions/auth.actions";
import { UserService } from "@core/services/auth/user.service";
import { Credentials } from "@core/models/user";

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private userService: UserService
  ) { }

  clicks$ = fromEvent(document, "click");
  keys$ = fromEvent(document, "keydown");
  mouse$ = fromEvent(document, "mousemove");

  idle$ = createEffect(() =>
    merge(this.clicks$, this.keys$, this.mouse$).pipe(
      switchMapTo(timer(5 * 60 * 1000)), // 5 minute inactivity timeout
      map(() => AuthActions.idleTimeout())
    )
  );

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        map((action) => action.credentials),
        exhaustMap((auth: Credentials) =>
          this.userService.login(auth).pipe(
            map((user) => AuthActions.loginSuccess({ user })),
            catchError((error) => of(AuthActions.loginFailure({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((data) => {
          localStorage.setItem("token", data.user.token);
          localStorage.setItem("userName", data.user.name);
          this.router.navigateByUrl("/landing");
        })
      ),
    { dispatch: false }
  );

  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginRedirect, AuthActions.logout),
        tap((isLoggedIn) => {
          if (isLoggedIn) {
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            this.router.navigate(["/login"]);
          }
        })
      ),
    { dispatch: false }
  );

  homeRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.homeRedirect),
        tap((isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigate(["/landing"]);
          }
        })
      ),
    { dispatch: false }
  );
}
