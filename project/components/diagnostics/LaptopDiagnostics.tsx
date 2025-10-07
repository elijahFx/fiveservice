// components/LaptopDiagnostics.tsx
'use client';

import { useState } from 'react';

interface DiagnosisStep {
  id: string;
  title: string;
  options: {
    label: string;
    target: string;
    category: string;
    symptom?: string;
    eventAction: string;
    emoji: string;
  }[];
}

interface DiagnosisResult {
  id: string;
  backTarget: string;
  title: string;
  diagnosis: string;
  description: string;
  additionalLink?: {
    text: string;
    href: string;
  };
  ctaText: string;
  eventAction: string;
}

export default function LaptopDiagnostics() {
  const [currentStep, setCurrentStep] = useState('crm-q1');
  const [selectedCategory, setSelectedCategory] = useState('');

  const steps: DiagnosisStep[] = [
    {
      id: 'crm-q1',
      title: 'Какая основная проблема с вашим ноутбуком?',
      options: [
        {
          label: 'Проблемы с включением или питанием',
          target: 'crm-q-power',
          category: 'Питание',
          eventAction: 'step1-power',
          emoji: '🔌'
        },
        {
          label: 'Медленная работа, зависания, шум',
          target: 'crm-q-performance',
          category: 'Производительность',
          eventAction: 'step1-performance',
          emoji: '🔩'
        },
        {
          label: 'Проблемы с изображением на экране',
          target: 'crm-q-display',
          category: 'Экран',
          eventAction: 'step1-display',
          emoji: '💻'
        },
        {
          label: 'Физические повреждения или залитие',
          target: 'crm-q-other',
          category: 'Повреждения',
          eventAction: 'step1-other',
          emoji: '💧'
        }
      ]
    },
    {
      id: 'crm-q-power',
      title: 'Уточните проблему с питанием:',
      options: [
        {
          label: 'Совсем не реагирует на кнопку включения',
          target: 'crm-res-no-power',
          category: 'Питание',
          symptom: 'Не реагирует на кнопку',
          eventAction: 'step2-no-power',
          emoji: '📌'
        },
        {
          label: 'Не заряжается, но работает от сети',
          target: 'crm-res-no-charge',
          category: 'Питание',
          symptom: 'Не заряжается',
          eventAction: 'step2-no-charge',
          emoji: '📌'
        },
        {
          label: 'Включается и сразу выключается',
          target: 'crm-res-turn-off',
          category: 'Питание',
          symptom: 'Выключается сам',
          eventAction: 'step2-turn-off',
          emoji: '📌'
        }
      ]
    },
    {
      id: 'crm-q-performance',
      title: 'Что именно вас беспокоит?',
      options: [
        {
          label: 'Сильно тормозит, долго загружаются программы',
          target: 'crm-res-slow',
          category: 'Производительность',
          symptom: 'Сильно тормозит',
          eventAction: 'step2-slow',
          emoji: '📌'
        },
        {
          label: 'Сильно греется и шумит вентилятор',
          target: 'crm-res-hot',
          category: 'Производительность',
          symptom: 'Перегрев/шум',
          eventAction: 'step2-hot',
          emoji: '📌'
        },
        {
          label: 'Появляется синий экран (BSOD)',
          target: 'crm-res-bsod',
          category: 'Производительность',
          symptom: 'Синий экран',
          eventAction: 'step2-bsod',
          emoji: '📌'
        }
      ]
    },
    {
      id: 'crm-q-display',
      title: 'Как выглядит проблема с экраном?',
      options: [
        {
          label: 'Полосы, артефакты, искажение цветов',
          target: 'crm-res-stripes',
          category: 'Экран',
          symptom: 'Полосы/артефакты',
          eventAction: 'step2-stripes',
          emoji: '📌'
        },
        {
          label: 'Тусклый экран (нет подсветки)',
          target: 'crm-res-no-backlight',
          category: 'Экран',
          symptom: 'Нет подсветки',
          eventAction: 'step2-no-backlight',
          emoji: '📌'
        },
        {
          label: 'Экран разбит, есть трещины',
          target: 'crm-res-cracked',
          category: 'Экран',
          symptom: 'Разбит экран',
          eventAction: 'step2-cracked',
          emoji: '📌'
        }
      ]
    },
    {
      id: 'crm-q-other',
      title: 'Что произошло?',
      options: [
        {
          label: 'Пролил(а) жидкость на ноутбук',
          target: 'crm-res-liquid',
          category: 'Повреждения',
          symptom: 'Залитие',
          eventAction: 'step2-liquid',
          emoji: '📌'
        },
        {
          label: 'Сломаны петли, повреждён корпус',
          target: 'crm-res-broken-case',
          category: 'Повреждения',
          symptom: 'Повреждение корпуса',
          eventAction: 'step2-broken-case',
          emoji: '📌'
        }
      ]
    }
  ];

  const results: DiagnosisResult[] = [
    {
      id: 'crm-res-no-power',
      backTarget: 'crm-q-power',
      title: 'Неисправность материнской платы, кнопки включения или цепи питания.',
      diagnosis: 'Сложная аппаратная проблема — нужна диагностика на специальном оборудовании. Не разбирайте ноутбук самостоятельно.',
      description: 'Сложная аппаратная проблема — нужна диагностика на специальном оборудовании. Не разбирайте ноутбук самостоятельно.',
      additionalLink: {
        text: 'подробнее о ремонте материнской платы',
        href: 'https://fiveservice.by/remont-materinskoy-platy-noutbuka'
      },
      ctaText: 'Узнать стоимость ремонта',
      eventAction: 'cta-no-power'
    },
    {
      id: 'crm-res-no-charge',
      backTarget: 'crm-q-power',
      title: 'Неисправность разъёма питания, аккумулятора или контроллера заряда.',
      diagnosis: 'Часто проблема решается ремонтом или заменой разъёма. Мы можем точно определить причину.',
      description: 'Часто проблема решается ремонтом или заменой разъёма. Мы можем точно определить причину.',
      additionalLink: {
        text: 'подробнее о ремонте разъёма питания',
        href: 'https://fiveservice.by/zamena-raz-yema-pitaniya'
      },
      ctaText: 'Узнать стоимость ремонта разъёма',
      eventAction: 'cta-no-charge'
    },
    {
      id: 'crm-res-turn-off',
      backTarget: 'crm-q-power',
      title: 'Короткое замыкание на материнской плате, перегрев из-за неисправной системы охлаждения.',
      diagnosis: 'Дальнейшее включение может усугубить поломку. Необходимо срочно нести ноутбук в сервис.',
      description: 'Дальнейшее включение может усугубить поломку. Необходимо срочно нести ноутбук в сервис.',
      additionalLink: {
        text: 'подробнее о ремонте материнской платы',
        href: 'https://fiveservice.by/remont-materinskoy-platy-noutbuka'
      },
      ctaText: 'Продиагностировать',
      eventAction: 'cta-turn-off'
    },
    {
      id: 'crm-res-slow',
      backTarget: 'crm-q-performance',
      title: 'Программные ошибки, вирусы или износ жёсткого диска (HDD).',
      diagnosis: 'Лучшее решение для скорости — установка SSD и переустановка системы. Это даст вашему ноутбуку вторую жизнь!',
      description: 'Лучшее решение для скорости — установка SSD и переустановка системы. Это даст вашему ноутбуку вторую жизнь!',
      additionalLink: {
        text: 'подробнее об SSD',
        href: 'https://fiveservice.by/voprosy-vokrug-ssd'
      },
      ctaText: 'Узнать цену установки SSD',
      eventAction: 'cta-slow'
    },
    {
      id: 'crm-res-hot',
      backTarget: 'crm-q-performance',
      title: 'Засорение системы охлаждения пылью, высыхание термопасты.',
      diagnosis: 'Игнорирование перегрева может привести к выходу из строя видеочипа или процессора. Рекомендуется профилактическая чистка.',
      description: 'Игнорирование перегрева может привести к выходу из строя видеочипа или процессора. Рекомендуется профилактическая чистка.',
      additionalLink: {
        text: 'подробнее о чистке ноутбука',
        href: 'https://fiveservice.by/chistka-sistemy-ohlazdenia'
      },
      ctaText: 'Пройти диагностику',
      eventAction: 'cta-hot'
    },
    {
      id: 'crm-res-bsod',
      backTarget: 'crm-q-performance',
      title: 'Ошибки оперативной памяти, сбои драйверов или умирающий жёсткий диск.',
      diagnosis: 'Требуется детальная диагностика компонентов, чтобы точно выявить и устранить причину сбоев.',
      description: 'Требуется детальная диагностика компонентов, чтобы точно выявить и устранить причину сбоев.',
      additionalLink: {
        text: 'подробнее о синем экране смерти',
        href: 'https://www.google.com/search?q=синий+экран+смерти+на+ноутбуке'
      },
      ctaText: 'Пройти диагностику',
      eventAction: 'cta-bsod'
    },
    {
      id: 'crm-res-stripes',
      backTarget: 'crm-q-display',
      title: 'Неисправность видеочипа или повреждение шлейфа матрицы.',
      diagnosis: 'Ремонт видеочипа — сложная процедура, требующая BGA-пайки. Шлейф меняется проще. Нужна точная диагностика.',
      description: 'Ремонт видеочипа — сложная процедура, требующая BGA-пайки. Шлейф меняется проще. Нужна точная диагностика.',
      additionalLink: {
        text: 'подробнее о ремонте видеочипа',
        href: 'https://fiveservice.by/video-remont'
      },
      ctaText: 'Пройти диагностику',
      eventAction: 'cta-stripes'
    },
    {
      id: 'crm-res-no-backlight',
      backTarget: 'crm-q-display',
      title: 'Неисправность инвертора или лампы подсветки матрицы.',
      diagnosis: 'Чаще всего ремонт возможен без полной замены экрана, что значительно дешевле.',
      description: 'Чаще всего ремонт возможен без полной замены экрана, что значительно дешевле.',
      additionalLink: {
        text: 'подробнее о ремонте подсветки',
        href: 'https://www.google.com/search?q=ремонт+подсветки+ноутбука'
      },
      ctaText: 'Узнать стоимость ремонта подсветки',
      eventAction: 'cta-no-backlight'
    },
    {
      id: 'crm-res-cracked',
      backTarget: 'crm-q-display',
      title: 'Физическое повреждение матрицы.',
      diagnosis: 'К сожалению, разбитый экран ремонту не подлежит. Требуется его полная замена. У нас есть экраны для большинства моделей в наличии.',
      description: 'К сожалению, разбитый экран ремонту не подлежит. Требуется его полная замена. У нас есть экраны для большинства моделей в наличии.',
      additionalLink: {
        text: 'подробнее о замене матрицы',
        href: 'https://fiveservice.by/zamena-matricy2'
      },
      ctaText: 'Подобрать матрицу и узнать цену',
      eventAction: 'cta-cracked'
    },
    {
      id: 'crm-res-liquid',
      backTarget: 'crm-q-other',
      title: 'Коррозия на материнской плате, короткое замыкание.',
      diagnosis: 'Срочно! Отключите ноутбук от сети, извлеките аккумулятор (если возможно) и немедленно обратитесь в сервис.',
      description: 'Срочно! Отключите ноутбук от сети, извлеките аккумулятор (если возможно) и немедленно обратитесь в сервис.',
      ctaText: 'Срочная диагностика',
      eventAction: 'cta-liquid'
    },
    {
      id: 'crm-res-broken-case',
      backTarget: 'crm-q-other',
      title: 'Механическое повреждение корпуса, петель или внутренних компонентов.',
      diagnosis: 'Требуется осмотр для оценки степени повреждений и возможности восстановления.',
      description: 'Требуется осмотр для оценки степени повреждений и возможности восстановления.',
      ctaText: 'Оценить стоимость ремонта',
      eventAction: 'cta-broken-case'
    }
  ];

  const handleOptionClick = (target: string, category: string) => {
    setCurrentStep(target);
    if (category) {
      setSelectedCategory(category);
    }
  };

  const handleBackClick = (target: string) => {
    setCurrentStep(target);
  };

  const currentStepData = steps.find(step => step.id === currentStep);
  const currentResult = results.find(result => result.id === currentStep);

  return (
    <section className="bg-gray-50 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">
            Быстрая онлайн-диагностика ноутбука
          </h2>
          <p className="text-lg text-navy-600">
            Ответьте на несколько вопросов и получите предварительный диагноз
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-navy-100 p-6 sm:p-8">
          {/* Steps */}
          {currentStepData && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                {currentStepData.id !== 'crm-q1' && (
                  <button
                    onClick={() => handleBackClick('crm-q1')}
                    className="flex items-center text-navy-600 hover:text-navy-800 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Назад к началу
                  </button>
                )}
                <div className="text-sm text-navy-500 font-medium">
                  {selectedCategory && `Категория: ${selectedCategory}`}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-navy-800 mb-6">
                {currentStepData.title}
              </h3>

              <div className="space-y-3">
                {currentStepData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option.target, option.category)}
                    className="w-full text-left p-4 rounded-xl border border-navy-200 hover:border-navy-400 hover:bg-navy-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {option.emoji}
                      </span>
                      <span className="text-navy-800 font-medium group-hover:text-navy-900">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {currentResult && (
            <div className="space-y-6">
              <button
                onClick={() => handleBackClick(currentResult.backTarget)}
                className="flex items-center text-navy-600 hover:text-navy-800 transition-colors font-medium mb-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Назад
              </button>

              <div className="bg-navy-50 rounded-xl p-6 border border-navy-200">
                <h3 className="text-lg font-semibold text-navy-800 mb-2">
                  Вероятная причина:
                </h3>
                <p className="text-navy-700 text-lg mb-4">
                  {currentResult.title}
                </p>
                <p className="text-navy-600 mb-6">
                  {currentResult.description}
                </p>

                {currentResult.additionalLink && (
                  <div className="mb-6">
                    <a
                      href={currentResult.additionalLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy-600 hover:text-navy-800 underline transition-colors"
                    >
                      {currentResult.additionalLink.text}
                    </a>
                  </div>
                )}

                <button className="w-full bg-navy-700 text-white py-4 px-6 rounded-xl font-semibold hover:bg-navy-800 transition-colors shadow-lg hover:shadow-xl">
                  {currentResult.ctaText}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentStep === step.id ? 'bg-navy-700' : 'bg-navy-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}