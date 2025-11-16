"use client";

import { useState, lazy, Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ClickableAddress } from "@/components/ui/clickable-address";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  Navigation,
} from "lucide-react";
import Link from "next/link";
import { validatePhone, formatPhone, cleanPhone } from "@/lib/validation";

// Динамический импорт LocationImages
const LocationImages = lazy(() => import("./LocationImages"));

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showLocationImages, setShowLocationImages] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    let newValue = value;
    
    // Автоматическое форматирование телефона
    if (name === 'phone') {
      newValue = formatPhone(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Очищаем ошибку при вводе
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Проверка имени
    if (!formData.name.trim()) {
      errors.name = 'Имя обязательно для заполнения';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа';
    }
    
    // Проверка телефона
    if (!formData.phone.trim()) {
      errors.phone = 'Телефон обязателен для заполнения';
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Введите телефон в формате: +375 29 123 45 67';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAgreed) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
      return;
    }

    // Валидация формы
    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://testend2.site/api/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: cleanPhone(formData.phone),
          content: formData.message.trim(),
          type: "contact_form",
          source: "contact_page",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", message: "" });
        setIsAgreed(false);
        setFieldErrors({});

        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openYandexMaps = () => {
    window.open("https://yandex.by/maps/?rtext=~53.939402,27.597530", "_blank");
  };

  const handleFindUsClick = () => {
    setShowLocationImages(true);
  };

  // Компонент-заглушка для загрузки
  const LocationImagesFallback = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4">
        <div className="flex justify-center mb-4">
          <Loader2 className="w-8 h-8 animate-spin text-navy-600" />
        </div>
        <p className="text-center text-gray-600">Загрузка изображений...</p>
      </div>
    </div>
  );

  return (
    <section id="contact-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Качественно отремонтируем ваш ноутбук. Обращайтесь любым удобным
            способом
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="lg:pr-8">
            <h3 className="text-2xl font-semibold mb-8 text-gray-900">
              Контактная информация
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-navy-600 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900">Адрес</h4>
                  <ClickableAddress
                    address="г. Минск, ул. Восточная, 129"
                    className="text-gray-600"
                    showIcon={false}
                  />

                  {/* Яндекс Карта */}
                  <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <iframe
                      src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeae9dc037665c292726dd0ce09b66ed04342ebe1f57a6230392d0f3d05c08454&amp;source=constructor"
                      width="200"
                      height="100"
                      frameBorder="0"
                      className="w-full"
                      style={{ border: "none" }}
                      loading="lazy"
                    />
                  </div>

                  {/* Кнопка "Найти нас" */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={openYandexMaps}
                      className="bg-navy-600 hover:bg-navy-700 flex items-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Построить маршрут
                    </Button>

                    <Button
                      onClick={handleFindUsClick}
                      variant="outline"
                      className="border-navy-600 text-navy-600 hover:bg-navy-50 flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Найти нас
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-navy-600 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">
                    Телефоны
                  </h4>
                  <div className="space-y-1">
                    <p>
                      <a
                        href="tel:+375297349077"
                        className="text-navy-600 hover:text-navy-700"
                      >
                        +375 29 734 90 77
                      </a>
                    </p>
                    <p>
                      <a
                        href="tel:+375447534796"
                        className="text-navy-600 hover:text-navy-700"
                      >
                        +375 44 753 47 96
                      </a>
                    </p>
                    <p>
                      <a
                        href="tel:+375257849731"
                        className="text-navy-600 hover:text-navy-700"
                      >
                        +375 25 784 97 31
                      </a>
                    </p>
                    <p>
                      <a
                        href="tel:+375172424111"
                        className="text-navy-600 hover:text-navy-700"
                      >
                        +375 17 24 24 111
                      </a>
                    </p>
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
                    <a
                      href="mailto:friends.service129@gmail.com"
                      className="text-navy-600 hover:text-navy-700"
                    >
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
                  <h4 className="font-semibold text-lg text-gray-900">
                    Режим работы
                  </h4>
                  <p className="text-gray-600">Пн-Пт 9:00-19:00</p>
                  <p className="text-gray-600">Сб-Вс 10:00-16:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-white">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Оставить заявку
            </h3>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее
                  время.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">
                  {!isAgreed
                    ? "❌ Для отправки заявки необходимо согласие на обработку персональных данных"
                    : "❌ Пожалуйста, проверьте правильность заполнения формы"}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="name"
                  className="text-base font-medium text-gray-700"
                >
                  Ваше имя *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-2 ${
                    fieldErrors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  placeholder="Введите ваше имя"
                  disabled={isSubmitting}
                />
                {fieldErrors.name && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className="text-base font-medium text-gray-700"
                >
                  Телефон *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`mt-2 ${
                    fieldErrors.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  placeholder="+375 29 123 45 67"
                  disabled={isSubmitting}
                />
                {fieldErrors.phone && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="message"
                  className="text-base font-medium text-gray-700"
                >
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
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreement"
                  checked={isAgreed}
                  onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                  disabled={isSubmitting}
                />
                <Label
                  htmlFor="agreement"
                  className="text-sm text-gray-600 leading-tight cursor-pointer"
                >
                  Согласен на обработку моих персональных данных в соответствии
                  с{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-navy-600 hover:text-navy-700 underline"
                  >
                    политикой конфиденциальности
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-navy-600 hover:bg-navy-700 py-3"
                disabled={isSubmitting || !isAgreed}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Отправить заявку
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Модальное окно с изображениями входа */}
      {showLocationImages && (
        <Suspense fallback={<LocationImagesFallback />}>
          <LocationImages onClose={() => setShowLocationImages(false)} />
        </Suspense>
      )}
    </section>
  );
};

export default Contact;