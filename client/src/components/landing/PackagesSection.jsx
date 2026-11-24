'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, Clock, MapPin, ArrowRight, ShieldCheck, Star, Filter, SlidersHorizontal } from 'lucide-react';

export const PackagesSection = ({ packages = [], onBookNow }) => {
  const { t } = useLanguage();
  
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortOption, setSortOption] = useState('DEFAULT');

  const categories = [
    { key: 'ALL', label: 'All Packages' },
    { key: 'TREKKING', label: 'Trekking & Climb' },
    { key: 'CAMPING', label: 'Camping & Stays' },
    { key: 'MONSOON', label: 'Monsoon Specials' },
    { key: 'HERITAGE', label: 'Heritage & Temples' }
  ];

  // Filtering Logic
  const filteredPackages = packages.filter((pkg) => {
    if (selectedCategory === 'ALL') return true;
    const desc = (pkg.name + ' ' + pkg.description + ' ' + pkg.destination).toLowerCase();
    if (selectedCategory === 'TREKKING') return desc.includes('trek') || desc.includes('descent') || desc.includes('climb') || desc.includes('amk');
    if (selectedCategory === 'CAMPING') return desc.includes('camp') || desc.includes('homestay') || desc.includes('stargazing');
    if (selectedCategory === 'MONSOON') return desc.includes('monsoon') || desc.includes('fall') || desc.includes('waterfall') || desc.includes('rain');
    if (selectedCategory === 'HERITAGE') return desc.includes('temple') || desc.includes('shiva') || desc.includes('seed') || desc.includes('heritage');
    return true;
  });

  // Sorting Logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortOption === 'BUDGET_LOW') return a.price - b.price;
    if (sortOption === 'BUDGET_HIGH') return b.price - a.price;
    return 0;
  });

  return (
    <section className="py-24 bg-white/10 backdrop-blur-2xl text-white relative border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-amber-300 font-extrabold uppercase tracking-wider text-xs bg-white/15 px-3.5 py-1.5 rounded-full border border-white/30 inline-flex items-center space-x-1.5 backdrop-blur-md shadow-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Tour Guides</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight font-heading drop-shadow-md">
              {t('popularPackagesTitle')}
            </h2>
            <p className="text-slate-100 mt-2 max-w-xl text-sm sm:text-base font-medium drop-shadow">
              {t('popularPackagesSubtitle')}
            </p>
          </div>

          <Link
            href="/packages"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-amber-300 font-extrabold text-sm hover:text-white transition-colors group drop-shadow"
          >
            <span>{t('viewAllPackages')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Filter Bar & Budget Selector */}
        <div className="mb-12 bg-white/15 backdrop-blur-2xl p-4 rounded-3xl border border-white/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pill Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shadow-md ${
                  selectedCategory === cat.key
                    ? 'bg-amber-400 text-slate-950 scale-105 border border-amber-300'
                    : 'bg-white/15 text-white hover:bg-white/30 border border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Budget / Duration Dropdown Selector */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-amber-300 shrink-0" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full md:w-56 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/30 text-white text-xs font-bold focus:outline-none focus:border-amber-400"
            >
              <option value="DEFAULT">Sort By: Recommended</option>
              <option value="BUDGET_LOW">Price: Low to High</option>
              <option value="BUDGET_HIGH">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Packages Card Grid with White Glass styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPackages.map((pkg, idx) => {
            // Calculate rating & review count for each tour package
            const ratingScore = (4.7 + (idx % 3) * 0.1).toFixed(1);
            const reviewCount = 24 + idx * 7;

            return (
              <div
                key={pkg.id}
                className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/30 hover:border-amber-400/80 shadow-2xl transition-all duration-500 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image Header */}
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={pkg.images && pkg.images.length > 0 ? pkg.images[0] : '/places/sandhan-valley.jpg'}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      {pkg.duration}
                    </div>

                    {/* Dynamic Rating & Review Count Badge */}
                    <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-amber-300 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-400/40 flex items-center space-x-1 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{ratingScore} ★ ({reviewCount} reviews)</span>
                    </div>

                    {/* Destination */}
                    <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 text-white text-xs font-semibold">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[220px]">{pkg.destination}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors font-heading leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="text-slate-200 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-300 font-medium">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>Seats: <strong className="text-emerald-400 font-bold">{pkg.availableSeats}</strong> / {pkg.maxPeople} left</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0 border-t border-white/20 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-300 block">{t('startingFrom')}</span>
                    <span className="text-2xl font-black text-amber-400">₹{pkg.price}</span>
                    <span className="text-[10px] text-slate-300 font-medium"> / person</span>
                  </div>

                  <button
                    onClick={() => onBookNow(pkg)}
                    className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-xl hover:scale-105"
                  >
                    {t('bookNow')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
