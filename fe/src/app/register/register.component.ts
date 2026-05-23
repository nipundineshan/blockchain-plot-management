import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NgIconComponent, FormsModule, ReactiveFormsModule],
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
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      governmentId: ['', [Validators.required]],
      walletAddress: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.signup(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/auth/pending-approval']);
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
