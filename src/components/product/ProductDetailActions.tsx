import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Loader2, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";


interface ProductDetailActionsProps {
  productId: number;
  productName: string;
  userId: number;
}

export default function ProductDetailActions({
  productId,
  productName,
  userId
}: ProductDetailActionsProps) {
  const [cartStatus, setCartStatus] = useState<"idle" | "adding" | "added">("idle");
  const [buyNowLoading, setBuyNowLoading] = useState(false);

// Inside component


  const handleAddToCart = async () => {
    if (cartStatus !== "idle" || buyNowLoading) return;

    setCartStatus("adding");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate API call
      setCartStatus("added");
      setTimeout(() => setCartStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to add product to cart.");
      setCartStatus("idle");
    }
  };

  const handleBuyNow = async () => {
    if (cartStatus !== "idle" || buyNowLoading) return;

    setBuyNowLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate API call
      alert(`Redirecting to checkout for: ${productName}`);
    } catch (err) {
      console.error(err);
      alert("Failed to initiate Buy Now.");
    } finally {
      setBuyNowLoading(false);
    }
  };

  const renderCartButton = () => {
    if (cartStatus === "adding") {
      return (
        <Button disabled className="w-full">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Adding...
        </Button>
      );
    }
    if (cartStatus === "added") {
      return (
        <Button disabled className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md">
          <Check className="w-5 h-5 mr-2" /> Added!
        </Button>
      );
    }
    return (
      <Button
        onClick={handleAddToCart}
        disabled={buyNowLoading}
        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg shadow-md"
      >
        <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
      </Button>
    );
  };

  return (
    <div className="flex w-full space-x-4 mt-6">
      <div className="w-1/2">{renderCartButton()}</div>
      <div className="w-1/2">
        <Button
          onClick={handleBuyNow}
          disabled={buyNowLoading || cartStatus !== "idle"}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg"
        >
          {buyNowLoading ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Buying...</>
          ) : (
            <><Package className="w-5 h-5 mr-2" /> Buy Now</>
          )}
        </Button>
      </div>
    </div>
  );
}
