import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { AddProductService } from '../../services/add-product.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  productId: any;
  productOptions:any[] = [];
  BillId: any;
  flag!: string;


  constructor(private fb: FormBuilder, private addProductService: AddProductService,
    private SnackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      orders: this.fb.array([])
    });

    this.addOrder();
    this.getCategories();
    this.getBillData()
  }


  get orders(): FormArray {
    return this.orderForm.get('orders') as FormArray;
  }
  getBillData() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.BillId = params['id'];
      this.flag = params['flag'];
    })
    if (this.flag == 'edit') {
      const val = {
        Table_name: 'customer_orders_bill',
        id: this.BillId
      }
      this.addProductService.getData_common(val).subscribe((data: any) => {
        // console.log(data.data)
        const billData = data.data[0];
        this.orderForm.patchValue({
          name: billData.name,
          mobile: billData.mobile
        });
        if (billData.orders && typeof billData.orders === 'string') {
          billData.orders = JSON.parse(billData.orders.replace(/\\/g, ''));
        }
        if (billData.orders && Array.isArray(billData.orders)) {
          this.orders.clear();
          billData.orders.forEach((order:any,index: number) =>{
            const newOrderGroup = this.createOrder(order.sno);
            this.category_id = order.category_id
            // console.log("cat",this.category_id)
            newOrderGroup.patchValue({
              category_id: order.category_id,
              product_id: order.product_id,
              quantity: order.quantity,
              selling_price: order.selling_price
            });
            this.orders.push(newOrderGroup);
            this.onCategorySelect({ target: { value: order.category_id } }, index);
          })
        }
      })
    }
  }
  
  createOrder(serialNumber: number): FormGroup {
    return this.fb.group({
      sno: [serialNumber],
      category_id: ['', Validators.required],
      product_id: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      selling_price: ['', Validators.required],
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
        // console.log("category", this.categories);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onCategorySelect(event: any, index: number) {
    const orderGroup = this.orders.at(index) as FormGroup;
    this.category_id = event.target.value;
    // console.log('Selected category:', this.category_id);
    const val = {
      category_id: this.category_id
    };
    this.addProductService.get_products_by_category(val).subscribe(data => {
      // console.log(data.data);
      this.productOptions = data.data;
      orderGroup.get('products')?.setValue(data.data);
    });
  }

  onProductSelect(event: any, index: number) {
    const orderGroup = this.orders.at(index) as FormGroup;
    this.selectedProductId = event.target.value;
    // console.log('Selected product ID:', this.selectedProductId);

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

      // const payload = {
      //   name: formValue.name,
      //   mobile: formValue.mobile,
      //   orders: ordersWithNames
      // };
      // console.log("Payload:", payload);
      const val = {
        table_name: 'customer_orders_bill',
        action: 'insert',
        id: 0,
        column_data: this.orderForm.value
      }
      // console.log("product id",this.BillId)
      if (this.BillId) {
        val['id'] = this.BillId
        val['action'] = 'update'
      }
      // console.log(val)
      // return
      this.addProductService.addData_db_operations(val).subscribe(response => {
        let message = response.message
        if (response.status === 'success') {
          this.SnackBarService.openSnackBarSuccess([message])
          this.router.navigate(['/admin/printbill']);
        } else {
          this.SnackBarService.openSnackBarError([message])
        }
      })
      return
      
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
  printBill(){
    const payload = {
      table_name: 'customer_orders_bill',
      column_data: this.orderForm.value
    }
    console.log("payload",payload)
    this.addProductService.save_bill(payload).subscribe(response => {
      let message = response.message
      if (response.status === 'success') {
        this.SnackBarService.openSnackBarSuccess([message])
        this.router.navigate(['/admin/printbill']);
      } else {
        this.SnackBarService.openSnackBarError([message])
      }
    })
  }
}
