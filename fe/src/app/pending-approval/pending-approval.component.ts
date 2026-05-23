import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-pending-approval',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div class="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 text-center shadow-2xl">
        <div class="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/30">
          <ng-icon name="heroClock" class="w-10 h-10 text-yellow-400"></ng-icon>
        </div>
        <h1 class="text-3xl font-bold text-white mb-4">Account Pending Approval</h1>
        <p class="text-blue-200/70 mb-8 leading-relaxed">
          Your account has been successfully registered and is currently being reviewed by our administrators.
          You will receive an email once your account is approved.
        </p>
        <div class="space-y-4">
          <button routerLink="/" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
            Back to Home
          </button>
          <button routerLink="/login" class="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all">
            Check Again
          </button>
        </div>
      </div>
    </div>
  `
})
export class PendingApprovalComponent {}
