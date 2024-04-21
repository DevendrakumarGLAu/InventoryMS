import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { AddProductService } from '../../services/add-product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  orderForm!: FormGroup;
  categories: any[] = [];
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
      category_id: ['', Validators.required],
      product_id: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      category_name: [''],
      product_name: [''],
      products: [[]]
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
        console.log("category", this.categories);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onCategorySelect(event: any, index: number) {
    const orderGroup = this.orders.at(index) as FormGroup;
    this.category_id = event.target.value;
    console.log('Selected category:', this.category_id);
    
    const val = {
      category_id: this.category_id
    };
    this.addProductService.get_products_by_category(val).subscribe(data => {
      console.log(data.data);
      orderGroup.get('products')?.setValue(data.data);
      orderGroup.get('product_id')?.setValue('');
      orderGroup.get('product_id')?.setErrors(null);
    });
  }

  onProductSelect(event: any, index: number) {
    const orderGroup = this.orders.at(index) as FormGroup;
    this.selectedProductId = event.target.value;
    console.log('Selected product ID:', this.selectedProductId);

    // Check for duplicate product selection
    const selectedProductIds = this.orders.controls.map((control: AbstractControl) => control.get('product_id')?.value);
    const duplicateIndex = selectedProductIds.findIndex((productId: any, i: number) => i !== index && productId === this.selectedProductId);
    
    if (duplicateIndex !== -1) {
      orderGroup.get('product_id')?.setErrors({ duplicateProduct: true });
    } else {
      orderGroup.get('product_id')?.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      const ordersWithNames = this.orders.value.map((order: any) => {
        const selectedCategory = this.categories.find(cat => cat.id == order.category_id);
        const category_name = selectedCategory ? selectedCategory.name : '';

        const selectedProduct = order.products.find((prod: any) => prod.product_id == order.product_id);
        const product_name = selectedProduct ? selectedProduct.product_name : '';

        const { products, ...orderWithoutProducts } = order;

        return {
          ...orderWithoutProducts,
          category_name,
          product_name
        };
      });

      const payload = {
        name: formValue.name,
        mobile: formValue.mobile,
        orders: ordersWithNames
      };
      console.log("Payload:", payload);
      this.addProductService.save_bill(payload).subscribe(response =>{
        console.log(response.message)
      })
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
}
