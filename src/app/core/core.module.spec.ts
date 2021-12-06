import { TestBed } from "@angular/core/testing";
import { CoreModule } from "@core/core.module";
import { TransactionService } from "./services/transaction/transaction.service";
describe(`CoreModule.forRoot()`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule.forRoot()],
    })
      ;
  });

  it(`should not provide 'TransactionService' service`, () => {
    expect(() => TestBed.inject(TransactionService)).toBeTruthy();
  });
});
