import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LoginPageComponent } from "./login-page.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { SharedModule } from "@shared/shared.module";


describe("LoginPageComponent", () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  class MockLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
      return of({});
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: MockLoader },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
