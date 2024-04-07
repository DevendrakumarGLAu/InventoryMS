import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PrintBillRouting } from "./print-bill.routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { PrintBillComponent } from "./print-bill.component";

@NgModule({
    imports:[CommonModule,PrintBillRouting,ReactiveFormsModule],
    exports:[],
    declarations:[PrintBillComponent]
})

export class PrintBillModule{}