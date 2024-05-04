import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
userForm!:FormGroup;

constructor(private fb:FormBuilder) {}

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
    console.log(this.userForm.value);
  }
}
}
