"use client";

import { useState, useEffect } from "react";
import logoImg from "../../public/fs.svg";
import Image from "next/image";

interface FormData {
  name: string;
  phone: string;
  note: string;
  agree: boolean;
}

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: FormData; // Добавляем опциональный пропс для начальных данных
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

  // Обновляем форму при получении новых initialData
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

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          phone: form.phone,
          content: form.note,
          type: "callback_request",
        }),
      });

      if (res.ok) {
        const result = await res.json();
        alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
        onClose();
        // Сбрасываем форму к исходным данным (но не к пустым)
        setForm(initialData || { name: "", phone: "", note: "", agree: false });
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-black text-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative border-2 border-[#90D5FF] overflow-hidden">
        {/* Фоновое SVG изображение внутри модального окна */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={logoImg}
            alt="Фон"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "left center",
              padding: "0.5rem",
              filter:
                "brightness(0) invert(1) opacity(0.50) drop-shadow(0 0 0 #90D5FF)",
              transform: "scale(1.4) translateX(10%)",
            }}
            className="select-none pointer-events-none"
          />
        </div>

        {/* Контент поверх фона */}
        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-white hover:text-blue-600 text-xl font-bold transition-colors"
          >
            ✕
          </button>

          <h2 className="text-xl font-bold text-white mb-3 pr-6">
            Перезвоним Вам в рабочее время
          </h2>

          <div className="space-y-3 mb-4">
            <p className="text-sm text-white">
              <strong>Звонок поступит в рабочее время.</strong>
            </p>

            <p className="text-sm text-white">
              <strong>Время работы сервиса:</strong>
              <br />
              пн.-пт. с 9:00 до 19:00
              <br />
              сб., вс. с 10:00 до 16:00
            </p>

            <p className="text-sm text-white">
              Если вам срочно нужна помощь вне рабочего времени, укажите в
              примечании слово <b>СРОЧНО</b>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1 text-white font-medium">
                Имя *
              </label>
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
              <label className="block text-sm mb-1 text-white font-medium">
                Телефон *
              </label>
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
              <label className="block text-sm mb-1 text-white font-medium">
                Примечание
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={4} // Увеличиваем высоту для лучшего отображения данных
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
                className="accent-blue-600 mt-0.5"
                required
              />
              <span className="text-xs text-white">
                Я принимаю условия обработки моих{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-blue-600 underline font-medium hover:text-blue-400 transition-colors"
                >
                  персональных данных
                </a>
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}