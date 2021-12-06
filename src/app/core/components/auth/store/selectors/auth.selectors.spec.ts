import * as fromAuth from "../reducers/auth.reducer";
import { selectAuthState, selectIsLoggedIn } from "./auth.selectors";

describe("Auth Selectors", () => {
  it("should select the feature state", () => {
    const result = selectAuthState({
      [fromAuth.authFeatureKey]: {},
    });

    expect(result).toEqual({});
  });

  it("should returned true if user is logged in", () => {
    const authState: fromAuth.AuthState = {
      isLoggedIn: false,
      loading: false,
      loaded: false,
      user: null,
    };
    expect(selectIsLoggedIn.projector(authState)).toBe(false);
  });
});
