import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserDetailsComponent } from "./user-details.component";
import { userDetailsRouting } from "./user-details.routing.module";

@NgModule({
    
    exports: [],
    declarations: [UserDetailsComponent],
    imports:[CommonModule,
    userDetailsRouting]
})

export class userDetailsModule{}