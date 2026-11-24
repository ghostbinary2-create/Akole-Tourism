'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { BookingModal } from '@/components/booking/BookingModal';
import { useAuth } from '@/context/AuthContext';
import {
  Clock,
  MapPin,
  Users,
  Star,
  CheckCircle2,
  XCircle,
  Calendar,
  ArrowLeft,
  ShieldCheck,
  MessageSquare,
  Send
} from 'lucide-react';

export default function PackageDetailPage() {
  const params = useParams();
  const id = params?.id;
  const { user } = useAuth();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Review state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => {
    if (id) fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    try {
      const res = await api.get(`/packages/${id}`);
      if (res.data.success) {
        setPkg(res.data.package);
        if (res.data.package.images && res.data.package.images.length > 0) {
          setActiveImage(res.data.package.images[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = `/login?redirect=/packages/${id}`;
      return;
    }
    if (!newComment.trim()) return;

    setReviewSubmitting(true);
    try {
      const res = await api.post('/reviews', {
        packageId: id,
        rating: newRating,
        comment: newComment
      });
      if (res.data.success) {
        setNewComment('');
        fetchPackage(); // Reload review list
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-6">
        <div className="h-96 bg-slate-200 rounded-3xl" />
        <div className="h-10 bg-slate-200 w-1/3 rounded-xl" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Tour Package Not Found</h2>
        <Link href="/packages" className="mt-4 inline-block text-emerald-600 font-bold underline">
          &larr; Back to Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link href="/packages" className="inline-flex items-center space-x-2 text-slate-600 hover:text-emerald-600 font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tour Packages</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Gallery & Itinerary */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery */}
            <div className="space-y-3">
              <div className="h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative bg-slate-900">
                <img
                  src={activeImage || '/places/sandhan-valley.jpg'}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-slate-950" />
                      <span>{pkg.averageRating || 4.9} ({pkg.reviewCount || 0} reviews)</span>
                    </span>
                    <span className="bg-emerald-600 text-xs font-extrabold px-3 py-1 rounded-full">
                      {pkg.duration}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold">{pkg.name}</h1>
                  <p className="text-sm text-slate-300 flex items-center space-x-1 mt-1">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>{pkg.destination}</span>
                  </p>
                </div>
              </div>

              {pkg.images && pkg.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {pkg.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-24 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImage === img ? 'border-emerald-500 scale-105' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">Package Overview</h3>
              <p className="text-slate-700 leading-relaxed text-base">
                {pkg.description}
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center space-x-2 text-sm text-slate-600 font-medium">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Pickup & Drop: <strong>{pkg.pickupLocation}</strong></span>
              </div>
            </div>

            {/* Included & Excluded Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 text-lg mb-4 flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Included Services</span>
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  {pkg.includedServices.map((inc, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 text-lg mb-4 flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span>Excluded Services</span>
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  {pkg.excludedServices.map((exc, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Tour Itinerary</h3>
              <div className="space-y-6">
                {pkg.itinerary.map((dayItem, idx) => (
                  <div key={idx} className="flex items-start space-x-4 border-l-2 border-emerald-500 pl-4 py-1">
                    <div>
                      <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                        {dayItem.day}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base mt-2">{dayItem.title}</h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{dayItem.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-amber-500" />
                  <span>Traveler Reviews ({pkg.reviews?.length || 0})</span>
                </h3>
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Leave a Review for this Tour</h4>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-600 uppercase">Rating:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="text-amber-400"
                      >
                        <Star className={`w-6 h-6 ${newRating >= star ? 'fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your experience on this Sahyadri trek/tour..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
                />

                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{reviewSubmitting ? 'Posting...' : 'Submit Review'}</span>
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {pkg.reviews && pkg.reviews.length > 0 ? (
                  pkg.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{rev.user?.name || 'Explorer'}</span>
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-700 text-sm italic">&ldquo;{rev.comment}&rdquo;</p>
                      <span className="text-[10px] text-slate-400 block">{new Date(rev.createdAt).toDateString()}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm text-center py-4">No reviews yet. Be the first to leave a review!</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl sticky top-28 space-y-6">
              
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs text-slate-400 block uppercase font-bold">Package Price</span>
                  <span className="text-3xl font-extrabold text-slate-900">₹{pkg.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-500"> / per traveler</span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {pkg.availableSeats} Seats Left
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <strong className="text-slate-900">{pkg.duration}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Start Date:</span>
                  <strong className="text-slate-900">{new Date(pkg.startDate).toDateString()}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Max Group Size:</span>
                  <strong className="text-slate-900">{pkg.maxPeople} People</strong>
                </div>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Book This Package Now</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Instant confirmation • Free cancellation up to 48h before tour
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          packageData={pkg}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
