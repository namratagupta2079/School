import { reducers, initialState, AuthState, isLoggedIn, getLoginError, getLoginLoading, getUser, authFeatureKey } from "./auth.reducer";
import {
  generateValidCredential,
  generateUser,
} from "@core/mocks/data/user.test.data";
import * as AuthActions from "../actions/auth.actions";

describe("Auth Reducer", () => {
  describe("an unknown action", () => {
    it("should return the default state", () => {
      const action = { type: "NOOP" } as any;

      const result = reducers(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe("[Auth] Login", () => {
    it("should toggle loading state", () => {
      const credentials = generateValidCredential();
      const action = AuthActions.login({ credentials });
      const result = reducers(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: undefined,
        loading: true,
      });
    });
  });

  describe("[Auth] Login Success", () => {
    it("should add a authenticated user to state", () => {
      const user = generateUser();
      const action = AuthActions.loginSuccess({ user });
      const result = reducers(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loaded: true,
        loading: false,
        isLoggedIn: true,
        user,
      });
    });
  });

  describe("[Auth] Login Failure", () => {
    it("should update error in state", () => {
      const action = AuthActions.loginFailure({ error: "error" });
      const result = reducers(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loaded: true,
        loading: false,
        error: "error",
        user: null,
      });
    });
  });

  describe("[Auth] syncLogin", () => {
    it("should sync login state", () => {
      const action = AuthActions.syncLogin();
      const result = reducers(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loaded: false,
        loading: false,
        isLoggedIn: true,
      });
    });
  });

  describe("[Auth] logout", () => {
    it("should logout state", () => {
      const action = AuthActions.logout();
      const result = reducers(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe("AuthReducers", () => {

    it("AuthState should have appropriate fields and types", () => {
      const authState: AuthState = ({
        isLoggedIn: false,
        loading: false,
        loaded: false,
        error: 'some error',
        user: {
          name: 'my name',
        }
      } as AuthState);
      expect(authState).toBeTruthy();
    });

    it("should check All Constants values", () => {
      expect(isLoggedIn(initialState)).toBe(initialState.isLoggedIn);
      expect(getLoginError(initialState)).toBe(initialState.error);
      expect(getLoginLoading(initialState)).toBe(initialState.loading);
      expect(getUser(initialState)).toBe(initialState.user);
      expect(authFeatureKey).toBe("auth");
    });
  });
});
