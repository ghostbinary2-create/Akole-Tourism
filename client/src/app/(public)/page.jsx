'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { BackgroundVideo } from '@/components/common/BackgroundVideo';
import { Hero } from '@/components/landing/Hero';
import { AboutAkole } from '@/components/landing/AboutAkole';
import { GallerySection } from '@/components/landing/GallerySection';
import { PlacesSection } from '@/components/landing/PlacesSection';
import { PackagesSection } from '@/components/landing/PackagesSection';
import { WhyChooseUs } from '@/components/landing/WhyChooseUs';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { LeafletMap } from '@/components/common/LeafletMap';
import { BookingModal } from '@/components/booking/BookingModal';
import { MapPin } from 'lucide-react';

export default function HomePage() {
  const [places, setPlaces] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [placesRes, packagesRes] = await Promise.all([
        api.get('/places'),
        api.get('/packages')
      ]);

      if (placesRes.data.success) {
        setPlaces(placesRes.data.places);
      }
      if (packagesRes.data.success) {
        setPackages(packagesRes.data.packages);
      }
    } catch (error) {
      console.error('Error loading landing page data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickBook = () => {
    if (packages.length > 0) {
      setSelectedPackage(packages[0]);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
      
      {/* Fixed Background MP4 Video Component */}
      <BackgroundVideo />

      {/* Page Content Layers (Z Index 10) */}
      <div className="relative z-10">
        
        {/* 1. Hero Section */}
        <Hero onQuickBook={handleQuickBook} />

        {/* 2. About Us Section */}
        <div id="about">
          <AboutAkole />
        </div>

        {/* 3. Photo Gallery Section */}
        <div id="gallery">
          <GallerySection />
        </div>

        {/* 4. Destinations / Popular Tourist Places Section */}
        <div id="destinations">
          <PlacesSection places={places} />
        </div>

        {/* 5. Interactive Akole Sahyadri Map Section */}
        <section className="py-16 bg-white/10 backdrop-blur-2xl border-y border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-emerald-300 font-bold uppercase tracking-wider text-xs bg-white/15 px-3.5 py-1.5 rounded-full border border-white/30 inline-flex items-center justify-center space-x-1 backdrop-blur-md shadow-md">
                <MapPin className="w-3.5 h-3.5" />
                <span>Interactive Map</span>
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight font-heading drop-shadow-md">
                Explore Akole Attractions Map
              </h2>
              <p className="text-slate-100 text-sm mt-2 font-medium drop-shadow">
                Click markers to view popup cards for Bhandardara, Kalsubai, Harishchandragad, Sandhan Valley & more.
              </p>
            </div>

            <LeafletMap places={places} />
          </div>
        </section>

        {/* 6. Tour Packages Section */}
        <div id="packages">
          <PackagesSection
            packages={packages}
            onBookNow={(pkg) => setSelectedPackage(pkg)}
          />
        </div>

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. Testimonials */}
        <TestimonialsSection />

        {/* 9. Contact Us Section */}
        <div id="contact">
          <ContactSection />
        </div>

        {/* Booking Modal */}
        {selectedPackage && (
          <BookingModal
            packageData={selectedPackage}
            onClose={() => setSelectedPackage(null)}
          />
        )}
      </div>
    </div>
  );
}
