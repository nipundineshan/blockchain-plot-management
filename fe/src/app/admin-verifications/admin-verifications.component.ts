import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { PlotService } from '../core/services/plot.service';
import { Plot } from '../core/models';

@Component({
  selector: 'app-admin-verifications',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-white">Pending Verifications</h1>
          <a
            routerLink="/admin/dashboard"
            class="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Back to Dashboard
          </a>
        </div>

        <div class="grid grid-cols-1 gap-6">
          @for (plot of pendingPlots(); track plot.id) {
            <div
              class="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6 hover:border-blue-500/30 transition-all"
            >
              <div
                class="w-full md:w-64 aspect-video rounded-xl overflow-hidden flex-shrink-0 border border-white/10"
              >
                <img
                  [src]="
                    plot.imageUrl ||
                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'
                  "
                  class="w-full h-full object-cover"
                />
              </div>

              <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                  <h2 class="text-xl font-bold text-white">
                    {{ plot.plotName }}
                  </h2>
                  <span class="text-blue-400 font-bold text-lg">{{
                    plot.marketValue | currency: 'USD'
                  }}</span>
                </div>

                <p
                  class="text-blue-200/60 text-sm mb-4 flex items-center gap-1"
                >
                  <ng-icon name="heroMapPin" class="w-4 h-4"></ng-icon>
                  {{ plot.address }}, {{ plot.district }}
                </p>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p
                      class="text-[10px] uppercase tracking-wider text-blue-200/40 mb-1"
                    >
                      Area Size
                    </p>
                    <p class="text-white font-semibold">
                      {{ plot.areaSize }} sq ft
                    </p>
                  </div>
                  <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p
                      class="text-[10px] uppercase tracking-wider text-blue-200/40 mb-1"
                    >
                      Owner ID
                    </p>
                    <p class="text-white font-semibold truncate">
                      {{ plot.owner.id.substring(0, 8) }}
                    </p>
                  </div>
                  <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p
                      class="text-[10px] uppercase tracking-wider text-blue-200/40 mb-1"
                    >
                      Submitted
                    </p>
                    <p class="text-white font-semibold">
                      {{ plot.createdAt | date: 'shortDate' }}
                    </p>
                  </div>
                  <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p
                      class="text-[10px] uppercase tracking-wider text-blue-200/40 mb-1"
                    >
                      Documents
                    </p>
                    <p
                      class="text-blue-300 font-semibold flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      View Files
                      <ng-icon
                        name="heroArrowTopRightOnSquare"
                        class="w-3 h-3"
                      ></ng-icon>
                    </p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <button
                    (click)="approve(plot.id)"
                    class="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-600/20"
                  >
                    Approve Property
                  </button>
                  <button
                    (click)="reject(plot.id)"
                    class="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20"
                  >
                    Reject
                  </button>
                  <button
                    [routerLink]="['/property', plot.id]"
                    class="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all"
                  >
                    Full Details
                  </button>
                </div>
              </div>
            </div>
          }

          @if (pendingPlots().length === 0 && !isLoading) {
            <div
              class="py-20 text-center bg-white/5 rounded-2xl border border-white/10"
            >
              <div
                class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <ng-icon
                  name="heroCheck"
                  class="w-10 h-10 text-green-400"
                ></ng-icon>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Queue is Empty</h3>
              <p class="text-blue-200/60 text-sm">
                No properties are currently awaiting verification.
              </p>
            </div>
          }

          @if (isLoading) {
            <div class="py-20 text-center">
              <div
                class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"
              ></div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class AdminVerificationsComponent implements OnInit {
  private plotService = inject(PlotService);
  pendingPlots = signal<Plot[]>([]);
  isLoading = true;

  ngOnInit() {
    this.loadPendingPlots();
  }

  loadPendingPlots() {
    this.plotService.getAllPlots().subscribe({
      next: (plots) => {
        this.pendingPlots.set(
          plots.filter((p) => p.status === 'PENDING_APPROVAL'),
        );
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  approve(id: string) {
    if (
      confirm(
        'Approve this property registration? This will allow final authority review.',
      )
    ) {
      this.plotService.approvePlot(id).subscribe({
        next: () => this.loadPendingPlots(),
      });
    }
  }

  reject(id: string) {
    const reason = prompt('Reason for rejection:');
    if (reason) {
      this.plotService.rejectPlot(id, reason).subscribe({
        next: () => this.loadPendingPlots(),
      });
    }
  }
}
