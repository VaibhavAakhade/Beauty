import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { placeOrder } from "@/api/orderApi";
import { clearCart } from "@/api/cartApi";
import CheckoutForm, { CheckoutFormData } from "@/components/checkout/CheckoutForm";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import PromoCodeSection from "@/components/checkout/PromoCodeSection";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { cartItems, fetchCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!cartItems || cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const [promoDiscount, setPromoDiscount] = useState(0);

  const subtotalWithGST = cartItems.reduce(
    (total, item) => total + (item.totalPrice || item.unitPrice * item.quantity),
    0
  );
  
  const subtotal = subtotalWithGST / (1 + 0.18); // Remove GST from displayed subtotal
  const gstAmount = subtotalWithGST - subtotal; // GST amount from inclusive price
  const shippingCost = subtotalWithGST > 1000 ? 0 : 100; // Free shipping over ₹1000
  
  // Calculate discount on pre-GST amount
  let effectiveDiscount = promoDiscount;
  const total = subtotalWithGST - promoDiscount + shippingCost;

  const handleCheckout = async (formData: CheckoutFormData) => {
    setIsLoading(true);
    try {
      await placeOrder(user.id, formData);
      await clearCart(user.id);
      await fetchCart();
      toast({
        title: "Success",
        description: "Order placed successfully!",
      });
      navigate("/orders", { replace: true });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.h1 
          className="text-3xl font-bold text-gray-900 mb-8 font-display"
          variants={fadeInUp}
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Shipping Form */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-6">Shipping Details</h2>
              <CheckoutForm onSubmit={handleCheckout} isLoading={isLoading} />
            </div>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Product List */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <ScrollArea className="h-[300px] pr-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b last:border-0">
                    <img
                      src={item.productImageUrl || "https://via.placeholder.com/80"}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.productName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <Badge variant="secondary">₹{item.unitPrice} each</Badge>
                      </div>
                      <p className="text-sm font-medium mt-2">
                        Total: ₹{item.totalPrice || item.unitPrice * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            {/* Price Breakdown */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-lg shadow-sm border space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold mb-4">Price Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-gray-600">Subtotal</span>
                      <p className="text-xs text-gray-500">(Including GST)</p>
                    </div>
                    <span>₹{subtotalWithGST.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-start text-xs text-gray-500">
                    <span>Base Price</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-start text-xs text-gray-500">
                    <span>GST (18%)</span>
                    <span>₹{gstAmount.toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span>- ₹{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shippingCost === 0 ? "FREE" : `₹${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2 text-center">
                    {shippingCost === 0 && (
                      <p className="text-sm text-green-600">
                        ✨ Free shipping applied on orders above ₹1000
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      * All prices are inclusive of GST
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Promo Code Section */}
              <PromoCodeSection 
                subtotal={subtotal}
                onApplyPromo={(discount) => setPromoDiscount(discount)}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
