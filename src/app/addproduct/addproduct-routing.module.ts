import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from "./addproduct.component";
import { AdddetailsComponent } from "./adddetails/adddetails.component";

const routes: Routes = [
  {
      path: 'addproduct',
      component: AddproductComponent,
      children: [
          {
              path: 'adddetails',
              component: AdddetailsComponent
          }
      ]
  }
];

    @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
      })
    
      export class AddproductRouting{}