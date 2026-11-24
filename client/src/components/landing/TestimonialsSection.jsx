'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const reviews = [
    {
      name: 'Rahul Sharma',
      role: 'Trekker & Photographer',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'An incredible trek! Reaching Kalsubai peak at sunrise was a dream come true. The trek leaders were very professional and supportive.'
    },
    {
      name: 'Priya Kulkarni',
      role: 'Nature Lover',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'Bhandardara lakeside camping was so relaxing! Pristine Arthur lake view, awesome bonfire, and delicious local Maharashtrian food.'
    },
    {
      name: 'Amit Deshmukh',
      role: 'Adventure Enthusiast',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'Sandhan Valley canyoning was breathtaking. Rappelling down the 50ft rock wall with safety gear made it the adventure of a lifetime.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
            Traveler Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            What Our Explorers Say
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Read real stories from travelers who experienced the magic of Akole tourism.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all relative flex flex-col justify-between"
            >
              <div>
                <Quote className="w-10 h-10 text-emerald-100 mb-4" />
                <div className="flex items-center space-x-1 mb-4 text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  &ldquo;{r.comment}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center space-x-3">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{r.name}</h4>
                  <p className="text-xs text-slate-500">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
