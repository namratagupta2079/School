import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";

import { selectLoginLoading } from "@core/components/auth/store/selectors/auth.selectors";
import * as fromAuth from "@core/components/auth/store/reducers";
import { LoginComponent } from "./login.component";
import { ROOT_REDUCERS } from "@core/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "@core/components/auth/store/effects/auth.effects";
import { CommonModule } from "@angular/common";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        StoreModule.forRoot(ROOT_REDUCERS, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
