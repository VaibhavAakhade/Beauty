import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  productName: string;
  category: string;
  price: number;
  imageUrl: string;
  rating: number;
  description: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8085/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to cart.");
      return;
    }
    await addToCart(Number(id), 1);
    alert("Added to cart!");
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
      />

      <div>
        <h1 className="text-4xl font-bold mb-4">{product.productName}</h1>
        <p className="text-muted-foreground mb-4">{product.category}</p>
        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="ml-2 font-medium">{product.rating}</span>
        </div>

        <p className="text-lg mb-6">{product.description}</p>

        <p className="text-3xl font-semibold text-primary mb-6">
          ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>

        <Button
          onClick={handleAddToCart}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
