import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProductService } from 'src/app/services/add-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  userForm!: FormGroup;
  userId: any;
  flag!: string;
  buttonText!:string;

  constructor(private fb: FormBuilder,
    private AddProductService: AddProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.getuserData();
    this.InitializeForm();
  }
  getuserData() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.flag = params['flag'];
      this.buttonText = (this.flag === 'edit') ? 'Update' : 'Submit';
    })
    if (this.flag == 'edit') {
      const val = {
        Table_name: 'users_details',
        id: this.userId
      }
      this.AddProductService.getData_common(val).subscribe((data: any) => {
        this.userForm.patchValue(data.data[0]);
      })
    }
  }

  InitializeForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required],
      action: ['', Validators.required],
    // }, { 
    //   validators: this.passwordMatchValidator // Custom validator for matching passwords
    });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  resetform() {
    this.userForm.reset(this.userForm.value);
  }
  onSubmit() {
    if (this.userForm.valid) {
      // console.log(this.userForm.value);
      const { confirmPassword, ...formDataWithoutConfirmPassword } = this.userForm.value;
      const val = {
        table_name: 'users_details',
        action: 'insert',
        id: 0,
        column_data: this.userForm.value
      }
      if(this.userId){
        val['id'] = this.userId
        val['action'] = 'update'
      }
      console.log(val);
      this.AddProductService.addData_db_operations(val).subscribe((data: any) => {
        // console.log(data);
        if (data.status === 'success') {
          this.snackBar.openSnackBarSuccess([data.message]);
          this.router.navigate(['/admin/user-details']);
        }
        else {
          this.snackBar.openSnackBarError([data.message]);
        }
      })
    }
  }
}
