import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext"; // ✅ import Cart context
import { categoryDetails } from "@/data/CategoryDetails";
import { Link } from "react-router-dom";
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
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const { addToCart } = useCart(); // ✅ use context method
    const handleAddToCart = async (productId) => {
        if (!user) {
            alert("Please log in to add items to cart.");
            return;
        }
        await addToCart(productId, 1);
        alert("Added to cart!");
    };
    const fetchProducts = async (category) => {
        setLoading(true);
        setError(null);
        try {
            let url = "http://localhost:8085/api/products";
            if (category && category !== "All")
                url += `?category=${category}`;
            const response = await fetch(url);
            if (!response.ok)
                throw new Error("Failed to fetch products");
            const data = await response.json();
            setProducts(data);
        }
        catch (err) {
            setError(err.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts(selectedCategory);
    }, [selectedCategory]);
    return (_jsx("section", { id: "products", className: "py-20 bg-gradient-subtle", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold mb-4", children: ["Our ", _jsx("span", { className: "text-gradient", children: "Premium Collection" })] }), _jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto", children: "Discover our carefully curated selection of beauty essentials." })] }), _jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-12 relative", children: categories.map((category) => (_jsxs("div", { className: "relative group", onMouseEnter: () => setSelectedCategory(category), onMouseLeave: () => setSelectedCategory("All"), children: [_jsx(Button, { variant: selectedCategory === category ? "default" : "outline", className: `rounded-full ${selectedCategory === category
                                    ? "bg-primary text-white shadow-md"
                                    : "border-2 border-gray-300 hover:border-primary"}`, children: category }), categoryDetails[category] && selectedCategory === category && (_jsxs("div", { className: "absolute left-0 top-full mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-50", children: [_jsx("h4", { className: "font-semibold text-primary mb-2", children: "Shop by Category" }), _jsx("ul", { className: "mb-3 space-y-1 text-sm", children: categoryDetails[category].shopByCategory.map((item) => (_jsx("li", { className: "hover:text-primary cursor-pointer", children: item }, item))) }), _jsx("h4", { className: "font-semibold text-primary mb-2", children: "Shop by Concern" }), _jsx("ul", { className: "space-y-1 text-sm", children: categoryDetails[category].shopByConcern.map((item) => (_jsx("li", { className: "hover:text-primary cursor-pointer", children: item }, item))) })] }))] }, category))) }), loading && _jsx("p", { className: "text-center", children: "Loading products..." }), error && _jsx("p", { className: "text-center text-red-500", children: error }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: products.map((product) => (_jsxs(Card, { className: "group overflow-hidden border-border hover:shadow-elegant transition-all duration-300 hover-lift", children: [_jsx(Link, { to: `/product/${product.id}`, children: _jsxs("div", { className: "relative overflow-hidden", children: [_jsx("img", { src: product.imageUrl, alt: product.productName, className: "w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" }), product.badge && (_jsx(Badge, { className: `absolute top-4 right-4 ${product.badge === "Bestseller"
                                                ? "bg-accent text-accent-foreground"
                                                : product.badge === "New"
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-destructive text-destructive-foreground"}`, children: product.badge }))] }) }), _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: product.category }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "w-4 h-4 fill-accent text-accent" }), _jsx("span", { className: "text-sm font-medium", children: product.rating })] })] }), _jsx("h3", { className: "font-display text-xl font-semibold mb-2", children: product.productName }), _jsx("p", { className: "text-muted-foreground text-sm mb-4", children: product.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "font-display text-2xl font-bold text-primary", children: ["\u20B9", product.price] }), _jsxs(Button, { size: "sm", className: "bg-primary hover:bg-primary/90 text-primary-foreground rounded-full", onClick: () => handleAddToCart(product.id), children: [_jsx(ShoppingCart, { className: "w-4 h-4 mr-2" }), "Add to Cart"] })] })] })] }, product.id))) })] }) }));
};
export default Products;
