'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ClickableAddress } from '@/components/ui/clickable-address';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Качественно отремонтируем ваш ноутбук. Обращайтесь любым удобным способом
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="lg:pr-8">
            <h3 className="text-2xl font-semibold mb-8 text-gray-900">Контактная информация</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-navy-600 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">Адрес</h4>
                  <ClickableAddress 
                    address="г. Минск, ул. Восточная, 129"
                    className="text-gray-600"
                    showIcon={false}
                  />
                  <a href="" className="text-navy-600 hover:text-navy-700 text-sm mt-1 inline-block">
                    Как к нам пройти
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-navy-600 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">Телефоны</h4>
                  <div className="space-y-1">
                    <p><a href="tel:+375297349077" className="text-navy-600 hover:text-navy-700">+375 29 734 90 77</a></p>
                    <p><a href="tel:+375447534796" className="text-navy-600 hover:text-navy-700">+375 44 753 47 96</a></p>
                    <p><a href="tel:+375257849731" className="text-navy-600 hover:text-navy-700">+375 25 784 97 31</a></p>
                    <p><a href="tel:+375172424111" className="text-navy-600 hover:text-navy-700">+375 17 24 24 111</a></p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-navy-600 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">Email</h4>
                  <p>
                    <a href="mailto:friends.service129@gmail.com" className="text-navy-600 hover:text-navy-700">
                      friends.service129@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-navy-600 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">Режим работы</h4>
                  <p className="text-gray-600">Пн-Пт 9:00-19:00</p>
                  <p className="text-gray-600">Сб-Вс 10:00-16:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-white lg:pl-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Оставить заявку</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-base font-medium text-gray-700">
                  Ваше имя *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-2"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-medium text-gray-700">
                  Телефон *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-2"
                  placeholder="+375 __ ___ __ __"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-base font-medium text-gray-700">
                  Описание проблемы
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-2"
                  rows={4}
                  placeholder="Опишите вашу проблему..."
                />
              </div>

              <Button type="submit" className="w-full bg-navy-600 hover:bg-navy-700 py-3">
                <Send className="w-4 h-4 mr-2" />
                Отправить заявку
              </Button>

              <p className="text-sm text-gray-600 text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;