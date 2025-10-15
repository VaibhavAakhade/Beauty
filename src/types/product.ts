// Based on com.codeyugdemons.beautyecommerce.domain.product.Product
export interface Product {
    id: number;
    sku: string;
    totalUnits: number;
    productName: string;
    description: string;
    price: number;
    isActive: string; // Assuming Status enum maps to these strings
    imageUrl: string;
    category: string; // Assuming Categories enum maps to these
    rating: number | null;
    tag: string | null; // Assuming Tags enum maps to these
    listingTime: string; // ISO 8601 string for Instant
}
  
  export interface CartItem extends Product {
    quantity: number;
  }