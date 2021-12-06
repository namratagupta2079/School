import { TestBed, inject } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import { Store } from "@ngrx/store";
import { StoreModule } from "@ngrx/store";
import { ROOT_REDUCERS } from "@core/store";

describe("AuthGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, Store],
      imports: [
        StoreModule.forRoot(ROOT_REDUCERS, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
    }).compileComponents();
  });

  it("AuthGuard should be created", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
