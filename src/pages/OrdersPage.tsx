import { useEffect, useState } from "react";
import OrderCard from "@/components/orders/OrderCard";
import { getOrders } from "@/api/orderApi";

export default function OrdersPage() {
  const userId = 1; // replace with JWT
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrders(userId);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 container mx-auto px-4">
  <h1 className="text-3xl font-bold mb-6 fade-in slide-up">My Orders 📦</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet 🛍️</p>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.orderId}
            orderId={order.orderId}
            date={order.orderDate}
            status={order.status}
            items={order.items}
            total={order.totalAmount}
          />
        ))
      )}
    </section>
  );
}
