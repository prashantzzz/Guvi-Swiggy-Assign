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
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  handleLogin() {
    //any additional logic here, such as setting a logged-in state
    console.log('Login successful!');
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.isDropdownOpen = false; // Close the dropdown after selection
  }

  openLogin() {
    this.isLoginOpen = true;
  }

  closeLogin() {
    this.isLoginOpen = false;
  }
}