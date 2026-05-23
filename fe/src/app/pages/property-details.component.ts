import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

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
  readonly Bed = 'heroHome'; // Placeholder for Bed
  readonly Bath = 'heroSparkles'; // Placeholder for Bath
  readonly Calendar = 'heroCalendar';
  readonly Shield = 'heroShieldCheck';
  readonly FileText = 'heroDocumentText';
  readonly ChevronLeft = 'heroChevronLeft';

  property: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // In a real application, you would fetch property details based on the id
      this.property = {
        id: id,
        title: "Modern Villa",
        location: "123 Downtown District, Metro City",
        price: 450000,
        area: "3,200 sq ft",
        bedrooms: 4,
        bathrooms: 3,
        yearBuilt: 2022,
        type: "Residential",
        status: "verified",
        image: "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        description: "Beautiful modern villa featuring contemporary architecture with spacious living areas, high ceilings, and premium finishes throughout. This property includes a landscaped garden, private parking, and smart home features.",
        features: [
          "Central Air Conditioning",
          "Smart Home System",
          "Private Garden",
          "2-Car Garage",
          "Security System",
          "High-Speed Internet",
          "Solar Panels",
          "Modern Kitchen"
        ],
        documents: [
          { name: "Property Title Deed", status: "verified", date: "2024-01-15" },
          { name: "Land Survey Report", status: "verified", date: "2024-01-20" },
          { name: "Building Inspection", status: "verified", date: "2024-02-01" },
          { name: "Tax Assessment", status: "pending", date: "2024-02-10" }
        ],
        blockchain: {
          transactionId: "0x7a8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
          blockNumber: "15234567",
          timestamp: "2024-02-15 14:30:00",
          verified: true
        }
      };
    });
  }

  formatPrice(price: number): string {
    return price.toLocaleString();
  }
}
