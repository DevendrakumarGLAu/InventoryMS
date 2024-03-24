import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './common/login/login.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdddetailsComponent } from './addproduct/adddetails/adddetails.component';
// import { AuthGuard } from '../app/auth.service/./auth.guard';

const routes: Routes = [
  { path:'', component:LoginComponent},
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
  { path: 'dashboard', component: DashboardComponent, 
  // canActivate: [AuthGuard] 
 },
 {
  path: 'addproduct', component:AddproductComponent,
  children: [
    { path: 'adddetails', component: AdddetailsComponent } // Child route for AdddetailsComponent
  ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
