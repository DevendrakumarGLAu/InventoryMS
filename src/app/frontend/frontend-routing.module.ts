import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FrontendComponent } from "./frontend.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
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
      },
      {
        path: 'addproduct/add/:id',
        loadChildren: () =>
          import('../addproduct/adddetails/adddetails.module').then(
            (m) => m.AddDetailsModule
          ),
      },
      {
        path: 'addproduct/add',
        loadChildren: () =>
          import('../addproduct/adddetails/adddetails.module').then(
            (m) => m.AddDetailsModule
          ),
      },
      {
        path: 'selling',
        loadChildren: () =>
          import('../selling/selling.module').then((m) => m.sellingModule),
      },
      {
        path:'selling/add',
        loadChildren: () =>
          import('../selling/add/add.module').then((m) => m.AddsellerModule),
      },
      {
        path:'printbill',
        loadChildren:()=>
        import('../print-bill/print-bill.module').then((m) =>m.PrintBillModule)
      },
      {
        path:'printbill/add',
        loadChildren:()=>
        import('../print-bill/add/add.module').then((m) =>m.addBillModule)
      },
      {
        path:'vendors',
        loadChildren:()=>
        import('../vendors/vendor.module').then((m) =>m.vendorModule)
      },
      {
        path:'vendors/add',
        loadChildren:()=>
        import('../vendors/add/add.module').then((m) =>m.addVendorsModule)
      },
      {
        path:'user-details',
        loadChildren:()=>
        import('../user-details/user-details.module').then((m) =>m.userDetailsModule)
      },
      {
        path:'user-details/add',
        loadChildren:()=>
        import('../user-details/add/add.module').then((m) =>m.addUserModule)
      },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FrontendRoutingModule { }