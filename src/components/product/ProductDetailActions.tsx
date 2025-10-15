import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Loader2, Check } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../../config/axiosConfig"; 

// Props for the detail action component
interface ProductDetailActionsProps {
    productId: number;
    // You might pass the product name/price for confirmation messages
    productName: string; 
}

export default function ProductDetailActions({ productId, productName }: ProductDetailActionsProps) {
    const [cartStatus, setCartStatus] = useState<'idle' | 'adding' | 'added'>('idle');
    const [buyNowLoading, setBuyNowLoading] = useState(false);

    // --- Add to Cart Logic ---
    const handleAddToCart = async () => {
        if (cartStatus !== 'idle' || buyNowLoading) return;

        setCartStatus('adding');
        try {
            // Replace with actual Spring Boot API call
            // await axiosInstance.post(`/cart/add`, { productId: productId, quantity: 1 });
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay

            setCartStatus('added');
            setTimeout(() => {
                setCartStatus('idle');
            }, 2000);

        } catch (err) {
            console.error("Error adding to cart:", err);
            setCartStatus('idle');
            alert("Failed to add product to cart.");
        }
    };
    
    // --- Buy Now Logic ---
    const handleBuyNow = async () => {
        if (cartStatus !== 'idle' || buyNowLoading) return;
        
        setBuyNowLoading(true);
        try {
            // Replace with actual Spring Boot API call (e.g., creating a quick order)
            // await axiosInstance.post(`/order/quick-checkout`, { productId: productId, quantity: 1 });
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
            
            alert(`Redirecting to checkout for: ${productName}`);
            // In a real app, you would use navigate('/checkout', ...)

        } catch (err) {
            console.error("Error initiating Buy Now:", err);
            alert("Failed to initiate 'Buy Now'. Please try again.");
        } finally {
            setBuyNowLoading(false);
        }
    };

    // Determine the content and styling for the Add to Cart button
    const renderCartButton = () => {
        switch (cartStatus) {
            case 'adding':
                return (
                    <Button 
                        disabled
                        className="w-full h-14 text-lg bg-secondary/80 text-secondary-foreground rounded-lg shadow-md"
                    >
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Adding...
                    </Button>
                );
            case 'added':
                return (
                    <Button 
                        disabled
                        className="w-full h-14 text-lg bg-green-500 hover:bg-green-600 text-primary-foreground rounded-lg shadow-md"
                    >
                        <Check className="w-5 h-5 mr-2" /> Added!
                    </Button>
                );
            case 'idle':
            default:
                return (
                    <Button 
                        onClick={handleAddToCart}
                        disabled={buyNowLoading}
                        className="w-full h-14 text-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg shadow-md"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" /> Add to cart
                    </Button>
                );
        }
    }

    return (
        // Implements the two-column layout (col-6-12 equivalent)
        <div className="flex w-full space-x-4 mt-6">
            
            {/* ADD TO CART Button (Left) */}
            <div className="w-1/2">
                {renderCartButton()}
            </div>

            {/* BUY NOW Button (Right - Primary action) */}
            <div className="w-1/2">
                <Button 
                    onClick={handleBuyNow}
                    disabled={buyNowLoading || cartStatus !== 'idle'}
                    className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg transition-all"
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