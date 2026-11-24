'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import {
  User as UserIcon,
  Package,
  Calendar,
  Bell,
  LogOut,
  Printer
} from 'lucide-react';

export default function UserDashboard() {
  const { user, logout, updateUserProfile } = useAuth();

  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Profile Edit Form State
  const [name, setName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileMsg, setProfileMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setMobile(user.mobile);
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [bookingsRes, notifsRes] = await Promise.all([
        api.get('/bookings/my'),
        api.get('/notifications')
      ]);

      if (bookingsRes.data.success) {
        setBookings(bookingsRes.data.bookings);
      }
      if (notifsRes.data.success) {
        setNotifications(notifsRes.data.notifications);
        setUnreadCount(notifsRes.data.unreadCount);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const res = await api.put(`/bookings/${bookingId}/cancel`);
      if (res.data.success) {
        fetchUserData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleMarkNotifRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      fetchUserData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg(null);

    const payload = { name, mobile };
    if (newPassword) {
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
    }

    const ok = await updateUserProfile(payload);
    if (ok) {
      setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setProfileMsg({ type: 'error', text: 'Failed to update profile. Please verify your current password.' });
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-white">Please Login to Access Dashboard</h2>
        <Link href="/login" className="mt-4 inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 pb-20">
      
      {/* Dedicated Dashboard Header with Logo (No Landing Navbar) */}
      <header className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo Branding */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex flex-col">
              <svg className="w-9 h-5 text-white stroke-[2]" viewBox="0 0 100 50" fill="none" stroke="currentColor">
                <path d="M10 40 L30 10 L50 40 M40 40 L65 5 L90 40 M70 40 L85 20 L100 40" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-lg font-black tracking-wider leading-none mt-0.5">
                <span className="text-amber-400">AKOLE </span>
                <span className="text-cyan-400">TOURISM</span>
              </div>
              <span className="text-[7.5px] tracking-[0.2em] text-emerald-400 font-extrabold uppercase mt-0.5">
                TRAVELER DASHBOARD
              </span>
            </div>
          </Link>

          {/* Top Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/"
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors hidden md:inline-block"
            >
              ← Back to Home
            </Link>

            <Link
              href="/packages"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 font-extrabold text-xs text-white shadow-md shadow-emerald-950/40 transition-all"
            >
              Browse Packages
            </Link>

            {user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-md"
              >
                Admin Panel
              </Link>
            )}

            <button
              onClick={logout}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 font-bold text-xs border border-slate-700 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Welcome Banner Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.profileImage || '/places/sandhan-valley.jpg'}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 shadow-xl"
            />
            <div>
              <span className="text-xs text-emerald-400 font-extrabold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                User Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white font-heading">Welcome, {user.name}!</h1>
              <p className="text-xs text-slate-400">{user.email} • {user.mobile}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Account Status: <strong className="text-emerald-400">Active</strong></span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Dashboard Tabs */}
        <div className="flex border-b border-slate-800 space-x-6 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-4 text-sm font-extrabold flex items-center space-x-2 border-b-2 transition-all shrink-0 ${
              activeTab === 'bookings'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 text-sm font-extrabold flex items-center space-x-2 border-b-2 transition-all shrink-0 ${
              activeTab === 'profile'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile & Password</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-4 text-sm font-extrabold flex items-center space-x-2 border-b-2 transition-all relative shrink-0 ${
              activeTab === 'notifications'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: MY BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-slate-900 animate-pulse rounded-3xl" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-slate-900/80 p-12 rounded-3xl border border-slate-800 text-center space-y-4">
                <Calendar className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-xl font-bold text-white">No Tour Bookings Yet</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Discover Kalsubai Peak, Bhandardara camping, and Sandhan Valley tours to make your first booking!
                </p>
                <Link
                  href="/packages"
                  className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-sm shadow-lg"
                >
                  Explore Packages Now
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={b.package?.images?.[0] || '/places/sandhan-valley.jpg'}
                        alt=""
                        className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-800"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                            {b.bookingId}
                          </span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                            b.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-300' :
                            b.status === 'CANCELLED' ? 'bg-red-500/20 text-red-300' :
                            b.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {b.status}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mt-2 font-heading">{b.package?.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Destination: <strong className="text-slate-200">{b.package?.destination}</strong> • Duration: {b.package?.duration}
                        </p>
                        <p className="text-xs text-slate-300 mt-1">
                          Travel Date: <strong className="text-white">{new Date(b.travelDate).toDateString()}</strong> • {b.numberOfPeople} Traveler(s)
                        </p>
                      </div>
                    </div>

                    <div className="md:text-right flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
                      <div>
                        <span className="text-xs text-slate-400 block uppercase font-bold">Total Paid</span>
                        <span className="text-2xl font-black text-white font-heading">₹{b.totalAmount.toLocaleString()}</span>
                        <span className="text-[11px] block text-emerald-400 font-semibold mt-0.5">
                          Payment: {b.paymentStatus}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <button
                          onClick={() => window.print()}
                          className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center space-x-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>

                        {b.status !== 'CANCELLED' && b.status !== 'COMPLETED' && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold text-xs border border-red-500/30"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROFILE & PASSWORD */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-slate-900/90 p-8 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 mb-6 font-heading">
              User Profile & Password Management
            </h3>

            {profileMsg && (
              <div className={`p-4 rounded-xl mb-6 text-xs font-bold ${
                profileMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {profileMsg.text}
              </div>
            )}

            <form onSubmit={handleUpdateProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Email (Read Only)</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-slate-500 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-4">
                <h4 className="font-bold text-white text-sm">Change Password (Optional)</h4>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Required to change password"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm shadow-xl mt-4"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="max-w-3xl bg-slate-900/90 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white font-heading">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={() => handleMarkNotifRead('all')}
                  className="text-xs font-bold text-emerald-400 hover:underline"
                >
                  Mark All Read
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-6">No notifications found.</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => !n.isRead && handleMarkNotifRead(n.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      n.isRead ? 'bg-slate-950/60 border-slate-800 opacity-60' : 'bg-slate-900 border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{n.title}</h4>
                      <span className="text-[10px] text-slate-500">{new Date(n.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{n.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
