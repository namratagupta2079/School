import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from "@shared/shared.module";
import { NewTransactionComponent } from "./containers/new-transaction/new-transaction.component";
import { ViewTransactionComponent } from "./containers/view-transaction/view-transaction.component";
import { ManageTransationRoutingModule } from "./manage-transaction-routing.module";
import { CreateTransationComponent } from "./pages/create-transation/create-transation.component";

@NgModule({
    declarations: [
        NewTransactionComponent,
        CreateTransationComponent,
        ViewTransactionComponent

    ],
    imports: [
        CommonModule,
        MatDialogModule,
        ManageTransationRoutingModule,
        SharedModule
    ],
    exports: []
})
export class ManageTransationModule { }