import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './common/login/login.component';
// import { AuthGuard } from '../app/auth.service/./auth.guard';

const routes: Routes = [
  { path:'', component:LoginComponent},
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
  { path: 'dashboard', component: DashboardComponent, 
  // canActivate: [AuthGuard] 
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
