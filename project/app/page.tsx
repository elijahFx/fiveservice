import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Benefits from "@/components/home/Benefits";
import Reviews from "@/components/home/Reviews";
import Masters from "@/components/home/Masters";
import HowWeWork from "@/components/home/HowWeWork";
import Contact from "@/components/home/Contact";
import Calculator from "@/components/home/Calculator";
import FAQ from "@/components/common/FAQ";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        {/* Dublin Core Metadata */}
        <meta name="DC.title" content="Название вашей компании - Услуги красоты" />
        <meta name="DC.creator" content="Ваше имя или компания" />
        <meta name="DC.subject" content="услуги красоты, парикмахерские услуги, маникюр, педикюр, косметология" />
        <meta name="DC.description" content="Профессиональные услуги красоты от опытных мастеров. Качественный уход за волосами, ногтями и кожей." />
        <meta name="DC.publisher" content="Название вашей компании" />
        <meta name="DC.date" content="2024" />
        <meta name="DC.type" content="Service" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://ваш-сайт.com" />
        <meta name="DC.language" content="ru" />

        {/* Schema.org Microdata */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "Название вашей компании",
              "description": "Профессиональные услуги красоты от опытных мастеров",
              "url": "https://ваш-сайт.com",
              "telephone": "+7-XXX-XXX-XX-XX",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Улица, дом",
                "addressLocality": "Город",
                "postalCode": "XXXXXX",
                "addressCountry": "RU"
              },
              "openingHours": [
                "Mo-Fr 09:00-21:00",
                "Sa-Su 10:00-20:00"
              ],
              "priceRange": "$$",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "55.7558",
                  "longitude": "37.6173"
                },
                "geoRadius": "5000"
              },
              "services": [
                "Парикмахерские услуги",
                "Маникюр",
                "Педикюр",
                "Косметология",
                "Макияж"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги салона красоты",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Стрижка женская"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Маникюр"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* LocalBusiness дополнительная разметка */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Название вашей компании",
              "image": "https://ваш-сайт.com/images/logo.jpg",
              "telephone": "+7-XXX-XXX-XX-XX",
              "email": "info@ваш-сайт.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Улица, дом",
                "addressLocality": "Город",
                "postalCode": "XXXXXX",
                "addressCountry": "RU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "55.7558",
                "longitude": "37.6173"
              },
              "url": "https://ваш-сайт.com",
              "openingHours": [
                "Mo-Fr 09:00-21:00",
                "Sa-Su 10:00-20:00"
              ],
              "priceRange": "$$"
            })
          }}
        />
      </Head>

      <main itemScope itemType="https://schema.org/BeautySalon">
        <div itemScope itemType="https://schema.org/Service">
          <Hero />
        </div>
        
        <div itemScope itemType="https://schema.org/ItemList">
          <Services />
        </div>
        
        <Benefits />
        
        <div itemScope itemType="https://schema.org/Review">
          <Reviews />
        </div>
        
        <div itemScope itemType="https://schema.org/Person">
          <Masters />
        </div>
        
        <HowWeWork />
        <Calculator />
        <FAQ />
        
        <div itemScope itemType="https://schema.org/ContactPoint">
          <Contact />
        </div>
      </main>
    </>
  );
}