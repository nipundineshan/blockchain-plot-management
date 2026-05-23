import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { PlotService } from '../core/services/plot.service';

@Component({
  selector: 'app-register-plot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto max-w-4xl">
        <!-- Header -->
        <div class="flex items-center gap-4 mb-8">
          <a routerLink="/user/dashboard" class="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
            <ng-icon name="heroArrowLeft" class="w-6 h-6"></ng-icon>
          </a>
          <div>
            <h1 class="text-3xl font-bold text-white">Register New Property</h1>
            <p class="text-blue-200/60">Submit your plot details for blockchain verification and NFT minting.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Form Section -->
          <div class="lg:col-span-2">
            <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 shadow-xl">
              <form [formGroup]="plotForm" (ngSubmit)="onSubmit()" class="space-y-6">
                
                <div class="space-y-4">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">1</span>
                    <h3 class="text-xl font-bold text-white">Property Information</h3>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-200">Property Title</label>
                    <input formControlName="title" placeholder="e.g. Modern Villa in Downtown" 
                           class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-200">Detailed Description</label>
                    <textarea formControlName="description" rows="4" placeholder="Describe the property features..." 
                              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">Location / City</label>
                      <input formControlName="location" placeholder="City Name" 
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">District / Area</label>
                      <input formControlName="district" placeholder="Area Name" 
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">Price ($)</label>
                      <input type="number" formControlName="price" 
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">Area Size (sqft)</label>
                      <input type="number" formControlName="areaSize" 
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                  </div>
                </div>

                <div class="space-y-4 pt-6">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">2</span>
                    <h3 class="text-xl font-bold text-white">Media & Documents</h3>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-200">Property Image URL</label>
                    <input formControlName="imageUrl" placeholder="https://images.unsplash.com/..." 
                           class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  </div>

                  <div class="p-8 border-2 border-dashed border-white/10 rounded-2xl text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <ng-icon name="heroCloudArrowUp" class="w-12 h-12 text-blue-400 mb-2 group-hover:scale-110 transition-transform"></ng-icon>
                    <p class="text-white font-medium">Upload Legal Documents</p>
                    <p class="text-blue-200/40 text-xs mt-1">Property deeds, tax receipts, or ID (Max 10MB)</p>
                  </div>
                </div>

                <div class="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3">
                  <ng-icon name="heroInformationCircle" class="w-6 h-6 text-blue-400 flex-shrink-0"></ng-icon>
                  <p class="text-blue-200/80 text-xs leading-relaxed">
                    By submitting, you certify that all information and documents provided are legally authentic. Your plot will undergo a multi-stage verification process by our administrators.
                  </p>
                </div>

                <button type="submit" [disabled]="plotForm.invalid || isLoading" 
                        class="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2">
                  <span *ngIf="!isLoading">Submit Property for Verification</span>
                  <div *ngIf="isLoading" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </button>

              </form>
            </div>
          </div>

          <!-- Sidebar Tips -->
          <div class="space-y-6">
            <div class="backdrop-blur-lg bg-blue-600/20 rounded-2xl border border-blue-500/20 p-6 shadow-xl text-white">
              <h4 class="font-bold flex items-center gap-2 mb-4">
                <ng-icon name="heroSparkles" class="w-5 h-5 text-yellow-400"></ng-icon>
                Quick Tips
              </h4>
              <ul class="space-y-3 text-sm text-blue-100/80">
                <li class="flex gap-2">
                  <span class="text-blue-400">•</span>
                  Ensure title matches legal records exactly.
                </li>
                <li class="flex gap-2">
                  <span class="text-blue-400">•</span>
                  High-quality images increase trust.
                </li>
                <li class="flex gap-2">
                  <span class="text-blue-400">•</span>
                  Include accurate area size.
                </li>
                <li class="flex gap-2">
                  <span class="text-blue-400">•</span>
                  Review takes 24-72 hours.
                </li>
              </ul>
            </div>

            <div *ngIf="plotForm.get('imageUrl')?.value" class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-xl">
              <div class="p-4 border-b border-white/10">
                <h4 class="text-white font-bold text-sm">Media Preview</h4>
              </div>
              <img [src]="plotForm.get('imageUrl')?.value" class="w-full h-48 object-cover">
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterPlotComponent {
  private fb = inject(FormBuilder);
  private plotService = inject(PlotService);
  private router = inject(Router);

  plotForm: FormGroup;
  isLoading = false;

  constructor() {
    this.plotForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      district: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
      areaSize: [null, [Validators.required, Validators.min(1)]],
      imageUrl: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.plotForm.valid) {
      this.isLoading = true;
      this.plotService.createPlot(this.plotForm.value).subscribe({
        next: () => {
          alert('Property submitted successfully!');
          this.router.navigate(['/user/dashboard']);
        },
        error: (err) => {
          alert('Failed to submit: ' + (err.error?.message || 'Unknown error'));
          this.isLoading = false;
        }
      });
    }
  }
}
