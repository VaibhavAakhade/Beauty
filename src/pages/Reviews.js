import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Star, User, Calendar } from "lucide-react";
const initialReviews = [
    {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        date: "2025-09-12",
        text: "Absolutely love the serum — my skin feels hydrated and radiant. Packaging is gorgeous too!",
        product: "Rose Glow Serum"
    },
    {
        id: 2,
        name: "Amit Joshi",
        rating: 4,
        date: "2025-08-02",
        text: "Great moisturiser, non-greasy and lightweight. Noticeable improvement in a week.",
        product: "Hydra Balance Moisturizer"
    },
    {
        id: 3,
        name: "Neha Verma",
        rating: 5,
        date: "2025-07-19",
        text: "Fast delivery and excellent customer service. The face mask is now a staple in my routine.",
        product: "Cocoa & Clay Mask"
    }
];
const Reviews = () => {
    const [reviews, setReviews] = useState(initialReviews);
    const [name, setName] = useState("");
    const [product, setProduct] = useState("");
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");
    const formRef = useRef(null);
    const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
    const scrollToForm = () => {
        const el = document.getElementById("leave-review");
        if (el)
            el.scrollIntoView({ behavior: "smooth" });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            id: Date.now(),
            name: name || "Anonymous",
            rating,
            date: new Date().toISOString().split("T")[0],
            text,
            product: product || "General"
        };
        setReviews((s) => [newReview, ...s]);
        // Reset form
        setName("");
        setProduct("");
        setRating(5);
        setText("");
        alert("Thanks — your review has been submitted and will appear after moderation.");
        // scroll to top of reviews
        const top = document.querySelector(".hero");
        top?.scrollIntoView({ behavior: "smooth" });
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navbar, {}), _jsxs("main", { className: "flex-1", children: [_jsx("section", { className: "hero bg-gradient-to-r from-pink-50 to-white pt-20 pb-12 md:pt-28 md:pb-16", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [_jsx("h1", { className: "text-4xl font-bold mb-4 fade-in slide-up", children: "Customer Reviews" }), _jsx("p", { className: "text-gray-600 mb-6 fade-in slide-up", style: { animationDelay: "120ms" }, children: "Real feedback from customers who love Luxe Beauty products. We value honest reviews \u2014 they help us improve and help other customers choose with confidence." }), _jsxs("div", { className: "inline-flex items-center space-x-4 mt-6 fade-in slide-up", style: { animationDelay: "160ms" }, children: [_jsxs("div", { className: "flex items-center bg-white shadow rounded-full px-4 py-2", children: [_jsx("span", { className: "text-xl font-semibold mr-2", children: averageRating }), _jsx("div", { className: "flex items-center text-yellow-500", children: Array.from({ length: 5 }).map((_, i) => (_jsx(Star, { className: `w-4 h-4 ${i < Math.round(Number(averageRating)) ? 'fill-current' : ''}` }, i))) })] }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Based on ", reviews.length, " reviews"] })] })] }) }) }), _jsx("section", { className: "container mx-auto px-4 py-12", children: _jsxs("div", { className: "max-w-5xl mx-auto grid gap-6", children: [reviews.map((r) => (_jsx(Card, { className: "p-6 fade-in slide-up", style: { animationDelay: "60ms" }, children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600", children: _jsx(User, { className: "w-5 h-5" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: r.name }), _jsxs("div", { className: "text-xs text-gray-500 flex items-center space-x-2", children: [_jsxs("time", { dateTime: r.date, children: [_jsx(Calendar, { className: "w-3 h-3 inline-block mr-1" }), " ", new Date(r.date).toLocaleDateString()] }), _jsx("span", { children: "\u2022" }), _jsx("span", { className: "text-sm", children: r.product })] })] }), _jsx("div", { className: "flex items-center text-yellow-500", children: Array.from({ length: 5 }).map((_, i) => (_jsx(Star, { className: `w-4 h-4 ${i < r.rating ? 'fill-current' : ''}` }, i))) })] }), _jsx("p", { className: "mt-3 text-gray-700", children: r.text })] })] }) }, r.id))), _jsxs(Card, { className: "p-6 text-center fade-in slide-up", style: { animationDelay: "80ms" }, children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Share Your Experience" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Have you tried our products? Help others by leaving an honest review." }), _jsx("button", { onClick: scrollToForm, className: "inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600", children: "Leave a Review" })] })] }) }), _jsx("section", { id: "leave-review", ref: formRef, className: "container mx-auto px-4 py-12", children: _jsx("div", { className: "max-w-3xl mx-auto", children: _jsxs(Card, { className: "p-6 fade-in slide-up", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Leave a Review" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Name" }), _jsx("input", { value: name, onChange: (e) => setName(e.target.value), type: "text", className: "mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-pink-400", placeholder: "Your name" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Product (optional)" }), _jsx("input", { value: product, onChange: (e) => setProduct(e.target.value), type: "text", className: "mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-pink-400", placeholder: "Product name" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Rating" }), _jsx("select", { value: rating, onChange: (e) => setRating(Number(e.target.value)), className: "mt-1 block w-32 rounded-md border-gray-200 shadow-sm focus:ring-pink-400", children: [5, 4, 3, 2, 1].map((r) => (_jsxs("option", { value: r, children: [r, " star", r > 1 ? "s" : ""] }, r))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Review" }), _jsx("textarea", { value: text, onChange: (e) => setText(e.target.value), className: "mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-pink-400", rows: 5, placeholder: "Share your experience...", required: true })] }), _jsx("div", { className: "text-right", children: _jsx("button", { type: "submit", className: "inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600", children: "Submit Review" }) })] })] }) }) })] }), _jsx(Footer, {})] }));
};
export default Reviews;
