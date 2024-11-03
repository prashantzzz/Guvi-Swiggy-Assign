import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'restaurants', 
    component: RestaurantListComponent 
  },
  { 
    path: 'restaurant/:id', 
    component: RestaurantDetailComponent 
  },
  { 
    path: 'favorites', 
    component: FavoritesComponent,
    canActivate: [AuthGuard]  // Protected route
  },
  { 
    path: 'cart', 
    component: CartComponent 
  },
  { 
    path: 'auth', 
    component: AuthComponent 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
