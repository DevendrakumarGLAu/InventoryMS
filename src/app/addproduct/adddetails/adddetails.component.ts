import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProductService } from '../../services/add-product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { AddCategoryDialogueComponent } from '../addcategoryDialogue/add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogueComponent } from '../addProductDialogue/productdialogue.component';
import { CatDialTableComponent } from '../addcategoryDialogue/categoryDialogueTable/cat-dial-table.component';
@Component({
  selector: 'app-adddetails',
  templateUrl: './adddetails.component.html',
  styleUrls: ['./adddetails.component.css'],
})
export class AdddetailsComponent implements OnInit {
  addProductForm!: FormGroup;
  formFields: any = [];
  productId: any;
  response: any = [];
  isRequired = false;
  categories: any = [];
  category_id: any;
  productOptions: any[] = [];
  categoryOptions: any[] = [];
  boxOptions: any[] = [];
  selectedCategoryId: any;
  selectedCategory: any;
  flag!: string

  constructor(
    private fb: FormBuilder,
    private addProductService: AddProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private snackBar: SnackBarService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.initializeForm();
    this.loadCategories();
    this.loadBoxOptions();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.productId = params['id'];
      this.flag = params['flag']
      if(this.productId){
        
        const value ={
          "id":this.productId,
          "Table_name":"add_product_details"
        }
        this.addProductService.getData_common(value).subscribe((data: any) => {
          console.log("data", data.data[0])
          const manufacturingTimestamp = data.data[0].manufacturingDate;
          const expiryTimestamp = data.data[0].expiryDate;

          const manufacturingDate = new Date(parseInt(manufacturingTimestamp));
          const formattedManufacturingDate = this.datePipe.transform(
            manufacturingDate,
            'yyyy-MM-dd'
          );

          const expiryDate = new Date(parseInt(expiryTimestamp));
          const formattedExpiryDate = this.datePipe.transform(expiryDate, 'yyyy-MM-dd');
          this.selectedCategoryId = data.data[0]['category'];
          console.log("selectedCategoryId", this.selectedCategoryId)
          this.getProduct_name()
          this.addProductForm.patchValue({
            category: data.data[0].category,
            productName: data.data[0].productName,
            boxes: data.data[0].boxes,
            packing: data.data[0].packing,
            tablets: data.data[0].tablets,
            price: data.data[0].price,
            manufacturingDate: formattedManufacturingDate,
            expiryDate: formattedExpiryDate,
            description: data.data[0].description,
          });
        })
      }
    });
  }
  initializeForm(){
    this.addProductForm = this.fb.group({
      category: ['', Validators.required],
      productName: ['', Validators.required],
      boxes: ['', Validators.required],
      packing: ['', Validators.required],
      tablets: ['', Validators.required],
      price: ['', Validators.required],
      manufacturingDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      description: ['']
    });
  }
  loadCategories(): void {
    const value ={
       Table_name: "category"
       }
    this.addProductService.getData(value).subscribe(response => {
      this.categories = response.data;
      this.categoryOptions = this.categories;
    });
  }
  loadBoxOptions(): void {
    const value ={
      Table_name: "box_size"
      }
   this.addProductService.getData(value).subscribe(response => {
     this.boxOptions = response.data;
   });
  }
  
  
   onCategorySelect(event: any) {
    this.selectedCategoryId = event.target.value;
    this.selectedCategory = this.categoryOptions.find(option => option.id === parseInt(this.selectedCategoryId));
     this.getProduct_name();
  }
   getProduct_name() {
    const val = {
      category_id: this.selectedCategoryId
    }
     this.addProductService.get_products_by_category(val).subscribe(res => {
      this.productOptions = res.data;
    })
  }
  onProductSelect(event: any) {
    // console.log(event.target.value)
  }
  onPackingSelect(event: any) {
    // console.log(event.target.value)
  }
  opencategoryDialogue(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogueComponent, {
      width: '600px',
      height:'250px',
      data:{
        data:'',
      flag:'add'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
    });
  }
  opencategoryTable():void{
    const dialogRef = this.dialog.open(CatDialTableComponent, {
      width: '600px',
      height:'400px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
    });
  }

  openProductDialogue(): void {
    const dialogRef = this.dialog.open(ProductDialogueComponent, {
      width: '550px',
      height: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
    });
  }
  onSubmit(): void {
    if(this.addProductForm.invalid){
      return
    }
    let quantity = this.addProductForm.value.boxes * this.addProductForm.value.packing * this.addProductForm.value.tablets;
    this.addProductForm.value.quantity = quantity;
    const value={
      "table_name": "add_product_details",
      "action": "insert",
      "id": 0,
      "column_data": this.addProductForm.value
    }
    if(this.productId){
      value.action = "update";
      value.id = this.productId;
    }
    this.addProductService.addData_db_operations(value).subscribe((response: any) => {
      let message = response.message;
      if (response.status === 'success') {
        this.snackBar.openSnackBarSuccess([message]);
        this.router.navigate(['/admin/addproduct']);
      } else {
        this.snackBar.openSnackBarError([message]);
      }
    })
  }
  resetform() {
    this.addProductForm.reset(this.addProductForm.value);
  }
}
