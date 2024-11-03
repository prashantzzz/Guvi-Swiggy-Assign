import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = environment.apiUrl;
  private favorites = new BehaviorSubject<Restaurant[]>([]);
  private storageKey = 'favorite_restaurants';

  constructor(private http: HttpClient) {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem(this.storageKey);
    if (savedFavorites) {
      this.favorites.next(JSON.parse(savedFavorites));
    }
  }

  getFavorites(): Observable<Restaurant[]> {
    return this.favorites.asObservable();
  }

  addToFavorites(restaurant: Restaurant): void {
    const currentFavorites = this.favorites.value;
    if (!currentFavorites.find(r => r.id === restaurant.id)) {
      this.favorites.next([...currentFavorites, restaurant]);
      this.saveToStorage();
    }
  }

  removeFromFavorites(restaurantId: number): void {
    const currentFavorites = this.favorites.value;
    this.favorites.next(currentFavorites.filter(r => r.id !== restaurantId));
    this.saveToStorage();
  }

  isFavorite(restaurantId: number): boolean {
    return this.favorites.value.some(r => r.id === restaurantId);
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites.value));
  }
}