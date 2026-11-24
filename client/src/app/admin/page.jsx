'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import {
  Users,
  MapPin,
  Package,
  Calendar,
  IndianRupee,
  ShieldCheck,
  TrendingUp,
  Search,
  Plus,
  Trash2,
  Bell,
  Star,
  BarChart3,
  LogOut,
  Sun,
  Moon,
  Home,
  CheckCircle2,
  Sparkles,
  Activity,
  ChevronRight,
  X
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [placesList, setPlacesList] = useState([]);
  const [packagesList, setPackagesList] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals for CRUD
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);

  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [broadcastLoading, setBroadcastLoading] = useState(false);

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      fetchAdminStats();
      fetchPlaces();
      fetchPackages();
    }
  }, [user]);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') return;
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'places') fetchPlaces();
    if (activeTab === 'packages') fetchPackages();
    if (activeTab === 'bookings') fetchBookings();
    if (activeTab === 'reviews') fetchReviews();
  }, [activeTab]);

  const fetchAdminStats = async () => {
    try {
      const res = await api.get('/stats/admin');
      if (res.data.success) {
        setStats(res.data.stats);
        setCharts(res.data.charts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/users?search=${searchQuery}`);
      if (res.data?.success && Array.isArray(res.data.users)) setUsersList(res.data.users);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchPlaces = async () => {
    try {
      const res = await api.get('/places?status=ALL');
      if (res.data?.success && Array.isArray(res.data.places)) {
        setPlacesList(res.data.places);
      }
    } catch (err) {
      console.error('Failed to fetch places:', err);
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await api.get('/packages?status=ALL');
      if (res.data?.success && Array.isArray(res.data.packages)) {
        setPackagesList(res.data.packages);
      }
    } catch (err) {
      console.error('Failed to fetch packages:', err);
    }
  };

  const fetchBookings = async () => {
    const res = await api.get(`/bookings/admin/all?search=${searchQuery}`);
    if (res.data.success) setBookingsList(res.data.bookings);
  };

  const fetchReviews = async () => {
    const res = await api.get('/reviews/admin');
    if (res.data.success) setReviewsList(res.data.reviews);
  };

  // --- ACTIONS ---
  const handleToggleUserBlock = async (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    await api.put(`/users/${id}/status`, { status: newStatus });
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user account?')) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  const handleSavePlace = async (e) => {
    e.preventDefault();
    const data = { ...editingPlace };
    if (data.id) {
      await api.put(`/places/${data.id}`, data);
    } else {
      await api.post('/places', data);
    }
    setShowPlaceModal(false);
    setEditingPlace(null);
    fetchPlaces();
  };

  const handleDeletePlace = async (id) => {
    if (!confirm('Delete this place?')) return;
    await api.delete(`/places/${id}`);
    fetchPlaces();
  };

  const handleSavePackage = async (e) => {
    e.preventDefault();
    const data = { ...editingPackage };
    if (data.id) {
      await api.put(`/packages/${data.id}`, data);
    } else {
      await api.post('/packages', data);
    }
    setShowPackageModal(false);
    setEditingPackage(null);
    fetchPackages();
  };

  const handleDeletePackage = async (id) => {
    if (!confirm('Delete this package?')) return;
    await api.delete(`/packages/${id}`);
    fetchPackages();
  };

  const handleBookingAction = async (id, action) => {
    await api.put(`/bookings/admin/${id}/${action}`);
    fetchBookings();
  };

  const handleApproveReview = async (id) => {
    await api.put(`/reviews/admin/${id}/approve`);
    fetchReviews();
  };

  const handleDeleteReview = async (id) => {
    if (!confirm('Delete this review?')) return;
    await api.delete(`/reviews/${id}`);
    fetchReviews();
  };

  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    setBroadcastLoading(true);
    try {
      const res = await api.post('/notifications/broadcast', { title: broadcastTitle, message: broadcastMsg });
      setBroadcastSent(res.data?.message || 'Broadcast notification and emails successfully pushed to all users!');
      setBroadcastTitle('');
      setBroadcastMsg('');
      setTimeout(() => setBroadcastSent(false), 5000);
    } catch (err) {
      console.error(err);
      alert('Failed to send broadcast');
    } finally {
      setBroadcastLoading(false);
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[#070e24] flex items-center justify-center p-4">
        <div className="bg-[#0f1d40] border border-[#1e3466] p-8 rounded-3xl max-w-md text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center mx-auto border border-red-500/20">
            <X className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white font-heading">Access Restricted</h2>
          <p className="text-slate-300 text-sm">Only authorized administrators can view this control panel.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-500 ${
      isDarkTheme ? 'bg-[#081026] text-slate-100' : 'bg-[#F4F6F9] text-slate-900'
    }`}>
      
      {/* ===================== SIDEBAR (NAVY BLUE) ===================== */}
      <aside className={`w-full md:w-72 border-r p-6 flex flex-col justify-between shrink-0 transition-colors duration-300 z-30 ${
        isDarkTheme 
          ? 'bg-[#0c1838] border-[#182d5a] backdrop-blur-2xl text-white' 
          : 'bg-white border-slate-200 shadow-xl text-slate-900'
      }`}>
        <div className="space-y-8">
          
          {/* Logo Branding */}
          <div className="flex items-center space-x-3.5 group cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#081026] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="text-base font-black tracking-wider leading-none">
                <span className="text-amber-400">AKOLE</span>{' '}
                <span className={isDarkTheme ? 'text-white' : 'text-slate-900'}>ADMIN</span>
              </div>
              <span className="text-[9px] tracking-widest text-emerald-400 font-extrabold uppercase mt-1 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Navy Control Center</span>
              </span>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-2">
                Core Analytics
              </span>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : isDarkTheme
                        ? 'text-slate-300 hover:text-white hover:bg-[#12234d]'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-4 h-4" />
                    <span>Dashboard Stats</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${activeTab === 'overview' ? 'text-slate-950' : 'opacity-40'}`} />
                </button>

                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    activeTab === 'bookings'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : isDarkTheme
                        ? 'text-slate-300 hover:text-white hover:bg-[#12234d]'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4" />
                    <span>Bookings List</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    activeTab === 'bookings' ? 'bg-slate-950/20 text-slate-950' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {stats?.totalBookings || 0}
                  </span>
                </button>
              </nav>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-2">
                Inventory & Places
              </span>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('places')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    activeTab === 'places'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : isDarkTheme
                        ? 'text-slate-300 hover:text-white hover:bg-[#12234d]'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4" />
                    <span>Tourist Places</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    activeTab === 'places' ? 'bg-slate-950/20 text-slate-950' : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {stats?.totalPlaces || 12}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('packages')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    activeTab === 'packages'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : isDarkTheme
                        ? 'text-slate-300 hover:text-white hover:bg-[#12234d]'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Package className="w-4 h-4" />
                    <span>Tour Packages</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    activeTab === 'packages' ? 'bg-slate-950/20 text-slate-950' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {stats?.totalPackages || 10}
                  </span>
                </button>
              </nav>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-2">
                Users & Community
              </span>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    activeTab === 'users'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : isDarkTheme
                        ? 'text-slate-300 hover:text-white hover:bg-[#12234d]'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-4 h-4" />
                    <span>User Accounts</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${activeTab === 'users' ? 'text-slate-950' : 'opacity-40'}`} />
                </button>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    activeTab === 'reviews'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : isDarkTheme
                        ? 'text-slate-300 hover:text-white hover:bg-[#12234d]'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Star className="w-4 h-4" />
                    <span>Review Moderation</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${activeTab === 'reviews' ? 'text-slate-950' : 'opacity-40'}`} />
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    activeTab === 'notifications'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : isDarkTheme
                        ? 'text-slate-300 hover:text-white hover:bg-[#12234d]'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Bell className="w-4 h-4" />
                    <span>Broadcast Notice</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${activeTab === 'notifications' ? 'text-slate-950' : 'opacity-40'}`} />
                </button>
              </nav>
            </div>
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#182d5a] space-y-3">
          
          {/* Admin Profile Box */}
          <div className={`p-3 rounded-2xl border flex items-center space-x-3 ${
            isDarkTheme ? 'bg-[#101f44] border-[#1e3466]' : 'bg-slate-100 border-slate-200'
          }`}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate leading-tight text-white">{user.name}</p>
              <p className="text-[10px] text-slate-300 truncate">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => window.location.href = '/'}
              className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold flex items-center justify-center space-x-1.5 transition-all ${
                isDarkTheme ? 'border-[#1e3466] bg-[#101f44] hover:bg-[#152754] text-slate-200' : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span>Public Site</span>
            </button>

            <button
              onClick={logout}
              className="py-2.5 px-3 rounded-xl bg-red-600/20 hover:bg-red-600 border border-red-500/30 text-red-300 hover:text-white text-[11px] font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </aside>

      {/* ===================== MAIN CONTENT (NAVY BLUE) ===================== */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col justify-between space-y-8">
        
        <div>
          {/* Top Bar with Navy Blue styling */}
          <div className={`p-4 rounded-3xl border backdrop-blur-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg ${
            isDarkTheme ? 'bg-[#0c1838]/90 border-[#182d5a] text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Breadcrumb & Title */}
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider">
                <span className="text-slate-400">Akole Admin</span>
                <span className="text-slate-500">/</span>
                <span className="text-amber-400 font-black">{activeTab.toUpperCase()}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              
              {/* Theme Toggle Pill */}
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 border transition-all shadow-sm ${
                  isDarkTheme 
                    ? 'bg-[#101f44] text-amber-300 border-[#1e3466] hover:bg-[#152754]' 
                    : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200'
                }`}
                title="Toggle Dark (Navy) / Light Theme"
              >
                {isDarkTheme ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span>Navy Mode</span>
                  </>
                )}
              </button>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md shadow-red-600/20 transition-all hover:scale-105"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* ===================== TAB 1: OVERVIEW (NAVY BLUE) ===================== */}
          {activeTab === 'overview' && (
            <div className="space-y-10">
              
              {/* Welcome Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#132552] to-teal-500/20 border border-[#223d78] p-8 shadow-2xl backdrop-blur-xl">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <span className="text-amber-400 text-xs font-black uppercase tracking-widest flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Executive Overview</span>
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight font-heading text-white">
                      Welcome back, {user.name} 👋
                    </h1>
                    <p className={`text-sm mt-1 max-w-xl ${isDarkTheme ? 'text-slate-300' : 'text-slate-600'}`}>
                      Akole tehsil tourism portal is live in Royal Navy Theme. Manage tourist packages, bookings, reviews, and revenue telemetry.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setEditingPackage({ name: '', description: '', destination: '', duration: '2 Days / 1 Night', price: 1500, maxPeople: 25, availableSeats: 25 });
                        setShowPackageModal(true);
                      }}
                      className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Package</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 6 Key Stat Cards in Navy Blue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Revenue Card */}
                <div className={`p-6 rounded-3xl border shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                  isDarkTheme 
                    ? 'bg-gradient-to-br from-[#0e1a3b] to-[#0a132c] border-[#1d3466]' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
                      <IndianRupee className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+14.5%</span>
                    </span>
                  </div>
                  <h3 className="text-3xl font-black font-heading tracking-tight text-white">₹{(stats?.totalRevenue || 0).toLocaleString()}</h3>
                  <p className={`text-xs font-semibold mt-1 ${isDarkTheme ? 'text-slate-300' : 'text-slate-500'}`}>
                    Total Revenue Collected
                  </p>
                </div>

                {/* 2. Total Bookings */}
                <div className={`p-6 rounded-3xl border shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                  isDarkTheme 
                    ? 'bg-gradient-to-br from-[#0e1a3b] to-[#0a132c] border-[#1d3466]' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <Calendar className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+8.2%</span>
                    </span>
                  </div>
                  <h3 className="text-3xl font-black font-heading tracking-tight text-white">{stats?.totalBookings || 0}</h3>
                  <p className={`text-xs font-semibold mt-1 ${isDarkTheme ? 'text-slate-300' : 'text-slate-500'}`}>
                    Total Customer Bookings
                  </p>
                </div>

                {/* 3. Registered Users */}
                <div className={`p-6 rounded-3xl border shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                  isDarkTheme 
                    ? 'bg-gradient-to-br from-[#0e1a3b] to-[#0a132c] border-[#1d3466]' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Users className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-[11px] bg-blue-500/20 text-blue-400 font-extrabold px-2.5 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <h3 className="text-3xl font-black font-heading tracking-tight text-white">{stats?.totalUsers || 0}</h3>
                  <p className={`text-xs font-semibold mt-1 ${isDarkTheme ? 'text-slate-300' : 'text-slate-500'}`}>
                    Registered Tourist Users
                  </p>
                </div>

                {/* 4. Tourist Places */}
                <div className={`p-6 rounded-3xl border shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                  isDarkTheme 
                    ? 'bg-gradient-to-br from-[#0e1a3b] to-[#0a132c] border-[#1d3466]' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <MapPin className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-[11px] bg-cyan-500/20 text-cyan-400 font-extrabold px-2.5 py-1 rounded-full">
                      12 Spots
                    </span>
                  </div>
                  <h3 className="text-3xl font-black font-heading tracking-tight text-white">{stats?.totalPlaces || 12}</h3>
                  <p className={`text-xs font-semibold mt-1 ${isDarkTheme ? 'text-slate-300' : 'text-slate-500'}`}>
                    Attractions in Akole Tehsil
                  </p>
                </div>

                {/* 5. Tour Packages */}
                <div className={`p-6 rounded-3xl border shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                  isDarkTheme 
                    ? 'bg-gradient-to-br from-[#0e1a3b] to-[#0a132c] border-[#1d3466]' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-400 text-slate-950 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Package className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-[11px] bg-purple-500/20 text-purple-400 font-extrabold px-2.5 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  <h3 className="text-3xl font-black font-heading tracking-tight text-white">{stats?.totalPackages || 10}</h3>
                  <p className={`text-xs font-semibold mt-1 ${isDarkTheme ? 'text-slate-300' : 'text-slate-500'}`}>
                    Active Guided Tour Packages
                  </p>
                </div>

                {/* 6. Upcoming Confirmed Tours */}
                <div className={`p-6 rounded-3xl border shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                  isDarkTheme 
                    ? 'bg-gradient-to-br from-[#0e1a3b] to-[#0a132c] border-[#1d3466]' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-400 text-slate-950 flex items-center justify-center shadow-lg shadow-rose-500/30">
                      <Activity className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-[11px] bg-rose-500/20 text-rose-400 font-extrabold px-2.5 py-1 rounded-full">
                      Confirmed
                    </span>
                  </div>
                  <h3 className="text-3xl font-black font-heading tracking-tight text-white">{stats?.upcomingTours || 2}</h3>
                  <p className={`text-xs font-semibold mt-1 ${isDarkTheme ? 'text-slate-300' : 'text-slate-500'}`}>
                    Upcoming Departure Tours
                  </p>
                </div>

              </div>

              {/* Dynamic Recharts Visualizations */}
              {charts && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Monthly Bookings Area Chart */}
                  <div className={`p-7 rounded-3xl border shadow-xl ${
                    isDarkTheme ? 'bg-[#0c1838] border-[#182d5a] text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-black font-heading">Bookings Trajectory</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Monthly tourist bookings frequency</p>
                      </div>
                      <span className="text-xs font-black px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                        Monthly
                      </span>
                    </div>

                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={charts.monthlyBookings}>
                          <defs>
                            <linearGradient id="emeraldNavyGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? '#182d5a' : '#f1f5f9'} />
                          <XAxis dataKey="month" stroke={isDarkTheme ? '#8fa0c9' : '#94a3b8'} textAnchor="end" />
                          <YAxis stroke={isDarkTheme ? '#8fa0c9' : '#94a3b8'} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: isDarkTheme ? '#0d1a3a' : '#ffffff', 
                              borderColor: isDarkTheme ? '#223d78' : '#cbd5e1', 
                              borderRadius: '16px',
                              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                              color: isDarkTheme ? '#fff' : '#000' 
                            }} 
                          />
                          <Area type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} fill="url(#emeraldNavyGradient)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Monthly Revenue Bar Chart */}
                  <div className={`p-7 rounded-3xl border shadow-xl ${
                    isDarkTheme ? 'bg-[#0c1838] border-[#182d5a] text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-black font-heading">Revenue Collection (₹)</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Gross revenue from package sales</p>
                      </div>
                      <span className="text-xs font-black px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                        In INR (₹)
                      </span>
                    </div>

                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={charts.monthlyBookings}>
                          <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? '#182d5a' : '#f1f5f9'} />
                          <XAxis dataKey="month" stroke={isDarkTheme ? '#8fa0c9' : '#94a3b8'} />
                          <YAxis stroke={isDarkTheme ? '#8fa0c9' : '#94a3b8'} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: isDarkTheme ? '#0d1a3a' : '#ffffff', 
                              borderColor: isDarkTheme ? '#223d78' : '#cbd5e1', 
                              borderRadius: '16px',
                              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                              color: isDarkTheme ? '#fff' : '#000' 
                            }} 
                          />
                          <Bar dataKey="revenue" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ===================== TAB 2: USER MANAGEMENT (NAVY BLUE) ===================== */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black font-heading text-white">User Accounts Management</h1>
                  <p className="text-xs text-slate-400">View, filter, edit, block/unblock, or delete user accounts.</p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by name, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs font-medium focus:outline-none focus:border-amber-400 ${
                      isDarkTheme ? 'bg-[#0f1d40] border-[#1e3466] text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
                isDarkTheme ? 'bg-[#0c1838] border-[#182d5a] text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <table className="w-full text-left text-xs">
                  <thead className={`uppercase font-black tracking-wider ${isDarkTheme ? 'bg-[#09132e] text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    <tr>
                      <th className="p-4 pl-6">User</th>
                      <th className="p-4">Mobile</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Bookings</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDarkTheme ? 'divide-[#182d5a]' : 'divide-slate-200'}`}>
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-[#12234d]/60 transition-colors">
                        <td className="p-4 pl-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-xs">
                              {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <p className="font-bold text-white text-sm">{u.name}</p>
                              <p className="text-[11px] text-slate-400">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono">{u.mobile || 'N/A'}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full font-black text-[10px] uppercase ${
                            u.role === 'ADMIN' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-700 text-slate-200'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full font-black text-[10px] uppercase ${
                            u.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-4 font-bold">{u._count?.bookings || 0}</td>
                        <td className="p-4 pr-6 text-right space-x-2">
                          {u.role !== 'ADMIN' && (
                            <>
                              <button
                                onClick={() => handleToggleUserBlock(u.id, u.status)}
                                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                                  u.status === 'ACTIVE'
                                    ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30'
                                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
                                }`}
                              >
                                {u.status === 'ACTIVE' ? 'Block' : 'Unblock'}
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10"
                                title="Delete user"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================== TAB 3: TOURIST PLACES (NAVY BLUE) ===================== */}
          {activeTab === 'places' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black font-heading text-white">Tourist Places Management</h1>
                  <p className="text-xs text-slate-400">Add, edit, or delete tourist attractions in Akole tehsil.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingPlace({ name: '', description: '', location: '', entryFee: 0, bestTimeToVisit: 'Monsoon', images: [] });
                    setShowPlaceModal(true);
                  }}
                  className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Attraction</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {placesList.map((p) => (
                  <div key={p.id} className={`p-6 rounded-3xl border shadow-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                    isDarkTheme ? 'bg-[#0c1838] border-[#182d5a]' : 'bg-white border-slate-200'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                          {p.bestTimeToVisit}
                        </span>
                        <span className="text-xs font-black text-amber-400">
                          {p.entryFee > 0 ? `₹${p.entryFee}` : 'Free'}
                        </span>
                      </div>
                      
                      <h3 className="font-black text-xl font-heading mt-3 text-white">{p.name}</h3>
                      <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{p.location}</span>
                      </p>
                      
                      <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#182d5a] flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setEditingPlace(p);
                          setShowPlaceModal(true);
                        }}
                        className="px-4 py-2 bg-[#142654] hover:bg-[#1a326e] text-white font-bold text-xs rounded-xl transition-all"
                      >
                        Edit Spot
                      </button>
                      <button
                        onClick={() => handleDeletePlace(p.id)}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white font-bold text-xs rounded-xl transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== TAB 4: TOUR PACKAGES (NAVY BLUE) ===================== */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black font-heading text-white">Tour Packages Management</h1>
                  <p className="text-xs text-slate-400">Manage guided packages, duration, pricing, itineraries & seats.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingPackage({ name: '', description: '', destination: '', duration: '2 Days / 1 Night', price: 1500, maxPeople: 25, availableSeats: 25 });
                    setShowPackageModal(true);
                  }}
                  className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Tour Package</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packagesList.map((pkg) => (
                  <div key={pkg.id} className={`p-6 rounded-3xl border shadow-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                    isDarkTheme ? 'bg-[#0c1838] border-[#182d5a]' : 'bg-white border-slate-200'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                          {pkg.duration}
                        </span>
                        <span className="text-xl font-black text-amber-400 font-heading">
                          ₹{pkg.price}
                        </span>
                      </div>

                      <h3 className="font-black text-xl font-heading mt-3 text-white">{pkg.name}</h3>
                      <p className="text-xs text-amber-400 font-bold mt-1">📍 {pkg.destination}</p>
                      
                      <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#182d5a] flex items-center justify-between text-xs text-slate-400">
                        <span>Seats Available:</span>
                        <strong className="text-emerald-400">{pkg.availableSeats} / {pkg.maxPeople}</strong>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#182d5a] flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setEditingPackage(pkg);
                          setShowPackageModal(true);
                        }}
                        className="px-4 py-2 bg-[#142654] hover:bg-[#1a326e] text-white font-bold text-xs rounded-xl transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white font-bold text-xs rounded-xl transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== TAB 5: BOOKINGS LIST (NAVY BLUE) ===================== */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black font-heading text-white">Customer Bookings Telemetry</h1>
                  <p className="text-xs text-slate-400">Real-time status tracking, confirmations, and cancellations.</p>
                </div>
              </div>

              <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
                isDarkTheme ? 'bg-[#0c1838] border-[#182d5a] text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <table className="w-full text-left text-xs">
                  <thead className={`uppercase font-black tracking-wider ${isDarkTheme ? 'bg-[#09132e] text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    <tr>
                      <th className="p-4 pl-6">ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Package</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">People</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDarkTheme ? 'divide-[#182d5a]' : 'divide-slate-200'}`}>
                    {bookingsList.map((b) => (
                      <tr key={b.id} className="hover:bg-[#12234d]/60 transition-colors">
                        <td className="p-4 pl-6 font-mono font-black text-amber-400">{b.bookingId}</td>
                        <td className="p-4 font-bold text-white">{b.user?.name || 'Customer'}</td>
                        <td className="p-4 font-semibold">{b.package?.name}</td>
                        <td className="p-4">{new Date(b.travelDate).toLocaleDateString()}</td>
                        <td className="p-4 font-bold">{b.numberOfPeople}</td>
                        <td className="p-4 font-black text-emerald-400">₹{b.totalAmount}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full font-black text-[10px] uppercase ${
                            b.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            b.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right space-x-1.5">
                          {b.status === 'PENDING' && (
                            <button
                              onClick={() => handleBookingAction(b.id, 'confirm')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs"
                            >
                              Confirm
                            </button>
                          )}
                          {b.status === 'CONFIRMED' && (
                            <button
                              onClick={() => handleBookingAction(b.id, 'complete')}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs"
                            >
                              Complete
                            </button>
                          )}
                          {b.status !== 'CANCELLED' && (
                            <button
                              onClick={() => handleBookingAction(b.id, 'cancel')}
                              className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white font-bold rounded-xl text-xs"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================== TAB 6: REVIEWS (NAVY BLUE) ===================== */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black font-heading text-white">User Reviews & Moderation</h1>
                <p className="text-xs text-slate-400">Approve authentic tourist reviews or delete spam entries.</p>
              </div>

              <div className="space-y-4">
                {reviewsList.map((r) => (
                  <div key={r.id} className={`p-6 rounded-3xl border shadow-xl flex items-center justify-between ${
                    isDarkTheme ? 'bg-[#0c1838] border-[#182d5a]' : 'bg-white border-slate-200'
                  }`}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-sm text-white font-heading">{r.user?.name}</span>
                        <span className="text-xs text-slate-400">on <strong className="text-amber-400">{r.package?.name}</strong></span>
                        <span className="text-amber-400 font-extrabold text-xs bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                          ★ {r.rating} / 5
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs italic">&ldquo;{r.comment}&rdquo;</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!r.isApproved && (
                        <button
                          onClick={() => handleApproveReview(r.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReview(r.id)}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white font-bold text-xs rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== TAB 7: NOTIFICATIONS (NAVY BLUE) ===================== */}
          {activeTab === 'notifications' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h1 className="text-2xl font-black font-heading text-white">Broadcast Message Announcement</h1>
                <p className="text-xs text-slate-400">Send an instant alert message and email notice to all registered users.</p>
              </div>

              {broadcastSent && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{typeof broadcastSent === 'string' ? broadcastSent : 'Broadcast notification and emails successfully pushed to all users!'}</span>
                </div>
              )}

              <form onSubmit={handleSendBroadcast} className={`p-8 rounded-3xl border space-y-5 shadow-2xl ${
                isDarkTheme ? 'bg-[#0c1838] border-[#182d5a]' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <label className="block text-xs font-black text-slate-300 uppercase mb-2">Announcement Headline</label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="e.g. Monsoon Trek Discounts Now Live!"
                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:border-amber-400 ${
                      isDarkTheme ? 'bg-[#0f1d40] border-[#1e3466] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-300 uppercase mb-2">Notice Body</label>
                  <textarea
                    rows={4}
                    required
                    value={broadcastMsg}
                    onChange={(e) => setBroadcastMsg(e.target.value)}
                    placeholder="Write announcement details for all registered tourists..."
                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:border-amber-400 ${
                      isDarkTheme ? 'bg-[#0f1d40] border-[#1e3466] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={broadcastLoading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:opacity-60 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.01] flex items-center justify-center space-x-2"
                >
                  <span>{broadcastLoading ? 'Broadcasting & Dispatching Emails...' : '📢 Push & Email Notice to All Users'}</span>
                </button>
              </form>
            </div>
          )}

        </div>

      </main>

      {/* ===================== CREATE / EDIT PLACE MODAL ===================== */}
      {showPlaceModal && (
        <div className="fixed inset-0 z-50 bg-[#060b1c]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1d40] w-full max-w-lg p-8 rounded-3xl border border-[#1e3466] text-white space-y-5 shadow-2xl">
            <h3 className="text-2xl font-black font-heading">{editingPlace?.id ? 'Edit Attraction' : 'Add New Tourist Spot'}</h3>
            <form onSubmit={handleSavePlace} className="space-y-4">
              <input
                type="text"
                placeholder="Place Name (e.g. Randha Falls)"
                required
                value={editingPlace?.name || ''}
                onChange={(e) => setEditingPlace({ ...editingPlace, name: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[#09132e] border border-[#1e3466] text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <textarea
                placeholder="Description"
                required
                rows={3}
                value={editingPlace?.description || ''}
                onChange={(e) => setEditingPlace({ ...editingPlace, description: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[#09132e] border border-[#1e3466] text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <input
                type="text"
                placeholder="Location (e.g. Bhandardara, Akole)"
                required
                value={editingPlace?.location || ''}
                onChange={(e) => setEditingPlace({ ...editingPlace, location: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[#09132e] border border-[#1e3466] text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Entry Fee (₹)"
                  value={editingPlace?.entryFee || 0}
                  onChange={(e) => setEditingPlace({ ...editingPlace, entryFee: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#09132e] border border-[#1e3466] text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Best Time (e.g. July to Oct)"
                  value={editingPlace?.bestTimeToVisit || 'July to Oct'}
                  onChange={(e) => setEditingPlace({ ...editingPlace, bestTimeToVisit: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#09132e] border border-[#1e3466] text-xs text-white"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPlaceModal(false)} className="w-1/2 py-3 border border-[#1e3466] bg-[#0c1838] rounded-2xl text-xs font-bold text-slate-300">Cancel</button>
                <button type="submit" className="w-1/2 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-lg">Save Spot</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== CREATE / EDIT PACKAGE MODAL ===================== */}
      {showPackageModal && (
        <div className="fixed inset-0 z-50 bg-[#060b1c]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1d40] w-full max-w-lg p-8 rounded-3xl border border-[#1e3466] text-white space-y-5 shadow-2xl">
            <h3 className="text-2xl font-black font-heading">{editingPackage?.id ? 'Edit Tour Package' : 'Create New Tour Package'}</h3>
            <form onSubmit={handleSavePackage} className="space-y-4">
              <input
                type="text"
                placeholder="Package Name (e.g. Sandhan Valley Descent)"
                required
                value={editingPackage?.name || ''}
                onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[#09132e] border border-[#1e3466] text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <textarea
                placeholder="Package Description & Inclusions"
                required
                rows={3}
                value={editingPackage?.description || ''}
                onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[#09132e] border border-[#1e3466] text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <input
                type="text"
                placeholder="Destination Spot"
                required
                value={editingPackage?.destination || ''}
                onChange={(e) => setEditingPackage({ ...editingPackage, destination: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[#09132e] border border-[#1e3466] text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Price (₹)"
                  required
                  value={editingPackage?.price || 0}
                  onChange={(e) => setEditingPackage({ ...editingPackage, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#09132e] border border-[#1e3466] text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Duration (e.g. 2 Days / 1 Night)"
                  required
                  value={editingPackage?.duration || ''}
                  onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#09132e] border border-[#1e3466] text-xs text-white"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPackageModal(false)} className="w-1/2 py-3 border border-[#1e3466] bg-[#0c1838] rounded-2xl text-xs font-bold text-slate-300">Cancel</button>
                <button type="submit" className="w-1/2 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-lg">Save Package</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
