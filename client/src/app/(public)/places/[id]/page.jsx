'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { LeafletMap } from '@/components/common/LeafletMap';
import { MapPin, Clock, Tag, Activity, ArrowLeft } from 'lucide-react';

const WHATSHOT_UMBRELLA_IMG = '/places/umbrella-falls.jpg';
const SECONDARY_FALLBACK = '/places/bhandardara.jpg';

export default function PlaceDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (id) fetchPlaceDetails();
  }, [id]);

  const fetchPlaceDetails = async () => {
    try {
      const res = await api.get(`/places/${id}`);
      if (res.data.success) {
        const placeData = res.data.place;
        if (placeData.name && placeData.name.toLowerCase().includes('umbrella')) {
          placeData.images = [WHATSHOT_UMBRELLA_IMG, SECONDARY_FALLBACK];
        }
        setPlace(placeData);
        if (placeData.images && placeData.images.length > 0) {
          setActiveImage(placeData.images[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-6 pt-32">
        <div className="h-96 bg-slate-800 rounded-3xl" />
        <div className="h-10 bg-slate-800 w-1/3 rounded-xl" />
        <div className="h-20 bg-slate-800 rounded-xl" />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center text-white">
        <h2 className="text-2xl font-bold">Tourist Place Not Found</h2>
        <Link href="/places" className="mt-4 inline-block text-amber-400 font-bold underline">
          &larr; Back to Places
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 pb-20 pt-28">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Link href="/places" className="inline-flex items-center space-x-2 text-slate-300 hover:text-amber-400 font-semibold text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Places</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Main Header & Image Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative bg-slate-900">
              <img
                src={activeImage || WHATSHOT_UMBRELLA_IMG}
                onError={(e) => {
                  e.target.src = SECONDARY_FALLBACK;
                }}
                alt={place.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-emerald-500 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  {place.bestTimeToVisit}
                </span>
                <h1 className="text-3xl sm:text-5xl font-black mt-3 font-heading drop-shadow-md">{place.name}</h1>
                <p className="text-sm text-slate-200 flex items-center space-x-1 mt-1 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{place.location}</span>
                </p>
              </div>
            </div>

            {/* Thumbnail Row */}
            {place.images && place.images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {place.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-28 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all bg-slate-900 ${
                      activeImage === img ? 'border-amber-400 scale-105 shadow-lg' : 'border-white/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      onError={(e) => {
                        e.target.src = SECONDARY_FALLBACK;
                      }}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Quick Info Box */}
          <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-3xl border border-white/20 shadow-2xl space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white border-b border-white/15 pb-3 font-heading">
                Quick Information
              </h3>

              <div className="space-y-4 mt-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Best Time To Visit</h4>
                    <p className="text-sm font-bold text-white mt-0.5">{place.bestTimeToVisit}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Tag className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Entry Fee</h4>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {place.entryFee > 0 ? `₹${place.entryFee} per person` : 'Free Entry'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Activity className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Top Activities</h4>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {place.activities.map((act, i) => (
                        <span key={i} className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-lg border border-emerald-500/30">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/packages"
              className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-center text-xs uppercase tracking-wider block shadow-xl transition-all hover:scale-105"
            >
              Browse Packages For This Spot
            </Link>
          </div>

        </div>

        {/* Detailed Description Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 shadow-xl space-y-6">
            <h3 className="text-2xl font-bold text-white font-heading">About {place.name}</h3>
            <p className="text-slate-200 leading-relaxed text-base whitespace-pre-line font-normal">
              {place.description}
            </p>

            <div className="pt-6 border-t border-white/15">
              <h4 className="text-lg font-bold text-white mb-4 font-heading">Location & Coordinates</h4>
              <LeafletMap places={[place]} center={[place.latitude, place.longitude]} zoom={13} />
            </div>
          </div>

          {/* Related Packages Card List */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-heading">Available Packages</h3>
            {place.packages && place.packages.length > 0 ? (
              <div className="space-y-4">
                {place.packages.map((pkg) => (
                  <div key={pkg.id} className="bg-white/10 backdrop-blur-2xl p-5 rounded-2xl border border-white/20 shadow-lg">
                    <h4 className="font-bold text-white text-base font-heading">{pkg.name}</h4>
                    <p className="text-xs text-slate-300 mt-1">{pkg.duration} • {pkg.destination}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-black text-amber-400">₹{pkg.price}</span>
                      <Link
                        href={`/packages/${pkg.id}`}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase"
                      >
                        View & Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 text-slate-300 text-sm text-center">
                No direct package assigned yet. Check all tour packages.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
