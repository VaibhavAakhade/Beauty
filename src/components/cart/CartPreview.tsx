import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCart } from "@/context/CartContext";

export function CartPreview() {
  const { cartItems } = useCart();
  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const subtotal = cartItems?.reduce(
    (total, item) => total + (item.totalPrice || item.unitPrice * item.quantity),
    0
  ) || 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="w-6 h-6 text-primary" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex flex-col space-y-4 p-2">
          <h3 className="font-semibold text-lg">Shopping Cart</h3>
          {cartItems && cartItems.length > 0 ? (
            <>
              <ScrollArea className="h-[200px] pr-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 py-2 border-b"
                  >
                    <img
                      src={item.productImageUrl || "https://via.placeholder.com/40"}
                      alt={item.productName}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × ₹{item.unitPrice}
                      </p>
                    </div>
                    <p className="font-medium">
                      ₹{item.totalPrice || item.unitPrice * item.quantity}
                    </p>
                  </div>
                ))}
              </ScrollArea>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link to="/cart">
                      View Cart
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-pink-600 hover:bg-pink-700">
                    <Link to="/checkout">
                      Checkout <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">Your cart is empty</p>
              <Button asChild className="mt-4">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}