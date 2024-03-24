import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddproductRoutingModule } from './addproduct-routing.module';
import { AddproductComponent } from './addproduct.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
@NgModule({
    declarations:[
        AddproductComponent
    ],
    imports:[CommonModule,
        AddproductRoutingModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule
    ]
})

export class AddproductModule {}