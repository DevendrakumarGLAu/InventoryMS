import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AddProductService } from "src/app/services/add-product.service";
import { SnackBarService } from "src/app/services/snackbar.service";
@Component({
  selector: 'app-addRole',
  templateUrl: './addRole.component.html',
  // styleUrls: ['./addRole.component.css']
})
export class addRole {
  roleForm!: FormGroup
  roleId: any
  flag: any
  constructor(private fb: FormBuilder,
    private AddProductService: AddProductService,
    private SnackBarService: SnackBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      role_name: [''],
      status: [''],
    })
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.roleId = params['id'];
      this.flag = params['flag'];
    })
    if (this.flag == 'edit') {
      const val = {
        Table_name: 'roles',
        id: this.roleId
      }
      this.AddProductService.getData_common(val).subscribe((data: any) => {
        this.roleForm.patchValue(data.data[0]);
      })
    }
  }
  onSubmit() {
    console.log(this.roleForm);
    if (this.roleForm.valid) {
      console.log(this.roleForm.value);
      const formData = this.roleForm.value;
      // console.log(formData)
      const val = {
        "table_name": "roles",
        "action": 'insert',
        "column_data": formData,
        "id": 0
      };
      if (this.roleId) {
        val["id"] = this.roleId;
        val['action'] = 'update'
      }
      this.AddProductService.addData_db_operations(val).subscribe((res:any) => {
        let message = res.message
        if (res.status === 'success') {
            this.SnackBarService.openSnackBarSuccess([message])
            this.router.navigate(['/admin/roles']);
        } else {
            this.SnackBarService.openSnackBarError([message])
        }
    })
    } else {
      this.roleForm.markAllAsTouched();
    }
    }
  }
