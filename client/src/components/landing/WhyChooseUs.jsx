'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Compass, Sparkles, Utensils, Award, Clock } from 'lucide-react';

export const WhyChooseUs = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: ShieldCheck,
      title: t('certifiedGuides'),
      description: t('certifiedDesc')
    },
    {
      icon: Compass,
      title: t('unmatchedViews'),
      description: t('unmatchedDesc')
    },
    {
      icon: Utensils,
      title: t('villageCuisine'),
      description: t('villageDesc')
    },
    {
      icon: Sparkles,
      title: 'Camping & Stargazing',
      description: 'Waterproof double-layer tents, campfire acoustic music, telescope stargazing, and seasonal firefly walks.'
    },
    {
      icon: Award,
      title: 'Best Price Guarantee',
      description: 'Transparent pricing with no hidden charges. All safety gear, entry permits, and meals included.'
    },
    {
      icon: Clock,
      title: 'Instant Booking & Support',
      description: 'Seamless online package booking, instant unique ID generation, printable confirmation, and hotline support.'
    }
  ];

  return (
    <section className="py-24 bg-white/10 backdrop-blur-2xl text-white relative border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-300 font-extrabold uppercase tracking-wider text-xs bg-white/15 px-3.5 py-1.5 rounded-full border border-white/30 backdrop-blur-md shadow-md">
            Why Travel With Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight font-heading drop-shadow-md">
            {t('whyChooseTitle')}
          </h2>
          <p className="text-slate-100 mt-3 text-base font-medium drop-shadow">
            We are dedicated to offering eco-friendly, thrilling, and safe travel experiences across the Sahyadri mountains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, index) => {
            const Icon = f.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 hover:border-amber-400/80 shadow-2xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 stroke-[2.5]" />
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors font-heading">
                  {f.title}
                </h3>
                <p className="text-slate-200 text-sm mt-3 leading-relaxed font-normal">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
