'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mountain, Compass, ShieldCheck, Heart } from 'lucide-react';

export const AboutAkole = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white/10 backdrop-blur-2xl text-white relative border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-6">
            <span className="text-amber-300 font-extrabold uppercase tracking-wider text-xs bg-white/15 px-3.5 py-1.5 rounded-full border border-white/30 inline-flex items-center space-x-1.5 backdrop-blur-md shadow-md">
              <Compass className="w-3.5 h-3.5" />
              <span>Sahyadri Heritage</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading drop-shadow-md">
              {t('aboutTitle')}
            </h2>

            <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium drop-shadow">
              {t('aboutDesc')}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg">
                <Mountain className="w-6 h-6 text-amber-300 mb-2" />
                <h4 className="font-bold text-white text-sm font-heading">Kalsubai Summit</h4>
                <p className="text-xs text-slate-200 mt-1">1,646m Everest of Maharashtra</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg">
                <ShieldCheck className="w-6 h-6 text-emerald-300 mb-2" />
                <h4 className="font-bold text-white text-sm font-heading">Arthur Lake</h4>
                <p className="text-xs text-slate-200 mt-1">Pristine water & camping</p>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/30">
              <img
                src="/places/kalsubai.jpg"
                alt="Akole Sahyadri Mountain Range"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30">
                <span className="text-xs font-bold text-amber-300 flex items-center space-x-1">
                  <Heart className="w-3.5 h-3.5 fill-amber-300" />
                  <span>Eco-Tourism Sanctuary</span>
                </span>
                <h4 className="text-base font-black text-white mt-0.5">Kalsubai-Harishchandragad Wildlife Sanctuary</h4>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
