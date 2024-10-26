import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule for the provider

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,  // Standalone component
  imports: [HttpClientModule],  // Add HttpClientModule here
})
export class NavbarComponent implements OnInit {
  appName: string = '';
  backgroundImage: string = ''; // Add backgroundImage property

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getStartupName();
    // this.applyRandomColors(); // Call to apply random colors
  }

  getStartupName() {
    this.http.get<any>('http://localhost:5000/api/random-startup')
      .subscribe(
        response => {
          this.appName = response.startupName;
          this.backgroundImage = response.backgroundImage;
        },
        error => {
          console.log('Error fetching startup name', error);
          this.appName = 'DefaultStartup';
        }
      );
  }

  // // Function to generate a random color
  // getRandomColor(): string {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  // // Function to apply random colors to startup names
  // applyRandomColors() {
  //   const startupNames = document.querySelectorAll('.navbar-startup-name');
  //   startupNames.forEach(name => {
  //     const element = name as HTMLElement; // Cast name to HTMLElement
  //     element.style.color = this.getRandomColor(); // Apply random color
  //   });
  }

