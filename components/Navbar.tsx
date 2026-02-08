
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/cars' },
    { name: 'Hatchback', path: '/category/Hatchback' },
    { name: 'SUV', path: '/category/SUV' },
    { name: 'Luxury', path: '/category/Luxury' },
  ];

  return (
    <nav className="bg-primary text-white sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <span className="text-secondary">Baroda</span>
          <span>Cars</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="hover:text-secondary transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="tel:+919876543210" 
            className="bg-secondary px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            Call Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-dark border-t border-blue-900 px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="block hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="tel:+919876543210" 
            className="block bg-secondary text-center px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            Call Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
