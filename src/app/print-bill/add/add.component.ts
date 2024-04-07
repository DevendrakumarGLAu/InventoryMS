import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AddProductService } from '../../services/add-product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  orderForm!: FormGroup;
  categories: any[] = [];
  products: any = [];
  category_id: any;
  selectedProductId: any;

  constructor(private fb: FormBuilder, private addProductService: AddProductService) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      orders: this.fb.array([])
    });

    this.addOrder();
    this.getCategories();
  }

  get orders(): FormArray {
    return this.orderForm.get('orders') as FormArray;
  }

  createOrder(serialNumber: number): FormGroup {
    return this.fb.group({
      sno: [serialNumber],
      category: ['', Validators.required],
      product: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  addOrder(): void {
    const serialNumber = this.orders.length + 1;
    this.orders.push(this.createOrder(serialNumber));
  }

  removeOrder(index: number): void {
    this.orders.removeAt(index);
    this.updateSerialNumbers();
  }

  updateSerialNumbers(): void {
    this.orders.controls.forEach((control, index) => {
      control.get('sno')?.patchValue(index + 1);
    });
  }
   getCategories() {
    const val = {
      Table_name: "category"
    };
     this.addProductService.getData(val).subscribe(
      (response: any) => {
        this.categories = response.data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  onCategorySelect(event: any) {
    // debugger
    this.category_id = event.target.value;
    console.log('Selected category:', this.category_id);
    // this.products = [];
    // this.orderForm?.get('product')?.patchValue('');
    // this.products = [];
    const val = {
      category_id: this.category_id
    };
    
     this.addProductService.get_products_by_category(val).subscribe(data => {
      console.log(data.data)
       this.products = data.data;
      // this.products.push(...productOptions);
      
      this.orderForm.get('product')?.setValue('');


    });
  }
  async onProductSelect(event:any) {


  }


  onSubmit(): void {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
}
