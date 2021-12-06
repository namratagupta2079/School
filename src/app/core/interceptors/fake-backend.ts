import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/transaction/create') && method === 'POST':
                    return createTransaction();
                case url.endsWith('/transaction/all') && method === 'GET':
                    return getAllTransaction();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function createTransaction() {
            const transaction = body

            transaction.reference = getReferenceNumber();
            transactions.push(transaction);
            console.log("111" + JSON.stringify(transactions));
            console.log("222" + JSON.stringify(transaction));
            localStorage.setItem('transactions', JSON.stringify(transactions));
            localStorage.setItem('transaction', JSON.stringify(transaction));
            return ok();
        }
        function getReferenceNumber() {
            var perfix = 'CUS';
            var date = new Date();

            var reference = perfix + '-' + date.getDate() + date.getMonth() + date.getFullYear() + '-' + Math.floor(Math.random() * 100000);
            return reference;
        }

        function getAllTransaction() {
            return ok(transactions);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};