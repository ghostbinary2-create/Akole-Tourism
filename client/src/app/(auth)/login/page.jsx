'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Compass, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  const isRegistered = searchParams.get('registered') === 'true';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await login({ email, password });
    if (res.success) {
      router.push(redirectUrl);
    } else {
      setError(res.message || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full glass-dark border border-slate-800/80 rounded-3xl shadow-2xl p-8 space-y-8 relative z-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-emerald-950/40">
            <Compass className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-black text-white font-heading">Akole Tourism</span>
        </Link>
        <h2 className="text-2xl font-extrabold text-white tracking-tight pt-2">Welcome Back</h2>
        <p className="text-xs text-slate-400">Sign in to manage your bookings and explore tour packages.</p>
      </div>

      {isRegistered && !error && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Registration successful! Please enter your email & password to sign in.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@akole.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base shadow-xl shadow-emerald-950/50 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
        >
          <LogIn className="w-5 h-5" />
          <span>{loading ? 'Signing In...' : 'Sign In'}</span>
        </button>
      </form>

      <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-800">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-emerald-400 font-extrabold hover:underline">
          Register now
        </Link>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-20 px-4 relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-950 to-slate-950 pointer-events-none" />

      <Suspense fallback={
        <div className="max-w-md w-full glass-dark border border-slate-800/80 rounded-3xl p-8 text-center text-slate-400 text-sm relative z-10 animate-pulse">
          Loading login form...
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
