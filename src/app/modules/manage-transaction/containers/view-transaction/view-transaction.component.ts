import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionService } from '@core/services/transaction/transaction.service';
import { Transaction } from '@features/manage-transaction/models/transaction';
import { first } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss']
})
export class ViewTransactionComponent implements OnInit {
  transactions: Transaction[] = null;
  page = 1;
  pageSize = 4;
  collectionSize;
  viewTransaction: Transaction[];
  public displayedColumns: string[] = ['customerName', 'amount', 'currency', 'reference'];
  public dataSource = new MatTableDataSource<Transaction>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: TransactionService) { }

  ngOnInit() {
    this.service.getAllTransaction()
      .pipe(first())
      .subscribe(transactions => {
        this.transactions = transactions;
        this.dataSource.data = this.transactions;
        this.collectionSize = this.transactions.length;
        console.log("value of collection is " + this.transactions.length);
        //this.viewTransaction=this.transactions;
        this.refreshTxn();
      }
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  refreshTxn() {
    this.viewTransaction = this.transactions
      .map((txn, i) => ({ id: i + 1, ...txn }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
