import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import productSerum from "@/assets/product-serum.jpg";
import productCream from "@/assets/product-cream.jpg";
import productOil from "@/assets/product-oil.jpg";
import productMakeup from "@/assets/product-makeup.jpg";
import productHaircare from "@/assets/product-haircare.jpg";
import productLipstick from "@/assets/product-lipstick.jpg";

const products = [
  {
    id: 1,
    name: "Radiance Vitamin C Serum",
    category: "Skincare",
    price: 49.99,
    image: productSerum,
    badge: "Bestseller",
    rating: 4.8,
    description: "Brightening serum with natural vitamin C and hyaluronic acid",
  },
  {
    id: 2,
    name: "Hydrating Night Cream",
    category: "Skincare",
    price: 39.99,
    image: productCream,
    badge: "New",
    rating: 4.9,
    description: "Luxurious night cream with botanical extracts",
  },
  {
    id: 3,
    name: "Organic Beauty Oil",
    category: "Skincare",
    price: 34.99,
    image: productOil,
    badge: "Hot",
    rating: 4.7,
    description: "Multi-purpose organic oil for face, body, and hair",
  },
  {
    id: 4,
    name: "Rose Gold Eyeshadow Palette",
    category: "Makeup",
    price: 54.99,
    image: productMakeup,
    badge: "Bestseller",
    rating: 5.0,
    description: "12 pigmented shades in warm rose gold tones",
  },
  {
    id: 5,
    name: "Natural Hair Care Set",
    category: "Haircare",
    price: 44.99,
    image: productHaircare,
    rating: 4.6,
    description: "Organic shampoo and conditioner duo",
  },
  {
    id: 6,
    name: "Velvet Matte Lipstick",
    category: "Makeup",
    price: 24.99,
    image: productLipstick,
    badge: "New",
    rating: 4.8,
    description: "Long-lasting matte lipstick in rose shades",
  },
];

const categories = ["All", "Skincare", "Makeup", "Haircare"];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Premium Collection</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of beauty essentials, all
            crafted with natural ingredients and designed to enhance your
            natural radiance.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "border-2 border-border hover:border-primary"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-border hover:shadow-elegant transition-all duration-300 hover-lift"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
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
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
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
