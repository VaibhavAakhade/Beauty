// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Shield, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Login from "./forms/login";
import { useAuth } from "../context/AuthContext";
import { useCart } from "@/context/CartContext";
import { CartPreview } from "./cart/CartPreview";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();

  const mainMenuItems = [
    { label: "Home", path: "/", scroll: "home" },
    { label: "Shop", path: "/", scroll: "products" },
    { label: "About", path: "/about" },
    { label: "Reviews", path: "/reviews" },
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faq", icon: HelpCircle }
  ];

  const authMenuItems = [
    { label: "Orders", path: "/orders" }
  ];

  const { cartItems = [], resetCart } = useCart(); // ✅ added resetCart
  const cartCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);

  const { user, role, logout } = useAuth();
  const isAuthenticated = !!user;
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLoginClick = () => {
    if (!isAuthenticated) setShowAuthModal(true);
  };

  // ✅ Updated logout function (clears cart too)
  const handleLogout = () => {
    logout(); // clears token/session
    resetCart(); // clears cart context
  };

  const getUserDisplayName = () => {
    const name = user?.name;
    if (name) return name.charAt(0).toUpperCase() + name.slice(1);
    return "Profile";
  };

  const AuthUserDisplay = ({ isMobile = false }) => {
    if (isAuthenticated) {
      return (
        <div
          className={`flex items-center space-x-2 ${
            isMobile ? "flex-col space-y-2 w-full" : ""
          }`}
        >
          <span
            className={`${
              isMobile ? "w-full text-center" : "hidden sm:inline-block"
            } font-semibold text-sm text-primary`}
          >
            Welcome, {getUserDisplayName()} ✨
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleLogout} // ✅ updated here
            className={`${
              isMobile ? "w-full" : ""
            } border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full`}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      );
    }

    return (
      <Button
        size="sm"
        variant="outline"
        onClick={handleLoginClick}
        className={`${
          isMobile ? "w-full" : "w-auto"
        } border-2 border-spacing-2 text-secondary hover:bg-secondary text-black rounded-full`}
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
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">
                  L
                </span>
              </div>
              <span className="font-display text-2xl font-bold text-gradient">
                Luxe Beauty
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {mainMenuItems.map((item, index) => (
                item.scroll && location.pathname === "/" ? (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.scroll)}
                    className="text-foreground hover:text-primary font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={`text-foreground hover:text-primary font-medium transition-colors duration-200 flex items-center gap-2 ${
                      location.pathname === item.path ? "text-primary" : ""
                    }`}
                    onClick={() => item.scroll && scrollToSection(item.scroll)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </Link>
                )
              ))}

              {/* Admin Link */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-primary hover:text-primary/80 border-2 border-primary/50 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <Shield className="w-4 h-4 mr-1" /> Admin
                </Link>
              )}

              {/* Auth Menu Items */}
              {isAuthenticated && authMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`text-foreground hover:text-primary font-medium transition-colors duration-200 flex items-center gap-2 ${
                    location.pathname === item.path ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Cart Preview */}
              <CartPreview />

              {/* User/Auth */}
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
              {mainMenuItems.map((item, index) => (
                item.scroll && location.pathname === "/" ? (
                  <button
                    key={index}
                    onClick={() => {
                      scrollToSection(item.scroll);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors flex items-center gap-2"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={`block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors flex items-center gap-2 ${
                      location.pathname === item.path ? "text-primary" : ""
                    }`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      item.scroll && scrollToSection(item.scroll);
                    }}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </Link>
                )
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center text-primary hover:text-primary/80 border-2 border-primary/50 px-4 py-2 rounded-full text-sm flex items-center justify-center"
                >
                  <Shield className="w-4 h-4 mr-2" /> Admin
                </Link>
              )}

              {/* Auth Menu Items for Mobile */}
              {isAuthenticated && authMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Cart Link for Mobile */}
              <Link
                to="/cart"
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart ({cartCount})
              </Link>

              <AuthUserDisplay isMobile={true} />
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
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
