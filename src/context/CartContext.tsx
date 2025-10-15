// src/context/CartContext.tsx

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Product, CartItem } from '../types/product'; // Assuming you put types in a file

// 1. Define the Context Shape (what components consume)
interface CartContextType {
  cart: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// 2. Create the Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Create the Provider Component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Core Logic: Add Item to Cart
  const addItem = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        // Update quantity if item exists
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Core Logic: Remove Item from Cart
  const removeItem = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Core Logic: Update Item Quantity
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Memoized function for total items count
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  // Memoized function for total cart price
  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);


  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    cart,
    addItem,
    removeItem,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  }), [cart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// 4. Custom Hook for easy consumption
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};