import { createContext, useContext, useState, useEffect } from "react";
import { getCartItems, addToCart as apiAddToCart } from "@/api/cartApi";
import { useAuth } from "@/context/AuthContext";

interface CartItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice:number;
  productImageUrl: string;
}

interface CartContextType {
  cartItems: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  resetCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // ✅ Fetch cart for logged-in user
  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    const response = await getCartItems(user.id);
    setCartItems(response.data);
  };

  // ✅ Add to cart and update state instantly
  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      await apiAddToCart(user.id, productId, quantity);
      // 🔥 Update frontend state instantly
      const existingItem = cartItems.find(item => item.productId === productId);
      if (existingItem) {
        setCartItems(prev =>
          prev.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        // Fetch new product details or refetch full cart
        await fetchCart();
      }
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  // ✅ Clear cart when user logs out
  const resetCart = () => setCartItems([]);

  // Load cart when user changes
  useEffect(() => {
    if (user) fetchCart();
    else setCartItems([]);
  }, [user]);

  return (
    <CartContext.Provider value={{ cartItems, fetchCart, addToCart, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
