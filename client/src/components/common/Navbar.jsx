'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Search,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Do not render public Navbar on Login, User, Admin dashboard, or Presentation slides
  if (
    pathname === '/login' ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/presentation')
  ) {
    return null;
  }

  const isActive = (path) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      
      {/* Transparent Glass Navigation Bar */}
      <nav className="bg-transparent backdrop-blur-md border-b border-white/10 text-white transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex flex-col">
                {/* Triple Mountain Peak SVG Icon */}
                <svg className="w-10 h-6 text-white stroke-[2]" viewBox="0 0 100 50" fill="none" stroke="currentColor">
                  <path d="M10 40 L30 10 L50 40 M40 40 L65 5 L90 40 M70 40 L85 20 L100 40" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-xl font-black tracking-wider leading-none mt-0.5">
                  <span className="text-amber-400">AKOLE </span>
                  <span className="text-cyan-400">TOURISM</span>
                </div>
                <span className="text-[8px] tracking-[0.2em] text-slate-200 font-bold uppercase mt-0.5 drop-shadow">
                  EXPLORE. EXPERIENCE. ENJOY.
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-6 text-xs font-black tracking-widest uppercase">
              <Link
                href="/"
                className={`relative py-1 transition-colors drop-shadow-md ${
                  isActive('/')
                    ? 'text-amber-400 font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-400'
                    : 'text-white hover:text-amber-300'
                }`}
              >
                {t('home')}
              </Link>

              <Link
                href="/#about"
                className="text-white hover:text-amber-300 transition-colors drop-shadow-md"
              >
                {t('about')}
              </Link>

              <Link
                href="/#gallery"
                className="text-white hover:text-amber-300 transition-colors drop-shadow-md"
              >
                {t('gallery')}
              </Link>

              <Link
                href="/places"
                className={`relative py-1 transition-colors drop-shadow-md ${
                  isActive('/places')
                    ? 'text-amber-400 font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-400'
                    : 'text-white hover:text-amber-300'
                }`}
              >
                {t('destinations')}
              </Link>

              <Link
                href="/packages"
                className={`relative py-1 transition-colors drop-shadow-md ${
                  isActive('/packages')
                    ? 'text-amber-400 font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-400'
                    : 'text-white hover:text-amber-300'
                }`}
              >
                {t('packages')}
              </Link>

              <Link
                href="/#contact"
                className="text-white hover:text-amber-300 transition-colors drop-shadow-md"
              >
                {t('contact')}
              </Link>

              {/* Search Icon */}
              <button className="text-white hover:text-amber-300 p-1 drop-shadow-md" title="Search">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Auth Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  {user.role === 'ADMIN' ? (
                    <Link
                      href="/admin"
                      className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center space-x-1"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t('adminPanel')}</span>
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center space-x-1"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>{t('dashboard')}</span>
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="p-2 text-slate-300 hover:text-red-400 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 font-black text-xs tracking-wider uppercase">
                  <Link
                    href="/login"
                    className="px-6 py-2.5 rounded-lg border border-white text-white hover:bg-white/20 transition-all backdrop-blur-sm shadow-md"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 transition-all font-black shadow-lg"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:text-amber-300 rounded-lg focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-t border-white/10 px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-black text-white hover:bg-white/10 rounded-lg uppercase"
            >
              {t('home')}
            </Link>

            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-black text-slate-300 hover:bg-white/10 rounded-lg uppercase"
            >
              {t('about')}
            </Link>

            <Link
              href="/#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-black text-slate-300 hover:bg-white/10 rounded-lg uppercase"
            >
              {t('gallery')}
            </Link>

            <Link
              href="/places"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-black text-slate-300 hover:bg-white/10 rounded-lg uppercase"
            >
              {t('destinations')}
            </Link>

            <Link
              href="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-black text-slate-300 hover:bg-white/10 rounded-lg uppercase"
            >
              {t('packages')}
            </Link>

            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-black text-slate-300 hover:bg-white/10 rounded-lg uppercase"
            >
              {t('contact')}
            </Link>

            {user ? (
              <div className="pt-2 border-t border-white/10 space-y-2">
                <Link
                  href={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 rounded-lg bg-emerald-600 font-extrabold text-white text-xs uppercase"
                >
                  {user.role === 'ADMIN' ? t('adminPanel') : t('dashboard')}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-center py-2.5 rounded-lg bg-red-600/80 font-extrabold text-white text-xs uppercase"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg border border-white text-white font-black text-xs uppercase"
                >
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg bg-amber-400 text-slate-950 font-black text-xs uppercase"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
