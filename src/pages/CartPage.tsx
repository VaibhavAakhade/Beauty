import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";
import { updateCartItem, removeFromCart } from "@/api/cartApi";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, fetchCart } = useCart();
  const { user } = useAuth();

  if (!cartItems || cartItems.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">🛍️ Your cart is empty</p>
    );
  }

  const handleQuantityChange = async (productId: number, delta: number) => {
    if (!user) return;
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty <= 0) return; // optional: can auto remove if 0

    try {
      await updateCartItem(user.id, productId, newQty);
      await fetchCart();
    } catch (err) {
      console.error("Failed to update cart item", err);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    if (!user) return;
    try {
      await removeFromCart(user.id, productId);
      await fetchCart();
    } catch (err) {
      console.error("Failed to remove cart item", err);
    }
  };

  const grandTotal = cartItems.reduce(
    (total, item) =>
      total + (item.totalPrice || item.unitPrice * item.quantity),
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
  <h2 className="text-3xl font-bold mb-6 fade-in slide-up">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-gray-200 py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.productImageUrl || "https://via.placeholder.com/80"}
              alt={item.productName}
              className="w-24 h-24 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.productName}</p>
              <p className="text-gray-500">Unit: ₹{item.unitPrice}</p>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={() => handleQuantityChange(item.productId, -1)}
                  className="bg-gray-200 text-black hover:bg-gray-300"
                >
                  <Minus size={16} />
                </Button>
                <span className="px-3">{item.quantity}</span>
                <Button
                  size="sm"
                  onClick={() => handleQuantityChange(item.productId, 1)}
                  className="bg-gray-200 text-black hover:bg-gray-300"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="font-semibold">
              ₹{item.totalPrice || item.unitPrice * item.quantity}
            </p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleRemoveItem(item.productId)}
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-6 text-xl font-bold">
        <span>Total:</span>
        <span>₹{grandTotal}</span>
      </div>

      <div className="mt-6 flex gap-4 flex-wrap">
        <Button
          className="bg-gray-200 text-black"
          onClick={() => (window.location.href = "/")}
        >
          Continue Shopping
        </Button>
        <Button 
          className="bg-pink-600 text-white hover:bg-pink-700"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
