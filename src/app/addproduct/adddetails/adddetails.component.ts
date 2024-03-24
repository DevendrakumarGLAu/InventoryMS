import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProductService } from '../../services/add-product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adddetails',
  templateUrl: './adddetails.component.html',
  styleUrls: ['./adddetails.component.css']
})
export class AdddetailsComponent implements OnInit {
  addProductForm!: FormGroup;
  formFields: any = [];

  constructor(
    private fb: FormBuilder,
    private addProductService: AddProductService,
    private router:Router
  ) {}

  async ngOnInit() {
    await this.addProductService.GetProductform().subscribe(data => {
      this.formFields = data;
      this.generateForm();
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
      const value= this.addProductForm.value;
      // console.log(this.addProductForm.value);
      this.addProductService.addProduct(value).subscribe(response =>{
        console.log(response)
        this.router.navigate(['/addproduct']);
      })
     
    } else {
     
      this.addProductForm.markAllAsTouched();
    }
  }
}
