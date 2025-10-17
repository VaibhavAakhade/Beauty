import { useEffect, useState } from "react";
import CartItemCard from "@/components/cart/CartItemCard";
import CartSummary from "@/components/cart/CartSummary";
import { getCartItems, clearCart } from "@/api/cartApi";
import { placeOrder } from "@/api/orderApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // ✅ import Auth context


export default function CheckoutPage() {
    const {user} = useAuth();
  const userId = user.id;
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [placing, setPlacing] = useState(false);

  useEffect(() => { loadCart(); }, []);

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await getCartItems(userId);
      setCartItems(res.data);
    } finally { setLoading(false); }
  };

  const subtotal = cartItems.reduce((sum, it) => sum + it.product.price * it.quantity, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Cart is empty 😅");
    setPlacing(true);
    try {
      await placeOrder(userId);
      await clearCart(userId);
      navigate("/orders", { replace: true });
    } catch (err) { console.error(err); }
    finally { setPlacing(false); }
  };

  return (
    <section className="container mx-auto py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {loading ? <p>Loading cart...</p> : cartItems.map(it => (
          <CartItemCard key={it.id} id={it.id} productName={it.product.productName} price={it.product.price} quantity={it.quantity} imageUrl={it.product.imageUrl} />
        ))}
      </div>
      <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
    </section>
  );
}
