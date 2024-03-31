import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryDialogueComponent {
  categoryForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategoryDialogueComponent>
  ) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    // Handle form submission
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value.category;
      console.log('Submitted Category:', category);
      // Close the dialog
      this.dialogRef.close();
    }
  }
}