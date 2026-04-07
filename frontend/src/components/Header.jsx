import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-brand-black shadow-lg z-50 border-b border-brand-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1">
          <div className="flex items-center space-x-2">
            <a href="#home">
              <img src={logo} className="w-18 h-16 cursor-pointer" />
            </a>
            <span className="text-xl font-bold text-brand-gold font-serif">
              B Next Events
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-brand-gold-light hover:text-brand-gold transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-gradient-to-r from-brand-orange to-brand-yellow text-brand-black px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 font-semibold"
            >
              Book Now
            </a>
            <a
              href="http://localhost:5174"
              target="_blank"
              className="bg-gradient-to-r from-brand-orange to-brand-yellow text-brand-black px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 font-semibold"
            >
              Login
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6 text-brand-gold" />
            ) : (
              <FiMenu className="h-6 w-6 text-brand-gold" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-brand-gold-light hover:text-brand-gold transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="bg-gradient-to-r from-brand-orange to-brand-yellow text-brand-black px-6 py-2 rounded-full mt-4 hover:shadow-lg transition-all duration-200 font-semibold text-center"
              >
                Book Now
              </a>
              <a
                href="http://localhost:5174"
                target="_blank"
                className="bg-gradient-to-r from-brand-orange to-brand-yellow text-brand-black px-6 py-2 rounded-full mt-4 hover:shadow-lg transition-all duration-200 font-semibold text-center"
              >
                Login
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
