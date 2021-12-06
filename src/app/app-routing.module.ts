import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Layout of the App is loaded lazily
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("@core/components/layout/layout.module").then(
        (m) => m.LayoutModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
