import { HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 bg-background/50 min-h-screen">
        <div className="container mx-auto px-4 py-16 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center fade-in slide-up">
              Frequently Asked Questions
            </h1>
            <Card className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  Find answers to commonly asked questions about our services, products, shipping, and more.
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            <Card className="p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Please contact our support team.
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: srjnupadhyay@gmail.com</p>
                <p>Phone: +91 7068187878</p>
                <p>Address: Pune University Campus, Ganeshkhind Road, Pune, Maharashtra 411007</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;