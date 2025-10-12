import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, ChevronDown } from 'lucide-react';

// --- Announcement Bar Data ---
const announcements = [
  "MID-SEASON SALE: UP TO 50% OFF",
  "FREE SHIPPING ON ALL ORDERS",
  "COMPLIMENTARY SAMPLES ON ORDERS OVER ₹999",
];

// --- Category Navigation Data ---
const categories = [
  "Offers", "Face", "Bath & Body", "Hair", "Makeup", "Gifting", "Travel Minis", "Wellness", "Fragrance", "About Us", "Exclusives!"
];

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % announcements.length);
    }, 4000); // Change message every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white text-gray-800 w-full">
      {/* 1. Top Announcement Bar */}
      <div className="bg-black text-white text-center py-2 px-4 text-xs font-light overflow-hidden h-8 flex items-center justify-center">
        <div className="relative h-full w-full">
          {announcements.map((text, index) => (
            <span
              key={index}
              className={`absolute w-full transition-transform duration-700 ease-in-out ${currentIndex === index ? 'translate-y-0' : 'translate-y-full'}`}
            >
              {text.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Main Logo & Actions Bar */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Actions */}
        <div className="flex items-center gap-6 text-sm">
          <Search className="h-5 w-5 cursor-pointer" />
          <span className="cursor-pointer">STORES</span>
          <span className="flex items-center cursor-pointer">
            ₹ INR <ChevronDown className="h-4 w-4 ml-1" />
          </span>
        </div>

        {/* Center Logo */}
        <div className="text-center">
          <Link to="/" className="font-display text-4xl text-[#5c4a32] tracking-wider">
            BeautyBloom
          </Link>
          <p className="text-xs text-gray-500 tracking-[0.2em]">LUXURIOUS & PURE</p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6 text-sm">
          <Link to="/login">ACCOUNT</Link>
          <span className="cursor-pointer">SOUNDARYA CLUB</span>
          <Link to="/cart" className="relative">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </Link>
        </div>
      </div>
      
      {/* 3. Category Navigation Bar */}
      <nav className="border-y border-gray-200">
        <div className="container mx-auto px-6 py-3 flex justify-center items-center gap-8 text-sm tracking-wider">
          {categories.map((category) => (
            <Link 
              key={category} 
              to={`/${category.toLowerCase().replace(/ /g, '-')}`} 
              className="hover:text-[#a08464] transition-colors"
            >
              {category.toUpperCase()}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}