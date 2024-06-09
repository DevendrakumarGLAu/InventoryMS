import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { rolePermissionComponent } from "./rolepermission.component";

const routes: Routes = [
    {
      path: '',
      component: rolePermissionComponent,
    },
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class rolepermissionRoutingModule{}