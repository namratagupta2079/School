import { createAction, props } from "@ngrx/store";
import { User, Credentials } from "@core/models/user";

export const login = createAction(
  "[Auth] Login",
  props<{ credentials: Credentials }>()
);

export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ user: User }>()
);

export const loginFailure = createAction(
  "[Auth] Login Failure",
  props<{ error: any }>()
);

export const loginRedirect = createAction("[Auth] Login Redirect");

export const homeRedirect = createAction("[Auth] Home Redirect");

export const idleTimeout = createAction("[Auth] Idle Timeout");

export const syncLogin = createAction("[Auth] Login Sync");

export const logout = createAction("[Auth] Logout");
