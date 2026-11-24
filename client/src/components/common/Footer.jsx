'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, MapPin, Phone, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const pathname = usePathname();

  // Hide footer on User Dashboard, Admin Control Center, and Presentation slides
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/presentation')) {
    return null;
  }

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-white font-heading uppercase tracking-wider">
                AKOLE TOURISM
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official Tourism & Adventure portal for Akole Taluka, Ahmednagar, Maharashtra. Discover Kalsubai Peak, Bhandardara Arthur Lake, Sandhan Valley canyoning & historic Sahyadri forts.
            </p>
          </div>

          {/* Quick Navigation SEO Links */}
          <nav aria-label="Footer Quick Links">
            <h3 className="text-white font-bold mb-4 tracking-wide text-xs uppercase font-heading">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link href="/places" className="hover:text-emerald-400 transition-colors">
                  Akole Tourist Places
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-emerald-400 transition-colors">
                  Sahyadri Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-emerald-400 transition-colors">
                  About Akole Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-emerald-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </nav>

          {/* Top Destinations */}
          <div>
            <h3 className="text-white font-bold mb-4 tracking-wide text-xs uppercase font-heading">
              Top Destinations in Akole
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/places" className="hover:text-emerald-400">Bhandardara Arthur Lake</Link></li>
              <li><Link href="/places" className="hover:text-emerald-400">Kalsubai Peak (1,646m)</Link></li>
              <li><Link href="/places" className="hover:text-emerald-400">Harishchandragad Konkan Kada</Link></li>
              <li><Link href="/places" className="hover:text-emerald-400">Sandhan Valley Canyon</Link></li>
              <li><Link href="/places" className="hover:text-emerald-400">Randha & Umbrella Falls</Link></li>
              <li><Link href="/places" className="hover:text-emerald-400">Amruteshwar Temple Ratanwadi</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <address className="not-italic">
            <h3 className="text-white font-bold mb-4 tracking-wide text-xs uppercase font-heading">
              Tourism Information Office
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>KG Road, Akole, Ahmednagar District, Maharashtra - 422601</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+91 9420212418</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>info@akoletourism.com</span>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Akole Tourism & Tour Package Management System. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted for</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>Sahyadri Explorers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
