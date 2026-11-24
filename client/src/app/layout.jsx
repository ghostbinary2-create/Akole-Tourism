import React from 'react';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export const metadata = {
  title: 'Akole Tourism - Explore Kalsubai, Bhandardara, Sandhan Valley & Forts',
  description: 'Official Akole Tourism Portal. Book Sahyadri tour packages, Kalsubai sunrise trek, Bhandardara Arthur lake camping, Sandhan Valley canyoning, and Randha falls.',
  keywords: [
    'Akole Tourism',
    'Bhandardara Lake Camping',
    'Kalsubai Peak Trek',
    'Harishchandragad Konkan Kada',
    'Sandhan Valley Trek',
    'Randha Falls Akole',
    'Amruteshwar Temple Ratanwadi',
    'Sahyadri Tour Packages',
    'Ahmednagar Tourism',
    'Maharashtra Hill Stations'
  ],
  authors: [{ name: 'Akole Tourism Development Council' }],
  creator: 'Akole Tourism',
  publisher: 'Akole Tourism',
  metadataBase: new URL('https://akoletourism.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Akole Tourism - Explore Sahyadri Treks, Lakes & Forts',
    description: 'Discover mountains, waterfalls, forts, and Arthur Lake camping in Akole Taluka, Ahmednagar, Maharashtra.',
    url: 'https://akoletourism.com',
    siteName: 'Akole Tourism',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Bhandardara Arthur Lake Akole Tourism',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akole Tourism - Sahyadri Treks & Lakes',
    description: 'Book official tour packages to Kalsubai Peak, Bhandardara, and Sandhan Valley in Akole, Maharashtra.',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Akole Tourism',
    description: 'Official tourism portal for booking tour packages to Kalsubai Peak, Bhandardara Lake, Sandhan Valley, and Sahyadri forts.',
    url: 'https://akoletourism.com',
    telephone: '+91-9420212418',
    email: 'info@akoletourism.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'KG Road',
      addressLocality: 'Akole',
      addressRegion: 'Maharashtra',
      postalCode: '422601',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.5441,
      longitude: 73.7661,
    },
    sameAs: [
      'https://facebook.com',
      'https://twitter.com',
      'https://youtube.com',
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
