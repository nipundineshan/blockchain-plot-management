import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-admin-add-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto max-w-2xl">
        <div class="flex items-center gap-4 mb-8">
          <a routerLink="/admin/dashboard" class="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
            <ng-icon name="heroArrowLeft" class="w-5 h-5"></ng-icon>
          </a>
          <h1 class="text-3xl font-bold text-white">Add New Administrator</h1>
        </div>

        <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 shadow-xl">
          <form [formGroup]="adminForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-blue-200">Full Name</label>
              <input
                type="text"
                formControlName="fullName"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="Enter full name"
              />
              @if (adminForm.get('fullName')?.touched && adminForm.get('fullName')?.errors?.['required']) {
                <p class="text-red-400 text-xs">Full name is required</p>
              }
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-blue-200">Email Address</label>
              <input
                type="email"
                formControlName="email"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="admin@example.com"
              />
              @if (adminForm.get('email')?.touched && adminForm.get('email')?.errors?.['required']) {
                <p class="text-red-400 text-xs">Email is required</p>
              }
              @if (adminForm.get('email')?.touched && adminForm.get('email')?.errors?.['email']) {
                <p class="text-red-400 text-xs">Invalid email format</p>
              }
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-blue-200">Password</label>
              <input
                type="password"
                formControlName="password"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="••••••••"
              />
              @if (adminForm.get('password')?.touched && adminForm.get('password')?.errors?.['required']) {
                <p class="text-red-400 text-xs">Password is required</p>
              }
              @if (adminForm.get('password')?.touched && adminForm.get('password')?.errors?.['minlength']) {
                <p class="text-red-400 text-xs">Password must be at least 6 characters</p>
              }
            </div>

            <div class="pt-4">
              <button
                type="submit"
                [disabled]="adminForm.invalid || isLoading"
                class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                @if (isLoading) {
                  <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                } @else {
                  <ng-icon name="heroUserPlus" class="w-5 h-5"></ng-icon>
                  <span>Create Admin Account</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class AdminAddAdminComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  adminForm: FormGroup;
  isLoading = false;

  constructor() {
    this.adminForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.isLoading = true;
      this.userService.createAdmin(this.adminForm.value).subscribe({
        next: () => {
          alert('Admin created successfully!');
          this.router.navigate(['/admin/users']);
        },
        error: (err) => {
          alert('Failed to create admin: ' + (err.error?.message || 'Unknown error'));
          this.isLoading = false;
        },
      });
    }
  }
}
