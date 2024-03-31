import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProductService } from '../../services/add-product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { AddCategoryDialogueComponent } from '../addcategoryDialogue/add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogueComponent } from '../addProductDialogue/productdialogue.component'; 
@Component({
  selector: 'app-adddetails',
  templateUrl: './adddetails.component.html',
  styleUrls: ['./adddetails.component.css'],
})
export class AdddetailsComponent implements OnInit {
  addProductForm!: FormGroup;
  formFields: any = [];
  productId: any;
  response: any = [];
  isRequired = false;

  constructor(
    private fb: FormBuilder,
    private addProductService: AddProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private snackBar: SnackBarService,
    public dialog: MatDialog
  ) {}
  // populateForm(product: any): void {
  //   const formGroupConfig: { [key: string]: any } = {};
  //   this.formFields.forEach((field: any) => {
  //     formGroupConfig[field.name] = [product[field.name], Validators.required];
  //   });
  //   this.addProductForm = this.fb.group(formGroupConfig);
  // }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this.addProductService
          .getProductById(this.productId)
          .subscribe((product: any) => {
            this.response = product.data[0];
            // console.log(this.response);
            const formValues: any = {};
            Object.keys(this.response).forEach((key) => {
              if (key === 'manufacturingDate' || key === 'expiryDate') {
                const formattedDate = this.datePipe.transform(
                  this.response[key],
                  'yyyy-MM-dd'
                );
                formValues[key] = formattedDate;
              } else {
                formValues[key] = this.response[key];
              }
            });
            this.addProductForm.patchValue(formValues);
            // this.addProductForm.patchValue({
            //   productId: this.response.productId,
            //   category: this.response.category,
            //   productName: this.response.productName,
            //   costPrice: this.response.costPrice,
            //   sellingPrice: this.response.sellingPrice,
            //   quantity: this.response.quantity,
            //   expiryDate: this.response.expiryDate,
            //   manufacturingDate: this.response.manufacturingDate,
            // });
          });
      }
    });
    await this.addProductService.GetProductform().subscribe((data) => {
      this.formFields = data;
      this.generateForm();
    });
  }
  opencategoryDialogue(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogueComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  openProductDialogue(): void {
    const dialogRef = this.dialog.open(ProductDialogueComponent, {
      width: '500px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  generateForm(): void {
    const formGroupConfig: any = {};

    this.formFields.forEach((field: any) => {
      const validationsArray: any = [];
      field.validations.forEach((valid: any) => {
        if (valid.name === 'required') {
          validationsArray.push(Validators.required);
          this.isRequired = true;
        }
      });
      // if (field.validations && field.validations.includes('pattern')) {
      //   const pattern = new RegExp(field.validator);
      //   validationsArray.push(Validators.pattern(pattern));
      // }
      // if (field.validations && field.validations.includes('minlength')) {
      //   validationsArray.push(Validators.minLength(field.validator));
      // }
      formGroupConfig[field.name] = ['', validationsArray];
      field.isRequired = this.isRequired;
    });

    this.addProductForm = this.fb.group(formGroupConfig);
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      let value = this.addProductForm.value;
      // console.log(value);
      if (this.productId > 0) {
        value.id = this.productId;
      }
      // console.log("id is ",value.id);
      // console.log("edit response",value)

      this.addProductService.addProduct(value).subscribe((response: any) => {
        // console.log(response);
        if (response.status === 'success') {
          let message = response.message;
          this.snackBar.openSnackBarSuccess([message]);
        } else {
          this.snackBar.openSnackBarError([response.message]);
        }
      });
    } else {
      this.addProductForm.markAllAsTouched();
    }
  }
}
