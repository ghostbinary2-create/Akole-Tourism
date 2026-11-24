'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { BookingModal } from '@/components/booking/BookingModal';
import { Search, Filter, Clock, MapPin, Users, Star, CheckCircle2, Sparkles } from 'lucide-react';

export default function PackagesListingPage() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState('');
  const [destination, setDestination] = useState('');
  const [maxPrice, setMaxPrice] = useState('10000');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(true);

  const [selectedBookingPackage, setSelectedBookingPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, [search, destination, maxPrice, duration]);

  const fetchPackages = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (destination) params.append('destination', destination);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (duration) params.append('duration', duration);

      const res = await api.get(`/packages?${params.toString()}`);
      if (res.data.success) {
        setPackages(res.data.packages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 pb-20 pt-24 sm:pt-28">
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-400 font-extrabold uppercase tracking-wider text-xs bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Adventure & Camping</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 tracking-tight font-heading">
            Tour Packages & Expeditions
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-base">
            All-inclusive Kalsubai sunrise trek, Sandhan Valley canyoning, Bhandardara camping, and historic fort tours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl h-fit space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
              <Filter className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white text-lg font-heading">Filter Packages</h3>
            </div>

            {/* Search input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Search Package</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Sunrise Trek..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Destination filter */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Destination</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">All Destinations</option>
                <option value="Bhandardara">Bhandardara Lake</option>
                <option value="Kalsubai">Kalsubai Peak</option>
                <option value="Sandhan">Sandhan Valley</option>
                <option value="Harishchandragad">Harishchandragad</option>
                <option value="Ratanwadi">Ratanwadi / Ratangad</option>
                <option value="Randha">Randha Falls</option>
              </select>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Max Budget</label>
                <span className="text-sm font-black text-amber-400">₹{parseInt(maxPrice).toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearch('');
                setDestination('');
                setMaxPrice('10000');
                setDuration('');
              }}
              className="w-full py-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 font-bold text-xs hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>

          {/* Package Cards Listing */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-96 bg-slate-900 animate-pulse rounded-3xl" />
                ))}
              </div>
            ) : packages.length === 0 ? (
              <div className="bg-slate-900/80 p-12 rounded-3xl border border-slate-800 text-center">
                <Users className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white">No Packages Found</h3>
                <p className="text-slate-400 text-sm mt-1">Try adjusting your filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {packages.map((pkg) => {
                  const bgImg = pkg.images && pkg.images.length > 0 ? pkg.images[0] : '/places/sandhan-valley.jpg';

                  return (
                    <div
                      key={pkg.id}
                      className="bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-400/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={bgImg}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                        
                        <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 text-xs font-black flex items-center space-x-1 border border-amber-400/30">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{pkg.averageRating || 4.9}</span>
                        </div>

                        <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg">
                          {pkg.availableSeats} seats left
                        </div>

                        <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-slate-300 text-xs font-semibold bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="truncate max-w-[200px]">{pkg.destination}</span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center text-xs text-amber-400 font-extrabold mb-1 space-x-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{pkg.duration}</span>
                          </div>

                          <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors font-heading">
                            {pkg.name}
                          </h3>
                          <p className="text-slate-400 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                            {pkg.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {pkg.includedServices.slice(0, 3).map((inc, i) => (
                              <span key={i} className="text-[11px] bg-slate-950 text-emerald-300 font-semibold px-2.5 py-0.5 rounded border border-slate-800 flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>{inc}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Per Person</span>
                            <span className="text-2xl font-black text-white font-heading">₹{pkg.price.toLocaleString()}</span>
                          </div>

                          <div className="flex space-x-2">
                            <Link
                              href={`/packages/${pkg.id}`}
                              className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-xs font-bold text-slate-300 hover:bg-slate-800"
                            >
                              Details
                            </Link>
                            <button
                              onClick={() => setSelectedBookingPackage(pkg)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition-all"
                            >
                              Book Now
                            </button>
                          </div>
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

      {/* Booking Modal */}
      {selectedBookingPackage && (
        <BookingModal
          packageData={selectedBookingPackage}
          onClose={() => setSelectedBookingPackage(null)}
        />
      )}
    </div>
  );
}
