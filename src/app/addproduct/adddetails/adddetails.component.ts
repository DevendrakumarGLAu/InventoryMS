import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProductService } from '../../services/add-product.service';

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
    private addProductService: AddProductService
  ) {}

  async ngOnInit() {
    await this.addProductService.GetProductform().subscribe(data => {
      this.formFields = data;
      this.generateForm();
    });
  }

  generateForm(): void {
    const formGroupConfig: any = {};

    this.formFields.forEach((field: any) => {
      const validationsArray = [];
      if (field.validations && field.validations.includes('required')) {
        validationsArray.push(Validators.required);
      }
      if (field.validations && field.validations.includes('pattern')) {
        const pattern = new RegExp(field.validator);
        validationsArray.push(Validators.pattern(pattern));
      }
      if (field.validations && field.validations.includes('minlength')) {
        validationsArray.push(Validators.minLength(field.validator));
      }
      formGroupConfig[field.name] = ['', validationsArray];
    });

    this.addProductForm = this.fb.group(formGroupConfig);
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      console.log(this.addProductForm.value);
      // Handle form submission
    } else {
      // Mark all fields as touched to display validation errors
      this.addProductForm.markAllAsTouched();
    }
  }
}
