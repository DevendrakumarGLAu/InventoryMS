import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddComponent } from "./add.component";
import { adduserRoutingModule } from "./add.routing.module";
import { MaterialModule } from "src/app/material.module";
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
    exports: [],
    declarations: [AddComponent],
    imports: [CommonModule,
    adduserRoutingModule,
    MaterialModule,
    ReactiveFormsModule],
})

export class addUserModule{}