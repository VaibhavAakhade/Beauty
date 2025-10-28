import { Button } from "@/components/ui/button";

type Props = {
  subtotal: number;
  onCheckout: () => void;
};

export default function CartSummary({ subtotal, onCheckout }: Props) {
  return (
    <div className="sticky top-20 p-6 border rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Order Summary</h3>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>₹0.00</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <Button onClick={onCheckout} className="w-full mt-4">
        Order Now
      </Button>
    </div>
  );
}
