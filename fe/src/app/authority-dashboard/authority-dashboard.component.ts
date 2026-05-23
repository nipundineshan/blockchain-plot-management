import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { PlotService } from '../core/services/plot.service';
import { AppStateService } from '../core/services/app-state.service';

@Component({
  selector: 'app-authority-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  templateUrl: './authority-dashboard.component.html',
  styleUrl: './authority-dashboard.component.scss',
})
export class AuthorityDashboardComponent implements OnInit {
  readonly Home = 'heroHome';
  readonly Shield = 'heroShieldCheck';
  readonly FileCheck = 'heroDocumentCheck';
  readonly AlertTriangle = 'heroExclamationTriangle';
  readonly Settings = 'heroCog6Tooth';
  readonly LogOut = 'heroArrowLeftOnRectangle';
  readonly CheckCircle = 'heroCheckCircle';
  readonly Clock = 'heroClock';

  private plotService = inject(PlotService);
  public appState = inject(AppStateService);

  stats = [
    {
      label: 'Pending Approvals',
      value: '0',
      icon: 'heroClock',
      color: 'yellow',
    },
    {
      label: 'Approved Today',
      value: '0',
      icon: 'heroCheckCircle',
      color: 'green',
    },
    {
      label: 'Rejected',
      value: '0',
      icon: 'heroExclamationTriangle',
      color: 'red',
    },
    {
      label: 'Total Verified',
      value: '0',
      icon: 'heroShieldCheck',
      color: 'blue',
    },
  ];

  pendingApprovals = signal<any[]>([]);
  recentDecisions = signal<any[]>([]);

  ngOnInit() {
    this.loadStats();
    this.loadPendingApprovals();
  }

  loadStats() {
    this.plotService.getGlobalStats().subscribe({
      next: (data) => {
        if (data.overview) {
          this.stats = [
            {
              label: 'Pending Approvals',
              value: data.overview.pendingPlots.toLocaleString(),
              icon: 'heroClock',
              color: 'yellow',
            },
            {
              label: 'Approved Today',
              value: data.overview.approvedPlots.toLocaleString(),
              icon: 'heroCheckCircle',
              color: 'green',
            },
            {
              label: 'Rejected',
              value: data.overview.rejectedPlots?.toLocaleString() || '0',
              icon: 'heroExclamationTriangle',
              color: 'red',
            },
            {
              label: 'Total Verified',
              value: data.overview.mintedNfts.toLocaleString(),
              icon: 'heroShieldCheck',
              color: 'blue',
            },
          ];
        }
      }
    });
  }

  loadPendingApprovals() {
    this.plotService.getAllPlots().subscribe({
      next: (plots) => {
        this.pendingApprovals.set(
          plots.filter(p => p.status === 'PENDING_APPROVAL').map(p => ({
            id: p.id,
            property: p.title,
            propertyId: p.id.substring(0, 8).toUpperCase(),
            owner: p.ownerId,
            documentType: 'Title Deed',
            submittedDate: p.createdAt,
            location: p.location,
            status: 'pending'
          }))
        );
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50';
      case 'under_review':
        return 'bg-blue-500/30 text-blue-200 border border-blue-400/50';
      case 'Approved':
        return 'bg-green-500/30 text-green-200 border border-green-400/50';
      case 'Rejected':
        return 'bg-red-500/30 text-red-200 border border-red-400/50';
      default:
        return '';
    }
  }

  logout() {
    this.appState.setUser(null);
  }
}
