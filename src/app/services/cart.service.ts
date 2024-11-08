import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'restaurant_cart';
  private cartItemsSubject: BehaviorSubject<CartItem[]>;
  public cartItems$: Observable<CartItem[]>;

  constructor() {
    const savedCart = this.getCartFromStorage();
    this.cartItemsSubject = new BehaviorSubject<CartItem[]>(savedCart);
    this.cartItems$ = this.cartItemsSubject.asObservable();
  }

  private getCartFromStorage(): CartItem[] {
    const cartJson = localStorage.getItem(this.CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
  }

  private saveCartToStorage(items: CartItem[]): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
  }

  addToCart(item: CartItem): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItemIndex = currentCart.findIndex(cartItem => 
      cartItem.id === item.id
    );

    if (existingItemIndex > -1) {
      // Item exists, update quantity
      currentCart[existingItemIndex].quantity += 1;
      this.cartItemsSubject.next([...currentCart]);
    } else {
      // New item, add to cart with quantity 1
      const newItem = { ...item, quantity: 1 };
      this.cartItemsSubject.next([...currentCart, newItem]);
    }

    this.saveCartToStorage(this.cartItemsSubject.value);
  }

  removeFromCart(itemId: string): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  updateQuantity(itemId: string, quantity: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  getCartTotal(): Observable<number> {
    return new Observable<number>(observer => {
      this.cartItems$.subscribe(items => {
        const total = items.reduce((sum, item) => 
          sum + (item.price * item.quantity), 0
        );
        observer.next(total);
      });
    });
  }

  getCartCount(): Observable<number> {
    return new Observable<number>(observer => {
      this.cartItems$.subscribe(items => {
        const count = items.reduce((sum, item) => 
          sum + item.quantity, 0
        );
        observer.next(count);
      });
    });
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToStorage([]);
  }
}