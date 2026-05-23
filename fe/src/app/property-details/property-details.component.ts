import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { PlotService } from '../core/services/plot.service';
import { Plot } from '../core/models';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsComponent implements OnInit {
  readonly Home = 'heroHome';
  readonly MapPin = 'heroMapPin';
  readonly Square = 'heroSquare3Stack3d';
  readonly Calendar = 'heroCalendar';
  readonly Shield = 'heroShieldCheck';
  readonly FileText = 'heroDocumentText';
  readonly ChevronLeft = 'heroChevronLeft';
  readonly Sparkles = 'heroSparkles';

  private route = inject(ActivatedRoute);
  private plotService = inject(PlotService);

  property = signal<Plot | null>(null);
  isLoading = true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProperty(id);
      }
    });
  }

  loadProperty(id: string) {
    this.isLoading = true;
    this.plotService.getPlotById(id).subscribe({
      next: (plot) => {
        this.property.set(plot);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  formatPrice(price: number | undefined): string {
    return price ? price.toLocaleString() : '0';
  }
}
