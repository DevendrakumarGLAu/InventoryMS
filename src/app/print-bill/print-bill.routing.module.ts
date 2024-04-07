import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrintBillComponent } from "./print-bill.component";

const routes: Routes = [
    {
      path: '',
      component: PrintBillComponent,
    },
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class PrintBillRouting{}