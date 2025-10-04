"use client";

import { useState, useEffect, useCallback } from "react";
import CallbackModal from "../modal/CallbackModal";

interface CalculatorState {
  brand: string;
  model: string;
  dtype: string;
  age: string;
  year: string;
  urg: string;
  parts: string;
  prob: string;
  symptom: string;
  liquid: boolean;
}

const BASE_PRICES = {
  diag: 55,
  clean: 75,
  fan: 130,
  dcin: 140,
  kb: 180,
  screen: 220,
  mb: 260,
  ssd: 40,
  battery: 120,
  hinge: 150,
  "no-power": 120,
  "power-no-image": 150,
  spill: 180,
  overheat: 90,
  "no-charge": 120,
};

const BRAND_MULTIPLIERS = {
  Apple: { _all: 1.35, "MacBook Air": 1.25, "MacBook Pro": 1.45 },
  ASUS: { _all: 1.0, ROG: 1.25, TUF: 1.15, ZenBook: 1.1 },
  Acer: { _all: 0.95, Predator: 1.25, Swift: 1.02 },
  Lenovo: { _all: 1.0, ThinkPad: 1.12, Legion: 1.25, IdeaPad: 0.98 },
  HP: { _all: 0.98, OMEN: 1.25, Spectre: 1.1, Pavilion: 0.96 },
  Dell: { _all: 1.02, XPS: 1.15, Alienware: 1.25, Inspiron: 0.98 },
  MSI: { _all: 1.06, Stealth: 1.18, Titan: 1.25 },
  Huawei: { _all: 0.98, MateBook: 1.03 },
  Samsung: { _all: 1.0, "Galaxy Book": 1.05 },
  Xiaomi: { _all: 1.0, "Mi Notebook": 1.05, RedmiBook: 1.03 },
  Другой: { _all: 1.0 },
};

const DEVICE_TYPES = { office: 1.0, gaming: 1.25, ultra: 1.1, "2in1": 1.05 };
const URGENCY_MULTIPLIERS = { std: 1.0, fast: 1.3 };
const PARTS_MULTIPLIERS = { none: 1.0, compat: 1.0, oem: 1.15 };
const PROBLEM_MULTIPLIERS = { light: 1.0, mid: 1.15, hard: 1.3 };

const SYMPTOMS = [
  { value: "no-power", title: "Не включается", price: "от 60 до 150 BYN" },
  {
    value: "power-no-image",
    title: "Есть питание, но нет изображения",
    price: "от 80 до 200 BYN",
  },
  { value: "spill", title: "Залитие жидкостью", price: "от 120 до 350 BYN" },
  {
    value: "overheat",
    title: "Перегрев, шум, троттлинг",
    price: "от 70 до 180 BYN",
  },
  { value: "fan", title: "Замена вентилятора", price: "от 100 до 180 BYN" },
  { value: "no-charge", title: "Не заряжается", price: "от 60 до 160 BYN" },
  { value: "screen", title: "Замена экрана", price: "по модели" },
  { value: "kb", title: "Замена клавиатуры", price: "от 60 до 180 BYN" },
  { value: "battery", title: "Замена аккумулятора", price: "по модели" },
  { value: "ssd", title: "SSD/диск: апгрейд или замена", price: "от 40 BYN" },
  { value: "hinge", title: "Петли/корпус", price: "по дефекту" },
  { value: "diag", title: "Не уверен, нужна диагностика", price: "55 BYN" },
];

