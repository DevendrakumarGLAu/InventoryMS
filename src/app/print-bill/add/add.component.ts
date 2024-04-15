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
      name: ['', Validators.required],
      mobile: ['', Validators.required],
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
      quantity: ['', [Validators.required, Validators.min(1)]],
      products: []
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
  onCategorySelect(event: any,index: number) {
    const orderGroup = this.orders.at(index) as FormGroup;
    this.category_id = event.target.value;
    console.log('Selected category:', this.category_id);
    const val = {
      category_id: this.category_id
    };
     this.addProductService.get_products_by_category(val).subscribe(data => {
      orderGroup.get('products')?.setValue(data.data);
       this.products = data.data;
      this.orderForm.get('product')?.setValue('');
    });
  }
   onProductSelect(event:any,index: number) {
    const selectedProductId = event.target.value;
  console.log('Selected product ID:', selectedProductId);

  const orderGroup = this.orders.at(index) as FormGroup;
  orderGroup.get('product')?.setValue(selectedProductId);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
    formValue.orders.forEach((order: any) => {
      order.products = order.products || [];
    });
    const value ={
      // "table_name": "order",
      // "action": "insert",
      // "column_data": {
        "name": formValue.name, 
        "mobile":formValue.mobile,
        "order_details": formValue.orders
      // }
  }
  console.log(value)
  this.addProductService.save_bill(value).subscribe(response =>{
    console.log(response.message)
  })
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
}
