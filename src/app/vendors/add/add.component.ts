import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProductService } from 'src/app/services/add-product.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  vendorForm!: FormGroup;
  vendorId:any;
  val:any
  categories: any = [];
  categoryOptions: any[] = [];
  selectedCategoryId: any;
  selectedCategory: any
  productOptions: any[] = [];
  category_id1:any;
  flag!:string;

  constructor(private fb: FormBuilder,
    private AddProductService:AddProductService,
    private SnackBarService:SnackBarService,
    private router:Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCateogory_list();
    this.vendorForm = this.fb.group({
      vendorName: ['', Validators.required],
      category_id:['',Validators.required],
      product_id: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
    });
    this.activatedRoute.queryParams.subscribe(params=>{
      this.vendorId = params['id'];
      this.flag = params['flag'];
      if(this.vendorId){
        const val ={
          "id": this.vendorId,
          "Table_name": "vendor2"
        }
        this.AddProductService.getData_common(val).subscribe(response=>{
          const vendorData = response.data[0];
          this.vendorForm.patchValue({
            vendorName: vendorData.vendorName,
          category_id: vendorData.category_id,
          product_id: vendorData.product_id,
          companyName: vendorData.companyName,
          email: vendorData.email,
          mobile: vendorData.mobile
          });
          this.category_id1= vendorData.category_id,
          // console.log(this.category_id1)
          this.getProduct_name();
        })
      }
    })
  }
  getCateogory_list(){
    const val = {
      Table_name: "category"
    }
    this.AddProductService.getData(val).subscribe(response => {
      this.categories = response.data;
      this.categoryOptions = this.categories;
      // console.log("category options", this.categoryOptions)
    });
  }
  async onCategorySelect(event: any) {
    this.selectedCategoryId = event.target.value;
    this.selectedCategory = await this.categoryOptions.find(option => option.id === parseInt(this.selectedCategoryId));
    // console.log("Selected category:", this.selectedCategory);
    await this.getProduct_name();
  }
  async getProduct_name() {
    const val = {
      category_id: this.selectedCategoryId
    }
    if(this.vendorId){
      val['category_id']=this.category_id1
    }
    await this.AddProductService.get_products_by_category(val).subscribe(res => {
      this.productOptions = res.data;
      // console.log("product option", this.productOptions)
      if(this.vendorId){
        const selectedProduct = this.productOptions.find(product => product.product_id === this.vendorForm.value.product_id);
        if(selectedProduct) {
          this.vendorForm.patchValue({
            product_id: selectedProduct.product_id
          })
        }
      }
      let message = res.message;
      if (res.status === 'success') {
        this.SnackBarService.openSnackBarSuccess([message]);
      } else {
        this.SnackBarService.openSnackBarError([message])
      }
    })
  }

  onSubmit(): void {
    if (this.vendorForm.valid) {
      const formData = this.vendorForm.value;
      // console.log(formData)
      const val = {
        "table_name": "vendor2",
        "action": 'insert',
        "column_data": {
          vendorName: formData.vendorName,
          category_id: formData.category_id, // Change to category_id
          // productName: formData.productName,
          product_id: formData.product_id, // Ensure you have product_id in your form
          companyName: formData.companyName,
          email: formData.email,
          mobile: formData.mobile
        },
        "id":0
      };
      // console.log("payload",val)
      
      if (this.vendorId) {
        val["id"] = this.vendorId;
        val['action']='update'
      }
      this.AddProductService.addData_db_operations(val).subscribe((res:any) => {
        let message = res.message
        if (res.status === 'success') {
            this.SnackBarService.openSnackBarSuccess([message])
            this.router.navigate(['/admin/vendors']);
        } else {
            this.SnackBarService.openSnackBarError([message])
        }
    })
    } else {
      this.vendorForm.markAllAsTouched();
    }
  }
}
