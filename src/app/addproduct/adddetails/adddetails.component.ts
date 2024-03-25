import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProductService } from '../../services/add-product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-adddetails',
  templateUrl: './adddetails.component.html',
  styleUrls: ['./adddetails.component.css']
})
export class AdddetailsComponent implements OnInit {
  addProductForm!: FormGroup;
  formFields: any = [];
  productId:any;

  constructor(
    private fb: FormBuilder,
    private addProductService: AddProductService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.productId = this.route.snapshot.queryParams['id'];
    await this.addProductService.GetProductform().subscribe(data => {
      this.formFields = data;
      this.generateForm();
      if (this.productId) {
        this.addProductService.getProductDetails(this.productId).subscribe(product => {
          this.setFormValues(product);
        });
      }
    });
  }
  setFormValues(product: any): void {
    this.addProductForm.setValue({
      category: product.category,
      productName: product.productName,
      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,
      quantity: product.quantity,
      manufacturingDate: product.manufacturingDate,
      expiryDate: product.expiryDate
    });
  }

  generateForm(): void {
    // debugger
    const formGroupConfig: any = {};

    this.formFields.forEach((field: any) => {
      const validationsArray:any= [];
     field.validations.forEach((valid:any) =>{
      if (valid.name === 'required') {
        validationsArray.push(Validators.required);
      }
     })
      // if (field.validations && field.validations.includes('pattern')) {
      //   const pattern = new RegExp(field.validator);
      //   validationsArray.push(Validators.pattern(pattern));
      // }
      // if (field.validations && field.validations.includes('minlength')) {
      //   validationsArray.push(Validators.minLength(field.validator));
      // }
      formGroupConfig[field.name] = ['', validationsArray];
    });

    this.addProductForm = this.fb.group(formGroupConfig);
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      let value= this.addProductForm.value;
      console.log(this.addProductForm.value);
      this.addProductService.addProduct(value).subscribe(response =>{
        console.log(response)
        this.router.navigate(['/addproduct']);
      })
     
    } else {
     
      this.addProductForm.markAllAsTouched();
    }
  }
}
