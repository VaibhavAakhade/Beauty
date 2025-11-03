import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const { addToCart } = useCart();
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:8085/api/products/${id}`);
                if (!response.ok)
                    throw new Error("Failed to fetch product details");
                const data = await response.json();
                setProduct(data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
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
    if (loading)
        return _jsx("p", { className: "text-center", children: "Loading..." });
    if (error)
        return _jsx("p", { className: "text-center text-red-500", children: error });
    if (!product)
        return null;
    return (_jsxs("div", { className: "container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12", children: [_jsx("img", { src: product.imageUrl, alt: product.productName, className: "w-full h-[500px] object-cover rounded-2xl shadow-lg" }), _jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: product.productName }), _jsx("p", { className: "text-muted-foreground mb-4", children: product.category }), _jsxs("div", { className: "flex items-center mb-4", children: [_jsx(Star, { className: "w-5 h-5 text-yellow-500 fill-yellow-500" }), _jsx("span", { className: "ml-2 font-medium", children: product.rating })] }), _jsx("p", { className: "text-lg mb-6", children: product.description }), _jsxs("p", { className: "text-3xl font-semibold text-primary mb-6", children: ["\u20B9", product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })] }), _jsxs(Button, { onClick: handleAddToCart, size: "lg", className: "bg-primary hover:bg-primary/90 text-primary-foreground rounded-full", children: [_jsx(ShoppingCart, { className: "w-5 h-5 mr-2" }), "Add to Cart"] })] })] }));
};
export default ProductDetail;
