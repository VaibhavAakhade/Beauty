// src/components/Navbar.tsx (UPGRADED)
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ⬅️ NEW: Import Link for navigation
import { Menu, X, ShoppingBag, User, LogOut, Shield } from "lucide-react"; // Import Shield for Admin
import { Button } from "@/components/ui/button";
import Login from "./forms/login"; // Assuming path: ./forms/login
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // 🌟 CONTEXT USAGE: Get user, role, and logout function
  const { user, role, logout } = useAuth();
  const isAuthenticated = !!user;
  const isAdmin = role === 'admin'; // ⬅️ NEW: Check for admin role

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenAuth = () => setShowAuthModal(true);
    window.addEventListener("openAuthModal", handleOpenAuth);
    return () => window.removeEventListener("openAuthModal", handleOpenAuth);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLoginClick = () => {
    // Only show the modal if the user is NOT authenticated
    if (!isAuthenticated) {
        const event = new CustomEvent("openAuthModal");
        window.dispatchEvent(event);
    }
  };

  const getUserDisplayName = () => {
    // Extracts the name part of the email for a friendly greeting
    const email = user?.email;
    if (email) {
        const namePart = email.split('@')[0];
        // Capitalize first letter of the name part
        return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return "Profile";
  };

  // Helper component for the Auth/User display
  const AuthUserDisplay = ({ isMobile = false }) => {
    if (isAuthenticated) {
      return (
        // AUTHENTICATED STATE: Show Welcome message and Logout button
        <div className={`flex items-center space-x-2 ${isMobile ? "w-full flex-col space-y-3" : ""}`}>
          <span 
            className={`font-semibold text-sm text-primary transition-colors ${isMobile ? "w-full text-center" : "hidden sm:inline-block"}`}
          >
            Welcome, {getUserDisplayName()} ✨
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={logout} // Call context logout
            className={`${isMobile ? "w-full" : ""} border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-colors`}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      );
    }

    return (
      // LOGGED OUT STATE: Show Login/Signup button
      <Button
        size="sm"
        variant="outline"
        onClick={handleLoginClick}
        className={`${isMobile ? "w-full" : "w-auto"} border-2 border-spacing-2 text-secondary hover:bg-secondary text-black rounded-full`}
      >
        <User className="w-4 h-4 mr-2" />
        Login / Signup
      </Button>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* ... Logo Section ... */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">L</span>
              </div>
              <span className="font-display text-2xl font-bold text-gradient">
                Luxe Beauty
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* ... Nav Links ... */}
              <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary transition-colors font-medium">Home</button>
              <button onClick={() => scrollToSection("products")} className="text-foreground hover:text-primary transition-colors font-medium">Shop</button>
              <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary transition-colors font-medium">About</button>
              <button onClick={() => scrollToSection("testimonials")} className="text-foreground hover:text-primary transition-colors font-medium">Reviews</button>
              <button onClick={() => scrollToSection("contact")} className="text-foreground hover:text-primary transition-colors font-medium">Contact</button>
              
              {/* 🚀 ADMIN LINK FOR DESKTOP */}
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="text-primary hover:text-primary/80 transition-colors font-medium border-2 border-primary/50 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Admin Dashboard
                </Link>
              )}
              
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Now
              </Button>

              {/* Display Auth/User Button for Desktop */}
              <AuthUserDisplay />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 bg-background/95 backdrop-blur-md rounded-b-2xl shadow-soft">
              {/* ... Mobile Nav Links ... */}
              <button onClick={() => scrollToSection("home")} className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors">Home</button>
              <button onClick={() => scrollToSection("products")} className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors">Shop</button>
              <button onClick={() => scrollToSection("about")} className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors">About</button>
              <button onClick={() => scrollToSection("testimonials")} className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors">Reviews</button>
              <button onClick={() => scrollToSection("contact")} className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors">Contact</button>

              <div className="px-4 space-y-3">
                {/* 🚀 ADMIN LINK FOR MOBILE */}
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                    className="block w-full text-center text-primary hover:text-primary/80 transition-colors font-medium border-2 border-primary/50 px-4 py-2 rounded-full text-sm flex items-center justify-center"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </Link>
                )}

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Shop Now
                </Button>
                
                {/* Display Auth/User Button for Mobile */}
                <AuthUserDisplay isMobile={true} />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal (No change needed) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500"
              onClick={() => setShowAuthModal(false)}
            >
              ✕
            </button>
            <Login onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;