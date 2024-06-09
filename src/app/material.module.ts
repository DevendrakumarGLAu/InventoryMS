import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
      MatPaginatorModule,
      MatInputModule,
      // Add other Material modules you want to use
    ],
    exports: [
      MatPaginatorModule,
      MatInputModule,
      MatTableModule,
      MatIconModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatExpansionModule,
      FormsModule
      // Add other Material modules you want to export
    ]
  })
  export class MaterialModule { }