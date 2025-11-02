import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Heart, Leaf, Shield, Sparkles } from "lucide-react";
const values = [
    {
        icon: Leaf,
        title: "Natural Ingredients",
        description: "We use only the finest natural and organic ingredients, carefully sourced from sustainable farms around the world.",
    },
    {
        icon: Heart,
        title: "Cruelty-Free",
        description: "100% cruelty-free and vegan-friendly. We never test on animals and are proud advocates of ethical beauty.",
    },
    {
        icon: Shield,
        title: "Dermatologist Tested",
        description: "All our products are rigorously tested by dermatologists to ensure safety and effectiveness for all skin types.",
    },
    {
        icon: Sparkles,
        title: "Premium Quality",
        description: "Luxurious formulations that deliver visible results while pampering your skin with every application.",
    },
];
const About = () => {
    return (_jsx("section", { id: "about", className: "py-20 bg-background", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "max-w-4xl mx-auto text-center mb-16", children: [_jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold mb-6", children: ["Our ", _jsx("span", { className: "text-gradient", children: "Beauty Philosophy" })] }), _jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: "At Luxe Beauty, we believe that true beauty comes from within and should be nurtured with the purest ingredients nature has to offer. Our mission is to create luxurious, effective beauty products that enhance your natural radiance while respecting both your skin and our planet." }), _jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mt-4", children: "Every product in our collection is crafted with love, using premium natural ingredients and sustainable practices. We're committed to delivering exceptional quality without compromise - cruelty-free, vegan-friendly, and dermatologist-tested for your peace of mind." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: values.map((value, index) => {
                        const Icon = value.icon;
                        return (_jsxs("div", { className: "text-center p-6 rounded-2xl bg-gradient-subtle hover:shadow-soft transition-all duration-300 hover-lift", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center", children: _jsx(Icon, { className: "w-8 h-8 text-primary" }) }), _jsx("h3", { className: "font-display text-xl font-semibold mb-3", children: value.title }), _jsx("p", { className: "text-muted-foreground", children: value.description })] }, index));
                    }) }), _jsxs("div", { className: "mt-16 text-center", children: [_jsx("h3", { className: "font-display text-2xl font-semibold mb-6", children: "Certified & Trusted" }), _jsxs("div", { className: "flex flex-wrap justify-center gap-8 text-muted-foreground", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-primary" }), _jsx("span", { className: "font-medium", children: "Organic Certified" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-primary" }), _jsx("span", { className: "font-medium", children: "Vegan Society Approved" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-primary" }), _jsx("span", { className: "font-medium", children: "Leaping Bunny Certified" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-primary" }), _jsx("span", { className: "font-medium", children: "Eco-Friendly Packaging" })] })] })] })] }) }));
};
export default About;
