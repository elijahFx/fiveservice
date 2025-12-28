"use client";

import { useState, useEffect } from "react";
import logoImg from "../../public/fs2.svg";
import Image from "next/image";
import {
  validatePhone,
  getFieldValidity,
  cleanPhone,
  formatPhoneSimple,
} from "@/lib/validation";

interface FormData {
  name: string;
  phone: string;
  note: string;
  agree: boolean;
}

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: FormData;
}

export default function CallbackModal({
  isOpen,
  onClose,
  initialData,
}: CallbackModalProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    note: "",
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let newValue = value;

    // Автоматическое форматирование телефона
    if (name === "phone") {
      newValue = formatPhoneSimple(value);
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));

    // Проверяем валидность поля в реальном времени (только когда поле заполнено)
    if ((name === "phone" || name === "email") && newValue.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: !getFieldValidity(name, newValue),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем валидность всех полей перед отправкой
    const errors = {
      phone: form.phone.trim() && !validatePhone(form.phone),
    };

    setFieldErrors(errors);

    // Если есть ошибки валидации, не отправляем форму
    if (Object.values(errors).some((error) => error)) {
      alert("Пожалуйста, проверьте правильность введенного номера телефона");
      return;
    }

    if (!form.agree) {
      alert("Необходимо принять условия обработки персональных данных");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("https://testend2.site/api/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: cleanPhone(form.phone), // Очищаем телефон перед отправкой
          content: form.note,
          type: "callback_request",
        }),
      });

      if (res.ok) {
        const result = await res.json();
        alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
        onClose();
        setForm(initialData || { name: "", phone: "", note: "", agree: false });
        setFieldErrors({});
      } else {
        throw new Error(`Ошибка сервера: ${res.status}`);
      }
    } catch (err) {
      console.error("Ошибка при отправке заявки:", err);
      alert("Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // ВАРИАНТ 1: ТЕХНО-СИНИЙ (рекомендуемый для IT)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white p-6 rounded-lg shadow-xl w-full max-w-md relative border-2 border-cyan-400 overflow-hidden">
        {/* Фоновое SVG изображение */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={logoImg}
            alt="Фон"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "left center",
              padding: "0.5rem",
              filter: "brightness(0) invert(1) opacity(0.1)",
              transform: "scale(1.4) translateX(10%)",
            }}
            className="select-none pointer-events-none"
          />
          {/* Техно-сетка */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>

        {/* Контент поверх фона */}
        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-white hover:text-cyan-300 text-xl font-bold transition-colors p-2"
          >
            ✕
          </button>

          <h2 className="text-xl font-bold text-white mb-3 pr-6">
            Перезвоним Вам в рабочее время
          </h2>

          <div className="space-y-3 mb-4">
            <p className="text-sm text-gray-200">
              <strong>Звонок поступит в рабочее время.</strong>
            </p>

            <p className="text-sm text-gray-200">
              <strong>Время работы сервиса:</strong>
              <br />
              пн.-пт. с 9:00 до 19:00
              <br />
              сб., вс. с 10:00 до 16:00
            </p>

            <p className="text-sm text-gray-200">
              Если вам срочно нужна помощь вне рабочего времени, укажите в
              примечании слово <b className="text-cyan-300">СРОЧНО</b>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1 text-gray-200 font-medium">
                Имя *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-cyan-400/50 rounded-md bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                placeholder="Ваше имя"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-200 font-medium">
                Телефон *
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm ${
                  fieldErrors.phone
                    ? "border-red-500"
                    : "border-cyan-400/50"
                }`}
                placeholder="+375 29 123 45 67"
                required
              />
              {fieldErrors.phone && (
                <p className="text-red-400 text-xs mt-1">
                  Введите телефон в формате: +375 29 123 45 67
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-200 font-medium">
                Примечание
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-cyan-400/50 rounded-md bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                placeholder="Укажите 'СРОЧНО' если нужен срочный звонок"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="accent-cyan-400 mt-0.5"
                required
              />
              <span className="text-xs text-gray-300">
                Я принимаю условия обработки моих{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-cyan-300 underline font-medium hover:text-cyan-200 transition-colors"
                >
                  персональных данных
                </a>
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-cyan-400/30 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}