export default function PriceCalculator() {
  const [state, setState] = useState<CalculatorState>({
    brand: "",
    model: "",
    dtype: "office",
    age: "0-2",
    year: "",
    urg: "std",
    parts: "none",
    prob: "light",
    symptom: "diag",
    liquid: false,
  });

  const [price, setPrice] = useState<number | null>(null);
  const [term, setTerm] = useState<string>("—");
  const [sentence, setSentence] = useState<string>(
    "Укажите параметры выше. Пересчет происходит автоматически."
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const detectFamily = useCallback(
    (brand: string, model: string): string | null => {
      const map = BRAND_MULTIPLIERS[
        brand as keyof typeof BRAND_MULTIPLIERS
      ] || { _all: 1.0 };
      const keys = Object.keys(map).filter((k) => k !== "_all");
      const lowModel = (model || "").toLowerCase();
      return keys.find((k) => lowModel.includes(k.toLowerCase())) || null;
    },
    []
  );

  const calculateFactors = useCallback((): any => {
    const bfAll =
      BRAND_MULTIPLIERS[state.brand as keyof typeof BRAND_MULTIPLIERS]?.[
        "_all"
      ] ?? 1.0;
    const family = detectFamily(state.brand, state.model);
    const bfFam = family
      ? (BRAND_MULTIPLIERS[state.brand as keyof typeof BRAND_MULTIPLIERS]?.[
          family as keyof (typeof BRAND_MULTIPLIERS)[keyof typeof BRAND_MULTIPLIERS]
        ] as number) || 1.0
      : 1.0;

    const yearFactor =
      state.age === "0-2"
        ? 1.05
        : state.year && parseInt(state.year) >= 2020
        ? 1.05
        : 1.0;

    return {
      bf: bfAll * bfFam,
      df: DEVICE_TYPES[state.dtype as keyof typeof DEVICE_TYPES] || 1.0,
      yf: yearFactor,
      uf:
        URGENCY_MULTIPLIERS[state.urg as keyof typeof URGENCY_MULTIPLIERS] ||
        1.0,
      pf:
        PARTS_MULTIPLIERS[state.parts as keyof typeof PARTS_MULTIPLIERS] || 1.0,
      rf:
        PROBLEM_MULTIPLIERS[state.prob as keyof typeof PROBLEM_MULTIPLIERS] ||
        1.0,
      lf: state.liquid ? 1.3 : 1.0,
      family,
    };
  }, [state, detectFamily]);

  const calculatePrice = useCallback(() => {
    if (state.symptom === "diag") {
      return { key: "diag", mid: 55 };
    }

    let key = state.symptom;
    if (state.symptom === "overheat") key = "clean";
    if (state.symptom === "no-charge") key = "dcin";
    if (state.symptom === "no-power") key = "mb";
    if (state.symptom === "power-no-image") key = "screen";
    if (state.symptom === "spill") key = "mb";

    const base = BASE_PRICES[key as keyof typeof BASE_PRICES] ?? 0;
    const factors = calculateFactors();
    const raw =
      base *
      factors.bf *
      factors.df *
      factors.yf *
      factors.uf *
      factors.pf *
      factors.rf *
      factors.lf;

    const mid = (raw * 0.92 + raw * 1.12) / 2;

    return { key, mid };
  }, [state.symptom, calculateFactors]);

  const generateSentence = useCallback(
    (key: string, price: number) => {
      const device =
        [state.brand, state.model].filter(Boolean).join(" ").trim() ||
        "ноутбука";
      const yearStr = state.year ? ` ${state.year} года` : "";

      const serviceMap: { [key: string]: string } = {
        clean: "чистка и профилактика системы охлаждения",
        fan: "замена вентилятора",
        dcin: "ремонт разъема питания",
        kb: "замена клавиатуры",
        screen: "замена экрана",
        mb: "ремонт материнской платы",
        ssd: "замена/установка SSD",
        battery: "замена аккумулятора",
        hinge: "ремонт петель/корпуса",
        diag: "диагностика",
      };

      const service = serviceMap[key] || "ремонт";
      const urgency =
        state.urg === "fast" && key !== "diag" ? " с учётом срочности" : "";
      const liquid = state.liquid && key !== "diag" ? " после залития" : "";

      const formatPrice = (amount: number): string => {
        const rubles = Math.floor(amount);
        const kopecks = Math.round((amount - rubles) * 100);
        return `${rubles} BYN ${kopecks.toString().padStart(2, "0")} коп.`;
      };

      const baseSentence = `Ориентировочная стоимость ремонта ноутбука ${device}${yearStr}${liquid} — ${service} составит${urgency} — ${formatPrice(
        price
      )}.`;

      return key === "diag"
        ? `${baseSentence} При последующем ремонте стоимость диагностики не взимается. Срок исполнения: 1 час.`
        : `${baseSentence} Срок исполнения: ${
            state.urg === "fast" ? "от 6 часов" : "1 день"
          }.`;
    },
    [state]
  );

  useEffect(() => {
    const result = calculatePrice();
    setPrice(result.mid);

    const newTerm =
      state.symptom === "diag"
        ? "Срок: 1 час"
        : state.urg === "fast"
        ? "Срок: от 6 часов"
        : "Срок: 1 день";
    setTerm(newTerm);

    setSentence(generateSentence(result.key, result.mid));
  }, [state, calculatePrice, generateSentence]);

  const handleInputChange = (
    field: keyof CalculatorState,
    value: string | boolean
  ) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const formatPrice = (amount: number | null): string => {
    if (!amount) return "—";
    return `${Math.round(amount).toLocaleString("ru-RU")} BYN`;
  };

  const isStep3Disabled = state.symptom === "diag";

  return (
    <section
      className="w-full max-w-4xl mx-auto mt-14 px-3 sm:px-4 py-4 sm:py-6"
      aria-label="Калькулятор стоимости ремонта ноутбука"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center sm:text-left">
          Калькулятор стоимости ремонта ноутбука
        </h2>
        <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
          Оценка стоимости и сроков за 30 секунд. Итоговая смета после
          диагностики.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Step 1: Device Information */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-xs sm:shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full text-sm flex items-center justify-center mr-2 flex-shrink-0">
              1
            </span>
            О устройстве
          </h3>

          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 mb-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Бренд
              </label>
              <select
                value={state.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm sm:text-base"
              >
                <option value="">— выберите —</option>
                <option>Apple</option>
                <option>ASUS</option>
                <option>Acer</option>
                <option>Lenovo</option>
                <option>HP</option>
                <option>Dell</option>
                <option>MSI</option>
                <option>Huawei</option>
                <option>Samsung</option>
                <option>Xiaomi</option>
                <option>Другой</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Модель (можно пример)
              </label>
              <input
                type="text"
                value={state.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                placeholder="например, IdeaPad 5 15ALC05"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 mb-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Класс устройства
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "office", label: "Стандарт" },
                  { value: "ultra", label: "Ультрабук" },
                  { value: "gaming", label: "Игровой" },
                  { value: "2in1", label: "2-в-1" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center justify-center min-h-[42px] px-2 sm:px-3 py-2 rounded-lg border-2 cursor-pointer transition-all text-xs sm:text-sm ${
                      state.dtype === option.value
                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="dtype"
                      value={option.value}
                      checked={state.dtype === option.value}
                      onChange={(e) =>
                        handleInputChange("dtype", e.target.value)
                      }
                      className="sr-only"
                    />
                    <span className="font-medium text-center leading-tight">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Возраст устройства
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "0-2", label: "0–2 года" },
                  { value: "3-5", label: "3–5 лет" },
                  { value: "6+", label: "6+ лет" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center justify-center min-h-[42px] px-2 sm:px-3 py-2 rounded-lg border-2 cursor-pointer transition-all text-xs sm:text-sm ${
                      state.age === option.value
                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="age"
                      value={option.value}
                      checked={state.age === option.value}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-medium text-center leading-tight">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Год выпуска
              </label>
              <input
                type="number"
                value={state.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                min="2008"
                max="2026"
                placeholder="необязательно"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Срочность
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "std", label: "Обычная" },
                  { value: "fast", label: "Экспресс" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center justify-center min-h-[42px] px-2 sm:px-3 py-2 rounded-lg border-2 cursor-pointer transition-all text-xs sm:text-sm ${
                      state.urg === option.value
                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="urg"
                      value={option.value}
                      checked={state.urg === option.value}
                      onChange={(e) => handleInputChange("urg", e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-medium text-center">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Symptoms */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-xs sm:shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full text-sm flex items-center justify-center mr-2 flex-shrink-0">
              2
            </span>
            Что случилось
          </h3>

          <div className="grid grid-cols-1 gap-2 sm:gap-3 mb-4 max-h-[400px] sm:max-h-none overflow-y-auto pr-2">
            {SYMPTOMS.map((symptom) => (
              <label
                key={symptom.value}
                className={`relative flex items-start p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  state.symptom === symptom.value
                    ? "bg-blue-600 border-blue-600 text-white shadow-md"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="symptom"
                  value={symptom.value}
                  checked={state.symptom === symptom.value}
                  onChange={(e) => handleInputChange("symptom", e.target.value)}
                  className="sr-only"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm sm:text-sm mb-1 leading-tight">
                    {symptom.title}
                  </div>
                  <div
                    className={`text-xs ${
                      state.symptom === symptom.value
                        ? "text-white/90"
                        : "text-gray-500"
                    }`}
                  >
                    {symptom.price}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <p className="text-gray-600 text-xs sm:text-sm mb-3">
            Выберите один пункт или опишите проблему ниже.
          </p>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Опишите своими словами
            </label>
            <input
              type="text"
              placeholder="Например: шумит кулер, греется и выключается"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Step 3: Case Details */}
        <div
          className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-xs sm:shadow-sm relative ${
            isStep3Disabled ? "opacity-50" : ""
          }`}
        >
          <div className={isStep3Disabled ? "pointer-events-none" : ""}>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full text-sm flex items-center justify-center mr-2 flex-shrink-0">
                3
              </span>
              Детали случая
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Запчасти
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "none", label: "Не нужны" },
                  { value: "compat", label: "Копия" },
                  { value: "oem", label: "Оригинал" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center justify-center min-h-[42px] px-2 sm:px-3 py-2 rounded-lg border-2 cursor-pointer transition-all text-xs sm:text-sm ${
                      state.parts === option.value
                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="parts"
                      value={option.value}
                      checked={state.parts === option.value}
                      onChange={(e) =>
                        handleInputChange("parts", e.target.value)
                      }
                      disabled={isStep3Disabled}
                      className="sr-only"
                    />
                    <span className="font-medium text-center leading-tight">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Степень проблемы
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "light", label: "Лёгкая" },
                  { value: "mid", label: "Средняя" },
                  { value: "hard", label: "Сильная" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center justify-center min-h-[42px] px-2 sm:px-3 py-2 rounded-lg border-2 cursor-pointer transition-all text-xs sm:text-sm ${
                      state.prob === option.value
                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="prob"
                      value={option.value}
                      checked={state.prob === option.value}
                      onChange={(e) =>
                        handleInputChange("prob", e.target.value)
                      }
                      disabled={isStep3Disabled}
                      className="sr-only"
                    />
                    <span className="font-medium text-center">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {isStep3Disabled && (
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/50 to-gray-50/50 border-2 border-dashed border-gray-300 pointer-events-none flex items-center justify-center">
              <span className="text-gray-500 text-sm font-medium">
                Выберите диагностику для активации
              </span>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-xs sm:shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Итоговый расчёт
          </h3>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
            <div className="text-gray-600 text-sm mb-2">
              Ориентировочная стоимость
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {formatPrice(price)}
            </div>
            <div className="text-gray-600 text-sm">{term}</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 sm:mb-6 border border-gray-200">
            <p className="text-gray-700 text-sm leading-relaxed">{sentence}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <a
              href="/price"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-center hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Прайс
            </a>
            <a
              href="/remont-noutbukov"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-center hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Ремонт ноутбуков
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 px-4 rounded-lg font-semibold text-center hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-3 px-4 sm:hidden shadow-lg">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex flex-col">
            <div className="text-gray-600 text-xs">Стоимость</div>
            <div className="font-bold text-gray-900 text-lg">
              {formatPrice(price)}
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-2.5 px-5 rounded-xl font-semibold hover:shadow-lg transition-all text-sm whitespace-nowrap"
          >
            Оставить заявку
          </button>
        </div>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-20 sm:h-0"></div>

      {/* Modal */}
      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
