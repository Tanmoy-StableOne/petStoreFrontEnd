import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth/Auth.Service';
import { USER_ROLE } from '../../constants/Enums';

@Component({
  selector: 'app-base-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './base-login.component.html',
  styleUrls: ['./base-login.component.css']
})
export class BaseLoginComponent implements OnInit {
  @Input() title: string = '';
  @Input() role: string = '';

  // Default endpoints - will be overridden based on role
  otpEndpoint: string = 'http://localhost:8082/sent/otp';
  signInEndpoint: string = 'http://localhost:8082/signIn';

  loginForm: FormGroup;
  isLoading = false;
  otpSent = false;
  userEmail = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: [{ value: '', disabled: true }, [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Set endpoints based on role
    this.setEndpointsByRole();
  }

  private setEndpointsByRole(): void {
    const baseUrl = 'http://localhost:8082';

    switch (this.role) {
      case USER_ROLE.ROLE_MASTER:
        this.otpEndpoint = `${baseUrl}/sent/otp`;
        this.signInEndpoint = `${baseUrl}/signIn`;
        break;
      case USER_ROLE.ROLE_ADMIN:
        this.otpEndpoint = `${baseUrl}/sent/otp`;
        this.signInEndpoint = `${baseUrl}/signIn`;
        break;
      case USER_ROLE.ROLE_DOCTOR:
        this.otpEndpoint = `${baseUrl}/sent/otp`;
        this.signInEndpoint = `${baseUrl}/signIn`;
        break;
      case USER_ROLE.ROLE_SELLER:
        this.otpEndpoint = `${baseUrl}/sent/otp`;
        this.signInEndpoint = `${baseUrl}/signIn`;
        break;
      case USER_ROLE.ROLE_CUSTOMER:
        this.otpEndpoint = `${baseUrl}/sent/otp`;
        this.signInEndpoint = `${baseUrl}/signIn`;
        break;
      case USER_ROLE.ROLE_RAIDER:
        this.otpEndpoint = `${baseUrl}/sent/otp`;
        this.signInEndpoint = `${baseUrl}/signIn`;
        break;
      case USER_ROLE.ROLE_DELIVERY_BOY:
        this.otpEndpoint = `${baseUrl}/sent/otp`;
        this.signInEndpoint = `${baseUrl}/signIn`;
        break;
      case USER_ROLE.ROLE_CUSTOMER_CARE:
        this.otpEndpoint = `${baseUrl}/sent/otp`;
        this.signInEndpoint = `${baseUrl}/signIn`;
        break;
      default:
        // Default endpoints remain unchanged
        break;
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    if (!this.otpSent) {
      this.requestOtp();
    } else {
      this.verifyOtp();
    }
  }

  private requestOtp(): void {
    const email = this.loginForm.get('email')?.value;
    this.userEmail = email;

    this.http.post<any>(this.otpEndpoint, { email }).subscribe({
      next: (response) => {
        this.otpSent = true;
        this.loginForm.get('otp')?.enable();
        this.snackBar.open(response.message || 'OTP sent successfully!', 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open(error.error?.errorMessage || 'Failed to send OTP', 'Close', { duration: 3000 });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private verifyOtp(): void {
    const otp = this.loginForm.get('otp')?.value;
    
    this.http.post<any>(this.signInEndpoint, { 
      email: this.userEmail,
      otp: otp 
    }).subscribe({
      next: (response) => {
        if (response.status && response.role === this.role) {
          this.authService.saveTokens(response.jwt, response.refreshToken);
          this.authService.saveUserRole(response.role);
          
          // Navigate based on role
          switch(response.role) {
            case USER_ROLE.ROLE_MASTER:
              this.router.navigate(['/master/dashboard']);
              break;
            case USER_ROLE.ROLE_ADMIN:
              this.router.navigate(['/admin/dashboard']);
              break;
            case USER_ROLE.ROLE_DOCTOR:
              this.router.navigate(['/doctor/dashboard']);
              break;
            case USER_ROLE.ROLE_SELLER:
              this.router.navigate(['/seller/dashboard']);
              break;
            case USER_ROLE.ROLE_CUSTOMER:
              this.router.navigate(['/customer/dashboard']);
              break;
            case USER_ROLE.ROLE_RAIDER:
              this.router.navigate(['/raider/dashboard']);
              break;
            case USER_ROLE.ROLE_DELIVERY_BOY:
              this.router.navigate(['/delivery/dashboard']);
              break;
            case USER_ROLE.ROLE_CUSTOMER_CARE:
              this.router.navigate(['/customer-care/dashboard']);
              break;
            default:
              this.router.navigate(['/']);
          }
          
          this.snackBar.open(response.message || 'Login successful!', 'Close', { duration: 3000 });
          
          // Force reload to ensure navbar updates
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.snackBar.open('Invalid role for this login type', 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        this.snackBar.open(error.error?.errorMessage || 'Login failed', 'Close', { duration: 3000 });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  resendOtp(): void {
    this.otpSent = false;
    this.loginForm.get('otp')?.disable();
    this.loginForm.get('otp')?.setValue('');
    this.requestOtp();
  }
}
