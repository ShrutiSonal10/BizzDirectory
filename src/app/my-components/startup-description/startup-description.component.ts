import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-startup-description',
  templateUrl: './startup-description.component.html',
  styleUrls: ['./startup-description.component.css'],
  standalone: true,
  imports:[HttpClientModule],
})
export class StartupDescriptionComponent implements OnInit {
  startupName: string = 'Loading...';
  startupDescription: string = 'Loading...';
  backgroundImage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getStartupDetails();
  }

  getStartupDetails() {
    this.http.get<any>('http://localhost:5000/api/random-startup')  // Adjust endpoint if necessary
      .subscribe(
        response => {
          this.startupName = response.startupName;  // Assuming response contains the name
          this.backgroundImage = response.backgroundImage;
          this.startupDescription = response.startupDescription; // Adjust based on actual response structure
           // Get the image URL
        },
        error => {
          console.error('Error fetching startup details', error);
          this.startupName = 'Default Startup';
          this.startupDescription = 'Default description.';
        }
      );
  }
}
