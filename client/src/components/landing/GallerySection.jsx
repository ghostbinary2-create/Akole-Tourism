'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Camera, X, MapPin } from 'lucide-react';

const WHATSHOT_UMBRELLA_IMG = 'https://im.whatshot.in/img/2020/Aug/pjimage-2020-08-20t144741332-1597915074.jpg';
const FALLBACK_WATERFALL = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80';

export const GallerySection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('ALL');
  const [activeImage, setActiveImage] = useState(null);

  const galleryItems = [
    {
      url: '/places/umbrella-falls.jpg',
      title: 'Umbrella Falls Bhandardara Footbridge',
      location: 'Wilson Dam Base, Akole',
      category: 'WATERFALLS'
    },
    {
      url: '/places/bhandardara.jpg',
      title: 'Bhandardara Arthur Lake & Lakeside Camping',
      location: 'Bhandardara, Akole',
      category: 'LAKES'
    },
    {
      url: '/places/kalsubai.jpg',
      title: 'Kalsubai Peak Summit Steel Ladders (1,646m)',
      location: 'Bari Village, Akole',
      category: 'TREKS'
    },
    {
      url: '/places/harishchandragad.jpg',
      title: 'Konkan Kada Sunset Cliff & Cloud Bed',
      location: 'Harishchandragad, Akole',
      category: 'TREKS'
    },
    {
      url: '/places/sandhan-valley.jpg',
      title: 'Sandhan Valley Ravine & Rappelling Canyon',
      location: 'Samrad Village, Akole',
      category: 'TREKS'
    },
    {
      url: '/places/randha-falls.jpg',
      title: 'Randha Waterfall 170ft Pravara Gorge Plunge',
      location: 'Randha Village, Akole',
      category: 'WATERFALLS'
    },
    {
      url: '/places/amruteshwar.jpg',
      title: '8th-Century Hemadpanthi Stone Shiva Temple',
      location: 'Amruteshwar, Ratanwadi',
      category: 'HERITAGE'
    },
    {
      url: '/places/ratangad.jpg',
      title: 'Ratangad Fort & Nedhe (Eye of Needle)',
      location: 'Ratanwadi, Akole',
      category: 'TREKS'
    },
    {
      url: '/places/amk-trek.jpg',
      title: 'Alang Madan Kulang (AMK) Fortress Towers',
      location: 'Ambit Village, Akole',
      category: 'TREKS'
    },
    {
      url: '/places/samrad-camping.jpg',
      title: 'Samrad Village Camping & Bonfire under Milky Way',
      location: 'Samrad Village, Akole',
      category: 'LAKES'
    },
    {
      url: '/places/fofsandi.jpg',
      title: 'Fofsandi Valley & Gharicha Waterfall',
      location: 'Fofsandi, Akole',
      category: 'WATERFALLS'
    },
    {
      url: '/places/seed-bank.jpg',
      title: 'Padma Shri Rahibai Popere Indigenous Seed Bank',
      location: 'Combharne, Akole',
      category: 'HERITAGE'
    }
  ];

  const filteredItems = activeTab === 'ALL' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section className="py-24 bg-white/10 backdrop-blur-2xl text-white relative border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-teal-300 font-extrabold uppercase tracking-wider text-xs bg-white/15 px-3.5 py-1.5 rounded-full border border-white/30 inline-flex items-center space-x-1.5 backdrop-blur-md shadow-md">
              <Camera className="w-3.5 h-3.5" />
              <span>Authentic Akole Gallery</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight font-heading drop-shadow-md">
              {t('galleryTitle')}
            </h2>
            <p className="text-slate-100 mt-2 max-w-xl text-sm sm:text-base font-medium drop-shadow">
              Real high-resolution photographs capturing Kalsubai Peak, Bhandardara Arthur Lake, Sandhan Valley, Konkan Kada cliff, and Randha Falls.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 bg-white/15 backdrop-blur-xl p-1.5 rounded-2xl border border-white/30 shadow-lg">
            {[
              { key: 'ALL', label: t('allPhotos') },
              { key: 'TREKS', label: t('mountainTreks') },
              { key: 'LAKES', label: t('lakesCamping') },
              { key: 'WATERFALLS', label: t('waterfalls') },
              { key: 'HERITAGE', label: t('templesForts') },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.key
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid with White Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(item)}
              className="relative h-72 rounded-3xl overflow-hidden cursor-pointer group border border-white/30 shadow-2xl hover:border-amber-400/80 transition-all duration-500 bg-white/10 backdrop-blur-xl"
            >
              <img
                src={item.url}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.src = FALLBACK_WATERFALL;
                }}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs text-amber-300 font-extrabold tracking-wider uppercase flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-amber-300" />
                  <span>{item.location}</span>
                </span>
                <h4 className="text-lg font-bold text-white mt-1 font-heading">
                  {item.title}
                </h4>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all border border-white/40 shadow-lg">
                <Camera className="w-4 h-4 text-amber-300" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal Preview */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-white p-3 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl w-full text-center space-y-4">
            <img
              src={activeImage.url}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.src = FALLBACK_WATERFALL;
              }}
              alt={activeImage.title}
              className="max-w-full max-h-[75vh] rounded-3xl shadow-2xl object-contain mx-auto border border-white/20"
            />
            <div>
              <h3 className="text-2xl font-bold text-white font-heading">{activeImage.title}</h3>
              <p className="text-xs text-amber-300 mt-1 font-semibold flex items-center justify-center space-x-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeImage.location}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
