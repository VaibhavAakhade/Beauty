import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
import { getCartItems, addToCart as apiAddToCart } from "@/api/cartApi";
import { useAuth } from "@/context/AuthContext";
const CartContext = createContext(undefined);
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
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
    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            alert("Please login first!");
            return;
        }
        try {
            await apiAddToCart(user.id, productId, quantity);
            // 🔥 Update frontend state instantly
            const existingItem = cartItems.find(item => item.productId === productId);
            if (existingItem) {
                setCartItems(prev => prev.map(item => item.productId === productId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item));
            }
            else {
                // Fetch new product details or refetch full cart
                await fetchCart();
            }
        }
        catch (err) {
            console.error("Failed to add to cart", err);
        }
    };
    // ✅ Clear cart when user logs out
    const resetCart = () => setCartItems([]);
    // Load cart when user changes
    useEffect(() => {
        if (user)
            fetchCart();
        else
            setCartItems([]);
    }, [user]);
    return (_jsx(CartContext.Provider, { value: { cartItems, fetchCart, addToCart, resetCart }, children: children }));
};
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context)
        throw new Error("useCart must be used within CartProvider");
    return context;
};
