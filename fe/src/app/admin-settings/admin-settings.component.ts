import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { AppStateService } from '../core/services/app-state.service';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto max-w-4xl">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-white">Admin Settings</h1>
          <a routerLink="/admin/dashboard" class="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
            Back to Dashboard
          </a>
        </div>

        <div class="space-y-6">
          <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 shadow-xl">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ng-icon name="heroUser" class="w-6 h-6 text-blue-300"></ng-icon>
              Profile Information
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-blue-200 mb-2">Admin Name</label>
                <input [value]="appState.currentUser()?.fullName" readonly class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50 cursor-not-allowed">
              </div>
              <div>
                <label class="block text-sm font-medium text-blue-200 mb-2">Email Address</label>
                <input [value]="appState.currentUser()?.email" readonly class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50 cursor-not-allowed">
              </div>
            </div>
          </div>

          <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 shadow-xl">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ng-icon name="heroShieldCheck" class="w-6 h-6 text-blue-300"></ng-icon>
              Platform Configuration
            </h3>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <p class="text-white font-medium">Automatic Plot Verification</p>
                  <p class="text-blue-200/40 text-xs">Enable AI-assisted initial document review</p>
                </div>
                <div class="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                  <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <p class="text-white font-medium">Public Registrations</p>
                  <p class="text-blue-200/40 text-xs">Allow new users to sign up without invite</p>
                </div>
                <div class="w-12 h-6 bg-green-600 rounded-full relative cursor-pointer">
                  <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 shadow-xl border-red-500/20">
            <h3 class="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
              <ng-icon name="heroExclamationTriangle" class="w-6 h-6"></ng-icon>
              Danger Zone
            </h3>
            <button class="px-6 py-3 bg-red-600/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-600 hover:text-white transition-all font-bold">
              Maintenance Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminSettingsComponent {
  public appState = inject(AppStateService);
}
