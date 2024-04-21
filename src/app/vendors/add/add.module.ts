import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { addVendorRoutingModule } from "./add-routing.module";
import { AddComponent } from "./add.component";

@NgModule({
    imports:[addVendorRoutingModule,CommonModule,ReactiveFormsModule],
    exports:[],
    declarations:[AddComponent]
})

export class addVendorsModule{}