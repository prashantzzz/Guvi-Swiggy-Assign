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
      LoginSidebarComponent
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
  })
  export class HeaderComponent implements OnInit {
    isDropdownOpen = false;
    selectedLocation: string | null = null;
    cartCount: number = 0;
    isLoginOpen: boolean = false;
    isLoggedIn: boolean = false;
    loggedInUserName: string = '';
    isMobileMenuOpen = false;
  
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
      this.cartService.getCartCount().subscribe(count => {
        this.cartCount = count;
      });
    }

    handleLogin(userName: string) {
      this.isLoggedIn = true;
      this.loggedInUserName = userName;
      this.isLoginOpen = false;
    }

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }

    selectLocation(location: string) {
      this.selectedLocation = location;
      this.isDropdownOpen = false;
    }

    openLogin() {
      this.isLoginOpen = true;
    }

    closeLogin() {
      this.isLoginOpen = false;
    }

    logout() {
      this.isLoggedIn = false;
      this.loggedInUserName = '';
      alert('You have been logged out');
    }
  }