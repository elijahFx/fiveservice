'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', note: '', agree: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const benefits = [
    'Ремонт за 1-3 дня',
    'Средняя оценка по отзывам — 5,0',
    'Гарантия на детали и работы'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert('Необходимо принять условия обработки персональных данных');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('https://testend.site/api/claims', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: form.note,
          type: 'callback_request'
        }),
      });

      if (res.ok) {
        const result = await res.json();
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        setIsOpen(false);
        setForm({ name: '', phone: '', note: '', agree: false });
      } else {
        throw new Error(`Ошибка сервера: ${res.status}`);
      }
    } catch (err) {
      console.error('Ошибка при отправке заявки:', err);
      alert('Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/5081929/pexels-photo-5081929.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Ремонт ноутбуков"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Экспертный
            <span className="block text-blue-400">ремонт ноутбуков</span>
            в Минске
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Отремонтируем ваш ноутбук быстро, качественно и с гарантией.  
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-navy-600 hover:bg-navy-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              <a href="tel:+375297349077">+375 29 734 90 77</a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-navy-600 hover:bg-white hover:text-navy-900 px-8 py-4 text-lg font-semibold"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Оставить заявку
            </Button>
          </div>

          {/* Additional Phones */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm mb-2">Дополнительные номера:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="tel:+375447534796" className="text-blue-400 hover:text-blue-300">+375 44 753 47 96</a>
              <a href="tel:+375257849731" className="text-blue-400 hover:text-blue-300">+375 25 784 97 31</a>
              <a href="tel:+375172424111" className="text-blue-400 hover:text-blue-300">+375 17 24 24 111</a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-black text-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative border-2 border-[#90D5FF] ">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-blue-600 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-white mb-3">
              Перезвоним Вам в рабочее время
            </h2>

            <div className="space-y-3 mb-4">
              <p className="text-sm text-white">
                <strong>Звонок поступит в рабочее время.</strong>
              </p>
              
              <p className="text-sm text-white">
                <strong>Время работы сервиса:</strong><br />
                пн.-пт. с 9:00 до 19:00<br />
                сб., вс. с 10:00 до 16:00
              </p>

              <p className="text-sm text-white">
                Если вам срочно нужна помощь вне рабочего времени, укажите в примечании слово <b>СРОЧНО</b>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm mb-1 text-white font-medium">Имя *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-400 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-white font-medium">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-400 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-white font-medium">Примечание</label>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-blue-400 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Укажите 'СРОЧНО' если нужен срочный звонок"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="accent-blue-600 mt-auto mb-auto"
                  required
                />
                <span className="text-xs text-white">
                  Я принимаю условия обработки моих{" "}
                  <a href="/privacy-policy" target="_blank" className="text-blue-600 underline font-medium">
                    персональных данных
                  </a>
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;