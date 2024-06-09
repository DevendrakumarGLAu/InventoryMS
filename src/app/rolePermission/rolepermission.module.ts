import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { rolepermissionRoutingModule } from "./rolepermission.routing.module";
import { rolePermissionComponent } from "./rolepermission.component";
@NgModule({
    imports:[CommonModule,rolepermissionRoutingModule,ReactiveFormsModule,MaterialModule],
    exports:[],
    declarations:[rolePermissionComponent]
})

export class rolePermissionModule{}