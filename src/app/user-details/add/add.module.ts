import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddComponent } from "./add.component";
import { adduserRoutingModule } from "./add.routing.module";

@NgModule({
    exports: [],
    declarations: [AddComponent],
    imports: [CommonModule,
    adduserRoutingModule],
})

export class addUserModule{}