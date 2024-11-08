import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginSidebarComponent } from '../loginsidebar/loginsidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LoginSidebarComponent  // Make sure LoginSidebarComponent is also standalone
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  selectedLocation: string | null = null;
  cartCount: number = 0;
  isLoginOpen = false;  // Add this for login sidebar control

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart count changes
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.isDropdownOpen = false; // Close the dropdown after selection
  }

  // Add these methods for login sidebar
  openLogin() {
    this.isLoginOpen = true;
  }

  closeLogin() {
    this.isLoginOpen = false;
  }
}