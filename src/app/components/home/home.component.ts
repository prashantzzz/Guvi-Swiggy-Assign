import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import restaurants from '../../data/restaurants.json';
import { RouterModule } from '@angular/router';

interface Restaurant {
  id: number;
  name: string;
  imageUrl: string;
  discount: string;
  price: number;
  rating: number;
  deliveryTime: string;
  cuisine: string[];
  location: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  allRestaurants: Restaurant[] = restaurants;
  restaurants: Restaurant[] = restaurants;
  activeFilters: Set<string> = new Set();

  constructor() { }

  ngOnInit() {
    this.restaurants = this.allRestaurants;
  }

  applyFilter(filterType: string) {
    if (this.activeFilters.has(filterType)) {
      this.activeFilters.delete(filterType);
    } else {
      this.activeFilters.add(filterType);
    }

    // Reset to all restaurants first
    let filteredRestaurants = [...this.allRestaurants];

    // Apply all active filters
    this.activeFilters.forEach(filter => {
      switch (filter) {
        case 'rating':
          filteredRestaurants = filteredRestaurants.filter(restaurant => 
            restaurant.rating >= 4.0
          );
          break;
        case 'offers':
          filteredRestaurants = filteredRestaurants.filter(restaurant => 
            restaurant.discount && restaurant.discount.includes('OFF')
          );
          break;
        case 'medium-price':
          filteredRestaurants = filteredRestaurants.filter(restaurant => 
            restaurant.price >= 300 && restaurant.price <= 600
          );
          break;
        case 'low-price':
          filteredRestaurants = filteredRestaurants.filter(restaurant => 
            restaurant.price < 300
          );
          break;
      }
    });

    this.restaurants = filteredRestaurants;
  }

  isFilterActive(filterType: string): boolean {
    return this.activeFilters.has(filterType);
  }
}