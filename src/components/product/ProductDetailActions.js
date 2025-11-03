import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Loader2, Check } from "lucide-react";
import { useState } from "react";
export default function ProductDetailActions({ productId, productName, userId }) {
    const [cartStatus, setCartStatus] = useState("idle");
    const [buyNowLoading, setBuyNowLoading] = useState(false);
    // Inside component
    const handleAddToCart = async () => {
        if (cartStatus !== "idle" || buyNowLoading)
            return;
        setCartStatus("adding");
        try {
            await new Promise((resolve) => setTimeout(resolve, 800)); // simulate API call
            setCartStatus("added");
            setTimeout(() => setCartStatus("idle"), 2000);
        }
        catch (err) {
            console.error(err);
            alert("Failed to add product to cart.");
            setCartStatus("idle");
        }
    };
    const handleBuyNow = async () => {
        if (cartStatus !== "idle" || buyNowLoading)
            return;
        setBuyNowLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 800)); // simulate API call
            alert(`Redirecting to checkout for: ${productName}`);
        }
        catch (err) {
            console.error(err);
            alert("Failed to initiate Buy Now.");
        }
        finally {
            setBuyNowLoading(false);
        }
    };
    const renderCartButton = () => {
        if (cartStatus === "adding") {
            return (_jsxs(Button, { disabled: true, className: "w-full", children: [_jsx(Loader2, { className: "w-5 h-5 mr-2 animate-spin" }), " Adding..."] }));
        }
        if (cartStatus === "added") {
            return (_jsxs(Button, { disabled: true, className: "w-full bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md", children: [_jsx(Check, { className: "w-5 h-5 mr-2" }), " Added!"] }));
        }
        return (_jsxs(Button, { onClick: handleAddToCart, disabled: buyNowLoading, className: "w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg shadow-md", children: [_jsx(ShoppingCart, { className: "w-5 h-5 mr-2" }), " Add to Cart"] }));
    };
    return (_jsxs("div", { className: "flex w-full space-x-4 mt-6", children: [_jsx("div", { className: "w-1/2", children: renderCartButton() }), _jsx("div", { className: "w-1/2", children: _jsx(Button, { onClick: handleBuyNow, disabled: buyNowLoading || cartStatus !== "idle", className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg", children: buyNowLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 mr-2 animate-spin" }), " Buying..."] })) : (_jsxs(_Fragment, { children: [_jsx(Package, { className: "w-5 h-5 mr-2" }), " Buy Now"] })) }) })] }));
}
