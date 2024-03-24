import { NgModule } from '@angular/core';
// import { AddproductRouting } from './addproduct-routing.module';
// import { AddproductComponent } from './addproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdddetailsComponent } from './adddetails.component';
import { AddDetailsRouting } from './adddetails-routing.module';

@NgModule({
    declarations:[AdddetailsComponent
    ],
    imports:[
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        AddDetailsRouting
    ]
})

export class AddDetailsModule {}