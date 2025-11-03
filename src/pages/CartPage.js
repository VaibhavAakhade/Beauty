import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";
import { updateCartItem, removeFromCart } from "@/api/cartApi";
import { useAuth } from "@/context/AuthContext";
export default function CartPage() {
    const { cartItems, fetchCart } = useCart();
    const { user } = useAuth();
    if (!cartItems || cartItems.length === 0) {
        return (_jsx("p", { className: "text-center text-gray-500 mt-10", children: "\uD83D\uDECD\uFE0F Your cart is empty" }));
    }
    const handleQuantityChange = async (productId, delta) => {
        if (!user)
            return;
        const item = cartItems.find((i) => i.productId === productId);
        if (!item)
            return;
        const newQty = item.quantity + delta;
        if (newQty <= 0)
            return; // optional: can auto remove if 0
        try {
            await updateCartItem(user.id, productId, newQty);
            await fetchCart();
        }
        catch (err) {
            console.error("Failed to update cart item", err);
        }
    };
    const handleRemoveItem = async (productId) => {
        if (!user)
            return;
        try {
            await removeFromCart(user.id, productId);
            await fetchCart();
        }
        catch (err) {
            console.error("Failed to remove cart item", err);
        }
    };
    const grandTotal = cartItems.reduce((total, item) => total + (item.totalPrice || item.unitPrice * item.quantity), 0);
    return (_jsxs("div", { className: "max-w-4xl mx-auto p-6", children: [_jsx("h2", { className: "text-3xl font-bold mb-6 fade-in slide-up", children: "Your Cart" }), cartItems.map((item) => (_jsxs("div", { className: "flex items-center justify-between border-b border-gray-200 py-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: item.productImageUrl || "https://via.placeholder.com/80", alt: item.productName, className: "w-24 h-24 object-cover rounded" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: item.productName }), _jsxs("p", { className: "text-gray-500", children: ["Unit: \u20B9", item.unitPrice] }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx(Button, { size: "sm", onClick: () => handleQuantityChange(item.productId, -1), className: "bg-gray-200 text-black hover:bg-gray-300", children: _jsx(Minus, { size: 16 }) }), _jsx("span", { className: "px-3", children: item.quantity }), _jsx(Button, { size: "sm", onClick: () => handleQuantityChange(item.productId, 1), className: "bg-gray-200 text-black hover:bg-gray-300", children: _jsx(Plus, { size: 16 }) })] })] })] }), _jsxs("div", { className: "flex flex-col items-end gap-2", children: [_jsxs("p", { className: "font-semibold", children: ["\u20B9", item.totalPrice || item.unitPrice * item.quantity] }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => handleRemoveItem(item.productId), children: _jsx(X, { size: 16 }) })] })] }, item.id))), _jsxs("div", { className: "flex justify-between mt-6 text-xl font-bold", children: [_jsx("span", { children: "Total:" }), _jsxs("span", { children: ["\u20B9", grandTotal] })] }), _jsxs("div", { className: "mt-6 flex gap-4 flex-wrap", children: [_jsx(Button, { className: "bg-gray-200 text-black", onClick: () => (window.location.href = "/"), children: "Continue Shopping" }), _jsx(Button, { className: "bg-pink-600 text-white hover:bg-pink-700", children: "Proceed to Checkout" })] })] }));
}
