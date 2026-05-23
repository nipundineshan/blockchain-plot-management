import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { UserService } from '../core/services/user.service';
import { AppStateService } from '../core/services/app-state.service';
import { User } from '../core/models';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-white">Manage Users</h1>
          <div class="flex gap-4">
             <a routerLink="/admin/dashboard" class="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              Back to Dashboard
            </a>
            @if (appState.currentUser()?.role === 'SUPER_ADMIN') {
              <a routerLink="/admin/add-admin" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Admin
              </a>
            }
          </div>
        </div>

        <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-xl">
          <table class="w-full">
            <thead>
              <tr class="border-b border-white/10 bg-white/5">
                <th class="text-left py-4 px-6 text-sm font-medium text-blue-200">User</th>
                <th class="text-left py-4 px-6 text-sm font-medium text-blue-200">Email</th>
                <th class="text-left py-4 px-6 text-sm font-medium text-blue-200">Role</th>
                <th class="text-left py-4 px-6 text-sm font-medium text-blue-200">Status</th>
                <th class="text-left py-4 px-6 text-sm font-medium text-blue-200">Joined Date</th>
                <th class="text-left py-4 px-6 text-sm font-medium text-blue-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (user of users(); track user.id) {
                <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold border border-blue-500/30">
                        {{user.fullName.charAt(0)}}
                      </div>
                      <div class="text-white font-medium">{{user.fullName}}</div>
                    </div>
                  </td>
                  <td class="py-4 px-6 text-blue-200">{{user.email}}</td>
                  <td class="py-4 px-6">
                    <span [class]="'px-2 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase ' + getRoleClass(user.role)">
                      {{user.role}}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <span [class]="'px-3 py-1 rounded-full text-xs font-medium ' + getStatusClass(user.status)">
                      {{user.status}}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-blue-200/60 text-sm">{{user.createdAt | date:'mediumDate'}}</td>
                  <td class="py-4 px-6">
                    <div class="flex gap-2">
                      <button class="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors">
                        <ng-icon name="heroEye" class="w-4 h-4"></ng-icon>
                      </button>
                      @if (user.status === 'PENDING_APPROVAL') {
                        <button (click)="approveUser(user)" class="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors">
                          <ng-icon name="heroCheck" class="w-4 h-4"></ng-icon>
                        </button>
                      }
                      <button class="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors">
                        <ng-icon name="heroTrash" class="w-4 h-4"></ng-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              }
              @if (users().length === 0 && !isLoading) {
                <tr>
                  <td colspan="6" class="py-20 text-center text-blue-200/40">
                    No users found.
                  </td>
                </tr>
              }
              @if (isLoading) {
                <tr>
                  <td colspan="6" class="py-20 text-center">
                    <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class AdminUsersComponent implements OnInit {
  private userService = inject(UserService);
  public appState = inject(AppStateService);
  users = signal<User[]>([]);
  isLoading = true;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-purple-500/20 text-purple-300';
      case 'ADMIN': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED': return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'PENDING_APPROVAL': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      case 'REJECTED': return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'BLOCKED': return 'bg-red-900/20 text-red-400 border border-red-900/30';
      default: return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
    }
  }

  approveUser(user: User) {
    if (confirm(`Approve user ${user.fullName}?`)) {
      this.userService.approveUser(user).subscribe({
        next: () => {
          this.loadUsers();
        }
      });
    }
  }
}
