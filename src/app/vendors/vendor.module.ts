import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VendorsComponent } from "./vendors.component";
import { vendorsRoutingModule } from "./vendors-routing.module";
import { MaterialModule } from "../material.module";
@NgModule({
    declarations:[VendorsComponent],
    imports:[CommonModule,vendorsRoutingModule,MaterialModule],
    exports:[]
})

export class vendorModule{}