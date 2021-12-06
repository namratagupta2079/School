import { InjectionToken } from "@angular/core";
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  Action,
} from "@ngrx/store";
import { environment } from "@environments/environment";
import * as fromRouter from "@ngrx/router-store";

import * as fromAuth from "@core/components/auth/store/reducers";

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<AppState, Action>
>("Root reducers token", {
  factory: () => ({
    [fromAuth.authFeatureKey]: fromAuth.reducers,
    router: fromRouter.routerReducer,
  }),
});

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log("prev state", state);
    console.log("action", action);
    console.log("next state", result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
