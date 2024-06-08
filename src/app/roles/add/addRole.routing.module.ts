import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { addRole } from "./addRole.component";
const routes: Routes = [
    {
      path: '',
      component: addRole,
    },
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class addRoleRouting{}