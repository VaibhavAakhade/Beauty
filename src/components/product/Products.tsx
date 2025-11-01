import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext"; // ✅ import Cart context
import { categoryDetails } from "@/data/CategoryDetails";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  productName: string;
  category: string;
  price: number;
  imageUrl: string;
  badge?: string;
  rating: number;
  description: string;
}

const categories = [
  "All",
  "HAIR_AND_CARE",
  "SKINCARE",
  "BATH_AND_BODYCARE",
  "MAKEUP",
  "BEAUTY",
  "GIFTING",
  "TRAVEL_PACKS",
  "HAND_CARE",
  "EXCLUSIVES",
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { addToCart } = useCart(); // ✅ use context method

  const handleAddToCart = async (productId: number) => {
    if (!user) {
      alert("Please log in to add items to cart.");
      return;
    }

    await addToCart(productId, 1);
    alert("Added to cart!");
  };

  const fetchProducts = async (category?: string) => {
    setLoading(true);
    setError(null);
    try {
      let url = "http://localhost:8085/api/products";
      if (category && category !== "All") url += `?category=${category}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="products" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Premium Collection</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of beauty essentials.
          </p>
        </div>

        {/* Category Filter */}

        <div className="flex flex-wrap justify-center gap-3 mb-12 relative">
          {categories.map((category) => (
            <div
              key={category}
              className="relative group"
              onMouseEnter={() => setSelectedCategory(category)}
              onMouseLeave={() => setSelectedCategory("All")}
            >
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "border-2 border-gray-300 hover:border-primary"
                }`}
              >
                {category}
              </Button>

              {/* Hover Menu */}
              {categoryDetails[category] && selectedCategory === category && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-50">
                  <h4 className="font-semibold text-primary mb-2">
                    Shop by Category
                  </h4>
                  <ul className="mb-3 space-y-1 text-sm">
                    {categoryDetails[category].shopByCategory.map((item) => (
                      <li
                        key={item}
                        className="hover:text-primary cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-primary mb-2">
                    Shop by Concern
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {categoryDetails[category].shopByConcern.map((item) => (
                      <li
                        key={item}
                        className="hover:text-primary cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-border hover:shadow-elegant transition-all duration-300 hover-lift"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.badge && (
                    <Badge
                      className={`absolute top-4 right-4 ${
                        product.badge === "Bestseller"
                          ? "bg-accent text-accent-foreground"
                          : product.badge === "New"
                          ? "bg-primary text-primary-foreground"
                          : "bg-destructive text-destructive-foreground"
                      }`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>
              </Link>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {product.productName}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
