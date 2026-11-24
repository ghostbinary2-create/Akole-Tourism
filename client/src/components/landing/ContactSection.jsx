'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', mobile: '', message: '' });
    }, 4000);
  };

  return (
    <section className="py-24 bg-white/10 backdrop-blur-2xl text-white relative border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Information */}
          <div className="space-y-6">
            <span className="text-amber-300 font-extrabold uppercase tracking-wider text-xs bg-white/15 px-3.5 py-1.5 rounded-full border border-white/30 inline-flex items-center space-x-1.5 backdrop-blur-md shadow-md">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading drop-shadow-md">
              {t('contactTitle')}
            </h2>
            
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium drop-shadow">
              {t('contactSubtitle')}
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-200 uppercase font-bold block">Tourism Office Address</span>
                  <span className="text-sm font-bold text-white">KG Road, Akole, Ahmednagar, Maharashtra (422 601)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-200 uppercase font-bold block">Hotline Phone Support</span>
                  <span className="text-sm font-bold text-white">+91 9420212418</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 border border-teal-500/30">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-200 uppercase font-bold block">Official Inquiry Email</span>
                  <span className="text-sm font-bold text-white">info@akoletourism.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card with White Glass Styling */}
          <div className="bg-white/15 backdrop-blur-2xl p-8 rounded-3xl border border-white/30 shadow-2xl space-y-6">
            <h3 className="text-2xl font-bold text-white font-heading">Send Us a Message</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-200">Thank you for reaching out. Our tour team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">{t('fullName')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">{t('emailAddress')}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">{t('mobileNumber')}</label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">{t('message')}</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us your travel plans or questions..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('sendMessage')}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
