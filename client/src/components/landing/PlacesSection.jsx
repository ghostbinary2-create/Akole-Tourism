'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, ArrowRight, Clock, Sparkles } from 'lucide-react';

const WHATSHOT_UMBRELLA_IMG = '/places/umbrella-falls.jpg';
const FALLBACK_IMG = '/places/bhandardara.jpg';

export const PlacesSection = ({ places = [] }) => {
  const { t } = useLanguage();
  const displayPlaces = places.slice(0, 6);

  return (
    <section className="py-24 bg-white/10 backdrop-blur-2xl text-white relative border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-emerald-300 font-extrabold uppercase tracking-wider text-xs bg-white/15 px-3.5 py-1.5 rounded-full border border-white/30 inline-flex items-center space-x-1.5 backdrop-blur-md shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sahyadri Attractions</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight font-heading drop-shadow-md">
              {t('popularPlacesTitle')}
            </h2>
            <p className="text-slate-100 mt-2 max-w-xl text-sm sm:text-base font-medium drop-shadow">
              {t('popularPlacesSubtitle')}
            </p>
          </div>

          <Link
            href="/places"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-amber-300 font-extrabold text-sm hover:text-white transition-colors group drop-shadow"
          >
            <span>{t('viewAllPlaces')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Places Card Grid with White Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPlaces.map((place) => {
            let bgImage = place.images && place.images.length > 0 ? place.images[0] : FALLBACK_IMG;
            if (place.name && place.name.toLowerCase().includes('umbrella')) {
              bgImage = WHATSHOT_UMBRELLA_IMG;
            }

            return (
              <div
                key={place.id}
                className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/30 hover:border-amber-400/80 shadow-2xl transition-all duration-500 flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative h-60 overflow-hidden bg-slate-900">
                  <img
                    src={bgImage}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.src = FALLBACK_IMG;
                    }}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Location badge */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold border border-white/20">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Akole, MH</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg">
                    {place.entryFee > 0 ? `₹${place.entryFee}` : t('freeEntry')}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors font-heading">
                      {place.name}
                    </h3>
                    <p className="text-slate-200 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                      {place.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
                    <div className="flex items-center text-xs text-slate-300 space-x-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span className="truncate max-w-[140px]">{place.bestTimeToVisit}</span>
                    </div>

                    <Link
                      href={`/places/${place.id}`}
                      className="px-4 py-2 rounded-xl bg-white/20 hover:bg-amber-400 text-white hover:text-slate-950 text-xs font-extrabold transition-all border border-white/30 shadow-md"
                    >
                      {t('viewDetails')}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
