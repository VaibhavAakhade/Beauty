import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import OrderCard from "@/components/orders/OrderCard";
import { getOrders } from "@/api/orderApi";
export default function OrdersPage() {
    const userId = 1; // replace with JWT
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loadOrders();
    }, []);
    const loadOrders = async () => {
        setLoading(true);
        try {
            const res = await getOrders(userId);
            setOrders(res.data);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("section", { className: "py-16 container mx-auto px-4", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 fade-in slide-up", children: "My Orders \uD83D\uDCE6" }), loading ? (_jsx("p", { children: "Loading orders..." })) : orders.length === 0 ? (_jsx("p", { children: "No orders yet \uD83D\uDECD\uFE0F" })) : (orders.map((order) => (_jsx(OrderCard, { orderId: order.orderId, date: order.orderDate, status: order.status, items: order.items, total: order.totalAmount }, order.orderId))))] }));
}
