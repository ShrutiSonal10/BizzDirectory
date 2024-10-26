import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StartupDescriptionComponent } from './my-components/startup-description/startup-description.component'; // Import your new component
import { NavbarComponent } from './my-components/navbar/navbar.component'; // Import the standalone NavbarComponent
import { StartupCarouselComponent } from './my-components/startup-carousel/startup-carousel.component'; // Import StartupCarouselComponent
import { BusinessImagesComponent } from './my-components/business-images/business-images.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    BusinessImagesComponent,
    NavbarComponent,
    StartupDescriptionComponent,
    StartupCarouselComponent,
    CommonModule // Add CommonModule for Angular directives like *ngIf and *ngFor
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Use 'styleUrls' (plural)
})
export class AppComponent implements OnInit {
  startups: any[] = []; // Array to hold startups
  selectedStartupId: number | null = null; // Variable to hold selected startup ID
  selectedStartupName: string | null = null; // Variable to hold selected startup name

  private apiUrl = 'http://localhost:5000/api/startups'; // Replace with your backend API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStartups(); // Load startups when component initializes
  }

  // Load the startups from the backend
  loadStartups(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        if (data.length > 0) {
          this.startups = [data[0]]; // Use only the first startup from the array
        }
      },
      (error) => {
        console.error('Error fetching startups', error); // Handle any errors
      }
    );
  }

  // Handle startup selection from the carousel
  onStartupSelected(startupId: number): void {
    this.selectedStartupId = startupId; // Set the selected startup ID
    console.log('Selected Startup ID:', this.selectedStartupId);
    // Additional logic can go here, e.g., fetching images for the selected startup
  }
}
