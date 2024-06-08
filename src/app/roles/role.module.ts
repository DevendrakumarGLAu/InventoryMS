import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { RoleRouting } from "./role.routing.module";
import { Role } from "./role.component";

@NgModule({
    imports:[CommonModule,RoleRouting,ReactiveFormsModule,MaterialModule],
    exports:[],
    declarations:[Role]
})

export class RoleModule{}