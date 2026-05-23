import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIconComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  readonly Home = 'heroHome';
  readonly User = 'heroUser';
  readonly Mail = 'heroEnvelope';
  readonly Phone = 'heroPhone';
  readonly MapPin = 'heroMapPin';
  readonly Lock = 'heroLockClosed';
  readonly ArrowRight = 'heroArrowRight';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor() {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required]],
        governmentId: ['', [Validators.required]],
        walletAddress: ['', [Validators.required]],
        address: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.passwordMatchValidator() },
    );
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (
        password &&
        confirmPassword &&
        password.value !== confirmPassword.value
      ) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { confirmPassword, ...signupData } = this.registerForm.value;

      this.authService.signup(signupData).subscribe({
        next: () => {
          this.router.navigate(['/pending-approval']);
        },
        error: (err) => {
          alert(
            'Signup failed: ' +
              (err.error?.message || 'Check your details and try again'),
          );
          this.isLoading = false;
        },
      });
    }
  }
}
