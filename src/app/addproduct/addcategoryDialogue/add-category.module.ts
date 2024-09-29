import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { AddCategoryDialogueComponent } from "./add-category.component";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { CatDialTableComponent } from "./categoryDialogueTable/cat-dial-table.component";
import { MaterialModule } from "src/app/material.module";
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [AddCategoryDialogueComponent,CatDialTableComponent],
  imports: [ReactiveFormsModule,CommonModule,
    MatTableModule,MatDialogModule,MaterialModule],
  exports: [],
})
export class AddCategoryModule {}