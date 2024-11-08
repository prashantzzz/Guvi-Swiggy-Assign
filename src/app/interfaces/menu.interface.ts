export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    isVeg: boolean;
    rating: number;
    ratingCount: number;
    quantity?: number;
}

export interface MenuCategory {
    category: string;
    items: MenuItem[];
}

export interface CartItem extends MenuItem {
    quantity: number;
}