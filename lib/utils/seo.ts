import { Metadata } from 'next';

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}): Metadata {
  const siteUrl = 'https://fiveservice.by';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image || `${siteUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'FiveService',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export const jsonLdLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'FiveService',
  description: 'Профессиональный ремонт ноутбуков в Минске',
  url: 'https://fiveservice.by',
  telephone: '+375297349077',
  email: 'friends.service129@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Восточная, 129',
    addressLocality: 'Минск',
    addressCountry: 'BY',
    postalCode: '220113'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 53.9045,
    longitude: 27.5615
  },
  openingHours: [
    'Mo-Fr 09:00-19:00',
    'Sa-Su 10:00-16:00'
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '847'
  }
};