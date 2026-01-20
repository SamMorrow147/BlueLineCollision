import { contactInfo } from '@/data/contact';

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveRepair',
    name: 'Blue Line Collision Center',
    image: 'https://bluelinecollisioncenter.com/blueline/Blueline_Outside_aHR0cHM6.jpg',
    '@id': 'https://bluelinecollisioncenter.com',
    url: 'https://bluelinecollisioncenter.com',
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6710 Highway 10 NW',
      addressLocality: 'Ramsey',
      addressRegion: 'MN',
      postalCode: '55303',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.2219767,
      longitude: -93.43736849999999,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: 'Ramsey',
      '@id': 'https://www.wikidata.org/wiki/Q7291130',
    },
    sameAs: [
      contactInfo.facebook,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
