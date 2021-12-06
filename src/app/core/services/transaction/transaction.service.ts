import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Transaction } from '@features/manage-transaction/models/transaction';

@Injectable({ providedIn: 'root' })
export class TransactionService {
    private transactionSubject: BehaviorSubject<Transaction>;
    public transaction: Observable<Transaction>;

    constructor(
        private http: HttpClient
    ) {
        this.transactionSubject = new BehaviorSubject<Transaction>(JSON.parse(localStorage.getItem('transaction')));
        this.transaction = this.transactionSubject.asObservable();
    }

    public get transactionValue(): Transaction {
        return this.transactionSubject.value;
    }

    createTransaction(transaction: Transaction) {
        return this.http.post(`${environment.apiBaseUrl}/transaction/create`, transaction);
    }

    getAllTransaction() {
        return this.http.get<Transaction[]>(`${environment.apiBaseUrl}/transaction/all`);
    }
}