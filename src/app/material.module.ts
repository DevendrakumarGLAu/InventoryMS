import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

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
      MatFormFieldModule
      // Add other Material modules you want to export
    ]
  })
  export class MaterialModule { }