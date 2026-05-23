import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-my-documents',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-6">
      <div class="container mx-auto max-w-5xl">
        
        <div class="flex items-center gap-4 mb-8">
          <a routerLink="/user/dashboard" class="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
            <ng-icon name="heroArrowLeft" class="w-6 h-6"></ng-icon>
          </a>
          <h1 class="text-3xl font-bold text-white">My Documents</h1>
        </div>

        <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-xl">
          <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h3 class="text-white font-semibold">Verified Legal Files</h3>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Upload New</button>
          </div>

          <div class="p-6 space-y-4">
            @for (doc of documents(); track doc.id) {
              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all group">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                    <ng-icon name="heroDocumentText" class="w-6 h-6"></ng-icon>
                  </div>
                  <div>
                    <h4 class="text-white font-medium">{{doc.name}}</h4>
                    <p class="text-blue-200/40 text-xs">Uploaded: {{doc.date | date}} • {{doc.size}}</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {{doc.status}}
                  </span>
                  <button class="p-2 text-blue-200/60 hover:text-white transition-colors">
                    <ng-icon name="heroArrowDownTray" class="w-5 h-5"></ng-icon>
                  </button>
                </div>
              </div>
            }

            @if (documents().length === 0) {
              <div class="py-20 text-center">
                 <ng-icon name="heroDocumentDuplicate" class="w-16 h-16 text-blue-200/20 mb-4"></ng-icon>
                 <p class="text-blue-200/40">No documents uploaded yet.</p>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `
})
export class MyDocumentsComponent implements OnInit {
  documents = signal<any[]>([]);

  ngOnInit() {
    // Mock data
    this.documents.set([
      { id: 1, name: 'Property_Deed_A102.pdf', date: new Date(), size: '2.4 MB', status: 'VERIFIED' },
      { id: 2, name: 'ID_Proof_Passport.jpg', date: new Date(), size: '1.1 MB', status: 'VERIFIED' },
      { id: 3, name: 'Tax_Clearance_2023.pdf', date: new Date(), size: '850 KB', status: 'PENDING' }
    ]);
  }
}
