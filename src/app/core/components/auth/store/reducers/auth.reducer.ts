import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from "../actions/auth.actions";
import { User } from "@core/models/user";

export const authFeatureKey = "auth";

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  loaded: boolean;
  error?: string;
  user: User | null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  loaded: false,
  user: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    loaded: true,
    loading: false,
    isLoggedIn: true,
    user
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    loading: false,
    error,
    user: null
  })),
  on(AuthActions.syncLogin, state => ({
    ...state,
    loaded: false,
    loading: false,
    isLoggedIn: true
  })),
  on(AuthActions.logout, () => initialState)
);

/**
 * Angular ahead-of-time (AOT) compiler (the compiler used for producing production builds)
 * might not support function expressions. It's therefore necessary to wrap the createReducer
 * function in an exported function like so:
 */
export function reducers(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

export const isLoggedIn = (state: AuthState) => state.isLoggedIn;
export const getLoginError = (state: AuthState) => state.error;
export const getLoginLoading = (state: AuthState) => state.loading;
export const getUser = (state: AuthState) => state.user;
