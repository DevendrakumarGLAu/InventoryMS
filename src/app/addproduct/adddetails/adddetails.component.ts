import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProductService } from '../../services/add-product.service';


@Component({
  selector: 'app-adddetails',
  templateUrl: './adddetails.component.html',
  styleUrls: ['./adddetails.component.css']
})
export class AdddetailsComponent {
  // addProductForm!: FormGroup;
  // formFields: any=[];
  constructor(
    private fb: FormBuilder,
    private AddProductService: AddProductService
  ) {}

  ngOnInit(): void {
    // this.addProductForm = this.fb.group({});
    this.AddProductService.GetProductform().subscribe(data => {

      console.log("formdata111",data)
      // this.formFields = data.fields;
      // this.generateFormControls();
    });
  }
  // generateFormControls(): void {
  //   this.formFields.forEach((field:any) => {
  //     this.addProductForm.addControl(
  //       field.name,
  //       this.fb.control('', Validators.required)
  //     );
  //   });
  // }
  // onSubmit(): void {
  //   if (this.addProductForm.valid) {
  //     // Handle form submission
  //     console.log(this.addProductForm.value);
  //   }
  // }



}
