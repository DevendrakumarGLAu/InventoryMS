  // productdialogue.component.ts
  import { Component, Inject, OnInit } from "@angular/core";
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { AddProductService } from "src/app/services/add-product.service";

  @Component({
    selector: 'app-productdialogue',
    templateUrl: './productdialogue.component.html',
    styleUrls: ['./productdialogue.component.css'],
  })
  export class ProductDialogueComponent implements OnInit {
    categories: any[] = [];
    productForm!: FormGroup;

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<ProductDialogueComponent>,
      private addProductService: AddProductService,
      private fb: FormBuilder
    ) {}

    ngOnInit(): void {
      this.productForm = this.fb.group({
        category: ['', Validators.required],
        productName: ['', Validators.required]
      });
      const val= { 
        Table_name: "category" 
      }
      
      this.addProductService.getData(val).subscribe(response => {
        this.categories = response.data;
      });
    }

    onSubmit(): void {
      if (this.productForm.valid) {
        const productData = {
          category: this.productForm.value.category,
          productName: this.productForm.value.productName
        };

        this.dialogRef.close(productData);
      } 
    }

    closeDialog(): void {
      this.dialogRef.close();
    }
  }
