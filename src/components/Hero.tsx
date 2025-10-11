import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Instagram, Phone, ShoppingBag, User } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt="Luxe Beauty Premium Cosmetics"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-2xl">
          <div className="space-y-6 fade-in">
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              Embrace Your
              <span className="block text-gradient">Natural Beauty</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Discover premium cosmetic care crafted with natural ingredients.
              Cruelty-free, vegan-friendly beauty products that enhance your
              radiance and celebrate your unique beauty.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("products")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-glow hover-lift"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 hover-lift"
              >
                Contact Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-full px-8 hover-lift"
              >
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Follow Us
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>Cruelty-Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>Vegan Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>Natural Ingredients</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>Dermatologist Tested</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;
