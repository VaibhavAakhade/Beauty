import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const FAQ = () => {
    const faqs = [
        {
            question: "How do I place an order?",
            answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Make sure you're logged in to your account for a smooth checkout process."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, UPI, and net banking for domestic orders."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package through our website or the courier's website."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Please see our Shipping Policy page for more details."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard delivery takes 3-5 business days within India. Express delivery is available for 1-2 business days. International shipping typically takes 7-14 business days."
        },
        {
            question: "Are your products authentic?",
            answer: "Yes, all our products are 100% authentic and sourced directly from authorized distributors or manufacturers. We guarantee the authenticity of every item we sell."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary by location. Please check our Shipping Policy for detailed information."
        },
        {
            question: "How can I contact customer service?",
            answer: "You can reach our customer service team through email at srjnupadhyay@gmail.com, phone at +91 7068187878, or by using the contact form on our Contact page."
        },
        {
            question: "Do you offer gift wrapping?",
            answer: "Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout and even include a personalized message."
        },
        {
            question: "What if my order arrives damaged?",
            answer: "If your order arrives damaged, please contact our customer service within 48 hours of receipt. Take photos of the damaged items and packaging, and we'll help you with a replacement or refund."
        }
    ];
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-grow pt-20 bg-background/50 min-h-screen", children: _jsx("div", { className: "container mx-auto px-4 py-16 animate-in slide-in-from-bottom duration-500", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-8 text-center fade-in slide-up", children: "Frequently Asked Questions" }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-start space-x-4 mb-6", children: [_jsx(HelpCircle, { className: "w-6 h-6 text-primary flex-shrink-0 mt-1" }), _jsx("p", { className: "text-muted-foreground", children: "Find answers to commonly asked questions about our services, products, shipping, and more." })] }), _jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs.map((faq, index) => (_jsxs(AccordionItem, { value: `item-${index}`, children: [_jsx(AccordionTrigger, { className: "text-left", children: faq.question }), _jsx(AccordionContent, { className: "text-muted-foreground", children: faq.answer })] }, index))) })] }), _jsxs(Card, { className: "p-6 mt-8", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Still Have Questions?" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Can't find the answer you're looking for? Please contact our support team." }), _jsxs("div", { className: "space-y-2 text-muted-foreground", children: [_jsx("p", { children: "Email: srjnupadhyay@gmail.com" }), _jsx("p", { children: "Phone: +91 7068187878" }), _jsx("p", { children: "Address: Pune University Campus, Ganeshkhind Road, Pune, Maharashtra 411007" })] })] })] }) }) }), _jsx(Footer, {})] }));
};
export default FAQ;
