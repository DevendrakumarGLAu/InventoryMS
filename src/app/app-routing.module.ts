import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './common/login/login.component';
import { PageNotFoundComponenet } from './common/404 page not found/404.component';
import { UnauthorizedComponent } from './common/unauthorized/unauthorized.component';
// import { CommonsModule } from './common/commons.module';
// import { AuthGuard } from '../app/auth.service/./auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent},
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
  {
    path: 'admin',
    loadChildren: () =>
      import('./frontend/frontend.module').then((m) => m.FrontendModule),
  },
  { path: '**', component: PageNotFoundComponenet },
  { path: 'unauthorized', component: UnauthorizedComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
