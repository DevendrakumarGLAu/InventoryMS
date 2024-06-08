import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Role } from "./role.component";
const routes: Routes = [
    {
      path: '',
      component: Role,
    },
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class RoleRouting{}