import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-authority-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  templateUrl: './authority-dashboard.component.html',
  styleUrl: './authority-dashboard.component.scss',
})
export class AuthorityDashboardComponent {
  readonly Home = 'heroHome';
  readonly Shield = 'heroShieldCheck';
  readonly FileCheck = 'heroDocumentCheck';
  readonly AlertTriangle = 'heroExclamationTriangle';
  readonly Settings = 'heroCog6Tooth';
  readonly LogOut = 'heroArrowLeftOnRectangle';
  readonly CheckCircle = 'heroCheckCircle';
  readonly Clock = 'heroClock';

  stats = [
    {
      label: 'Pending Approvals',
      value: '18',
      icon: 'heroClock',
      color: 'yellow',
    },
    {
      label: 'Approved Today',
      value: '32',
      icon: 'heroCheckCircle',
      color: 'green',
    },
    {
      label: 'Rejected',
      value: '5',
      icon: 'heroExclamationTriangle',
      color: 'red',
    },
    {
      label: 'Total Verified',
      value: '1,247',
      icon: 'heroShieldCheck',
      color: 'blue',
    },
  ];

  pendingApprovals = [
    {
      id: 1,
      property: 'Modern Villa',
      propertyId: 'PROP-2024-001',
      owner: 'John Smith',
      documentType: 'Title Deed',
      submittedDate: '2024-02-15',
      location: 'Downtown District',
      status: 'pending',
    },
    {
      id: 2,
      property: 'Suburban House',
      propertyId: 'PROP-2024-002',
      owner: 'Jane Doe',
      documentType: 'Land Survey Report',
      submittedDate: '2024-02-14',
      location: 'Suburban Area',
      status: 'pending',
    },
    {
      id: 3,
      property: 'Commercial Plaza',
      propertyId: 'PROP-2024-003',
      owner: 'ABC Corporation',
      documentType: 'Building Permit',
      submittedDate: '2024-02-13',
      location: 'Business District',
      status: 'under_review',
    },
  ];

  recentDecisions = [
    {
      property: 'Luxury Estate',
      decision: 'Approved',
      date: '2024-02-15',
      authority: 'Land Registry',
    },
    {
      property: 'Family Home',
      decision: 'Approved',
      date: '2024-02-14',
      authority: 'Municipal Authority',
    },
    {
      property: 'Downtown Condo',
      decision: 'Rejected',
      date: '2024-02-13',
      authority: 'Building Department',
    },
  ];

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
}
