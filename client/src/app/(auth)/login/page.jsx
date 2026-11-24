import React, { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Sign In - Akole Tourism',
  description: 'Sign in to your Akole Tourism account to manage your tour bookings and profile.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-950 to-slate-950 pointer-events-none" />

      <Suspense
        fallback={
          <div className="max-w-md w-full glass-dark border border-slate-800/80 rounded-3xl p-8 text-center text-slate-400 text-sm relative z-10 animate-pulse">
            Loading login form...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
