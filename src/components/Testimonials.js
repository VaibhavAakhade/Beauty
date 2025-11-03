import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
const testimonials = [
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "Verified Customer",
        rating: 5,
        text: "The Vitamin C Serum has transformed my skin! I've noticed a visible glow and my dark spots are fading. Absolutely love the natural ingredients and how gentle it is on my sensitive skin.",
    },
    {
        id: 2,
        name: "Emily Rodriguez",
        role: "Beauty Enthusiast",
        rating: 5,
        text: "I've tried countless beauty brands, but Luxe Beauty is by far my favorite. The quality is exceptional, and I love that everything is cruelty-free and vegan. The rose gold palette is stunning!",
    },
    {
        id: 3,
        name: "Jessica Chen",
        role: "Skincare Lover",
        rating: 5,
        text: "The night cream is a game-changer! My skin feels so soft and hydrated in the morning. I appreciate the commitment to natural ingredients and sustainable practices.",
    },
    {
        id: 4,
        name: "Amanda Taylor",
        role: "Makeup Artist",
        rating: 5,
        text: "As a professional makeup artist, I'm very particular about products. Luxe Beauty's makeup line is incredibly pigmented and long-lasting. My clients always ask what I'm using!",
    },
    {
        id: 5,
        name: "Lauren Williams",
        role: "Natural Beauty Advocate",
        rating: 5,
        text: "Finally, a beauty brand that aligns with my values! Everything is organic, cruelty-free, and actually works. The organic beauty oil is my holy grail product.",
    },
    {
        id: 6,
        name: "Rachel Anderson",
        role: "Verified Customer",
        rating: 5,
        text: "The haircare set has revived my damaged hair. It's softer, shinier, and healthier than it's been in years. The natural formula makes all the difference!",
    },
];
const Testimonials = () => {
    return (_jsx("section", { id: "testimonials", className: "py-20 bg-gradient-subtle", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold mb-4", children: ["What Our ", _jsx("span", { className: "text-gradient", children: "Customers Say" })] }), _jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto", children: "Join thousands of satisfied customers who have discovered the Luxe Beauty difference. Real reviews from real people." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: testimonials.map((testimonial) => (_jsx(Card, { className: "border-border hover:shadow-soft transition-all duration-300 hover-lift", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "flex items-center space-x-1 mb-4", children: [...Array(testimonial.rating)].map((_, i) => (_jsx(Star, { className: "w-5 h-5 fill-accent text-accent" }, i))) }), _jsxs("p", { className: "text-foreground mb-6 leading-relaxed", children: ["\"", testimonial.text, "\""] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center", children: _jsx("span", { className: "text-white font-display font-bold text-lg", children: testimonial.name.charAt(0) }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-foreground", children: testimonial.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: testimonial.role })] })] })] }) }, testimonial.id))) }), _jsxs("div", { className: "mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center", children: [_jsxs("div", { children: [_jsx("p", { className: "font-display text-4xl font-bold text-gradient mb-2", children: "10K+" }), _jsx("p", { className: "text-muted-foreground", children: "Happy Customers" })] }), _jsxs("div", { children: [_jsx("p", { className: "font-display text-4xl font-bold text-gradient mb-2", children: "4.9" }), _jsx("p", { className: "text-muted-foreground", children: "Average Rating" })] }), _jsxs("div", { children: [_jsx("p", { className: "font-display text-4xl font-bold text-gradient mb-2", children: "98%" }), _jsx("p", { className: "text-muted-foreground", children: "Would Recommend" })] }), _jsxs("div", { children: [_jsx("p", { className: "font-display text-4xl font-bold text-gradient mb-2", children: "100%" }), _jsx("p", { className: "text-muted-foreground", children: "Cruelty-Free" })] })] })] }) }));
};
export default Testimonials;
