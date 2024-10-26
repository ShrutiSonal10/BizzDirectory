import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-business-images',
  standalone: true,
  imports: [HttpClientModule, CommonModule], // Import HttpClientModule here
  templateUrl: './business-images.component.html',
  styleUrls: ['./business-images.component.css']
})
export class BusinessImagesComponent implements OnInit, OnChanges {
  @Input() startupId!: number; // Ensure startupId is defined as an input property
  businessImages: any[] = [];

  private apiUrl = 'http://localhost:5000/api/business_images';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.startupId) {
      this.fetchBusinessImages(this.startupId);
    }
  }

  ngOnChanges(): void {
    if (this.startupId) {
      this.fetchBusinessImages(this.startupId);
    }
  }

  fetchBusinessImages(startupId: number): void {
    this.http.get<any[]>(`${this.apiUrl}/${startupId}`).subscribe(
      (data) => {
        this.businessImages = data; // Load fetched business images
      },
      (error) => {
        console.error('Error fetching business images', error);
      }
    );
  }
}
