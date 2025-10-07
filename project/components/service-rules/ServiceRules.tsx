'use client';

import { useState, useEffect } from 'react';
import translations from '@/locales/service-rules.json';

const ServiceRules = () => {
  const [activeLang, setActiveLang] = useState<'ru' | 'be' | 'en'>('ru');

  useEffect(() => {
    document.documentElement.lang = activeLang === 'en' ? 'en' : (activeLang === 'be' ? 'be' : 'ru');
  }, [activeLang]);

  const t = translations[activeLang];

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4">
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
            
            {/* Content paragraphs */}
            <div className="space-y-4 text-gray-700 mb-6">
              {t.sections.section1.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Terms */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.sections.section1.terms.title}</h3>
              <div className="space-y-3">
                {t.sections.section1.terms.items.map((term, index) => (
                  <p key={index} className="text-gray-700">
                    <strong>{term.term}</strong> {term.definition}
                  </p>
                ))}
              </div>
            </div>

            {/* Contract */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.sections.section1.contract.title}</h3>
              <div className="space-y-3 text-gray-700">
                {t.sections.section1.contract.items.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>

            {/* Acceptance */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.sections.section1.acceptance.title}</h3>
              <div className="space-y-3 text-gray-700">
                {t.sections.section1.acceptance.items.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="p-4 bg-gray-50 border-l-4 border-navy-600 rounded-r-lg">
              <p className="text-sm text-gray-600 italic">{t.sections.section1.note}</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section2.title}</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              {t.sections.section2.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section3.title}</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              {t.sections.section3.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section4.title}</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              {t.sections.section4.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.section5.title}</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              {t.sections.section5.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Contacts */}
          <section id="section-6" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-4">{t.sections.contacts.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <tbody>
                  {t.sections.contacts.tableData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <th className="border border-gray-300 p-3 text-left font-semibold bg-gray-100 w-1/4">
                        {row.label}
                      </th>
                      <td className="border border-gray-300 p-3">
                        {row.isLink ? (
                          row.label.includes('E') || row.label.includes('Email') || row.label.includes('E‑mail') ? (
                            <a href={`mailto:${row.value}`} className="text-navy-600 hover:underline">
                              {row.value}
                            </a>
                          ) : (
                            <a href={`tel:${row.value.replace(/\s/g, '')}`} className="text-navy-600 hover:underline">
                              {row.value}
                            </a>
                          )
                        ) : (
                          row.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Footer Notes */}
        <footer className="mt-12 space-y-6">
          <div className="p-4 bg-gray-50 border-l-4 border-navy-600 rounded-r-lg">
            <p className="text-sm text-gray-600">{t.footerNote}</p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500">{t.formNote}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ServiceRules;