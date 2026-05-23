import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { AppStateService } from '../core/services/app-state.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto max-w-4xl">
        
        <div class="flex items-center gap-4 mb-8">
          <a routerLink="/user/dashboard" class="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
            <ng-icon name="heroArrowLeft" class="w-6 h-6"></ng-icon>
          </a>
          <h1 class="text-3xl font-bold text-white">My Profile</h1>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Avatar Section -->
          <div class="lg:col-span-1">
            <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 shadow-xl text-center">
              <div class="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-white/10">
                {{appState.currentUser()?.fullName?.charAt(0)}}
              </div>
              <h2 class="text-xl font-bold text-white">{{appState.currentUser()?.fullName}}</h2>
              <p class="text-blue-200/60 text-sm mb-6">{{appState.currentUser()?.email}}</p>
              
              <div class="flex flex-col gap-2">
                <div class="p-3 bg-white/5 rounded-xl border border-white/5 text-left">
                  <p class="text-[10px] uppercase tracking-wider text-blue-200/40">Role</p>
                  <p class="text-white font-medium">{{appState.currentUser()?.role}}</p>
                </div>
                <div class="p-3 bg-white/5 rounded-xl border border-white/5 text-left">
                  <p class="text-[10px] uppercase tracking-wider text-blue-200/40">Account Status</p>
                  <p class="text-green-400 font-medium">{{appState.currentUser()?.status}}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Form -->
          <div class="lg:col-span-2">
            <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 shadow-xl">
              <h3 class="text-xl font-bold text-white mb-6">Personal Information</h3>
              
              <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-200">Full Name</label>
                    <input formControlName="fullName" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none">
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-200">Phone Number</label>
                    <input formControlName="phoneNumber" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none">
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-blue-200">Home Address</label>
                  <input formControlName="address" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none">
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-blue-200">Government ID</label>
                  <input formControlName="governmentId" readonly class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/40 cursor-not-allowed">
                  <p class="text-[10px] text-blue-200/40 italic">* Government ID cannot be changed after verification.</p>
                </div>

                <div class="pt-6">
                  <button type="submit" [disabled]="profileForm.invalid || isLoading" 
                          class="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class UserProfileComponent {
  public appState = inject(AppStateService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  profileForm: FormGroup;
  isLoading = false;

  constructor() {
    const user = this.appState.currentUser();
    this.profileForm = this.fb.group({
      fullName: [user?.fullName || '', [Validators.required]],
      phoneNumber: [user?.phoneNumber || ''],
      address: [user?.address || ''],
      governmentId: [user?.governmentId || '']
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.userService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          alert('Profile updated successfully!');
          this.isLoading = false;
        },
        error: (err) => {
          alert('Update failed: ' + (err.error?.message || 'Error'));
          this.isLoading = false;
        }
      });
    }
  }
}
