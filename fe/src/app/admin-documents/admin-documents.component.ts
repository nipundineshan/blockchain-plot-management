import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { UserService } from '../core/services/user.service';
import { ActivityLog } from '../core/models';

@Component({
  selector: 'app-admin-documents',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-white">System Audit Logs</h1>
          <a routerLink="/admin/dashboard" class="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
            Back to Dashboard
          </a>
        </div>

        <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-xl">
          <div class="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 class="text-white font-semibold">Document & Activity History</h3>
            <button (click)="loadLogs()" class="p-2 text-blue-300 hover:text-white transition-colors">
               <ng-icon name="heroArrowPath" class="w-5 h-5"></ng-icon>
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-left bg-white/5 border-b border-white/10">
                  <th class="py-4 px-6 text-sm font-medium text-blue-200">Timestamp</th>
                  <th class="py-4 px-6 text-sm font-medium text-blue-200">User ID</th>
                  <th class="py-4 px-6 text-sm font-medium text-blue-200">Action</th>
                  <th class="py-4 px-6 text-sm font-medium text-blue-200">Details</th>
                </tr>
              </thead>
              <tbody>
                @for (log of logs(); track log.id) {
                  <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td class="py-4 px-6 text-blue-200/60 text-sm">{{log.timestamp | date:'medium'}}</td>
                    <td class="py-4 px-6 font-mono text-xs text-blue-300">{{log.userId}}</td>
                    <td class="py-4 px-6">
                      <span class="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-[10px] font-bold uppercase tracking-wider">
                        {{log.action}}
                      </span>
                    </td>
                    <td class="py-4 px-6 text-blue-100/80 text-sm">{{log.details}}</td>
                  </tr>
                }
                @if (logs().length === 0 && !isLoading) {
                  <tr>
                    <td colspan="4" class="py-20 text-center text-blue-200/40">
                      No logs found.
                    </td>
                  </tr>
                }
                @if (isLoading) {
                  <tr>
                    <td colspan="4" class="py-20 text-center">
                      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDocumentsComponent implements OnInit {
  private userService = inject(UserService);
  logs = signal<ActivityLog[]>([]);
  isLoading = true;

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.isLoading = true;
    this.userService.getGlobalAuditLogs().subscribe({
      next: (logs) => {
        this.logs.set(logs);
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }
}
