import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import CartItemCard from "@/components/cart/CartItemCard";
import CartSummary from "@/components/cart/CartSummary";
import { getCartItems, clearCart } from "@/api/cartApi";
import { placeOrder } from "@/api/orderApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // ✅ import Auth context
export default function CheckoutPage() {
    const { user } = useAuth();
    const userId = user.id;
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [placing, setPlacing] = useState(false);
    useEffect(() => { loadCart(); }, []);
    const loadCart = async () => {
        setLoading(true);
        try {
            const res = await getCartItems(userId);
            setCartItems(res.data);
        }
        finally {
            setLoading(false);
        }
    };
    const subtotal = cartItems.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
    const handleCheckout = async () => {
        if (cartItems.length === 0)
            return alert("Cart is empty 😅");
        setPlacing(true);
        try {
            await placeOrder(userId);
            await clearCart(userId);
            navigate("/orders", { replace: true });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setPlacing(false);
        }
    };
    return (_jsxs("section", { className: "container mx-auto py-16 grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2 space-y-4", children: loading ? _jsx("p", { children: "Loading cart..." }) : cartItems.map(it => (_jsx(CartItemCard, { id: it.id, productName: it.product.productName, price: it.product.price, quantity: it.quantity, imageUrl: it.product.imageUrl }, it.id))) }), _jsx(CartSummary, { subtotal: subtotal, onCheckout: handleCheckout })] }));
}
