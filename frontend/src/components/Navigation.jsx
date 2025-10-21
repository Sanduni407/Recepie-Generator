import React, { useState } from 'react';
import { Menu, X, User, Search, Coffee } from 'lucide-react'; 
import logo from '../assets/recepie.png'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const redColor = '#B91C1C';

  const navItems = [
    { name: 'HOME', href: '/', active: true },
    { name: 'BLOG', href: '/blog' },
    { name: 'RECIPE', href: '/generator' },
    { name: 'CONTACT US', href: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
         {/* Logo */}
<div className="flex items-center">
  <div className="flex-shrink-0 flex items-center">
    {/* Small logo image */}
    <div className="w-14 h-14 mr-2">
      <img src={logo} alt="Logo" className="w-full h-full object-contain" />
    </div>
    <span className="text-xl font-bold text-gray-800">MasterChef</span>
  </div>
</div>


          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200`}
                  style={{
                    color: item.active ? redColor : '#6B7280',
                    borderBottom: item.active ? `2px solid ${redColor}` : '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!item.active) {
                      e.target.style.color = redColor;
                      e.target.style.borderBottom = `2px solid ${redColor}`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.active) {
                      e.target.style.color = '#6B7280';
                      e.target.style.borderBottom = '2px solid transparent';
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {[Search, User, Menu].map((Icon, idx) => (
              <button
                key={idx}
                className="text-gray-600 transition-colors duration-200"
                onMouseEnter={(e) => e.target.style.color = redColor}
                onMouseLeave={(e) => e.target.style.color = '#6B7280'}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 transition-colors duration-200"
              onMouseEnter={(e) => e.target.style.color = redColor}
              onMouseLeave={(e) => e.target.style.color = '#6B7280'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium transition-colors duration-200"
                style={{
                  color: item.active ? redColor : '#6B7280',
                  backgroundColor: item.active ? `${redColor}20` : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.target.style.color = redColor;
                    e.target.style.backgroundColor = `${redColor}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    e.target.style.color = '#6B7280';
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-4 px-3 py-2 border-t mt-4">
              {[Search, User].map((Icon, idx) => (
                <button
                  key={idx}
                  className="text-gray-600 transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = redColor}
                  onMouseLeave={(e) => e.target.style.color = '#6B7280'}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
