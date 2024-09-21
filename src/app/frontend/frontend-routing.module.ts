import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FrontendComponent } from "./frontend.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AuthGuard } from "../auth.guard";

const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'addproduct',
        loadChildren: () =>
          import('../addproduct/addproduct.module').then(
            (m) => m.AddproductModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'addproduct/add/:id',
        loadChildren: () =>
          import('../addproduct/adddetails/adddetails.module').then(
            (m) => m.AddDetailsModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'addproduct/add',
        loadChildren: () =>
          import('../addproduct/adddetails/adddetails.module').then(
            (m) => m.AddDetailsModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'selling',
        loadChildren: () =>
          import('../selling/selling.module').then((m) => m.sellingModule),
        canActivate: [AuthGuard],
      },
      {
        path:'selling/add',
        loadChildren: () =>
          import('../selling/add/add.module').then((m) => m.AddsellerModule),
        canActivate: [AuthGuard],
      },
      {
        path:'printbill',
        loadChildren:()=>
        import('../print-bill/print-bill.module').then((m) =>m.PrintBillModule),
        canActivate: [AuthGuard],
      },
      {
        path:'printbill/add',
        loadChildren:()=>
        import('../print-bill/add/add.module').then((m) =>m.addBillModule),
        canActivate: [AuthGuard],
      },
      {
        path:'vendors',
        loadChildren:()=>
        import('../vendors/vendor.module').then((m) =>m.vendorModule),
        canActivate: [AuthGuard],
      },
      {
        path:'vendors/add',
        loadChildren:()=>
        import('../vendors/add/add.module').then((m) =>m.addVendorsModule),
        canActivate: [AuthGuard],
      },
      {
        path:'settings/userdetails',
        loadChildren:()=>
        import('../user-details/user-details.module').then((m) =>m.userDetailsModule),
        canActivate: [AuthGuard],
      },
      {
        path:'settings/userdetails/add',
        loadChildren:()=>
        import('../user-details/add/add.module').then((m) =>m.addUserModule),
        canActivate: [AuthGuard],
      },
      {
        path:'settings/roles',
        loadChildren:()=>
        import('../roles/role.module').then((m) =>m.RoleModule),
        canActivate: [AuthGuard],
      },
      {
        path:'settings/roles/addRole',
        loadChildren:()=>
        import('../roles/add/addRole.module').then((m) =>m.addRoleModule),
        canActivate: [AuthGuard],
      },
      {
        path:'settings/permission',
        loadChildren:()=>
        import('../rolePermission/rolepermission.module').then((m) =>m.rolePermissionModule),
        canActivate: [AuthGuard],
      }
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FrontendRoutingModule { }