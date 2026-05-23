import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { PlotService } from '../core/services/plot.service';
import { Plot } from '../core/models';

@Component({
  selector: 'app-browse-properties',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIconComponent],
  templateUrl: './browse-properties.component.html',
  styleUrl: './browse-properties.component.scss'
})
export class BrowsePropertiesComponent implements OnInit {
  readonly Search = 'heroMagnifyingGlass';
  readonly Filter = 'heroAdjustmentsHorizontal';
  readonly MapPin = 'heroMapPin';
  readonly Home = 'heroHome';
  readonly ChevronDown = 'heroChevronDown';

  private plotService = inject(PlotService);

  priceRange: string = 'all';
  propertyType: string = 'all';
  status: string = 'all';

  properties = signal<Plot[]>([]);
  isLoading = true;

  ngOnInit() {
    this.loadPlots();
  }

  loadPlots() {
    this.plotService.getAllPlots().subscribe({
      next: (plots) => {
        this.properties.set(plots);
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

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
