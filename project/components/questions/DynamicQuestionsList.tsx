'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Phone, MessageCircle, Send, X } from 'lucide-react';

interface Question {
  id: number;
  content: string;
  answer: string;
  author?: string;
  createdAt?: string;
}

const DynamicQuestionList = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    content: '',
    author: ''
  });
  const [notifications, setNotifications] = useState<{id: number, message: string, type: 'success' | 'error'}[]>([]);

  // Добавление уведомления
  const addNotification = (message: string, type: 'success' | 'error' = 'error') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Удаление уведомления
  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Загрузка вопросов с сервера
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://testend2.site/api/questions/answered-featured');
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки вопросов');
      }
      
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  // Отправка нового вопроса
  const submitQuestion = async () => {
    if (!newQuestion.content.trim() || !newQuestion.author.trim()) {
      addNotification('Заполните все поля');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('https://testend2.site/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newQuestion.content,
          author: newQuestion.author
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки вопроса');
      }

      const createdQuestion = await response.json();
      
      // Добавляем новый вопрос в начало списка
      setQuestions(prev => [createdQuestion, ...prev]);
      
      // Очищаем форму
      setNewQuestion({ content: '', author: '' });
      
      addNotification('Вопрос отправлен! Мы ответим в ближайшее время', 'success');
    } catch (error) {
      console.error('Ошибка:', error);
      addNotification('Не удалось отправить вопрос');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="pb-10 bg-gray-50 relative">
      {/* Уведомления */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg border-l-4 ${
              notification.type === 'success'
                ? 'bg-green-50 border-green-500 text-green-800'
                : 'bg-red-50 border-red-500 text-red-800'
            } transition-all duration-300 transform animate-in slide-in-from-right`}
          >
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium">{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-4 flex-shrink-0 hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Форма для нового вопроса */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Задайте свой вопрос
            </h3>
            
            <div className="space-y-4">
              <div>
                <input
                  placeholder="Ваше имя"
                  value={newQuestion.author}
                  onChange={(e) => setNewQuestion(prev => ({
                    ...prev,
                    author: e.target.value
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent"
                  disabled={submitting}
                />
              </div>
              
              <div>
                <input
                  placeholder="Ваш вопрос"
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion(prev => ({
                    ...prev,
                    content: e.target.value
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent"
                  disabled={submitting}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      submitQuestion();
                    }
                  }}
                />
              </div>
              
              <button
                onClick={submitQuestion}
                disabled={submitting || !newQuestion.content.trim() || !newQuestion.author.trim()}
                className="w-full bg-navy-600 hover:bg-navy-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-md transition-colors flex items-center justify-center"
              >
                {submitting ? (
                  'Отправка...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Отправить вопрос
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Список вопросов */}
        <div className="space-y-4">
          {loading ? (
            // Скелетон загрузки
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
                </div>
              </div>
            ))
          ) : questions.length === 0 ? (
            // Сообщение если нет вопросов
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Пока нет вопросов. Будьте первым, кто задаст вопрос!
              </p>
            </div>
          ) : (
            // Список вопросов
            questions.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2"
                  aria-expanded={openItems.includes(item.id)}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.content}
                    </h3>
                    {item.author && (
                      <p className="text-sm text-gray-500 mt-1">
                        От: {item.author}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {openItems.includes(item.id) ? (
                      <ChevronUp className="w-5 h-5 text-navy-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-navy-600" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(item.id) 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed pt-4">
                      {item.answer || 'Наш специалист скоро ответит на ваш вопрос...'}
                    </p>
                    {item.createdAt && (
                      <p className="text-sm text-gray-500 mt-3">
                        Добавлено: {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <div className="bg-navy-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Нужна срочная консультация?</h3>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом, и наши мастера ответят на все ваши вопросы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+375297349077"
                className="inline-flex items-center px-8 py-4 bg-white text-navy-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                +375 29 734 90 77
              </a>
              <a 
                href="https://t.me/fiveservice_by"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Telegram
              </a>
              <a 
                href="viber://add?number=375447534796"
                className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Viber
              </a>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact-section');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#contact-section';
                  }
                }}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-navy-600 transition-colors"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicQuestionList;