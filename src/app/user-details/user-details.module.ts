import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { UserDetailsComponent } from "./user-details.component";
import { userDetailsRouting } from "./user-details.routing.module";

@NgModule({
    
    exports: [],
    declarations: [UserDetailsComponent],
    imports:[CommonModule,MaterialModule,
    userDetailsRouting]
})

export class userDetailsModule{}