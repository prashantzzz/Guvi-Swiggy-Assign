import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.interface';
import { MenuItem } from '../models/menu-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private storageKey = 'cart_items';

  constructor() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem(this.storageKey);
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addToCart(menuItem: MenuItem): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.menuItem.id === menuItem.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { menuItem, quantity: 1 }]);
    }
    this.saveToStorage();
  }

  removeFromCart(menuItemId: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.menuItem.id !== menuItemId);
    this.cartItems.next(updatedItems);
    this.saveToStorage();
  }

  updateQuantity(menuItemId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.menuItem.id === menuItemId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
      this.saveToStorage();
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem(this.storageKey);
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + (item.menuItem.price * item.quantity),
      0
    );
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems.value));
  }
}