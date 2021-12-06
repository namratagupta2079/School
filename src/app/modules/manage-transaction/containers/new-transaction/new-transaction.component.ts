import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@core/services/transaction/transaction.service';
import { Transaction } from '@features/manage-transaction/models/transaction';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {

  constructor(private service: TransactionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(transaction: Transaction) {
    this.service.createTransaction(transaction)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/transaction/view']);
        },
        error => {
          console.log("erorr")
        });
  }

}
