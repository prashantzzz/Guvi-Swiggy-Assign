import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDropdownOpen = false;
  selectedLocation: string | null = null;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.isDropdownOpen = false; // Close the dropdown after selection
  }
}
