import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/menu.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartTotal$ = this.cartService.getCartTotal();
  }

  ngOnInit(): void {}

  getIconSrc(isVeg: boolean): string {
    return isVeg ? 'assets/veg.png' : 'assets/nonveg.png';
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    } else {
      this.cartService.removeFromCart(item.id);
    }
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }
}
