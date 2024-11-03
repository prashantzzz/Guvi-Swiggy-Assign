export interface Restaurant {
    id: number;
    name: string;
    cuisine: string;
    location: string;
    rating: number;
    imageUrl: string;
    menuItems: MenuItem[];
  }