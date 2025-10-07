'use client';

import { useState, useEffect } from 'react';
import translations from '@/locales/privacy-policy.json';

const PrivacyPolicy = () => {
  const [activeLang, setActiveLang] = useState<'ru' | 'be' | 'en'>('ru');

  useEffect(() => {
    document.documentElement.lang = activeLang === 'en' ? 'en' : (activeLang === 'be' ? 'be' : 'ru');
  }, [activeLang]);

  const t = translations[activeLang];

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <div className="bg-navy-600 rounded-xl p-1 inline-flex">
            <button
              onClick={() => setActiveLang('ru')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeLang === 'ru' 
                  ? 'bg-white text-navy-600 shadow-sm' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setActiveLang('be')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeLang === 'be' 
                  ? 'bg-white text-navy-600 shadow-sm' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              BE
            </button>
            <button
              onClick={() => setActiveLang('en')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeLang === 'en' 
                  ? 'bg-white text-navy-600 shadow-sm' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-600 mb-4">
            {t.title}
          </h1>
          <p 
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: t.description }}
          />
          <div className="text-sm text-gray-600 mb-6">
            {t.lastUpdate} <time dateTime="2025-09-30" className="font-medium">{t.updateDate}</time>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="font-semibold text-navy-600 mb-4">{t.tocTitle}</h2>
          <div className="grid gap-2">
            {t.tocItems.map((item, index) => (
              <a
                key={index}
                href={`#section-${index + 1}`}
                className="text-gray-700 hover:text-navy-600 hover:underline text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section id="section-1" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section1.title}</h2>
            <div className="space-y-4 text-gray-700">
              {t.sections.section1.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section2.title}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {t.sections.section2.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section3.title}</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-navy-600 text-white">
                    {t.sections.section3.tableHeaders.map((header, index) => (
                      <th key={index} className="border border-gray-300 p-3 text-left font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.sections.section3.tableData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 p-3 align-top">{row.subject}</td>
                      <td className="border border-gray-300 p-3 align-top">{row.purpose}</td>
                      <td className="border border-gray-300 p-3 align-top">{row.data}</td>
                      <td className="border border-gray-300 p-3 align-top">{row.basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 italic">
              {t.sections.section3.tableNote}
            </p>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section4.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-navy-600 text-white">
                    {t.sections.section4.tableHeaders.map((header, index) => (
                      <th key={index} className="border border-gray-300 p-3 text-left font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.sections.section4.tableData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 p-3 align-top">{row.category}</td>
                      <td className="border border-gray-300 p-3 align-top">{row.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section5.title}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              {t.sections.section5.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-700">
              {t.sections.section5.note}
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section6.title}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {t.sections.section6.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 7 */}
          <section id="section-7" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section7.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-navy-600 mb-3">{t.sections.section7.company.name}</h3>
                <div className="space-y-2 text-gray-700">
                  <p>{t.sections.section7.company.address}</p>
                  <p>{t.sections.section7.company.unp}</p>
                  <p>{t.sections.section7.company.email}</p>
                  <p>{t.sections.section7.company.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy-600 mb-3">{t.sections.section7.requests.title}</h3>
                <div className="space-y-2 text-gray-700">
                  <p>{t.sections.section7.requests.subject}</p>
                  <p>{t.sections.section7.requests.instruction}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section id="section-8" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section8.title}</h2>
            <p className="text-gray-700">
              {t.sections.section8.content}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;