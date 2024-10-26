import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-startup-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './startup-carousel.component.html',
  styleUrls: ['./startup-carousel.component.css']
})
export class StartupCarouselComponent implements OnInit {
  startX = 0;
  currentTranslate = 0;
  prevTranslate = 0;
  dragging = false; 

  @Output() startupSelected = new EventEmitter<number>(); // Output property to emit the selected startup ID
  
  startups: any[] = [];  // Will store the fetched startups data

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStartups();
  }

  fetchStartups() {
    // Use the correct backend API URL
    this.http.get<any[]>('http://localhost:5000/api/startups').subscribe(
      data => {
        this.startups = data;  // Successfully assign fetched data to startups array
      },
      error => {
        console.error('Error fetching startups:', error);  // Log any potential errors
      }
    );
  }
  

  onMouseDown(event: MouseEvent) {
    this.startX = event.clientX;
    this.dragging = true;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;

    const currentX = event.clientX;
    const moveBy = currentX - this.startX;

    this.currentTranslate = this.prevTranslate + moveBy;
  }
   // Method to handle startup selection
   selectStartup(startupId: number) {
    this.startupSelected.emit(startupId); // Emit the selected startup ID
  }

  onMouseUp() {
    const maxTranslate = -(this.startups.length - 1) * window.innerWidth;
    if (this.currentTranslate > 0) {
      this.currentTranslate = 0;
    } else if (this.currentTranslate < maxTranslate) {
      this.currentTranslate = maxTranslate;
    }

    this.prevTranslate = this.currentTranslate;
    this.dragging = false;
  }

  onKeyDown(event: KeyboardEvent) {
    const maxTranslate = -(this.startups.length - 1) * window.innerWidth;

    if (event.key === 'ArrowLeft') {
      this.currentTranslate = Math.min(0, this.currentTranslate + window.innerWidth);
    }
    if (event.key === 'ArrowRight') {
      this.currentTranslate = Math.max(maxTranslate, this.currentTranslate - window.innerWidth);
    }

    this.prevTranslate = this.currentTranslate;
  }
}
