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


  constructor(private fb: FormBuilder,
    private AddProductService:AddProductService,
    private SnackBarService:SnackBarService,
    private router:Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.vendorForm = this.fb.group({
      vendorName: ['', Validators.required],
      productName: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
    });
    this.activatedRoute.queryParams.subscribe(params=>{
      this.vendorId = params['id'];
      if(this.vendorId){
        const val ={
          "id": this.vendorId,
          "Table_name": "vendors"
        }
        this.AddProductService.getData_common(val).subscribe(response=>{
          const vendorData = response.data[0];
          this.vendorForm.patchValue({
            vendorName: vendorData.vendorName,
            productName: vendorData.productName,
            companyName: vendorData.companyName,
            email: vendorData.email,
            mobile: vendorData.mobile
          });

        })
      }
    })
  }

  onSubmit(): void {
    if (this.vendorForm.valid) {
      const formData = this.vendorForm.value;
      this.val = {
        "table_name": "vendors",
        "action": this.vendorId ? "update" : "insert",
        "column_data": formData
      };
      if (this.vendorId) {
        this.val["id"] = this.vendorId;
      }
      this.AddProductService.addData_db_operations(this.val).subscribe((res:any) => {
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
