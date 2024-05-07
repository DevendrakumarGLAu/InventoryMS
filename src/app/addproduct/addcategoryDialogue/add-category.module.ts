import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { AddCategoryDialogueComponent } from "./add-category.component";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from "@angular/common";
@NgModule({
  declarations: [AddCategoryDialogueComponent],
  imports: [ReactiveFormsModule,CommonModule,
    MatTableModule],
  exports: [],
})
export class AddCategoryModule {}