import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AddProductService } from "src/app/services/add-product.service";
import { SnackBarService } from "src/app/services/snackbar.service";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryDialogueComponent implements OnInit {
  categoryForm!: FormGroup;
  // categories: any[] = [];
  categories!: MatTableDataSource<any>;
  displayedColumns: string[] = ['sno', 'name','Action'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategoryDialogueComponent>,
    private AddProductService:AddProductService,
    private snackBar: SnackBarService,

  ) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.data && this.data.category) {
      // If category data is provided, prefill the form fields for editing
      this.categoryForm.patchValue({
        category: this.data.category.name
      });
    }
    const val ={
      Table_name:"category"
    }
    this.AddProductService.getData_common(val).subscribe(data=>{
      console.log(data.data)
      this.categories = new MatTableDataSource(data.data);
    })

  }
  

  closeDialog(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    // Handle form submission
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value.category;
      const payload = {
        table_name: 'category',
        action: 'insert',
        column_data: { name: this.categoryForm.value.category }
      };
      // console.log(paylod)
      this.AddProductService.addData_db_operations(payload).subscribe((response:any)=>{
        // console.log("data data",response)
        let message = response.message
        if(response.status==='success'){
          this.snackBar.openSnackBarSuccess([message])

        }
        else{
          this.snackBar.openSnackBarError([message])
        }
      })
      this.dialogRef.close()
      // this.dialogRef.close(category);
    }
  }
}