import { Component, OnInit} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  selectedLocation: string | null = null;
  cartCount: number = 0;

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
}
