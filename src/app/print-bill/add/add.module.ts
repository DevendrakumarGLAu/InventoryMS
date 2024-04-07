import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { addBillRouting } from "./add.routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AddComponent } from "./add.component";

@NgModule({
    imports:[CommonModule,addBillRouting,ReactiveFormsModule],
    exports:[],
    declarations:[AddComponent]
})

export class addBillModule{}