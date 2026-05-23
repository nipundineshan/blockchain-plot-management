import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { PlotService } from '../core/services/plot.service';
import { AppStateService } from '../core/services/app-state.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  readonly Home = 'heroHome';
  readonly Users = 'heroUsers';
  readonly FileText = 'heroDocumentText';
  readonly Shield = 'heroShieldCheck';
  readonly Settings = 'heroCog6Tooth';
  readonly LogOut = 'heroArrowLeftOnRectangle';
  readonly BarChart3 = 'heroChartBar';
  readonly AlertCircle = 'heroExclamationCircle';
  readonly CheckCircle = 'heroCheckCircle';
  readonly UserPlus = 'heroUserPlus';

  private plotService = inject(PlotService);
  private userService = inject(UserService);
  public appState = inject(AppStateService);

  stats = [
    {
      label: "Total Properties",
      value: "0",
      change: "+0%",
      icon: 'heroHome',
      color: "blue"
    },
    {
      label: "Active Users",
      value: "0",
      change: "+0%",
      icon: 'heroUsers',
      color: "green"
    },
    {
      label: "Pending Verifications",
      value: "0",
      change: "0%",
      icon: 'heroExclamationCircle',
      color: "yellow"
    },
    {
      label: "Completed Transactions",
      value: "0",
      change: "+0%",
      icon: 'heroCheckCircle',
      color: "purple"
    }
  ];

  pendingVerifications = signal<any[]>([]);
  recentActivities = signal<any[]>([]);

  ngOnInit() {
    this.loadStats();
    this.loadPendingVerifications();
    this.loadActivities();
  }

  loadStats() {
    this.plotService.getStats().subscribe({
      next: (data) => {
        if (data.overview) {
          this.stats = [
            {
              label: "Total Properties",
              value: data.overview.totalPlots.toLocaleString(),
              change: "+12%",
              icon: 'heroHome',
              color: "blue"
            },
            {
              label: "Active Users",
              value: data.overview.totalUsers.toLocaleString(),
              change: "+8%",
              icon: 'heroUsers',
              color: "green"
            },
            {
              label: "Pending Verifications",
              value: data.overview.pendingPlots.toLocaleString(),
              change: "0%",
              icon: 'heroExclamationCircle',
              color: "yellow"
            },
            {
              label: "Completed Transactions",
              value: data.overview.mintedNfts.toLocaleString(),
              change: "+15%",
              icon: 'heroCheckCircle',
              color: "purple"
            }
          ];
        }
      },
      error: (err) => console.error('Error fetching admin stats', err)
    });
  }

  loadPendingVerifications() {
    this.plotService.getAllPlots().subscribe({
      next: (plots) => {
        this.pendingVerifications.set(
          plots.filter(p => p.status === 'PENDING_APPROVAL').map(p => ({
            id: p.id,
            property: p.title,
            user: p.ownerId, // Ideally we'd have the owner name here
            type: "Title Deed",
            date: p.createdAt,
            priority: "medium"
          }))
        );
      }
    });
  }

  loadActivities() {
    this.userService.getRecentActivities().subscribe({
      next: (activities) => {
        this.recentActivities.set(activities);
      }
    });
  }

  approvePlot(id: string) {
    if (confirm('Are you sure you want to approve this property?')) {
      this.plotService.approvePlot(id).subscribe({
        next: () => {
          this.loadPendingVerifications();
          this.loadStats();
          this.loadActivities();
        },
        error: (err) => alert('Failed to approve: ' + (err.error?.message || 'Error'))
      });
    }
  }

  rejectPlot(id: string) {
    const reason = prompt('Reason for rejection:');
    if (reason) {
      this.plotService.rejectPlot(id, reason).subscribe({
        next: () => {
          this.loadPendingVerifications();
          this.loadStats();
          this.loadActivities();
        },
        error: (err) => alert('Failed to reject: ' + (err.error?.message || 'Error'))
      });
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'bg-red-500/30 text-red-200 border border-red-400/50';
      case 'medium':
        return 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50';
      case 'low':
        return 'bg-green-500/30 text-green-200 border border-green-400/50';
      default:
        return '';
    }
  }

  getChangeClass(change: string): string {
    return change.startsWith('+') ? 'text-green-300' : 'text-red-300';
  }

  logout() {
    this.appState.setUser(null);
  }
}
