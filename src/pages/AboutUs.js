import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Heart, Leaf, Shield, Sparkles, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
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
const team = [
    {
        name: "Sarah Johnson",
        role: "Founder & CEO",
        description: "Beauty industry veteran with 15+ years of experience in organic skincare.",
    },
    {
        name: "Dr. Emily Chen",
        role: "Head of Research",
        description: "PhD in Cosmetic Science, leading our product development and innovation.",
    },
    {
        name: "Michael Roberts",
        role: "Sustainability Director",
        description: "Environmental scientist ensuring our eco-friendly practices.",
    },
];
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const AboutUs = () => {
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Navbar, {}), _jsxs("main", { className: "flex-grow pt-20", children: [_jsx("section", { className: "py-20 bg-gradient-to-b from-primary/5 to-background", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsxs("h1", { className: "font-display text-5xl md:text-6xl font-bold mb-6 fade-in slide-up", children: ["About ", _jsx("span", { className: "text-gradient", children: "Luxe Beauty" })] }), _jsx("p", { className: "text-xl text-muted-foreground leading-relaxed mb-8", children: "Transforming beauty routines with nature's finest ingredients since 2020" })] }) }) }), _jsx("section", { className: "py-16", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "max-w-4xl mx-auto text-center mb-16", children: [_jsx("h2", { className: "font-display text-4xl font-bold mb-6 fade-in slide-up", children: "Our Mission & Values" }), _jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: "At Luxe Beauty, we believe that true beauty comes from within and should be nurtured with the purest ingredients nature has to offer. Our mission is to create luxurious, effective beauty products that enhance your natural radiance while respecting both your skin and our planet." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: values.map((value, index) => {
                                        const Icon = value.icon;
                                        return (_jsxs(Card, { className: "group p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors", children: _jsx(Icon, { className: "w-8 h-8 text-primary" }) }), _jsx("h3", { className: "font-display text-xl font-semibold mb-3", children: value.title }), _jsx("p", { className: "text-muted-foreground", children: value.description })] }, index));
                                    }) })] }) }), _jsx("section", { className: "py-16 bg-gradient-to-b from-background to-primary/5", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "font-display text-4xl font-bold mb-6", children: "Meet Our Team" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Led by industry experts and passionate beauty enthusiasts, our team is committed to revolutionizing your skincare experience." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: team.map((member, index) => (_jsxs(Card, { className: "p-6 text-center hover:shadow-soft transition-all duration-300", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center", children: _jsx(Users, { className: "w-10 h-10 text-primary" }) }), _jsx("h3", { className: "font-display text-xl font-semibold mb-2", children: member.name }), _jsx("p", { className: "text-primary font-medium mb-3", children: member.role }), _jsx("p", { className: "text-muted-foreground", children: member.description })] }, index))) })] }) }), _jsx("section", { className: "py-16", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx("div", { className: "text-center mb-12", children: _jsx("h2", { className: "font-display text-4xl font-bold mb-6", children: "Our Certifications" }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto", children: [_jsxs(Card, { className: "group p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1", children: [_jsx(Award, { className: "w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" }), _jsx("h3", { className: "font-semibold mb-2", children: "Organic Certified" }), _jsx("p", { className: "text-sm text-center text-muted-foreground", children: "Certified organic ingredients and processes" })] }), _jsxs(Card, { className: "group p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1", children: [_jsx(Shield, { className: "w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" }), _jsx("h3", { className: "font-semibold mb-2", children: "Vegan Society" }), _jsx("p", { className: "text-sm text-center text-muted-foreground", children: "100% vegan-friendly products" })] }), _jsxs(Card, { className: "group p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1", children: [_jsx(Heart, { className: "w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" }), _jsx("h3", { className: "font-semibold mb-2", children: "Cruelty-Free" }), _jsx("p", { className: "text-sm text-center text-muted-foreground", children: "Leaping Bunny certified" })] }), _jsxs(Card, { className: "group p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1", children: [_jsx(Leaf, { className: "w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" }), _jsx("h3", { className: "font-semibold mb-2", children: "Eco-Friendly" }), _jsx("p", { className: "text-sm text-center text-muted-foreground", children: "Sustainable packaging" })] })] })] }) })] }), _jsx(Footer, {})] }));
};
export default AboutUs;
