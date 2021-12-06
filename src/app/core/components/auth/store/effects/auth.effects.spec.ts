import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Observable } from "rxjs";

import { AuthEffects } from "./auth.effects";
import * as AuthActions from "../actions/auth.actions";
import { UserService } from "@core/services/auth/user.service";
import {
  generateUser,
  generateValidCredential,
  generateInvalidCredential,
} from "@core/mocks/data/user.test.data";
import { hot, cold } from "jasmine-marbles";

describe("AuthEffects", () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: UserService,
          useValue: {
            login: jest.fn(),
            logout: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject<AuthEffects>(AuthEffects);
    userService = TestBed.inject<UserService>(UserService);
  });

  it("AuthEffects should be created", () => {
    expect(effects).toBeTruthy();
  });

  describe("login", () => {
    it("should return an loginSuccess action, with the user, on success", () => {
      const user = generateUser();
      const credentials = generateValidCredential();
      const action = AuthActions.login({ credentials });
      const outcome = AuthActions.loginSuccess({ user });

      actions$ = hot("-a", { a: action });
      const response = cold("-a|", { a: user });
      const expected = cold("--b", { b: outcome });
      userService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });

    it("should return an loginFailure action, with an error, on failure", () => {
      const credentials = generateInvalidCredential();
      const action = AuthActions.login({ credentials });
      const outcome = AuthActions.loginFailure({ error: "error" });

      actions$ = hot("-a", { a: action });
      const response = cold("#");
      const expected = cold("-b", { b: outcome });
      userService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });
  });
});
