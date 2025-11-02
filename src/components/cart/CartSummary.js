import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
export default function CartSummary({ subtotal, onCheckout }) {
    return (_jsxs("div", { className: "sticky top-20 p-6 border rounded-lg space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Order Summary" }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Subtotal" }), _jsxs("span", { children: ["\u20B9", subtotal.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Shipping" }), _jsx("span", { children: "\u20B90.00" })] }), _jsxs("div", { className: "flex justify-between font-bold text-lg", children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["\u20B9", subtotal.toFixed(2)] })] }), _jsx(Button, { onClick: onCheckout, className: "w-full mt-4", children: "Order Now" })] }));
}
