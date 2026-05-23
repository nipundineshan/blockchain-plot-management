import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIconComponent
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  readonly Home = 'heroHome';
  readonly Heart = 'heroHeart';
  readonly FileText = 'heroDocumentText';
  readonly Bell = 'heroBell';
  readonly User = 'heroUser';
  readonly Settings = 'heroCog6Tooth';
  readonly LogOut = 'heroArrowLeftOnRectangle';
  readonly MapPin = 'heroMapPin';
  readonly Shield = 'heroShieldCheck';

  savedProperties = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      title: 'Modern Villa',
      location: 'Downtown District',
      price: 450000,
      status: 'verified'
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      title: 'Contemporary House',
      location: 'Suburban Area',
      price: 380000,
      status: 'verified'
    }
  ];

  myProperties = [
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      title: 'Luxury Estate',
      location: 'Prime Location',
      price: 620000,
      status: 'verified',
      listingDate: '2024-01-15'
    }
  ];

  recentActivity = [
    {
      action: 'Saved property',
      property: 'Modern Villa',
      date: '2024-02-15'
    },
    {
      action: 'Scheduled viewing',
      property: 'Contemporary House',
      date: '2024-02-14'
    },
    {
      action: 'Document uploaded',
      property: 'Luxury Estate',
      date: '2024-02-10'
    }
  ];

  formatPrice(price: number): string {
    return price.toLocaleString();
  }
}
