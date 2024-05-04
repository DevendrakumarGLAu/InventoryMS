import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AddComponent } from "./add.component";

const routes: Routes = [
    {
  path: '',
  component: AddComponent,
}]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    declarations:[]
})

export class adduserRoutingModule{}