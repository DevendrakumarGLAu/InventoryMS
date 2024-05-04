import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProductService } from 'src/app/services/add-product.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
userForm!:FormGroup;

constructor(private fb:FormBuilder,
            private AddProductService:AddProductService,
            private router:Router,
            private snackBar:SnackBarService) {}

ngOnInit(): void {
  this.InitializeForm();
}
InitializeForm() {
  this.userForm = this.fb.group({
    name: ['',Validators.required],
    email: ['',Validators.required],
    phone: ['',Validators.required],
    password: ['',Validators.required],
    confirmPassword: ['',Validators.required],
    address: ['',Validators.required],
    role: ['',Validators.required],
    action: ['',Validators.required],
  });
}

resetform() {
  this.userForm.reset(this.userForm.value);
}
onSubmit() {
  if (this.userForm.valid) {
    // console.log(this.userForm.value);
    const { confirmPassword, ...formDataWithoutConfirmPassword } = this.userForm.value;
    const val= {
      table_name: 'users_details',
      action:'insert',
      id:0,
      column_data: formDataWithoutConfirmPassword
      
    }
    console.log(val);
    this.AddProductService.addData_db_operations(val).subscribe((data: any) => {
      // console.log(data);
      if(data.status==='success'){
        this.snackBar.openSnackBarSuccess([data.message]);
        this.router.navigate(['/admin/user-details']);
      }
      else{
        this.snackBar.openSnackBarError([data.message]);
      }
    })
  }
}
}
