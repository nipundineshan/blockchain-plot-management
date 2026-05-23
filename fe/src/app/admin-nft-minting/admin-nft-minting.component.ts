import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { PlotService } from '../core/services/plot.service';
import { NftService } from '../core/services/nft.service';
import { Plot } from '../core/models';

@Component({
  selector: 'app-admin-nft-minting',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-white">NFT Minting Center</h1>
            <p class="text-blue-200 mt-2">
              Convert approved property records into secure Digital NFTs
            </p>
          </div>
          <div class="flex gap-4">
            <a
              routerLink="/admin/dashboard"
              class="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <ng-icon name="heroCube" class="w-4 h-4"></ng-icon>
              Back to Dashboard
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            class="backdrop-blur-lg bg-blue-600/10 rounded-2xl border border-blue-500/20 p-6 shadow-xl"
          >
            <div class="flex items-center gap-4 mb-2">
              <div class="p-3 bg-blue-500/20 rounded-xl">
                <ng-icon
                  name="heroCheck"
                  class="w-6 h-6 text-blue-400"
                ></ng-icon>
              </div>
              <h3 class="text-white font-semibold">Approved Plots</h3>
            </div>
            <p class="text-3xl font-bold text-white">
              {{ approvedPlots().length }}
            </p>
            <p class="text-sm text-blue-200/60 mt-1">Ready for minting</p>
          </div>

          <div
            class="backdrop-blur-lg bg-green-600/10 rounded-2xl border border-green-500/20 p-6 shadow-xl"
          >
            <div class="flex items-center gap-4 mb-2">
              <div class="p-3 bg-green-500/20 rounded-xl">
                <ng-icon
                  name="heroCpuChip"
                  class="w-6 h-6 text-green-400"
                ></ng-icon>
              </div>
              <h3 class="text-white font-semibold">Minted NFTs</h3>
            </div>
            <p class="text-3xl font-bold text-white">{{ mintedCount() }}</p>
            <p class="text-sm text-green-200/60 mt-1">On blockchain</p>
          </div>

          <div
            class="backdrop-blur-lg bg-purple-600/10 rounded-2xl border border-purple-500/20 p-6 shadow-xl"
          >
            <div class="flex items-center gap-4 mb-2">
              <div class="p-3 bg-purple-500/20 rounded-xl">
                <ng-icon
                  name="heroSquare2Stack"
                  class="w-6 h-6 text-purple-400"
                ></ng-icon>
              </div>
              <h3 class="text-white font-semibold">Total Assets</h3>
            </div>
            <p class="text-3xl font-bold text-white">{{ plots().length }}</p>
            <p class="text-sm text-purple-200/60 mt-1">Total managed plots</p>
          </div>
        </div>

        <div
          class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-xl"
        >
          <div
            class="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center"
          >
            <h2 class="text-xl font-semibold text-white">Pending Minting</h2>
            <div class="flex gap-2">
              <button
                (click)="loadPlots()"
                class="p-2 bg-white/5 text-blue-200 rounded-lg hover:bg-white/10 transition-colors"
              >
                Refresh List
              </button>
            </div>
          </div>

          <table class="w-full text-left">
            <thead>
              <tr class="bg-white/5 border-b border-white/10">
                <th class="py-4 px-6 text-sm font-medium text-blue-200">
                  Property
                </th>
                <th class="py-4 px-6 text-sm font-medium text-blue-200">
                  Owner Wallet
                </th>
                <th class="py-4 px-6 text-sm font-medium text-blue-200">
                  Status
                </th>
                <th class="py-4 px-6 text-sm font-medium text-blue-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              @for (plot of approvedPlots(); track plot.id) {
                <tr
                  class="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-4">
                      <img
                        [src]="
                          plot.imageUrl ||
                          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80'
                        "
                        class="w-12 h-12 object-cover rounded-lg border border-white/10"
                      />
                      <div>
                        <div class="text-white font-medium">
                          {{ plot.plotName }}
                        </div>
                        <div class="text-blue-200/40 text-xs">
                          {{ plot.address }}, {{ plot.district }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6">
                    <code
                      class="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded"
                    >
                      {{ plot.owner.walletAddress?.substring(0, 16) }}...
                    </code>
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30"
                    >
                      {{ plot.status }}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <button
                      (click)="mintNft(plot.id)"
                      [disabled]="isMinting[plot.id]"
                      class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      @if (isMinting[plot.id]) {
                        <div
                          class="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"
                        ></div>
                        <span>Minting...</span>
                      } @else {
                        <ng-icon
                          name="heroCpuChip"
                          class="w-4 h-4 group-hover:scale-110 transition-transform"
                        ></ng-icon>
                        <span>Mint NFT</span>
                      }
                    </button>
                  </td>
                </tr>
              }
              @if (approvedPlots().length === 0 && !isLoading) {
                <tr>
                  <td colspan="4" class="py-20 text-center text-blue-200/40">
                    <div class="flex flex-col items-center gap-2">
                      <ng-icon
                        name="heroCube"
                        class="w-12 h-12 opacity-20"
                      ></ng-icon>
                      <p>No approved properties waiting to be minted.</p>
                    </div>
                  </td>
                </tr>
              }
              @if (isLoading) {
                <tr>
                  <td colspan="4" class="py-20 text-center">
                    <div
                      class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"
                    ></div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Recently Minted Section -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold text-white mb-6">
            Recently Minted NFTs
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (plot of mintedPlots(); track plot.id) {
              <div
                class="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all group"
              >
                <div class="relative aspect-video">
                  <img
                    [src]="plot.imageUrl"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"
                  ></div>
                  <div
                    class="absolute bottom-3 left-3 right-3 flex justify-between items-center"
                  >
                    <span
                      class="px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded uppercase"
                      >Minted</span
                    >
                    <span class="text-white font-mono text-xs"
                      >#{{ plot.tokenId || '?' }}</span
                    >
                  </div>
                </div>
                <div class="p-4">
                  <h4 class="text-white font-medium mb-1 truncate">
                    {{ plot.plotName }}
                  </h4>
                  <p class="text-blue-200/60 text-xs mb-4 truncate">
                    {{ plot.address }}
                  </p>
                  <div class="flex flex-col gap-2">
                    <a
                      [href]="
                        'https://sepolia.etherscan.io/tx/' +
                        plot.transactionHash
                      "
                      target="_blank"
                      class="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <ng-icon name="heroCheck" class="w-3 h-3"></ng-icon>
                      View Transaction
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AdminNftMintingComponent implements OnInit {
  private plotService = inject(PlotService);
  private nftService = inject(NftService);

  plots = signal<Plot[]>([]);
  approvedPlots = signal<Plot[]>([]);
  mintedPlots = signal<Plot[]>([]);
  isLoading = true;
  isMinting: { [key: string]: boolean } = {};

  mintedCount = signal(0);

  ngOnInit() {
    this.loadPlots();
  }

  loadPlots() {
    this.isLoading = true;
    this.plotService.getAllPlots().subscribe({
      next: (plots) => {
        this.plots.set(plots);
        this.approvedPlots.set(plots.filter((p) => p.status === 'APPROVED'));
        this.mintedPlots.set(plots.filter((p) => p.status === 'MINTED'));
        this.mintedCount.set(this.mintedPlots().length);
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  mintNft(plotId: string) {
    if (
      !confirm(
        'Are you sure you want to mint this property as an NFT? This will record the property on the blockchain.',
      )
    ) {
      return;
    }

    this.isMinting[plotId] = true;
    this.nftService.mintNft(plotId).subscribe({
      next: (res) => {
        alert(
          'NFT Minted Successfully! Transaction Hash: ' + res.transactionHash,
        );
        delete this.isMinting[plotId];
        this.loadPlots();
      },
      error: (err) => {
        alert('Minting failed: ' + (err.error?.message || 'Unknown error'));
        delete this.isMinting[plotId];
      },
    });
  }
}
