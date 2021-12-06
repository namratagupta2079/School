import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { PageNotFoundComponent } from "@core/components/page-not-found/page-not-found.component";
import { AuthGuard } from "@core/guards/auth.guard";
import { NoAuthGuard } from "@core/guards/no-auth.guard";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      {
        path: "landing",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("@core/components/landing/landing.module").then(
            (m) => m.LandingModule
          ),
      },
      {
        path: "login",
        canActivate: [NoAuthGuard],
        loadChildren: () =>
          import("@core/components/auth/auth.module").then((m) => m.AuthModule),
      },
      {
        path: "transaction",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("@features/manage-transaction/manage-transaction.module").then((m) => m.ManageTransationModule),
      },
      // otherwise redirect to not found page
      { path: "**", component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
