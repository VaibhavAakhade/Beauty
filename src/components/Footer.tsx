import { Instagram, Facebook, Youtube, Mail, Phone, Linkedin } from "lucide-react";
import { Link } from "react-router-dom"; // <-- This is the line to keep

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">
                  L
                </span>
              </div>
              <span className="font-display text-2xl font-bold">
                Luxe Beauty
              </span>
            </div>
            <p className="text-background/70 mb-4">
              Premium cosmetic care with natural ingredients. Cruelty-free and
              vegan-friendly beauty products.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary transition-colors flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary transition-colors flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary transition-colors flex items-center justify-center"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/beautybloom-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary transition-colors flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Skincare
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Makeup
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Haircare
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <Link to="/cart" className="hover:text-primary transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="hover:text-primary transition-colors">
                  Earn Rewards
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-background/70">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Beauty Blog
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="hover:text-primary transition-colors">
                  Rewards Program
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-primary transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-background/70">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 7068187878</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>srjnupadhyay@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/70 text-sm">
              © {currentYear} Luxe Beauty. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-background/70">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping-policy" className="hover:text-primary transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;