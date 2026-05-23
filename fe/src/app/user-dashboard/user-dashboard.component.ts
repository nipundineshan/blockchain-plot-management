import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { PlotService } from '../core/services/plot.service';
import { UserService } from '../core/services/user.service';
import { AppStateService } from '../core/services/app-state.service';
import { Plot } from '../core/models';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  readonly Home = 'heroHome';
  readonly Heart = 'heroHeart';
  readonly FileText = 'heroDocumentText';
  readonly Bell = 'heroBell';
  readonly User = 'heroUser';
  readonly Settings = 'heroCog6Tooth';
  readonly LogOut = 'heroArrowLeftOnRectangle';
  readonly MapPin = 'heroMapPin';
  readonly Shield = 'heroShieldCheck';
  readonly PlusCircle = 'heroPlusCircle';

  private plotService = inject(PlotService);
  private userService = inject(UserService);
  public appState = inject(AppStateService);

  plots = signal<Plot[]>([]);
  recentActivity: any[] = [];
  isLoading = true;

  savedProperties = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      title: 'Modern Villa',
      location: 'Downtown District',
      price: 450000,
      status: 'verified',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      title: 'Contemporary House',
      location: 'Suburban Area',
      price: 380000,
      status: 'verified',
    },
  ];

  ngOnInit() {
    this.loadPlots();
    this.loadActivities();
  }

  loadPlots() {
    this.plotService.getMyPlots().subscribe({
      next: (plots) => {
        this.plots.set(plots);
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  loadActivities() {
    this.userService.getRecentActivities().subscribe({
      next: (activities) => {
        this.recentActivity = activities;
      },
      error: (err) => console.error('Error loading activities', err),
    });
  }

  getMintedCount() {
    return this.plots().filter((p) => p.status === 'MINTED').length;
  }

  getPendingCount() {
    return this.plots().filter((p) => p.status === 'PENDING_APPROVAL').length;
  }

  formatPrice(price: number): string {
    return price.toLocaleString();
  }

  logout() {
    this.appState.setUser(null);
  }
}
