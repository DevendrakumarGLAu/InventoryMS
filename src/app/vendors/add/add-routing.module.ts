import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddComponent } from "./add.component";

const routes: Routes = [
    {
  path: '',
  component: AddComponent,
}]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
    declarations:[]

})
export class addVendorRoutingModule{}