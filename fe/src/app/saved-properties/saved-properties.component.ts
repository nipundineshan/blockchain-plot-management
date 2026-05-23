import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-saved-properties',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto max-w-6xl">
        
        <div class="flex items-center gap-4 mb-8">
          <a routerLink="/user/dashboard" class="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
            <ng-icon name="heroArrowLeft" class="w-6 h-6"></ng-icon>
          </a>
          <h1 class="text-3xl font-bold text-white">Saved Properties</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (prop of savedItems(); track prop.id) {
            <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-xl group">
              <div class="relative h-48">
                <img [src]="prop.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <button (click)="unsave(prop.id)" class="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-full backdrop-blur-md">
                   <ng-icon name="heroHeart" class="w-5 h-5"></ng-icon>
                </button>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-2">{{prop.title}}</h3>
                <p class="text-blue-200/60 text-sm mb-4 flex items-center gap-1">
                  <ng-icon name="heroMapPin" class="w-4 h-4"></ng-icon>
                  {{prop.location}}
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-blue-400 font-bold text-xl">{{prop.price | currency:'USD'}}</span>
                  <button [routerLink]="['/property', prop.id]" class="px-4 py-2 bg-white/5 hover:bg-blue-600 text-white rounded-lg border border-white/10 transition-all">
                    View
                  </button>
                </div>
              </div>
            </div>
          }

          @if (savedItems().length === 0) {
            <div class="col-span-full py-20 text-center bg-white/5 rounded-2xl border border-white/10">
              <ng-icon name="heroHeart" class="w-16 h-16 text-blue-200/20 mb-4"></ng-icon>
              <h3 class="text-xl font-bold text-white mb-2">No Saved Properties</h3>
              <p class="text-blue-200/60 mb-6">Properties you heart will appear here.</p>
              <button routerLink="/browse" class="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl">Explore Listings</button>
            </div>
          }
        </div>

      </div>
    </div>
  `
})
export class SavedPropertiesComponent implements OnInit {
  savedItems = signal<any[]>([]);

  ngOnInit() {
    // Mock data
    this.savedItems.set([
      {
        id: '1',
        title: 'Modern Villa',
        location: 'Downtown District',
        price: 450000,
        image: 'https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: '2',
        title: 'Contemporary House',
        location: 'Suburban Area',
        price: 380000,
        image: 'https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?auto=format&fit=crop&w=400&q=80'
      }
    ]);
  }

  unsave(id: string) {
    this.savedItems.set(this.savedItems().filter(item => item.id !== id));
  }
}
