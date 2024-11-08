import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import fusionloungemenu from '../../data/fusionloungemenu.json';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { CartService } from '../../services/cart.service';
import { MenuCategory, MenuItem, CartItem } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-biryani',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './biryani.component.html',
  styleUrl: './biryani.component.css'
})
export class BiryaniComponent implements OnInit {
  activeSection: string | null = null;
  fusionloungemenu: MenuCategory[] = fusionloungemenu;
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  toggleSection(section: string): void {
    this.activeSection = this.activeSection === section ? null : section;
  }

  getIconSrc(isVeg: boolean) {
    return isVeg ? 'assets/veg.png' : 'assets/nonveg.png';
  }

  addToCart(item: MenuItem): void {
    const cartItem: CartItem = {
      ...item,
      quantity: 1
    };
    this.cartService.addToCart(cartItem);
  }
}