'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { BackgroundVideo } from '@/components/common/BackgroundVideo';
import { LeafletMap } from '@/components/common/LeafletMap';
import { MapPin, Search, Clock, Grid, Map as MapIcon, Sparkles } from 'lucide-react';

const WHATSHOT_UMBRELLA_IMG = '/places/umbrella-falls.jpg';
const FALLBACK_WATERFALL = '/places/bhandardara.jpg';

export default function PlacesListingPage() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, [search]);

  const fetchPlaces = async () => {
    try {
      const res = await api.get(`/places?search=${encodeURIComponent(search)}`);
      if (res.data.success) {
        setPlaces(res.data.places);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 pb-20 pt-28">
      
      {/* Background Video */}
      <BackgroundVideo />

      <div className="relative z-10">
        {/* Header Banner */}
        <div className="bg-white/10 backdrop-blur-2xl border-b border-white/20 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-emerald-300 font-extrabold uppercase tracking-wider text-xs bg-white/15 px-3.5 py-1.5 rounded-full border border-white/30 inline-flex items-center space-x-1.5 backdrop-blur-md shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Akole Attractions</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 tracking-tight font-heading drop-shadow-md">
              Explore Tourist Places
            </h1>
            <p className="text-slate-100 mt-2 max-w-2xl mx-auto text-base font-medium drop-shadow">
              Discover Sahyadri mountain peaks, ancient forts, waterfalls, lakes, and heritage temples.
            </p>

            {/* Search & Toggle Bar */}
            <div className="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search place by name (e.g. Kalsubai, Bhandardara)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-950/80 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                onClick={() => setShowMap(!showMap)}
                className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 font-black text-slate-950 text-xs shadow-lg flex items-center justify-center space-x-2 transition-all"
              >
                {showMap ? <Grid className="w-4 h-4" /> : <MapIcon className="w-4 h-4" />}
                <span>{showMap ? 'Show Cards' : 'Interactive Map'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {showMap ? (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 font-heading">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Map View of Akole Places ({places.length})</span>
              </h3>
              <LeafletMap places={places} zoom={10} />
            </div>
          ) : null}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-white/10 backdrop-blur-xl animate-pulse rounded-3xl" />
              ))}
            </div>
          ) : places.length === 0 ? (
            <div className="text-center py-20 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20">
              <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white">No Places Found</h3>
              <p className="text-slate-300 text-sm mt-1">Try adjusting your search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {places.map((place) => {
                let bgImg = place.images && place.images.length > 0 ? place.images[0] : FALLBACK_WATERFALL;
                if (place.name && place.name.toLowerCase().includes('umbrella')) {
                  bgImg = WHATSHOT_UMBRELLA_IMG;
                }

                return (
                  <div
                    key={place.id}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 hover:border-amber-400/80 shadow-2xl transition-all duration-500 flex flex-col group"
                  >
                    <div className="relative h-60 overflow-hidden bg-slate-900">
                      <img
                        src={bgImg}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.src = FALLBACK_WATERFALL;
                        }}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center space-x-1 border border-white/20">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{place.location.split(',')[0]}</span>
                      </div>

                      <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg">
                        {place.entryFee > 0 ? `₹${place.entryFee}` : 'Free Entry'}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors font-heading">
                          {place.name}
                        </h3>
                        <p className="text-slate-200 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                          {place.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {place.activities.slice(0, 3).map((act, idx) => (
                            <span key={idx} className="text-[11px] bg-white/15 text-emerald-300 font-bold px-2.5 py-0.5 rounded-md border border-white/20">
                              {act}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
                        <div className="flex items-center text-xs text-slate-300 space-x-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          <span className="truncate max-w-[140px]">{place.bestTimeToVisit}</span>
                        </div>

                        <Link
                          href={`/places/${place.id}`}
                          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black transition-all shadow-md"
                        >
                          Explore Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
