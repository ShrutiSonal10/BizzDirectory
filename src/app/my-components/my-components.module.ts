import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';  // Import your component

@NgModule({
  declarations: [NavbarComponent],  // Declare the NavbarComponent
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent]  // Export NavbarComponent so it can be used in other modules
})
export class MyComponentsModule { }
