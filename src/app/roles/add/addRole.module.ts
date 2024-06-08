import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../material.module";
import { addRoleRouting } from "./addRole.routing.module";
import { addRole } from "./addRole.component";

@NgModule({
    imports:[CommonModule,addRoleRouting,ReactiveFormsModule,MaterialModule],
    exports:[],
    declarations:[addRole]
})

export class addRoleModule{}