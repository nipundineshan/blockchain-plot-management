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
                    <label class="text-sm font-medium text-blue-200">Property Title (Plot Name)</label>
                    <input formControlName="plotName" placeholder="e.g. Modern Villa in Downtown" 
                           class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-200">Detailed Description</label>
                    <textarea formControlName="description" rows="4" placeholder="Describe the property features..." 
                              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">Survey Number</label>
                      <input formControlName="surveyNumber" placeholder="SRV-12345" 
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">Registration Number</label>
                      <input formControlName="registrationNumber" placeholder="REG-67890" 
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">Market Value ($)</label>
                      <input type="number" formControlName="marketValue" 
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">Area Size (sqft)</label>
                      <input formControlName="areaSize" placeholder="e.g. 2400"
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-200">Full Address</label>
                    <input formControlName="address" placeholder="123 Street Name, Area" 
                           class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">District</label>
                      <input formControlName="district" placeholder="District Name" 
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">State</label>
                      <input formControlName="state" placeholder="State Name" 
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                  </div>

                   <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-blue-200">Country</label>
                      <input formControlName="country" placeholder="Country Name" 
                             class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    </div>
                    <div class="space-y-2">
                      <!-- Placeholders for lat/lng -->
                      <label class="text-sm font-medium text-blue-200">Coordinates (Auto-set)</label>
                      <div class="flex gap-2">
                         <input type="number" formControlName="latitude" placeholder="Lat" class="w-1/2 px-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs">
                         <input type="number" formControlName="longitude" placeholder="Lng" class="w-1/2 px-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="space-y-4 pt-6">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">2</span>
                    <h3 class="text-xl font-bold text-white">Media & Documents</h3>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-200">Property Images</label>
                    <div (click)="imageInput.click()" class="p-6 border-2 border-dashed border-white/10 rounded-2xl text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <input #imageInput type="file" (change)="onFileChange($event, 'images')" multiple accept="image/*" class="hidden">
                      <ng-icon name="heroPhoto" class="w-10 h-10 text-blue-400 mb-2 group-hover:scale-110 transition-transform"></ng-icon>
                      <p class="text-white text-sm">Click to upload property images</p>
                      <p class="text-blue-200/40 text-[10px] mt-1">Select one or more photos</p>
                    </div>
                    <!-- Image Previews -->
                    <div class="flex flex-wrap gap-2 mt-2">
                       @for (preview of imagePreviews(); track $index) {
                         <div class="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                            <img [src]="preview" class="w-full h-full object-cover">
                         </div>
                       }
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-200">Legal Documents</label>
                    <div (click)="docInput.click()" class="p-6 border-2 border-dashed border-white/10 rounded-2xl text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <input #docInput type="file" (change)="onFileChange($event, 'docs')" multiple accept=".pdf,.doc,.docx" class="hidden">
                      <ng-icon name="heroCloudArrowUp" class="w-10 h-10 text-blue-400 mb-2 group-hover:scale-110 transition-transform"></ng-icon>
                      <p class="text-white text-sm">Click to upload legal documents</p>
                      <p class="text-blue-200/40 text-[10px] mt-1">PDF, DOCX accepted (Max 10MB)</p>
                    </div>
                    <!-- Doc List -->
                     <ul class="mt-2 space-y-1">
                        @for (doc of selectedDocs(); track $index) {
                          <li class="text-xs text-blue-200/60 flex items-center gap-2">
                             <ng-icon name="heroDocumentText" class="w-4 h-4"></ng-icon>
                             {{doc.name}}
                          </li>
                        }
                     </ul>
                  </div>
                </div>

                <div class="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3">
                  <ng-icon name="heroInformationCircle" class="w-6 h-6 text-blue-400 flex-shrink-0"></ng-icon>
                  <p class="text-blue-200/80 text-xs leading-relaxed">
                    By submitting, you certify that all information and documents provided are legally authentic. Your plot will undergo a multi-stage verification process.
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
                  Ensure survey number is accurate.
                </li>
                <li class="flex gap-2">
                  <span class="text-blue-400">•</span>
                  High-quality images increase trust.
                </li>
                <li class="flex gap-2">
                  <span class="text-blue-400">•</span>
                  Registration number is required.
                </li>
                <li class="flex gap-2">
                  <span class="text-blue-400">•</span>
                  Review takes 24-72 hours.
                </li>
              </ul>
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

  selectedImages = signal<File[]>([]);
  selectedDocs = signal<File[]>([]);
  imagePreviews = signal<string[]>([]);

  constructor() {
    this.plotForm = this.fb.group({
      plotName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      surveyNumber: ['', [Validators.required]],
      areaSize: ['', [Validators.required]],
      latitude: [0, [Validators.required]],
      longitude: [0, [Validators.required]],
      address: ['', [Validators.required]],
      district: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      marketValue: [null, [Validators.required, Validators.min(1)]],
      registrationNumber: ['', [Validators.required]]
    });
  }

  onFileChange(event: any, type: 'images' | 'docs') {
    const files = event.target.files;
    if (files.length > 0) {
      if (type === 'images') {
        this.selectedImages.set(Array.from(files));
        this.generateImagePreviews();
      } else {
        this.selectedDocs.set(Array.from(files));
      }
    }
  }

  generateImagePreviews() {
    const previews: string[] = [];
    const images = this.selectedImages();
    if (images.length === 0) {
      this.imagePreviews.set([]);
      return;
    }
    
    images.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        previews.push(e.target.result);
        if (previews.length === images.length) {
          this.imagePreviews.set(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  onSubmit() {
    if (this.plotForm.valid) {
      this.isLoading = true;
      
      const formData = new FormData();
      
      // Append text fields
      Object.keys(this.plotForm.controls).forEach(key => {
        formData.append(key, this.plotForm.get(key)?.value);
      });

      // Append files
      this.selectedImages().forEach(file => {
        formData.append('propertyImages', file);
      });

      this.selectedDocs().forEach(file => {
        formData.append('legalDocuments', file);
      });

      this.plotService.createPlot(formData).subscribe({
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
