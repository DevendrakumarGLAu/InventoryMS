import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { addBillRouting } from "./add.routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AddComponent } from "./add.component";
import { MaterialModule } from "src/app/material.module";

@NgModule({
    imports:[CommonModule,addBillRouting,ReactiveFormsModule,MaterialModule],
    exports:[],
    declarations:[AddComponent]
})

export class addBillModule{}