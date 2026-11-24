'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, MapPin, Footprints, Camera, Building2, Utensils, Mountain, CalendarCheck } from 'lucide-react';

export const Hero = ({ onQuickBook }) => {
  const { language, t } = useLanguage();

  return (
    <div className="relative min-h-[94vh] flex flex-col justify-between overflow-hidden bg-transparent">
      
      {/* High-Contrast Gradient Overlay for WCAG AAA Compliance */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none z-10" />

      {/* Main Center-Left Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl text-left space-y-4">
          
          {/* Top Subtitle Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-black tracking-[0.2em] text-white uppercase font-heading drop-shadow">
              {t('exploreBeautyOf')}
            </span>
          </div>

          {/* Main Headline */}
          <div className="relative inline-block py-2">
            <h1 className={`text-7xl sm:text-9xl lg:text-[11rem] text-white tracking-wide font-extrabold leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] select-none ${
              language === 'mr' ? 'font-heading font-black text-amber-300' : 'font-script'
            }`}>
              {t('akole')}
            </h1>
            
            {/* Curved Brush Underline */}
            <svg className="w-full h-8 text-amber-400 -mt-3 sm:-mt-6 drop-shadow-lg" viewBox="0 0 300 30" fill="none" stroke="currentColor">
              <path d="M10 15 Q 150 25, 290 10" strokeWidth="6" strokeLinecap="round" />
              <path d="M20 22 Q 150 30, 280 18" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:xl text-slate-100 font-medium leading-relaxed max-w-xl pt-2 drop-shadow-md">
            {t('heroTagline')}
          </p>

          {/* Action Buttons: Explore Packages, Direct Book Now & Discover Places */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            
            {/* Quick Book Now Direct Modal Trigger */}
            <a
              href="#packages"
              onClick={onQuickBook}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs tracking-wider uppercase flex items-center space-x-2 shadow-2xl hover:scale-105 transition-all border border-amber-300/50"
            >
              <CalendarCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Book Tour Now</span>
            </a>

            <Link
              href="/packages"
              className="px-7 py-4 rounded-2xl bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-black text-xs tracking-wider uppercase flex items-center space-x-2 shadow-xl hover:scale-105 transition-all border border-white/30"
            >
              <Compass className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>{t('explorePackagesBtn')}</span>
            </Link>

            <Link
              href="/places"
              className="px-7 py-4 rounded-2xl bg-slate-950/60 backdrop-blur-md hover:bg-slate-900 text-slate-200 font-black text-xs tracking-wider uppercase border border-white/20 hover:scale-105 transition-all flex items-center space-x-2 shadow-lg"
            >
              <MapPin className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
              <span>{t('discoverPlacesBtn')}</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Features Strip */}
      <div className="relative z-20 w-full bg-slate-950/80 backdrop-blur-2xl border-t border-white/15 py-5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 divide-x divide-white/15 text-white">
          
          <div className="flex items-center space-x-3 px-4">
            <Mountain className="w-6 h-6 text-emerald-400 stroke-[1.75]" />
            <div className="leading-tight uppercase font-heading">
              <span className="text-xs font-black block text-white">{t('beautifulDestinations')}</span>
              <span className="text-[11px] font-bold text-slate-300">{t('destinationsSub')}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 px-4">
            <Footprints className="w-6 h-6 text-amber-400 stroke-[1.75]" />
            <div className="leading-tight uppercase font-heading">
              <span className="text-xs font-black block text-white">{t('adventureActivities')}</span>
              <span className="text-[11px] font-bold text-slate-300">{t('activitiesSub')}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 px-4">
            <Camera className="w-6 h-6 text-cyan-400 stroke-[1.75]" />
            <div className="leading-tight uppercase font-heading">
              <span className="text-xs font-black block text-white">{t('scenicViews')}</span>
              <span className="text-[11px] font-bold text-slate-300">{t('viewsSub')}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 px-4">
            <Building2 className="w-6 h-6 text-purple-400 stroke-[1.75]" />
            <div className="leading-tight uppercase font-heading">
              <span className="text-xs font-black block text-white">{t('comfortableStays')}</span>
              <span className="text-[11px] font-bold text-slate-300">{t('staysSub')}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 px-4">
            <Utensils className="w-6 h-6 text-pink-400 stroke-[1.75]" />
            <div className="leading-tight uppercase font-heading">
              <span className="text-xs font-black block text-white">{t('localCuisine')}</span>
              <span className="text-[11px] font-bold text-slate-300">{t('cuisineSub')}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
