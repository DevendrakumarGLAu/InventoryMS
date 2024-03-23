import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any;
  password: any;
  errorMessage: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        // Redirect to the dashboard or desired page upon successful login
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        // Handle login error (e.g., display error message)
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password.';
      }
    );
  }
}