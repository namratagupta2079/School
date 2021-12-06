import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "../reducers/auth.reducer";

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  fromAuth.isLoggedIn
);

export const selectLoginError = createSelector(
  selectAuthState,
  fromAuth.getLoginError
);

export const selectLoginLoading = createSelector(
  selectAuthState,
  fromAuth.getLoginLoading
);

export const selectUser = createSelector(selectAuthState, fromAuth.getUser);
