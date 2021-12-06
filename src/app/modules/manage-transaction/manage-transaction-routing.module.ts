import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTransactionComponent } from './containers/new-transaction/new-transaction.component';
import { ViewTransactionComponent } from './containers/view-transaction/view-transaction.component';
const routes: Routes = [
    {
        path: "view",
        component: ViewTransactionComponent,
        data: {
            breadcrumb: { label: 'View Transation', terminalOnly: true }
        }
    },

    {
        path: "new",
        component: NewTransactionComponent,
        data: {
            breadcrumb: { label: 'New Transation', terminalOnly: true }
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageTransationRoutingModule { }
