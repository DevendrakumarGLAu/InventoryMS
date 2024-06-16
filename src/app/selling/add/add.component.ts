import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AddProductService } from "src/app/services/add-product.service";
import { SnackBarService } from "src/app/services/snackbar.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
    selector: "app-add",
    templateUrl: "./add.component.html",
    styleUrls: ["./add.component.css"],
})

export class AddComponent implements OnInit {
    sellProductForm!: FormGroup;
    productOptions: any[] = [];
    selectedProductId!: number;
    productId: any;
    flag!: string;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private activatedRoute: ActivatedRoute,
        private AddProductService: AddProductService,
        private SnackBarService: SnackBarService,
        private router: Router) { }
    ngOnInit(): void {
        this.sellProductForm = this.fb.group({
            product_id: ['', Validators.required],
            sell_quantity: ['', Validators.required],
            unit_sellingPrice: ['', Validators.required]
        });
        this.getProduct()
        this.getProductData()

    }
    getProductData() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.productId = params['id'];
            this.flag = params['flag'];

        })
        if (this.flag == 'edit') {
            const val = {
                Table_name: 'products',
                id: this.productId
            }
            this.AddProductService.getData_common(val).subscribe((data: any) => {
                console.log("selling", data.data[0])
                this.sellProductForm.patchValue(data.data[0]);
                // this.sellProductForm.patchValue
            })
        }
    }
    resetform() {
        this.sellProductForm.reset(this.sellProductForm.value);
    }
    getProduct() {
        this.AddProductService.getProductData().subscribe((data: any) => {
            this.productOptions = data.data;
        })
    }
    onProductSelect(event: any) {
        const selectedProductId = event.target.value;
        console.log("selected id", selectedProductId)
        this.sellProductForm.patchValue({ product_id: parseInt(selectedProductId) }); // Update the value of the form control
    }

    sellProduct() {
        if (!this.sellProductForm.valid) {
            return
        }
        const val_sale = {
            table_name: 'sell_product',
            action: 'insert',
            id: 0,
            column_data: this.sellProductForm.value
          }
          if(this.productId){
            val_sale['id'] = this.productId
            val_sale['action'] = 'update'
          }
          console.log(val_sale);
        this.AddProductService.addData_db_operations(val_sale).subscribe(response =>{
            let message = response.message
            if (response.status === 'success') {
                this.SnackBarService.openSnackBarSuccess([message])
                this.router.navigate(['/admin/selling']);
            } else {
                this.SnackBarService.openSnackBarError([message])
            }
        })
        const val = this.sellProductForm.value;
        this.AddProductService.product_sales(val).subscribe(res => {
            let message = res.message
            if (res.status === 'success') {
                this.SnackBarService.openSnackBarSuccess([message])
                this.router.navigate(['/admin/selling']);
            } else {
                this.SnackBarService.openSnackBarError([message])
            }
        })
    }
}