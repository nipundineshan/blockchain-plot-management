import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  readonly Search = 'heroMagnifyingGlass';
  readonly Shield = 'heroShieldCheck';
  readonly FileCheck = 'heroDocumentCheck';
  readonly Home = 'heroHome';

  features = [
    {
      icon: 'heroMagnifyingGlass',
      title: "Smart Property Search",
      description: "Find your perfect plot with advanced filtering and real-time availability"
    },
    {
      icon: 'heroShieldCheck',
      title: "Blockchain Security",
      description: "All transactions verified and secured on the blockchain"
    },
    {
      icon: 'heroDocumentCheck',
      title: "Document Verification",
      description: "Automated document validation and secure storage"
    },
    {
      icon: 'heroHome',
      title: "Property Management",
      description: "Complete property lifecycle management for all stakeholders"
    }
  ];

  properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Modern Villa",
      location: "Downtown District",
      price: "$450,000",
      status: "verified"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Contemporary House",
      location: "Suburban Area",
      price: "$380,000",
      status: "verified"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Luxury Estate",
      location: "Prime Location",
      price: "$620,000",
      status: "pending"
    }
  ];
}
