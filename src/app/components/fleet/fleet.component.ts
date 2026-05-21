import { Component, signal, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';

interface FleetImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslocoModule],
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent {
  private doc = inject(DOCUMENT);
  protected selectedImage = signal<FleetImage | null>(null);
  
  protected fleetImages = signal<FleetImage[]>([
    { 
      id: 1, 
      src: 'assets/0fe30a13-5774-45e6-8dcf-2522380d3cbf.png', 
      alt: 'Platforma Auto GVA 1',
      title: 'Platforma Auto Principală',
      description: 'Platformă specializată pentru transport autoturisme și SUV-uri'
    },
    { 
      id: 2, 
      src: 'assets/14d9858a-defd-49d3-864e-fe29d82c0a93.png', 
      alt: 'Platforma Auto GVA 2',
      title: 'Platformă Auto Secundară',
      description: 'Ideală pentru transport vehicule comerciale și dubițe'
    },
    { 
      id: 3, 
      src: 'assets/1a36a54a-4837-43e0-bcea-ffa4dbe6f83d.png', 
      alt: 'Platforma Auto GVA 3',
      title: 'Platformă pentru Vehicule de Lux',
      description: 'Echipată special pentru transportul vehiculelor premium'
    },
    { 
      id: 4, 
      src: 'assets/31b18fb6-df9a-4f0c-b6d9-d18c2123c482.png', 
      alt: 'Platforma Auto GVA 4',
      title: 'Platformă Auto Distanțe Lungi',
      description: 'Optimizată pentru transporturi auto pe distanțe mari'
    },
    { 
      id: 5, 
      src: 'assets/39ec1c4c-7caa-4ad4-b62e-a288bffaf469.png', 
      alt: 'Platforma Auto GVA 5',
      title: 'Platformă de Rezervă',
      description: 'Platformă auto de backup pentru continuitate servicii'
    },
    { 
      id: 6, 
      src: 'assets/50b4e409-17ee-4f74-9197-779f9aeada34.png', 
      alt: 'Platforma Auto GVA 6',
      title: 'Transport Auto Express',
      description: 'Specializată pentru transporturi auto urgente și express'
    },
    { 
      id: 7, 
      src: 'assets/55971e37-7033-4e82-9b9a-e8357c849854.png', 
      alt: 'Platforma Auto GVA 7',
      title: 'Platformă Multi-Auto',
      description: 'Adaptată pentru transport multiple vehicule simultan'
    },
    { 
      id: 8, 
      src: 'assets/56f0ffb7-ebb1-48b3-9d24-5a40859ab8d8.png', 
      alt: 'Platforma Auto GVA 8',
      title: 'Platformă Auto Profesională',
      description: 'Optimizată pentru operațiuni auto specializate'
    },
    { 
      id: 9, 
      src: 'assets/81cc21ca-09f9-49d1-a6ac-4cc02de13d03.png', 
      alt: 'Platforma Auto GVA 9',
      title: 'Transport Auto Eficient',
      description: 'Focalizată pe eficiența și siguranța transportului auto'
    }
  ]);

  protected openLightbox(image: FleetImage) {
    this.selectedImage.set(image);
    if (this.doc.body) this.doc.body.style.overflow = 'hidden';
  }

  protected closeLightbox() {
    this.selectedImage.set(null);
    if (this.doc.body) this.doc.body.style.overflow = 'auto';
  }
}
