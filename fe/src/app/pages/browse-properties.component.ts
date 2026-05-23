import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-browse-properties',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIconComponent],
  templateUrl: './browse-properties.component.html',
  styleUrl: './browse-properties.component.scss'
})
export class BrowsePropertiesComponent {
  readonly Search = 'heroMagnifyingGlass';
  readonly Filter = 'heroAdjustmentsHorizontal';
  readonly MapPin = 'heroMapPin';
  readonly Home = 'heroHome';
  readonly ChevronDown = 'heroChevronDown';

  priceRange: string = 'all';
  propertyType: string = 'all';
  status: string = 'all';

  properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Modern Villa",
      location: "Downtown District",
      price: 450000,
      area: "3,200 sq ft",
      bedrooms: 4,
      bathrooms: 3,
      type: "Residential",
      status: "verified"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Contemporary House",
      location: "Suburban Area",
      price: 380000,
      area: "2,800 sq ft",
      bedrooms: 3,
      bathrooms: 2,
      type: "Residential",
      status: "verified"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Luxury Estate",
      location: "Prime Location",
      price: 620000,
      area: "4,500 sq ft",
      bedrooms: 5,
      bathrooms: 4,
      type: "Residential",
      status: "pending"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1722421492323-eaf9c401befe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Family Home",
      location: "Residential Zone",
      price: 320000,
      area: "2,400 sq ft",
      bedrooms: 3,
      bathrooms: 2,
      type: "Residential",
      status: "verified"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1748063578185-3d68121b11ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Modern Residence",
      location: "Central District",
      price: 550000,
      area: "3,800 sq ft",
      bedrooms: 4,
      bathrooms: 3,
      type: "Residential",
      status: "verified"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1691425700585-c108acad6467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Premium Villa",
      location: "Elite Neighborhood",
      price: 720000,
      area: "5,000 sq ft",
      bedrooms: 5,
      bathrooms: 4,
      type: "Residential",
      status: "verified"
    }
  ];

  onPriceRangeChange(event: Event) {
    this.priceRange = (event.target as HTMLSelectElement).value;
  }

  onPropertyTypeChange(event: Event) {
    this.propertyType = (event.target as HTMLSelectElement).value;
  }

  onStatusChange(event: Event) {
    this.status = (event.target as HTMLSelectElement).value;
  }

  formatPrice(price: number): string {
    return price.toLocaleString();
  }
}
