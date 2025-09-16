'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/services', label: 'Услуги' },
    { href: '/articles', label: 'Статьи' },
    { href: '/corporate', label: 'Юр. лицам' },
    { href: '/questions', label: 'Вопросы' },
    { href: '/reviews', label: 'Отзывы' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FS</span>
            </div>
            <span className="font-bold text-xl text-navy-900 transition-colors">
              FiveService
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-navy-700 hover:bg-navy-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-600 rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <Button size="sm" className="bg-navy-600 hover:bg-navy-700 focus:ring-2 focus:ring-navy-600 focus:ring-offset-2">
              <Phone className="w-4 h-4 mr-2" />
              <a href="tel:+375297349077">Позвонить</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-800 hover:text-navy-700 hover:bg-navy-50 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-navy-50 hover:text-navy-700 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button size="sm" className="w-full bg-navy-600 hover:bg-navy-700 focus:ring-2 focus:ring-navy-600 focus:ring-offset-2">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href="tel:+375297349077">Позвонить</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;