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
      category_id: ['', Validators.required], // Change to category_id
      product_id: ['', Validators.required], // Change to product_id
      quantity: ['', [Validators.required, Validators.min(1)]],
      category_name: [''], // Include category_name field here
      product_name: [''], // Include product_name field here
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
      orderGroup.get('product_id')?.setValue(''); // Reset product_id
      orderGroup.get('product_id')?.setErrors(null);
    });
  }

  onProductSelect(event: any, index: number) {
    const orderGroup = this.orders.at(index) as FormGroup;
    this.selectedProductId = event.target.value;
    console.log('Selected product ID:', this.selectedProductId);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      const ordersWithNames = this.orders.value.map((order: any) => {
        // Find category_name from categories array
        const selectedCategory = this.categories.find(cat => cat.id == order.category_id);
        const category_name = selectedCategory ? selectedCategory.name : '';

        // Find product_name from selected product in order
        const selectedProduct = order.products.find((prod: any) => prod.product_id == order.product_id);
        const product_name = selectedProduct ? selectedProduct.product_name : '';

        // Exclude the products array
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
      return;
      // this.addProductService.save_bill(value).subscribe(response =>{
      //   console.log(response.message)
      // })
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
}
