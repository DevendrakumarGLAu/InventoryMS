import { NgModule } from '@angular/core';
import { dashboardRouting } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
// import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations:[
        DashboardComponent,
    ],
    imports: [
    CommonModule,
    MaterialModule,
    dashboardRouting,
],
    exports:[],
})

export class dashboardmodule {}