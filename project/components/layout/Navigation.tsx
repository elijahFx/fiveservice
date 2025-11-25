'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // Закрываем меню при скролле
      setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Закрываем меню если клик был вне меню и вне кнопки меню
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Добавляем обработчики
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    // Убираем обработчики при размонтировании
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/services/#navbar', label: 'Цены' },
    { href: '/articles/#navbar', label: 'Статьи' },
    { href: '/corporate/#navbar', label: 'Юр. лицам' },
    { href: '/questions/#navbar', label: 'Вопросы' },
    { href: '/reviews/#navbar', label: 'Отзывы' },
    { href: '/about/#navbar', label: 'О нас' },
  ];

  return (
    <nav id="navbar" className="fixed top-0 w-full z-50 bg-white shadow-md transition-all duration-300">
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
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-3 text-base font-semibold text-navy-600 bg-white border-b-2 border-navy-600 hover:bg-navy-50 hover:border-navy-700 active:bg-navy-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 mb-2"
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
          <div className="lg:hidden">
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-navy-600 bg-white border-b-2 border-navy-600 hover:bg-navy-50 hover:border-navy-700 active:bg-navy-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            ref={menuRef}
            className="lg:hidden bg-white border-t shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-2 py-3 text-base font-semibold text-navy-700 bg-white border-b-2 border-navy-600 hover:bg-navy-50 hover:border-navy-700 active:bg-navy-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 mb-2"
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