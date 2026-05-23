import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { PlotService } from '../core/services/plot.service';
import { Plot } from '../core/models';

@Component({
  selector: 'app-admin-properties',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-white">Manage Properties</h1>
          <div class="flex gap-4">
            <a
              routerLink="/admin/dashboard"
              class="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Back to Dashboard
            </a>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Property
            </button>
          </div>
        </div>

        <div
          class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-xl"
        >
          <table class="w-full">
            <thead>
              <tr class="border-b border-white/10 bg-white/5">
                <th
                  class="text-left py-4 px-6 text-sm font-medium text-blue-200"
                >
                  Image
                </th>
                <th
                  class="text-left py-4 px-6 text-sm font-medium text-blue-200"
                >
                  Property Details
                </th>
                <th
                  class="text-left py-4 px-6 text-sm font-medium text-blue-200"
                >
                  Location
                </th>
                <th
                  class="text-left py-4 px-6 text-sm font-medium text-blue-200"
                >
                  Price
                </th>
                <th
                  class="text-left py-4 px-6 text-sm font-medium text-blue-200"
                >
                  Status
                </th>
                <th
                  class="text-left py-4 px-6 text-sm font-medium text-blue-200"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              @for (plot of plots(); track plot.id) {
                <tr
                  class="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td class="py-4 px-6">
                    <img
                      [src]="
                        plot.imageUrl ||
                        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80'
                      "
                      class="w-16 h-12 object-cover rounded-lg border border-white/10"
                    />
                  </td>
                  <td class="py-4 px-6">
                    <div class="text-white font-medium">
                      {{ plot.plotName }}
                    </div>
                    <div class="text-blue-200/40 text-xs">
                      ID: {{ plot.id.substring(0, 8) }}
                    </div>
                  </td>
                  <td class="py-4 px-6 text-blue-200">
                    {{ plot.address }}, {{ plot.district }}
                  </td>
                  <td class="py-4 px-6 text-white font-semibold">
                    {{ plot.marketValue | currency: 'USD' }}
                  </td>
                  <td class="py-4 px-6">
                    <span
                      [class]="
                        'px-3 py-1 rounded-full text-xs font-medium ' +
                        getStatusClass(plot.status)
                      "
                    >
                      {{ plot.status }}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex gap-2">
                      <button
                        [routerLink]="['/property', plot.id]"
                        title="View Details"
                        class="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <ng-icon name="heroEye" class="w-4 h-4"></ng-icon>
                      </button>

                      @if (plot.status === 'PENDING_APPROVAL') {
                        <button
                          (click)="approvePlot(plot.id)"
                          title="Approve"
                          class="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <ng-icon name="heroCheck" class="w-4 h-4"></ng-icon>
                        </button>
                        <button
                          (click)="rejectPlot(plot.id)"
                          title="Reject"
                          class="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <ng-icon name="heroXMark" class="w-4 h-4"></ng-icon>
                        </button>
                      }

                      <button
                        class="p-2 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors"
                      >
                        <ng-icon name="heroPencil" class="w-4 h-4"></ng-icon>
                      </button>
                      <button
                        (click)="deletePlot(plot.id)"
                        title="Delete"
                        class="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <ng-icon name="heroTrash" class="w-4 h-4"></ng-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              }
              @if (plots().length === 0 && !isLoading) {
                <tr>
                  <td colspan="6" class="py-20 text-center text-blue-200/40">
                    No properties found.
                  </td>
                </tr>
              }
              @if (isLoading) {
                <tr>
                  <td colspan="6" class="py-20 text-center">
                    <div
                      class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"
                    ></div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class AdminPropertiesComponent implements OnInit {
  private plotService = inject(PlotService);
  plots = signal<Plot[]>([]);
  isLoading = true;

  ngOnInit() {
    this.loadPlots();
  }

  loadPlots() {
    this.plotService.getAllPlots().subscribe({
      next: (plots) => {
        this.plots.set(plots);
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  approvePlot(id: string) {
    if (confirm('Are you sure you want to approve this property?')) {
      this.plotService.approvePlot(id).subscribe({
        next: () => this.loadPlots(),
        error: (err) =>
          alert('Failed to approve: ' + (err.error?.message || 'Error')),
      });
    }
  }

  rejectPlot(id: string) {
    const reason = prompt('Reason for rejection:');
    if (reason) {
      this.plotService.rejectPlot(id, reason).subscribe({
        next: () => this.loadPlots(),
        error: (err) =>
          alert('Failed to reject: ' + (err.error?.message || 'Error')),
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED':
      case 'MINTED':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'PENDING_APPROVAL':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      case 'REJECTED':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
    }
  }

  deletePlot(id: string) {
    if (confirm('Are you sure you want to delete this property?')) {
      // Logic for deletion
    }
  }
}
