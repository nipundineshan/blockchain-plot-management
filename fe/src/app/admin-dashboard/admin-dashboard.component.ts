import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  readonly Home = 'heroHome';
  readonly Users = 'heroUsers';
  readonly FileText = 'heroDocumentText';
  readonly Shield = 'heroShieldCheck';
  readonly Settings = 'heroCog6Tooth';
  readonly LogOut = 'heroArrowLeftOnRectangle';
  readonly BarChart3 = 'heroChartBar';
  readonly AlertCircle = 'heroExclamationCircle';
  readonly CheckCircle = 'heroCheckCircle';

  stats = [
    {
      label: "Total Properties",
      value: "1,234",
      change: "+12%",
      icon: 'heroHome',
      color: "blue"
    },
    {
      label: "Active Users",
      value: "8,456",
      change: "+8%",
      icon: 'heroUsers',
      color: "green"
    },
    {
      label: "Pending Verifications",
      value: "42",
      change: "-5%",
      icon: 'heroExclamationCircle',
      color: "yellow"
    },
    {
      label: "Completed Transactions",
      value: "567",
      change: "+15%",
      icon: 'heroCheckCircle',
      color: "purple"
    }
  ];

  pendingVerifications = [
    {
      id: 1,
      property: "Modern Villa",
      user: "John Smith",
      type: "Title Deed",
      date: "2024-02-15",
      priority: "high"
    },
    {
      id: 2,
      property: "Suburban House",
      user: "Jane Doe",
      type: "Land Survey",
      date: "2024-02-14",
      priority: "medium"
    },
    {
      id: 3,
      property: "Downtown Condo",
      user: "Bob Johnson",
      type: "Tax Assessment",
      date: "2024-02-13",
      priority: "low"
    }
  ];

  recentActivities = [
    {
      action: "Property verified",
      user: "Admin User",
      property: "Luxury Estate",
      time: "2 hours ago"
    },
    {
      action: "New user registered",
      user: "Alice Brown",
      property: "-",
      time: "3 hours ago"
    },
    {
      action: "Document approved",
      user: "Admin User",
      property: "Modern Villa",
      time: "5 hours ago"
    },
    {
      action: "Property listed",
      user: "John Smith",
      property: "Family Home",
      time: "1 day ago"
    }
  ];

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
}
