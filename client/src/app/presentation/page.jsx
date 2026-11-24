'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Home,
  Layers,
  Database,
  Users,
  Compass,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  GitCommit,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  CreditCard,
  Star,
  Bell,
  Check,
  Code2,
  Server,
  Globe,
  Monitor,
  Smartphone,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';



const slides = [
  { id: 1, title: 'Project Title & Team', subtitle: 'Akole Tourism & Tour Package Management System', category: 'Introduction' },
  { id: 2, title: 'Project Overview', subtitle: 'Purpose, Problem Statement & Core Modules', category: 'Overview' },
  { id: 3, title: 'Entity-Relationship Diagram', subtitle: 'Complete Database ER Model with 7 Entities & Cardinalities', category: 'Data Architecture' },
  { id: 4, title: 'Database Design', subtitle: 'Relational Schema Tables, Attributes, Types & Constraints', category: 'Database' },
  { id: 5, title: 'UML Use Case Diagram', subtitle: 'Tourist (User) & Administrator Actors with Functional Scenarios', category: 'UML Modeling' },
  { id: 6, title: 'UML Class Diagram', subtitle: 'Class Attributes, Methods, Visibility & OOP Relationships', category: 'UML Modeling' },
  { id: 7, title: 'UML Activity Diagram', subtitle: 'End-to-End Tour Booking & Payment Workflow', category: 'Behavioral UML' },
  { id: 8, title: 'UML Sequence Diagram', subtitle: 'Step-by-Step Message Lifeline Across Client, API, DB & Gateway', category: 'Behavioral UML' },
  { id: 9, title: 'Conclusion & Future Scope', subtitle: 'Project Deliverables, Architecture Summary & Q&A', category: 'Summary' },
];

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [diagramZoom, setDiagramZoom] = useState(1);
  const [erNotationStyle, setErNotationStyle] = useState('CHEN');
  const [erTheme, setErTheme] = useState('WHITE');
  const [activeDbTab, setActiveDbTab] = useState('BOOKING');
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Team Leader 1', role: 'Full-Stack & Frontend Lead', roll: 'Roll No: 01', education: 'M.Sc. Computer Science - Part II' },
    { name: 'Team Leader 2', role: 'Backend & Database Lead', roll: 'Roll No: 02', education: 'M.Sc. Computer Science - Part II' },
  ]);
  const [guidanceInfo, setGuidanceInfo] = useState({
    guideName: 'Prof. / Dr. Project Guide',
    designation: 'Project Guide & Mentor',
    collegeName: 'Department of Computer Science',
    degree: 'M.Sc. Computer Science - Part II',
    academicYear: '2025 - 2026',
  });
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const slideContainerRef = useRef(null);

  // Load saved team & guidance from localStorage
  useEffect(() => {
    try {
      const savedTeam = localStorage.getItem('akole_team_members');
      if (savedTeam) setTeamMembers(JSON.parse(savedTeam));
      const savedGuidance = localStorage.getItem('akole_guidance_info');
      if (savedGuidance) setGuidanceInfo(JSON.parse(savedGuidance));
    } catch (e) {}
  }, []);

  const saveTeamAndGuidance = (updatedTeam, updatedGuidance) => {
    setTeamMembers(updatedTeam);
    setGuidanceInfo(updatedGuidance);
    try {
      localStorage.setItem('akole_team_members', JSON.stringify(updatedTeam));
      localStorage.setItem('akole_guidance_info', JSON.stringify(updatedGuidance));
    } catch (e) {}
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isEditingTeam) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(slides.length - 1);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isEditingTeam]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      setDiagramZoom(1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      setDiagramZoom(1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setDiagramZoom(1);
  };

  const progressPercentage = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 flex flex-col select-none overflow-hidden font-sans">
      
      {/* ─────────────────────────────────────────────────────────────
          TOP CONTROL BAR (PowerPoint Style)
      ───────────────────────────────────────────────────────────── */}
      <header className="h-16 bg-[#0B132B]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between z-50 shrink-0">
        
        {/* Brand & Presentation Title */}
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-2 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-slate-800/60 transition-all text-xs font-semibold"
            title="Return to Main Website"
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Exit to Website</span>
          </Link>

          <span className="text-slate-600 hidden sm:inline">|</span>

          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xs sm:text-sm font-black tracking-wider uppercase font-heading text-white truncate max-w-[200px] md:max-w-[380px]">
              Akole Tourism <span className="text-amber-400 font-normal">| College Project Presentation</span>
            </h1>
          </div>
        </div>

        {/* Slide Counter & Category Pill */}
        <div className="hidden md:flex items-center space-x-3">
          <span className="text-[11px] uppercase tracking-widest font-black px-3 py-1 rounded-full bg-slate-800/80 text-amber-300 border border-amber-400/20">
            {slides[currentSlide].category}
          </span>
          <span className="text-xs font-mono font-bold text-slate-400">
            Slide <strong className="text-emerald-400 font-black">{currentSlide + 1}</strong> of {slides.length}
          </span>
        </div>

        {/* Presentation Controls */}
        <div className="flex items-center space-x-2">
          
          {/* Slide Quick Jump Dropdown */}
          <select
            value={currentSlide}
            onChange={(e) => goToSlide(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-400 hidden lg:block cursor-pointer"
          >
            {slides.map((s, idx) => (
              <option key={s.id} value={idx}>
                {s.id}. {s.title}
              </option>
            ))}
          </select>

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-amber-400/20"
            title="Next Slide (Right Arrow / Space)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Fullscreen Mode */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-all hidden sm:block"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </header>

      {/* Top Progress Bar */}
      <div className="w-full h-1 bg-slate-800/50 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN SLIDE STAGE & CONTENT CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 relative overflow-y-auto overflow-x-hidden flex flex-col justify-between" ref={slideContainerRef}>
        
        {/* Subtle background ambient mesh */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full p-4 sm:p-8 md:p-10 flex-1 flex flex-col justify-center">

          {/* =========================================================
              SLIDE 1: TITLE SLIDE
          ========================================================= */}
          {currentSlide === 0 && (
            <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto text-center py-4">
              
              {/* Institution / Academic Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-400/30 px-5 py-2 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-300 font-heading">
                  {guidanceInfo.degree} | Major Project Presentation | {guidanceInfo.academicYear}
                </span>
              </div>

              {/* Main Project Title */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-heading leading-tight drop-shadow-xl">
                  Akole Tourism & Tour Package <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                    Management System
                  </span>
                </h1>
                <p className="text-sm sm:text-lg text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed pt-1">
                  A Full-Stack Web-Based Eco-Tourism Portal, Geolocation Attraction Directory, and Guided Tour Reservation Platform for Akole Tehsil, Maharashtra.
                </p>
              </div>

              {/* Technology Stack Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {[
                  { name: 'Next.js 14 App Router', icon: Monitor },
                  { name: 'Node.js & Express REST API', icon: Server },
                  { name: 'MySQL Database', icon: Database },
                  { name: 'Prisma ORM', icon: Code2 },
                  { name: 'Leaflet OpenStreetMap GPS', icon: MapPin },
                  { name: 'Tailwind CSS Glassmorphism', icon: Layers },
                  { name: 'JWT & Bcrypt Security', icon: Shield },
                ].map((t, idx) => {
                  const Icon = t.icon;
                  return (
                    <span key={idx} className="bg-slate-900/90 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-300 flex items-center space-x-1.5 shadow-md">
                      <Icon className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.name}</span>
                    </span>
                  );
                })}
              </div>

              {/* Team Leaders & Guidance Card */}
              <div className="bg-[#0D1630]/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl max-w-4xl mx-auto text-left mt-4">
                
                {/* Card Top Action Bar */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-black uppercase tracking-wider text-white font-heading">
                      Project Team Leaders & Academic Guidance
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsEditingTeam(!isEditingTeam)}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 hover:bg-amber-400 hover:text-slate-950 transition-all flex items-center space-x-1"
                  >
                    <span>{isEditingTeam ? 'Close / Save' : 'Edit Team & Guide'}</span>
                  </button>
                </div>

                {isEditingTeam ? (
                  /* ────────────── INTERACTIVE EDIT MODE ────────────── */
                  <div className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-amber-400/30">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Edit Team Leaders Information (2 Leaders)
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono">Edits are saved automatically to browser</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teamMembers.map((m, idx) => (
                        <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 space-y-2">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono">
                            Team Leader {idx + 1}
                          </span>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5">Full Name:</label>
                            <input
                              type="text"
                              value={m.name}
                              onChange={(e) => {
                                const updated = [...teamMembers];
                                updated[idx].name = e.target.value;
                                saveTeamAndGuidance(updated, guidanceInfo);
                              }}
                              className="bg-slate-950 border border-slate-700 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg w-full focus:outline-none focus:border-amber-400"
                              placeholder={`Leader ${idx + 1} Name`}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-400 block mb-0.5">Roll No:</label>
                              <input
                                type="text"
                                value={m.roll}
                                onChange={(e) => {
                                  const updated = [...teamMembers];
                                  updated[idx].roll = e.target.value;
                                  saveTeamAndGuidance(updated, guidanceInfo);
                                }}
                                className="bg-slate-950 border border-slate-700 text-white text-xs font-mono px-2 py-1 rounded w-full focus:outline-none focus:border-amber-400"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 block mb-0.5">Class / Degree:</label>
                              <input
                                type="text"
                                value={m.education}
                                onChange={(e) => {
                                  const updated = [...teamMembers];
                                  updated[idx].education = e.target.value;
                                  saveTeamAndGuidance(updated, guidanceInfo);
                                }}
                                className="bg-slate-950 border border-slate-700 text-emerald-400 text-xs font-bold px-2 py-1 rounded w-full focus:outline-none focus:border-amber-400"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5">Project Role / Specialization:</label>
                            <input
                              type="text"
                              value={m.role}
                              onChange={(e) => {
                                const updated = [...teamMembers];
                                updated[idx].role = e.target.value;
                                saveTeamAndGuidance(updated, guidanceInfo);
                              }}
                              className="bg-slate-950 border border-slate-700 text-slate-300 text-xs px-2 py-1 rounded w-full focus:outline-none focus:border-amber-400"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Guidance & Mentor Editing */}
                    <div className="pt-3 border-t border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Edit Academic Guidance & Mentor Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">Project Guide Name:</label>
                          <input
                            type="text"
                            value={guidanceInfo.guideName}
                            onChange={(e) => {
                              const updated = { ...guidanceInfo, guideName: e.target.value };
                              saveTeamAndGuidance(teamMembers, updated);
                            }}
                            className="bg-slate-900 border border-slate-700 text-white text-xs font-bold px-2 py-1.5 rounded w-full focus:outline-none focus:border-amber-400"
                            placeholder="Prof. / Dr. Guide Name"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">Designation / Department:</label>
                          <input
                            type="text"
                            value={guidanceInfo.designation}
                            onChange={(e) => {
                              const updated = { ...guidanceInfo, designation: e.target.value };
                              saveTeamAndGuidance(teamMembers, updated);
                            }}
                            className="bg-slate-900 border border-slate-700 text-white text-xs px-2 py-1.5 rounded w-full focus:outline-none focus:border-amber-400"
                            placeholder="Department of Computer Science"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">Academic Class & Year:</label>
                          <input
                            type="text"
                            value={guidanceInfo.degree}
                            onChange={(e) => {
                              const updated = { ...guidanceInfo, degree: e.target.value };
                              saveTeamAndGuidance(teamMembers, updated);
                            }}
                            className="bg-slate-900 border border-slate-700 text-emerald-400 text-xs font-bold px-2 py-1.5 rounded w-full focus:outline-none focus:border-amber-400"
                            placeholder="M.Sc. Computer Science - Part II"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-right pt-2">
                      <button
                        onClick={() => setIsEditingTeam(false)}
                        className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md"
                      >
                        Save & View Slide
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ────────────── REGULAR VIEW MODE (2 TEAM LEADERS) ────────────── */
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teamMembers.map((m, idx) => (
                        <div key={idx} className="bg-slate-950/80 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-5 space-y-2 transition-all group">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-black uppercase text-amber-400 tracking-wider">
                              Team Leader {idx + 1}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                              {m.roll}
                            </span>
                          </div>

                          <h4 className="text-base font-black text-white font-heading group-hover:text-amber-300 transition-colors">
                            {m.name}
                          </h4>

                          <div className="flex items-center space-x-2 pt-0.5">
                            <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-emerald-300 text-[11px] font-bold">
                              {m.education}
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 leading-tight pt-1">
                            {m.role}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Guidance & Mentor Footer */}
                    <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400">Class:</span>
                        <strong className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          {guidanceInfo.degree}
                        </strong>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400">Project Guide:</span>
                        <strong className="text-amber-300 font-black text-sm">
                          {guidanceInfo.guideName}
                        </strong>
                        <span className="text-slate-400 hidden md:inline">({guidanceInfo.designation})</span>
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Start Slide Presentation CTA */}
              <div className="pt-2">
                <button
                  onClick={nextSlide}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest inline-flex items-center space-x-2 shadow-xl shadow-amber-400/20 hover:scale-105 transition-all"
                >
                  <span>Start Presentation</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </div>
          )}

          {/* =========================================================
              SLIDE 2: PROJECT OVERVIEW
          ========================================================= */}
          {currentSlide === 1 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">Slide 02 / Introduction</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white font-heading mt-1">Project Purpose, Problem Statement & Core Modules</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">Transforming local unorganized tourism into an integrated digital marketplace.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Problem Statement */}
                <div className="bg-[#0E1733]/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white font-heading">The Problem</h3>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed list-disc list-inside">
                    <li>Akole features 12+ world-class destinations (Kalsubai, Sandhan Valley, Arthur Lake) but lacks a centralized booking system.</li>
                    <li>Tourists struggle to find verified local guides, transparent seat pricing, and live availability.</li>
                    <li>Manual telephonic bookings lead to double bookings and lack of digital payment confirmations.</li>
                  </ul>
                </div>

                {/* 2. Proposed Solution */}
                <div className="bg-[#0E1733]/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white font-heading">The Proposed Solution</h3>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed list-disc list-inside">
                    <li>Full-stack responsive web application with verified guide-operated packages.</li>
                    <li>Dynamic seat tracking, live pricing, and mock UPI/Card transaction records with instant alphanumeric IDs.</li>
                    <li>Interactive Leaflet GPS map with coordinates for Sahyadri mountain spots.</li>
                  </ul>
                </div>

                {/* 3. Expected Outcomes */}
                <div className="bg-[#0E1733]/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white font-heading">Key Project Pillars</h3>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed list-disc list-inside">
                    <li><strong>Role-Based Access:</strong> Admin control panel + Tourist personal dashboard.</li>
                    <li><strong>Real-time Analytics:</strong> Gross revenue, monthly booking trends, user growth graphs.</li>
                    <li><strong>Feedback Loop:</strong> Tourist ratings & feedback moderation system.</li>
                  </ul>
                </div>

              </div>

              {/* Core Features Matrix */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 font-heading">Core System Modules</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="font-bold text-white block">1. Authentication Module</span>
                    <span className="text-slate-400 text-[11px]">JWT tokens, Bcrypt hash, Role guards</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="font-bold text-white block">2. Attractions & GPS Map</span>
                    <span className="text-slate-400 text-[11px]">Leaflet markers, Popup cards, Filters</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="font-bold text-white block">3. Booking & Seating Engine</span>
                    <span className="text-slate-400 text-[11px]">Headcount math, Date pickers, Status flags</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="font-bold text-white block">4. Admin Telemetry Panel</span>
                    <span className="text-slate-400 text-[11px]">CRUD inventory, Charts, Broadcast notice</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =========================================================
              SLIDE 3: ER DIAGRAM (Clean Visual SVG)
          ========================================================= */}
          {currentSlide === 2 && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div>
                  <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">Slide 03 / Data Modeling</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                    Complete Entity-Relationship (ER) Diagram
                  </h2>
                  <p className="text-xs text-slate-300">
                    Standard Academic Chen's Notation: Rectangles (Entities), Ovals/Circles (Attributes), and Diamonds (Relationships)
                  </p>
                </div>

                {/* Top Controls: Notation Style + Theme + Zoom */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* Notation Style Toggle */}
                  <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-0.5 text-xs font-bold">
                    <button
                      onClick={() => setErNotationStyle('CHEN')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        erNotationStyle === 'CHEN'
                          ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                      title="Academic Peter Chen's Notation with Circles/Ovals"
                    >
                      Chen's (Circles & Diamonds)
                    </button>
                    <button
                      onClick={() => setErNotationStyle('RELATIONAL')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        erNotationStyle === 'RELATIONAL'
                          ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                      title="Relational Schema Table Model"
                    >
                      Relational Tables
                    </button>
                  </div>

                  {/* Theme Mode Toggle */}
                  <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-0.5 text-xs font-bold">
                    <button
                      onClick={() => setErTheme('WHITE')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        erTheme === 'WHITE'
                          ? 'bg-white text-slate-950 font-black shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Academic Paper White Canvas (Like Uploaded Image)"
                    >
                      White Canvas
                    </button>
                    <button
                      onClick={() => setErTheme('NAVY')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        erTheme === 'NAVY'
                          ? 'bg-indigo-600 text-white font-black shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Dark Slate Blueprint"
                    >
                      Dark Blueprint
                    </button>
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex items-center space-x-1 bg-slate-900 border border-slate-700 rounded-xl p-1">
                    <button
                      onClick={() => setDiagramZoom((z) => Math.max(0.6, z - 0.1))}
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono font-bold text-amber-400 w-10 text-center">
                      {Math.round(diagramZoom * 100)}%
                    </span>
                    <button
                      onClick={() => setDiagramZoom((z) => Math.min(1.5, z + 0.1))}
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDiagramZoom(1)}
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  DIAGRAM STAGE (CHEN NOTATION / CIRCLE OVAL DIAGRAM)
              ───────────────────────────────────────────────────────────── */}
              {erNotationStyle === 'CHEN' ? (
                <div
                  className={`rounded-3xl p-4 overflow-x-auto shadow-2xl border transition-colors ${
                    erTheme === 'WHITE'
                      ? 'bg-[#F8FAFC] border-slate-300 text-slate-900'
                      : 'bg-[#091124] border-slate-800 text-slate-100'
                  }`}
                >
                  <div style={{ transform: `scale(${diagramZoom})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }}>
                    
                    <svg className="w-full min-w-[1360px] h-[820px]" viewBox="0 0 1440 840" fill="none">
                      
                      {/* Diagram Color Palette based on erTheme */}
                      {(() => {
                        const isWhite = erTheme === 'WHITE';
                        const strokeColor = isWhite ? '#1E293B' : '#E2E8F0';
                        const strokeLight = isWhite ? '#475569' : '#94A3B8';
                        const entityBg = isWhite ? '#FFFFFF' : '#0F172A';
                        const ovalBg = isWhite ? '#F1F5F9' : '#1E293B';
                        const diamondBg = isWhite ? '#FEF3C7' : '#451A03';
                        const textColor = isWhite ? '#0F172A' : '#F8FAFC';
                        const textMuted = isWhite ? '#475569' : '#CBD5E1';
                        const pkColor = isWhite ? '#D97706' : '#FBBF24';
                        const diamondStroke = isWhite ? '#D97706' : '#F59E0B';
                        const diamondText = isWhite ? '#92400E' : '#FDE68A';

                        return (
                          <g>
                            {/* ───────────────── 1. USER ENTITY & ATTRIBUTES ───────────────── */}
                            {/* Entity: USER (Center-Left: 560, 360) */}
                            {/* Lines to Ovals */}
                            <line x1="560" y1="335" x2="560" y2="230" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="530" y1="335" x2="455" y2="245" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="500" y1="345" x2="370" y2="285" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="500" y1="360" x2="355" y2="350" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="500" y1="375" x2="370" y2="415" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="530" y1="385" x2="445" y2="465" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="590" y1="335" x2="665" y2="245" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="620" y1="345" x2="745" y2="280" stroke={strokeLight} strokeWidth="1.5" />

                            {/* Ovals / Circles for User */}
                            {/* user_id (PK Underlined) */}
                            <ellipse cx="560" cy="230" rx="46" ry="19" fill={ovalBg} stroke={pkColor} strokeWidth="2" />
                            <text x="560" y="234" fill={textColor} fontSize="11" fontWeight="bold" textAnchor="middle" textDecoration="underline">user_id</text>

                            {/* username */}
                            <ellipse cx="455" cy="245" rx="42" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="455" y="249" fill={textColor} fontSize="10" textAnchor="middle">name</text>

                            {/* email */}
                            <ellipse cx="370" cy="285" rx="38" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="370" y="289" fill={textColor} fontSize="10" textAnchor="middle">email</text>

                            {/* mobile */}
                            <ellipse cx="355" cy="350" rx="38" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="355" y="354" fill={textColor} fontSize="10" textAnchor="middle">mobile</text>

                            {/* password */}
                            <ellipse cx="370" cy="415" rx="44" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="370" y="419" fill={textColor} fontSize="10" textAnchor="middle">password</text>

                            {/* role */}
                            <ellipse cx="445" cy="465" rx="35" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="445" y="469" fill={textColor} fontSize="10" textAnchor="middle">role</text>

                            {/* status */}
                            <ellipse cx="665" cy="245" rx="36" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="665" y="249" fill={textColor} fontSize="10" textAnchor="middle">status</text>

                            {/* created_at */}
                            <ellipse cx="745" cy="280" rx="46" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="745" y="284" fill={textColor} fontSize="10" textAnchor="middle">created_at</text>

                            {/* User Rectangle */}
                            <rect x="500" y="335" width="120" height="50" rx="6" fill={entityBg} stroke={strokeColor} strokeWidth="2.5" />
                            <text x="560" y="365" fill={textColor} fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">User</text>


                            {/* ───────────────── 2. RELATIONSHIP: User -> Places -> Booking ───────────────── */}
                            {/* Lines with Cardinality 1 and M */}
                            <line x1="560" y1="385" x2="560" y2="465" stroke={strokeColor} strokeWidth="2" />
                            <text x="548" y="415" fill={textColor} fontSize="12" fontWeight="bold">1</text>
                            
                            <line x1="560" y1="515" x2="560" y2="595" stroke={strokeColor} strokeWidth="2" />
                            <text x="546" y="575" fill={textColor} fontSize="12" fontWeight="bold">M</text>

                            {/* Places Diamond */}
                            <polygon points="560,465 600,490 560,515 520,490" fill={diamondBg} stroke={diamondStroke} strokeWidth="2" />
                            <text x="560" y="494" fill={diamondText} fontSize="10" fontWeight="bold" textAnchor="middle">Places</text>


                            {/* ───────────────── 3. BOOKING ENTITY & ATTRIBUTES ───────────────── */}
                            {/* Booking Rectangle (560, 620) */}
                            {/* Lines to Ovals */}
                            <line x1="560" y1="645" x2="560" y2="735" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="520" y1="645" x2="455" y2="725" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="500" y1="630" x2="380" y2="685" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="500" y1="615" x2="375" y2="615" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="600" y1="645" x2="665" y2="725" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="620" y1="635" x2="755" y2="700" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="620" y1="610" x2="765" y2="620" stroke={strokeLight} strokeWidth="1.5" />

                            {/* Ovals / Circles for Booking */}
                            {/* booking_id (PK Underlined) */}
                            <ellipse cx="560" cy="735" rx="48" ry="19" fill={ovalBg} stroke={pkColor} strokeWidth="2" />
                            <text x="560" y="739" fill={textColor} fontSize="10" fontWeight="bold" textAnchor="middle" textDecoration="underline">booking_id</text>

                            {/* booking_no */}
                            <ellipse cx="455" cy="725" rx="46" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="455" y="729" fill={textColor} fontSize="10" textAnchor="middle">booking_no</text>

                            {/* travel_date */}
                            <ellipse cx="380" cy="685" rx="46" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="380" y="689" fill={textColor} fontSize="10" textAnchor="middle">travel_date</text>

                            {/* headcount */}
                            <ellipse cx="375" cy="615" rx="46" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="375" y="619" fill={textColor} fontSize="10" textAnchor="middle">headcount</text>

                            {/* total_amount */}
                            <ellipse cx="665" cy="725" rx="48" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="665" y="729" fill={textColor} fontSize="10" textAnchor="middle">total_amount</text>

                            {/* status */}
                            <ellipse cx="755" cy="700" rx="46" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="755" y="704" fill={textColor} fontSize="10" textAnchor="middle">status</text>

                            {/* payment_status */}
                            <ellipse cx="765" cy="620" rx="52" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="765" y="624" fill={textColor} fontSize="10" textAnchor="middle">payment_status</text>

                            {/* Booking Rectangle */}
                            <rect x="500" y="595" width="120" height="50" rx="6" fill={entityBg} stroke={strokeColor} strokeWidth="2.5" />
                            <text x="560" y="625" fill={textColor} fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">Booking</text>


                            {/* ───────────────── 4. RELATIONSHIP: Booking -> Generates -> Payment ───────────────── */}
                            {/* Lines with Cardinality 1 and 1 */}
                            <line x1="620" y1="620" x2="800" y2="620" stroke={strokeColor} strokeWidth="2" />
                            <text x="645" y="612" fill={textColor} fontSize="12" fontWeight="bold">1</text>

                            <line x1="860" y1="620" x2="980" y2="620" stroke={strokeColor} strokeWidth="2" />
                            <text x="960" y="612" fill={textColor} fontSize="12" fontWeight="bold">1</text>

                            {/* Generates Diamond */}
                            <polygon points="830,595 860,620 830,645 800,620" fill={diamondBg} stroke={diamondStroke} strokeWidth="2" />
                            <text x="830" y="624" fill={diamondText} fontSize="9" fontWeight="bold" textAnchor="middle">Generates</text>


                            {/* ───────────────── 5. PAYMENT ENTITY & ATTRIBUTES ───────────────── */}
                            {/* Lines to Ovals */}
                            <line x1="1040" y1="645" x2="1040" y2="735" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1080" y1="645" x2="1145" y2="725" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1100" y1="630" x2="1195" y2="670" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1100" y1="615" x2="1205" y2="605" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1090" y1="600" x2="1175" y2="540" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1050" y1="595" x2="1085" y2="525" stroke={strokeLight} strokeWidth="1.5" />

                            {/* Ovals for Payment */}
                            {/* payment_id (PK Underlined) */}
                            <ellipse cx="1040" cy="735" rx="48" ry="19" fill={ovalBg} stroke={pkColor} strokeWidth="2" />
                            <text x="1040" y="739" fill={textColor} fontSize="10" fontWeight="bold" textAnchor="middle" textDecoration="underline">payment_id</text>

                            {/* transaction_id */}
                            <ellipse cx="1145" cy="725" rx="54" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1145" y="729" fill={textColor} fontSize="10" textAnchor="middle">transaction_id</text>

                            {/* amount */}
                            <ellipse cx="1195" cy="670" rx="40" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1195" y="674" fill={textColor} fontSize="10" textAnchor="middle">amount</text>

                            {/* payment_method */}
                            <ellipse cx="1205" cy="605" rx="55" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1205" y="609" fill={textColor} fontSize="9" textAnchor="middle">payment_method</text>

                            {/* payment_status */}
                            <ellipse cx="1175" cy="540" rx="52" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1175" y="544" fill={textColor} fontSize="10" textAnchor="middle">payment_status</text>

                            {/* payment_date */}
                            <ellipse cx="1085" cy="525" rx="48" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1085" y="529" fill={textColor} fontSize="10" textAnchor="middle">payment_date</text>

                            {/* Payment Rectangle */}
                            <rect x="980" y="595" width="120" height="50" rx="6" fill={entityBg} stroke={strokeColor} strokeWidth="2.5" />
                            <text x="1040" y="625" fill={textColor} fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">Payment</text>


                            {/* ───────────────── 6. RELATIONSHIP: TourPackage -> Includes -> Booking ───────────────── */}
                            {/* Lines with Cardinality 1 and M */}
                            <line x1="980" y1="375" x2="840" y2="470" stroke={strokeColor} strokeWidth="2" />
                            <text x="945" y="415" fill={textColor} fontSize="12" fontWeight="bold">1</text>

                            <line x1="795" y1="500" x2="620" y2="605" stroke={strokeColor} strokeWidth="2" />
                            <text x="660" y="585" fill={textColor} fontSize="12" fontWeight="bold">M</text>

                            {/* Includes Diamond */}
                            <polygon points="817,465 850,485 817,505 785,485" fill={diamondBg} stroke={diamondStroke} strokeWidth="2" />
                            <text x="817" y="489" fill={diamondText} fontSize="9" fontWeight="bold" textAnchor="middle">Includes</text>


                            {/* ───────────────── 7. TOUR_PACKAGE ENTITY & ATTRIBUTES ───────────────── */}
                            {/* TourPackage Rectangle (980, 335) */}
                            {/* Lines to Ovals */}
                            <line x1="1040" y1="335" x2="1040" y2="235" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1080" y1="335" x2="1140" y2="245" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1100" y1="350" x2="1195" y2="295" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1100" y1="365" x2="1205" y2="360" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1100" y1="380" x2="1195" y2="425" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1060" y1="385" x2="1115" y2="465" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1020" y1="385" x2="1020" y2="480" stroke={strokeLight} strokeWidth="1.5" />

                            {/* Ovals for TourPackage */}
                            {/* package_id (PK Underlined) */}
                            <ellipse cx="1040" cy="235" rx="48" ry="19" fill={ovalBg} stroke={pkColor} strokeWidth="2" />
                            <text x="1040" y="239" fill={textColor} fontSize="10" fontWeight="bold" textAnchor="middle" textDecoration="underline">package_id</text>

                            {/* name */}
                            <ellipse cx="1140" cy="245" rx="52" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1140" y="249" fill={textColor} fontSize="10" textAnchor="middle">package_name</text>

                            {/* duration */}
                            <ellipse cx="1195" cy="295" rx="42" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1195" y="299" fill={textColor} fontSize="10" textAnchor="middle">duration</text>

                            {/* price */}
                            <ellipse cx="1205" cy="360" rx="36" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1205" y="364" fill={textColor} fontSize="10" textAnchor="middle">price</text>

                            {/* available_seats */}
                            <ellipse cx="1195" cy="425" rx="55" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1195" y="429" fill={textColor} fontSize="9" textAnchor="middle">available_seats</text>

                            {/* start_date */}
                            <ellipse cx="1115" cy="465" rx="44" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1115" y="469" fill={textColor} fontSize="10" textAnchor="middle">start_date</text>

                            {/* end_date */}
                            <ellipse cx="1020" cy="480" rx="42" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1020" y="484" fill={textColor} fontSize="10" textAnchor="middle">end_date</text>

                            {/* TourPackage Rectangle */}
                            <rect x="980" y="335" width="120" height="50" rx="6" fill={entityBg} stroke={strokeColor} strokeWidth="2.5" />
                            <text x="1040" y="365" fill={textColor} fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">TourPackage</text>


                            {/* ───────────────── 8. RELATIONSHIP: TouristPlace -> Features -> TourPackage ───────────────── */}
                            {/* Lines with Cardinality 1 and M */}
                            <line x1="1260" y1="165" x2="1170" y2="225" stroke={strokeColor} strokeWidth="2" />
                            <text x="1235" y="185" fill={textColor} fontSize="12" fontWeight="bold">1</text>

                            <line x1="1125" y1="250" x2="1060" y2="335" stroke={strokeColor} strokeWidth="2" />
                            <text x="1090" y="305" fill={textColor} fontSize="12" fontWeight="bold">M</text>

                            {/* Features Diamond */}
                            <polygon points="1147,215 1177,235 1147,255 1117,235" fill={diamondBg} stroke={diamondStroke} strokeWidth="2" />
                            <text x="1147" y="239" fill={diamondText} fontSize="9" fontWeight="bold" textAnchor="middle">Features</text>


                            {/* ───────────────── 9. TOURIST_PLACE ENTITY & ATTRIBUTES ───────────────── */}
                            {/* Lines to Ovals */}
                            <line x1="1300" y1="115" x2="1285" y2="40" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1330" y1="115" x2="1370" y2="45" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1355" y1="125" x2="1395" y2="95" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1360" y1="145" x2="1405" y2="150" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1355" y1="160" x2="1395" y2="205" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1320" y1="165" x2="1340" y2="235" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="1280" y1="165" x2="1255" y2="235" stroke={strokeLight} strokeWidth="1.5" />

                            {/* Ovals for TouristPlace */}
                            {/* place_id (PK Underlined) */}
                            <ellipse cx="1285" cy="40" rx="44" ry="19" fill={ovalBg} stroke={pkColor} strokeWidth="2" />
                            <text x="1285" y="44" fill={textColor} fontSize="10" fontWeight="bold" textAnchor="middle" textDecoration="underline">place_id</text>

                            {/* name */}
                            <ellipse cx="1370" cy="45" rx="42" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1370" y="49" fill={textColor} fontSize="10" textAnchor="middle">place_name</text>

                            {/* location */}
                            <ellipse cx="1395" cy="95" rx="38" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1395" y="99" fill={textColor} fontSize="10" textAnchor="middle">location</text>

                            {/* latitude */}
                            <ellipse cx="1405" cy="150" rx="36" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1405" y="154" fill={textColor} fontSize="10" textAnchor="middle">latitude</text>

                            {/* longitude */}
                            <ellipse cx="1395" cy="205" rx="38" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1395" y="209" fill={textColor} fontSize="10" textAnchor="middle">longitude</text>

                            {/* entry_fee */}
                            <ellipse cx="1340" cy="235" rx="38" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1340" y="239" fill={textColor} fontSize="10" textAnchor="middle">entry_fee</text>

                            {/* best_time */}
                            <ellipse cx="1255" cy="235" rx="42" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="1255" y="239" fill={textColor} fontSize="10" textAnchor="middle">best_time</text>

                            {/* TouristPlace Rectangle */}
                            <rect x="1240" y="115" width="120" height="50" rx="6" fill={entityBg} stroke={strokeColor} strokeWidth="2.5" />
                            <text x="1300" y="145" fill={textColor} fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">TouristPlace</text>


                            {/* ───────────────── 10. REVIEW ENTITY & ATTRIBUTES ───────────────── */}
                            {/* Lines from User to Review */}
                            <line x1="500" y1="375" x2="330" y2="475" stroke={strokeColor} strokeWidth="2" />
                            <text x="440" y="420" fill={textColor} fontSize="12" fontWeight="bold">1</text>

                            <line x1="285" y1="505" x2="190" y2="595" stroke={strokeColor} strokeWidth="2" />
                            <text x="215" y="560" fill={textColor} fontSize="12" fontWeight="bold">M</text>

                            {/* Writes Diamond */}
                            <polygon points="307,475 337,495 307,515 277,495" fill={diamondBg} stroke={diamondStroke} strokeWidth="2" />
                            <text x="307" y="499" fill={diamondText} fontSize="9" fontWeight="bold" textAnchor="middle">Writes</text>

                            {/* Lines to Ovals */}
                            <line x1="160" y1="645" x2="160" y2="735" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="120" y1="645" x2="65" y2="715" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="100" y1="630" x2="40" y2="650" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="100" y1="610" x2="40" y2="585" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="120" y1="595" x2="85" y2="525" stroke={strokeLight} strokeWidth="1.5" />

                            {/* Ovals for Review */}
                            {/* review_id (PK Underlined) */}
                            <ellipse cx="160" cy="735" rx="46" ry="19" fill={ovalBg} stroke={pkColor} strokeWidth="2" />
                            <text x="160" y="739" fill={textColor} fontSize="10" fontWeight="bold" textAnchor="middle" textDecoration="underline">review_id</text>

                            {/* rating */}
                            <ellipse cx="65" cy="715" rx="35" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="65" y="719" fill={textColor} fontSize="10" textAnchor="middle">rating</text>

                            {/* comment */}
                            <ellipse cx="40" cy="650" rx="38" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="40" y="654" fill={textColor} fontSize="10" textAnchor="middle">comment</text>

                            {/* is_approved */}
                            <ellipse cx="40" cy="585" rx="44" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="40" y="589" fill={textColor} fontSize="10" textAnchor="middle">is_approved</text>

                            {/* created_at */}
                            <ellipse cx="85" cy="525" rx="44" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="85" y="529" fill={textColor} fontSize="10" textAnchor="middle">created_at</text>

                            {/* Review Rectangle */}
                            <rect x="100" y="595" width="120" height="50" rx="6" fill={entityBg} stroke={strokeColor} strokeWidth="2.5" />
                            <text x="160" y="625" fill={textColor} fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">Review</text>


                            {/* ───────────────── 11. NOTIFICATION ENTITY & ATTRIBUTES ───────────────── */}
                            {/* Lines from User to Notification */}
                            <line x1="500" y1="345" x2="335" y2="245" stroke={strokeColor} strokeWidth="2" />
                            <text x="425" y="285" fill={textColor} fontSize="12" fontWeight="bold">1</text>

                            <line x1="285" y1="215" x2="220" y2="165" stroke={strokeColor} strokeWidth="2" />
                            <text x="240" y="210" fill={textColor} fontSize="12" fontWeight="bold">M</text>

                            {/* Receives Diamond */}
                            <polygon points="307,195 337,215 307,235 277,215" fill={diamondBg} stroke={diamondStroke} strokeWidth="2" />
                            <text x="307" y="219" fill={diamondText} fontSize="9" fontWeight="bold" textAnchor="middle">Receives</text>

                            {/* Lines to Ovals */}
                            <line x1="160" y1="115" x2="160" y2="40" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="120" y1="115" x2="65" y2="45" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="100" y1="130" x2="40" y2="105" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="100" y1="150" x2="40" y2="175" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="120" y1="165" x2="70" y2="235" stroke={strokeLight} strokeWidth="1.5" />
                            <line x1="160" y1="165" x2="160" y2="240" stroke={strokeLight} strokeWidth="1.5" />

                            {/* Ovals for Notification */}
                            {/* notif_id (PK Underlined) */}
                            <ellipse cx="160" cy="40" rx="46" ry="19" fill={ovalBg} stroke={pkColor} strokeWidth="2" />
                            <text x="160" y="44" fill={textColor} fontSize="10" fontWeight="bold" textAnchor="middle" textDecoration="underline">notif_id</text>

                            {/* title */}
                            <ellipse cx="65" cy="45" rx="34" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="65" y="49" fill={textColor} fontSize="10" textAnchor="middle">title</text>

                            {/* message */}
                            <ellipse cx="40" cy="105" rx="38" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="40" y="109" fill={textColor} fontSize="10" textAnchor="middle">message</text>

                            {/* type */}
                            <ellipse cx="40" cy="175" rx="32" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="40" y="179" fill={textColor} fontSize="10" textAnchor="middle">type</text>

                            {/* is_read */}
                            <ellipse cx="70" cy="235" rx="36" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="70" y="239" fill={textColor} fontSize="10" textAnchor="middle">is_read</text>

                            {/* created_at */}
                            <ellipse cx="160" cy="240" rx="42" ry="18" fill={ovalBg} stroke={strokeColor} strokeWidth="1.5" />
                            <text x="160" y="244" fill={textColor} fontSize="10" textAnchor="middle">created_at</text>

                            {/* Notification Rectangle */}
                            <rect x="100" y="115" width="120" height="50" rx="6" fill={entityBg} stroke={strokeColor} strokeWidth="2.5" />
                            <text x="160" y="145" fill={textColor} fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">Notification</text>

                          </g>
                        );
                      })()}

                    </svg>
                  </div>
                </div>
              ) : (
                /* ─────────────────────────────────────────────────────────────
                    FALLBACK / ALTERNATE: RELATIONAL SCHEMA MODEL
                ───────────────────────────────────────────────────────────── */
                <div className="bg-[#091124] border border-slate-800 rounded-3xl p-4 overflow-x-auto shadow-2xl relative">
                  <div style={{ transform: `scale(${diagramZoom})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }}>
                    <svg className="w-full min-w-[960px] h-[520px]" viewBox="0 0 1020 540" fill="none">
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#F59E0B" />
                        </marker>
                        <marker id="arrowEmerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
                        </marker>
                        <marker id="arrowCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#06B6D4" />
                        </marker>
                      </defs>

                      <path d="M 240 70 L 410 70" stroke="#06B6D4" strokeWidth="2.5" strokeDasharray="4 2" markerEnd="url(#arrowCyan)" />
                      <text x="310" y="60" fill="#06B6D4" fontSize="10" fontWeight="bold" textAnchor="middle">includes (1 : N)</text>

                      <path d="M 520 180 L 520 230" stroke="#F59E0B" strokeWidth="2.5" markerEnd="url(#arrow)" />
                      <text x="545" y="210" fill="#F59E0B" fontSize="10" fontWeight="bold">is booked (1 : N)</text>

                      <path d="M 240 310 L 410 310" stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arrowEmerald)" />
                      <text x="325" y="300" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">places (1 : N)</text>

                      <path d="M 630 310 L 760 310" stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arrowEmerald)" />
                      <text x="695" y="300" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">generates (1 : 1)</text>

                      {/* Relational Entity Boxes */}
                      <g>
                        <rect x="30" y="20" width="210" height="150" rx="12" fill="#0D1938" stroke="#06B6D4" strokeWidth="1.5" />
                        <path d="M 30 20 h 210 v 28 h -210 z" fill="#083344" rx="12" />
                        <text x="45" y="39" fill="#22D3EE" fontWeight="900" fontSize="12">TOURIST_PLACE</text>
                        <text x="45" y="68" fill="#F8FAFC" fontSize="10" fontFamily="monospace"><tspan fill="#F59E0B">[PK]</tspan> id : UUID</text>
                        <text x="45" y="85" fill="#CBD5E1" fontSize="10" fontFamily="monospace">name, location</text>
                        <text x="45" y="102" fill="#CBD5E1" fontSize="10" fontFamily="monospace">latitude, longitude</text>
                        <text x="45" y="119" fill="#CBD5E1" fontSize="10" fontFamily="monospace">entryFee, bestTimeToVisit</text>
                      </g>

                      <g>
                        <rect x="410" y="20" width="220" height="160" rx="12" fill="#0D1938" stroke="#F59E0B" strokeWidth="1.5" />
                        <path d="M 410 20 h 220 v 28 h -220 z" fill="#451A03" rx="12" />
                        <text x="425" y="39" fill="#FBBF24" fontWeight="900" fontSize="12">TOUR_PACKAGE</text>
                        <text x="425" y="68" fill="#F8FAFC" fontSize="10" fontFamily="monospace"><tspan fill="#F59E0B">[PK]</tspan> id : UUID</text>
                        <text x="425" y="85" fill="#93C5FD" fontSize="10" fontFamily="monospace"><tspan fill="#06B6D4">[FK]</tspan> placeId : UUID?</text>
                        <text x="425" y="102" fill="#CBD5E1" fontSize="10" fontFamily="monospace">name, duration, price</text>
                        <text x="425" y="119" fill="#CBD5E1" fontSize="10" fontFamily="monospace">availableSeats, dates</text>
                      </g>

                      <g>
                        <rect x="30" y="240" width="210" height="170" rx="12" fill="#0D1938" stroke="#10B981" strokeWidth="1.5" />
                        <path d="M 30 240 h 210 v 28 h -210 z" fill="#064E3B" rx="12" />
                        <text x="45" y="259" fill="#34D399" fontWeight="900" fontSize="12">USER</text>
                        <text x="45" y="288" fill="#F8FAFC" fontSize="10" fontFamily="monospace"><tspan fill="#F59E0B">[PK]</tspan> id : UUID</text>
                        <text x="45" y="305" fill="#E2E8F0" fontSize="10" fontFamily="monospace"><tspan fill="#38BDF8">[UK]</tspan> email : String</text>
                        <text x="45" y="322" fill="#CBD5E1" fontSize="10" fontFamily="monospace">name, mobile, password</text>
                        <text x="45" y="339" fill="#CBD5E1" fontSize="10" fontFamily="monospace">role, status</text>
                      </g>

                      <g>
                        <rect x="410" y="230" width="220" height="180" rx="12" fill="#0D1938" stroke="#F59E0B" strokeWidth="2" />
                        <path d="M 410 230 h 220 v 28 h -220 z" fill="#78350F" rx="12" />
                        <text x="425" y="249" fill="#FDE68A" fontWeight="900" fontSize="12">BOOKING</text>
                        <text x="425" y="278" fill="#F8FAFC" fontSize="10" fontFamily="monospace"><tspan fill="#F59E0B">[PK]</tspan> id : UUID</text>
                        <text x="425" y="295" fill="#E2E8F0" fontSize="10" fontFamily="monospace"><tspan fill="#38BDF8">[UK]</tspan> bookingId</text>
                        <text x="425" y="312" fill="#93C5FD" fontSize="10" fontFamily="monospace"><tspan fill="#10B981">[FK]</tspan> userId, <tspan fill="#F59E0B">[FK]</tspan> packageId</text>
                        <text x="425" y="329" fill="#CBD5E1" fontSize="10" fontFamily="monospace">travelDate, numberOfPeople</text>
                        <text x="425" y="346" fill="#CBD5E1" fontSize="10" fontFamily="monospace">totalAmount, status</text>
                      </g>

                      <g>
                        <rect x="760" y="230" width="220" height="150" rx="12" fill="#0D1938" stroke="#10B981" strokeWidth="1.5" />
                        <path d="M 760 230 h 220 v 28 h -220 z" fill="#064E3B" rx="12" />
                        <text x="775" y="249" fill="#6EE7B7" fontWeight="900" fontSize="12">PAYMENT</text>
                        <text x="775" y="278" fill="#F8FAFC" fontSize="10" fontFamily="monospace"><tspan fill="#F59E0B">[PK]</tspan> id : UUID</text>
                        <text x="775" y="295" fill="#93C5FD" fontSize="10" fontFamily="monospace"><tspan fill="#F59E0B">[FK,UK]</tspan> bookingId</text>
                        <text x="775" y="312" fill="#E2E8F0" fontSize="10" fontFamily="monospace"><tspan fill="#38BDF8">[UK]</tspan> transactionId</text>
                        <text x="775" y="329" fill="#CBD5E1" fontSize="10" fontFamily="monospace">amount, paymentMethod</text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* Chen Notation Symbol Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center space-x-2">
                  <div className="w-5 h-3.5 border-2 border-amber-400 bg-slate-800 rounded-sm" />
                  <span className="text-slate-200"><strong>Rectangle:</strong> Entity</span>
                </div>
                <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center space-x-2">
                  <div className="w-5 h-3.5 border-2 border-emerald-400 bg-slate-800 rounded-full" />
                  <span className="text-slate-200"><strong>Oval:</strong> Attribute (<u className="text-amber-300">PK</u>)</span>
                </div>
                <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center space-x-2">
                  <div className="w-3.5 h-3.5 border-2 border-amber-400 bg-amber-500/30 rotate-45" />
                  <span className="text-slate-200"><strong>Diamond:</strong> Relationship</span>
                </div>
                <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center space-x-2">
                  <span className="font-bold text-amber-400 font-mono text-xs">1 : M</span>
                  <span className="text-slate-200"><strong>Cardinality:</strong> Ratio</span>
                </div>
              </div>

            </div>
          )}

          {/* =========================================================
              SLIDE 4: DATABASE DESIGN (Data Dictionary)
          ========================================================= */}
          {currentSlide === 3 && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">Slide 04 / Relational Schema</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">Database Design & Schema Dictionary</h2>
                <p className="text-xs text-slate-300">MySQL Database Engine with Prisma ORM Mapping, Types, Keys & Nullability</p>
              </div>

              {/* Table Selector Tabs */}
              <div className="flex flex-wrap gap-2">
                {(['BOOKING', 'USER', 'TOUR_PACKAGE', 'TOURIST_PLACE', 'PAYMENT', 'REVIEW', 'NOTIFICATION']).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDbTab(tab)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all font-mono ${
                      activeDbTab === tab
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Active Table Schema Display */}
              <div className="bg-[#0E1733]/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                
                {/* Table Header Details */}
                <div className="bg-slate-950/80 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-emerald-400 font-bold">TABLE NAME: </span>
                    <strong className="text-white font-heading text-sm">{activeDbTab}</strong>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">Storage Engine: InnoDB | Charset: utf8mb4</span>
                </div>

                {/* Data Dictionary Table */}
                <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900/80 text-slate-400 uppercase text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="p-3 pl-6">Column Name</th>
                        <th className="p-3">Data Type</th>
                        <th className="p-3">Key / Index</th>
                        <th className="p-3">Nullability</th>
                        <th className="p-3 pr-6">Purpose / Rule</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-200">
                      
                      {activeDbTab === 'BOOKING' && (
                        <>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-amber-300">id</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">PRIMARY KEY</span></td><td>NOT NULL</td><td>UUID auto-generated identifier</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-amber-300">bookingId</td><td>VARCHAR(30)</td><td><span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">UNIQUE KEY</span></td><td>NOT NULL</td><td>Public booking ticket reference (e.g. AKL2026001)</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-emerald-300">userId</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">FOREIGN KEY</span></td><td>NOT NULL</td><td>References User(id) ON DELETE CASCADE</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-emerald-300">packageId</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">FOREIGN KEY</span></td><td>NOT NULL</td><td>References TourPackage(id) ON DELETE CASCADE</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">travelDate</td><td>DATETIME</td><td>-</td><td>NOT NULL</td><td>Customer chosen tour departure date</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">numberOfPeople</td><td>INT</td><td>-</td><td>NOT NULL</td><td>Number of seats booked</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-amber-400">totalAmount</td><td>DOUBLE</td><td>-</td><td>NOT NULL</td><td>Calculated price (Unit Price * People)</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">status</td><td>VARCHAR(20)</td><td>-</td><td>DEFAULT 'PENDING'</td><td>PENDING | CONFIRMED | CANCELLED | COMPLETED</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">paymentStatus</td><td>VARCHAR(20)</td><td>-</td><td>DEFAULT 'PENDING'</td><td>PENDING | SUCCESS | FAILED | REFUNDED</td></tr>
                        </>
                      )}

                      {activeDbTab === 'USER' && (
                        <>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-amber-300">id</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">PRIMARY KEY</span></td><td>NOT NULL</td><td>UUID string</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-sky-300">email</td><td>VARCHAR(191)</td><td><span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">UNIQUE KEY</span></td><td>NOT NULL</td><td>Unique login credential</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">name</td><td>VARCHAR(100)</td><td>-</td><td>NOT NULL</td><td>Full name of tourist/admin</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">mobile</td><td>VARCHAR(20)</td><td>-</td><td>NOT NULL</td><td>Contact phone number</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">password</td><td>VARCHAR(255)</td><td>-</td><td>NOT NULL</td><td>Bcrypt 10-round salted password hash</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">role</td><td>VARCHAR(20)</td><td>-</td><td>DEFAULT 'USER'</td><td>'USER' or 'ADMIN'</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">status</td><td>VARCHAR(20)</td><td>-</td><td>DEFAULT 'ACTIVE'</td><td>'ACTIVE' or 'BLOCKED'</td></tr>
                        </>
                      )}

                      {activeDbTab === 'TOUR_PACKAGE' && (
                        <>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-amber-300">id</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">PRIMARY KEY</span></td><td>NOT NULL</td><td>UUID string</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-emerald-300">placeId</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">FOREIGN KEY</span></td><td>NULLABLE</td><td>References TouristPlace(id) ON DELETE SET NULL</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">name</td><td>VARCHAR(150)</td><td>-</td><td>NOT NULL</td><td>Package title (e.g. Sandhan Valley Descent)</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">duration</td><td>VARCHAR(50)</td><td>-</td><td>NOT NULL</td><td>Duration string (e.g. 2 Days / 1 Night)</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">price</td><td>DOUBLE</td><td>-</td><td>NOT NULL</td><td>Cost per person in INR (₹)</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">maxPeople</td><td>INT</td><td>-</td><td>NOT NULL</td><td>Maximum seating capacity</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-emerald-400">availableSeats</td><td>INT</td><td>-</td><td>NOT NULL</td><td>Current unbooked seat count</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">itinerary</td><td>TEXT</td><td>-</td><td>NOT NULL</td><td>Day-wise schedule JSON array</td></tr>
                        </>
                      )}

                      {activeDbTab === 'TOURIST_PLACE' && (
                        <>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-amber-300">id</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">PRIMARY KEY</span></td><td>NOT NULL</td><td>UUID string</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">name</td><td>VARCHAR(150)</td><td>-</td><td>NOT NULL</td><td>Place title (e.g. Kalsubai Peak)</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">location</td><td>VARCHAR(255)</td><td>-</td><td>NOT NULL</td><td>Village / Tehsil address</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-cyan-300">latitude</td><td>DOUBLE</td><td>-</td><td>NOT NULL</td><td>Geographical GPS latitude for Leaflet Map</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-cyan-300">longitude</td><td>DOUBLE</td><td>-</td><td>NOT NULL</td><td>Geographical GPS longitude for Leaflet Map</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">entryFee</td><td>DOUBLE</td><td>-</td><td>DEFAULT 0</td><td>Ticket charge in INR (0 = Free)</td></tr>
                        </>
                      )}

                      {activeDbTab === 'PAYMENT' && (
                        <>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-amber-300">id</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">PRIMARY KEY</span></td><td>NOT NULL</td><td>UUID string</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-emerald-300">bookingId</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">FOREIGN KEY, UNIQUE</span></td><td>NOT NULL</td><td>1:1 relation to Booking(id)</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-sky-300">transactionId</td><td>VARCHAR(100)</td><td><span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">UNIQUE KEY</span></td><td>NOT NULL</td><td>Simulated gateway TXN code</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">amount</td><td>DOUBLE</td><td>-</td><td>NOT NULL</td><td>Processed payment amount in INR</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">paymentMethod</td><td>VARCHAR(30)</td><td>-</td><td>DEFAULT 'MOCK_UPI'</td><td>MOCK_UPI | CARD | NET_BANKING</td></tr>
                        </>
                      )}

                      {activeDbTab === 'REVIEW' && (
                        <>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-amber-300">id</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">PRIMARY KEY</span></td><td>NOT NULL</td><td>UUID string</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-emerald-300">userId</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">FOREIGN KEY</span></td><td>NOT NULL</td><td>Author user ID</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-emerald-300">packageId</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">FOREIGN KEY</span></td><td>NOT NULL</td><td>Package reviewed</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-amber-400">rating</td><td>INT</td><td>-</td><td>NOT NULL</td><td>1 to 5 numeric stars</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">isApproved</td><td>BOOLEAN</td><td>-</td><td>DEFAULT true</td><td>Admin review moderation flag</td></tr>
                        </>
                      )}

                      {activeDbTab === 'NOTIFICATION' && (
                        <>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-amber-300">id</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">PRIMARY KEY</span></td><td>NOT NULL</td><td>UUID string</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6 font-bold text-emerald-300">userId</td><td>VARCHAR(36)</td><td><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">FOREIGN KEY</span></td><td>NOT NULL</td><td>Recipient user ID</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">title</td><td>VARCHAR(191)</td><td>-</td><td>NOT NULL</td><td>Alert headline</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">type</td><td>VARCHAR(30)</td><td>-</td><td>DEFAULT 'INFO'</td><td>BOOKING | PAYMENT | ANNOUNCEMENT</td></tr>
                          <tr className="hover:bg-slate-800/40"><td className="p-3 pl-6">isRead</td><td>BOOLEAN</td><td>-</td><td>DEFAULT false</td><td>Read acknowledgment flag</td></tr>
                        </>
                      )}

                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* =========================================================
              SLIDE 5: USE CASE DIAGRAM (Clean Visual SVG)
          ========================================================= */}
          {currentSlide === 4 && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">Slide 05 / Functional Requirements</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">UML Use Case Diagram</h2>
                <p className="text-xs text-slate-300">Primary Actors (Tourist & Administrator) and System Boundary Scenarios</p>
              </div>

              {/* Visual Use Case Diagram */}
              <div className="bg-[#091124] border border-slate-800 rounded-3xl p-4 overflow-x-auto shadow-2xl">
                <svg className="w-full min-w-[960px] h-[520px]" viewBox="0 0 1000 520" fill="none">
                  
                  {/* System Boundary Box */}
                  <rect x="230" y="20" width="540" height="480" rx="20" fill="#0C152E" stroke="#334155" strokeWidth="2" strokeDasharray="8 4" />
                  <text x="500" y="48" fill="#94A3B8" fontSize="13" fontWeight="900" letterSpacing="0.1em" textAnchor="middle" fontFamily="sans-serif">
                    SYSTEM BOUNDARY : AKOLE TOURISM PORTAL
                  </text>

                  {/* ───────────────── ACTOR 1: TOURIST (USER) ───────────────── */}
                  <g>
                    {/* Stick Figure Head */}
                    <circle cx="100" cy="180" r="16" fill="#10B981" stroke="#059669" strokeWidth="2" />
                    {/* Body */}
                    <path d="M 100 196 L 100 240 M 70 215 L 130 215 M 100 240 L 75 285 M 100 240 L 125 285" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                    <rect x="40" y="300" width="120" height="34" rx="8" fill="#064E3B" stroke="#059669" />
                    <text x="100" y="318" fill="#6EE7B7" fontSize="11" fontWeight="bold" textAnchor="middle">TOURIST (USER)</text>
                    <text x="100" y="329" fill="#A7F3D0" fontSize="8" textAnchor="middle">Primary Consumer</text>
                  </g>

                  {/* ───────────────── ACTOR 2: ADMINISTRATOR ───────────────── */}
                  <g>
                    {/* Stick Figure Head */}
                    <circle cx="900" cy="180" r="16" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
                    {/* Body */}
                    <path d="M 900 196 L 900 240 M 870 215 L 930 215 M 900 240 L 875 285 M 900 240 L 925 285" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                    <rect x="835" y="300" width="130" height="34" rx="8" fill="#78350F" stroke="#D97706" />
                    <text x="900" y="318" fill="#FDE68A" fontSize="11" fontWeight="bold" textAnchor="middle">ADMINISTRATOR</text>
                    <text x="900" y="329" fill="#FEF3C7" fontSize="8" textAnchor="middle">Agency Operator</text>
                  </g>

                  {/* ───────────────── USE CASES (Ellipses) ───────────────── */}

                  {/* UC 1: Sign Up / Sign In */}
                  <g>
                    <ellipse cx="360" cy="90" rx="90" ry="24" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                    <text x="360" y="94" fill="#F8FAFC" fontSize="11" fontWeight="bold" textAnchor="middle">UC-1: Register & Log In</text>
                  </g>

                  {/* UC 2: Explore Places & Leaflet GPS */}
                  <g>
                    <ellipse cx="360" cy="150" rx="100" ry="24" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
                    <text x="360" y="154" fill="#F8FAFC" fontSize="11" fontWeight="bold" textAnchor="middle">UC-2: Explore GPS Map & Places</text>
                  </g>

                  {/* UC 3: Filter & Book Package */}
                  <g>
                    <ellipse cx="360" cy="220" rx="100" ry="25" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
                    <text x="360" y="224" fill="#FDE68A" fontSize="11" fontWeight="bold" textAnchor="middle">UC-3: Book Tour Package</text>
                  </g>

                  {/* UC 4: Process Mock Payment */}
                  <g>
                    <ellipse cx="360" cy="300" rx="95" ry="24" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
                    <text x="360" y="304" fill="#6EE7B7" fontSize="11" fontWeight="bold" textAnchor="middle">UC-4: Process Mock Payment</text>
                  </g>

                  {/* UC 5: Submit Rating & Review */}
                  <g>
                    <ellipse cx="360" cy="380" rx="95" ry="24" fill="#0F172A" stroke="#A855F7" strokeWidth="1.5" />
                    <text x="360" y="384" fill="#E9D5FF" fontSize="11" fontWeight="bold" textAnchor="middle">UC-5: Submit Package Review</text>
                  </g>

                  {/* UC 6: View Personal Bookings & Receipts */}
                  <g>
                    <ellipse cx="360" cy="450" rx="100" ry="24" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
                    <text x="360" y="454" fill="#A5F3FC" fontSize="11" fontWeight="bold" textAnchor="middle">UC-6: View Booking History</text>
                  </g>

                  {/* UC 7: Manage Tourist Places (CRUD) */}
                  <g>
                    <ellipse cx="640" cy="110" rx="100" ry="24" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="640" y="114" fill="#F8FAFC" fontSize="11" fontWeight="bold" textAnchor="middle">UC-7: Manage Places (CRUD)</text>
                  </g>

                  {/* UC 8: Manage Tour Packages (CRUD) */}
                  <g>
                    <ellipse cx="640" cy="180" rx="105" ry="24" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="640" y="184" fill="#F8FAFC" fontSize="11" fontWeight="bold" textAnchor="middle">UC-8: Manage Packages (CRUD)</text>
                  </g>

                  {/* UC 9: Moderate Bookings (Confirm/Cancel) */}
                  <g>
                    <ellipse cx="640" cy="260" rx="100" ry="25" fill="#0F172A" stroke="#EC4899" strokeWidth="1.5" />
                    <text x="640" y="264" fill="#FBCFE8" fontSize="11" fontWeight="bold" textAnchor="middle">UC-9: Confirm / Cancel Bookings</text>
                  </g>

                  {/* UC 10: View Analytics & Telemetry */}
                  <g>
                    <ellipse cx="640" cy="340" rx="100" ry="24" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                    <text x="640" y="344" fill="#BAE6FD" fontSize="11" fontWeight="bold" textAnchor="middle">UC-10: View Revenue Charts</text>
                  </g>

                  {/* UC 11: Broadcast Announcements */}
                  <g>
                    <ellipse cx="640" cy="420" rx="105" ry="24" fill="#0F172A" stroke="#F43F5E" strokeWidth="1.5" />
                    <text x="640" y="424" fill="#FECDD3" fontSize="11" fontWeight="bold" textAnchor="middle">UC-11: Broadcast Notice</text>
                  </g>

                  {/* ───────────────── ASSOCIATION LINES (User to UCs) ───────────────── */}
                  <line x1="130" y1="210" x2="270" y2="100" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="130" y1="220" x2="260" y2="150" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="130" y1="230" x2="260" y2="220" stroke="#10B981" strokeWidth="2" />
                  <line x1="130" y1="240" x2="270" y2="380" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="130" y1="250" x2="270" y2="445" stroke="#10B981" strokeWidth="1.5" />

                  {/* <<include>> relation from UC-3 to UC-4 */}
                  <line x1="360" y1="245" x2="360" y2="275" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="405" y="263" fill="#FBBF24" fontSize="9" fontWeight="bold">&lt;&lt;include&gt;&gt;</text>

                  {/* ───────────────── ASSOCIATION LINES (Admin to UCs) ───────────────── */}
                  <line x1="870" y1="210" x2="740" y2="115" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="870" y1="220" x2="745" y2="180" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="870" y1="230" x2="740" y2="260" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="870" y1="240" x2="740" y2="340" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="870" y1="250" x2="745" y2="415" stroke="#F59E0B" strokeWidth="1.5" />

                </svg>
              </div>

            </div>
          )}

          {/* =========================================================
              SLIDE 6: CLASS DIAGRAM (Standard 3-Compartment)
          ========================================================= */}
          {currentSlide === 5 && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">Slide 06 / Static Architecture</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">UML Class Diagram</h2>
                <p className="text-xs text-slate-300">Object-Oriented Domain Classes, Attributes, Methods & Visibility (+ / -)</p>
              </div>

              {/* Visual UML Class Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                
                {/* Class 1: User */}
                <div className="bg-[#0D1836] border-2 border-emerald-500/80 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-emerald-950/80 px-4 py-2 border-b border-emerald-500/50 text-center">
                    <span className="text-[10px] text-emerald-400 block">&lt;&lt;Entity Model&gt;&gt;</span>
                    <strong className="text-white text-sm font-bold">User</strong>
                  </div>
                  <div className="p-3 border-b border-slate-800 space-y-1 text-slate-300 text-[11px]">
                    <p>- id : UUID</p>
                    <p>- name : String</p>
                    <p>- email : String</p>
                    <p>- password : HashString</p>
                    <p>- role : RoleEnum</p>
                  </div>
                  <div className="p-3 bg-slate-950/50 space-y-1 text-emerald-300 text-[11px]">
                    <p>+ register(data) : Promise&lt;User&gt;</p>
                    <p>+ verifyPassword(pwd) : Boolean</p>
                    <p>+ getBookings() : Booking[]</p>
                  </div>
                </div>

                {/* Class 2: TourPackage */}
                <div className="bg-[#0D1836] border-2 border-amber-500/80 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-amber-950/80 px-4 py-2 border-b border-amber-500/50 text-center">
                    <span className="text-[10px] text-amber-400 block">&lt;&lt;Entity Model&gt;&gt;</span>
                    <strong className="text-white text-sm font-bold">TourPackage</strong>
                  </div>
                  <div className="p-3 border-b border-slate-800 space-y-1 text-slate-300 text-[11px]">
                    <p>- id : UUID</p>
                    <p>- name : String</p>
                    <p>- price : Double</p>
                    <p>- availableSeats : Int</p>
                    <p>- placeId : UUID</p>
                  </div>
                  <div className="p-3 bg-slate-950/50 space-y-1 text-amber-300 text-[11px]">
                    <p>+ checkAvailability(seats) : Boolean</p>
                    <p>+ deductSeats(count) : Void</p>
                    <p>+ getItinerary() : JSON</p>
                  </div>
                </div>

                {/* Class 3: Booking */}
                <div className="bg-[#0D1836] border-2 border-amber-400 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-amber-900/80 px-4 py-2 border-b border-amber-400 text-center">
                    <span className="text-[10px] text-amber-300 block">&lt;&lt;Central Transaction&gt;&gt;</span>
                    <strong className="text-white text-sm font-bold">Booking</strong>
                  </div>
                  <div className="p-3 border-b border-slate-800 space-y-1 text-slate-300 text-[11px]">
                    <p>- id : UUID</p>
                    <p>- bookingId : String</p>
                    <p>- totalAmount : Double</p>
                    <p>- status : BookingStatus</p>
                  </div>
                  <div className="p-3 bg-slate-950/50 space-y-1 text-amber-300 text-[11px]">
                    <p>+ calculateTotal() : Double</p>
                    <p>+ confirmBooking() : Void</p>
                    <p>+ generateReceipt() : Invoice</p>
                  </div>
                </div>

                {/* Class 4: TouristPlace */}
                <div className="bg-[#0D1836] border-2 border-cyan-500/80 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-cyan-950/80 px-4 py-2 border-b border-cyan-500/50 text-center">
                    <span className="text-[10px] text-cyan-400 block">&lt;&lt;Entity Model&gt;&gt;</span>
                    <strong className="text-white text-sm font-bold">TouristPlace</strong>
                  </div>
                  <div className="p-3 border-b border-slate-800 space-y-1 text-slate-300 text-[11px]">
                    <p>- id : UUID</p>
                    <p>- name : String</p>
                    <p>- latitude : Double</p>
                    <p>- longitude : Double</p>
                    <p>- entryFee : Double</p>
                  </div>
                  <div className="p-3 bg-slate-950/50 space-y-1 text-cyan-300 text-[11px]">
                    <p>+ getCoordinates() : LatLng</p>
                    <p>+ getPackages() : TourPackage[]</p>
                  </div>
                </div>

                {/* Class 5: Payment */}
                <div className="bg-[#0D1836] border-2 border-emerald-400 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-emerald-950/80 px-4 py-2 border-b border-emerald-400 text-center">
                    <span className="text-[10px] text-emerald-300 block">&lt;&lt;Payment Entity&gt;&gt;</span>
                    <strong className="text-white text-sm font-bold">Payment</strong>
                  </div>
                  <div className="p-3 border-b border-slate-800 space-y-1 text-slate-300 text-[11px]">
                    <p>- id : UUID</p>
                    <p>- transactionId : String</p>
                    <p>- amount : Double</p>
                    <p>- paymentMethod : MethodEnum</p>
                  </div>
                  <div className="p-3 bg-slate-950/50 space-y-1 text-emerald-300 text-[11px]">
                    <p>+ executeMockUPI() : TxnResult</p>
                    <p>+ verifyStatus() : Boolean</p>
                  </div>
                </div>

                {/* Class 6: Review & Notification */}
                <div className="bg-[#0D1836] border-2 border-purple-500/80 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-purple-950/80 px-4 py-2 border-b border-purple-500/50 text-center">
                    <span className="text-[10px] text-purple-300 block">&lt;&lt;Interaction Services&gt;&gt;</span>
                    <strong className="text-white text-sm font-bold">Review & Notification</strong>
                  </div>
                  <div className="p-3 border-b border-slate-800 space-y-1 text-slate-300 text-[11px]">
                    <p>- rating : Int (1..5)</p>
                    <p>- comment : String</p>
                    <p>- isApproved : Boolean</p>
                    <p>- isRead : Boolean</p>
                  </div>
                  <div className="p-3 bg-slate-950/50 space-y-1 text-purple-300 text-[11px]">
                    <p>+ submitRating() : Review</p>
                    <p>+ sendBroadcast(msg) : Int</p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* =========================================================
              SLIDE 7: ACTIVITY DIAGRAM (Tour Booking Workflow)
          ========================================================= */}
          {currentSlide === 6 && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">Slide 07 / Behavioral Workflow</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">UML Activity Diagram: Tour Booking & Reservation Flow</h2>
                <p className="text-xs text-slate-300">Action States, Decision Diamonds, Seating Decrement, and Parallel Fork/Join Nodes</p>
              </div>

              {/* Visual Workflow Steps Map */}
              <div className="bg-[#091124] border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-x-auto">
                <div className="min-w-[900px] flex flex-col space-y-4 text-xs font-mono">
                  
                  {/* Step 1 to 3 */}
                  <div className="flex items-center space-x-3">
                    {/* Start Node */}
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-400/30">
                        <div className="w-4 h-4 rounded-full bg-slate-950" />
                      </div>
                      <span className="text-emerald-400 font-bold">Start</span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />

                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-white font-bold">
                      1. Tourist Selects Tour Package (/packages)
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />

                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-white font-bold">
                      2. Chooses Travel Date & Headcount
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />

                    {/* Decision 1: Seats Available? */}
                    <div className="w-24 h-24 bg-amber-500/20 border-2 border-amber-400 rotate-45 flex items-center justify-center shrink-0">
                      <span className="-rotate-45 text-[10px] text-amber-300 font-black text-center">Seats &gt;= N?</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-red-400 font-bold block">[No] &rarr; Show "Sold Out" Alert</span>
                      <span className="text-[10px] text-emerald-400 font-bold block">[Yes] &rarr; Proceed to Checkout</span>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="w-full h-px bg-slate-800" />

                  {/* Step 4 to 6 */}
                  <div className="flex items-center space-x-3">
                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-white font-bold">
                      3. Dynamic Price Math (Price * People)
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />

                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-white font-bold">
                      4. Create Booking (Status: PENDING)
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />

                    <div className="bg-slate-900 border border-emerald-500/60 px-4 py-2 rounded-xl text-emerald-300 font-bold">
                      5. Submit Mock Payment (UPI / Card)
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />

                    {/* Decision 2: Payment OK? */}
                    <div className="w-24 h-24 bg-emerald-500/20 border-2 border-emerald-400 rotate-45 flex items-center justify-center shrink-0">
                      <span className="-rotate-45 text-[10px] text-emerald-300 font-black text-center">Payment OK?</span>
                    </div>

                    <span className="text-emerald-400 font-bold text-xs">[Yes: SUCCESS]</span>
                  </div>

                  {/* Divider line */}
                  <div className="w-full h-px bg-slate-800" />

                  {/* Parallel Fork & End Node */}
                  <div className="flex items-center space-x-4">
                    {/* Fork Bar */}
                    <div className="w-2 h-20 bg-amber-400 rounded-full shrink-0" title="UML Fork Synchronization Bar" />

                    <div className="space-y-2 flex-1">
                      <div className="p-2 bg-slate-900/90 border border-slate-700 rounded-xl text-[11px] text-slate-200">
                        Action A: <strong className="text-emerald-400">UPDATE Booking SET status='CONFIRMED', paymentStatus='SUCCESS'</strong>
                      </div>
                      <div className="p-2 bg-slate-900/90 border border-slate-700 rounded-xl text-[11px] text-slate-200">
                        Action B: <strong className="text-amber-400">UPDATE TourPackage SET availableSeats = availableSeats - headcount</strong>
                      </div>
                      <div className="p-2 bg-slate-900/90 border border-slate-700 rounded-xl text-[11px] text-slate-200">
                        Action C: <strong className="text-cyan-400">INSERT INTO Notification ("Booking Confirmed with ID AKL...")</strong>
                      </div>
                    </div>

                    {/* Join Bar */}
                    <div className="w-2 h-20 bg-amber-400 rounded-full shrink-0" title="UML Join Synchronization Bar" />

                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />

                    {/* Final State */}
                    <div className="flex items-center space-x-2 shrink-0">
                      <div className="w-8 h-8 rounded-full border-2 border-emerald-400 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-emerald-400 font-bold">End State</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* =========================================================
              SLIDE 8: SEQUENCE DIAGRAM (Step-by-Step Lifeline)
          ========================================================= */}
          {currentSlide === 7 && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">Slide 08 / Interaction Timeline</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">UML Sequence Diagram: Reservation & Payment Lifeline</h2>
                <p className="text-xs text-slate-300">Synchronous HTTP Calls, Asynchronous DB Transactions & Notification Triggers</p>
              </div>

              {/* Visual Sequence Canvas */}
              <div className="bg-[#091124] border border-slate-800 rounded-3xl p-4 overflow-x-auto shadow-2xl">
                <svg className="w-full min-w-[960px] h-[500px]" viewBox="0 0 1000 500" fill="none">
                  
                  {/* Lifeline Actors */}
                  {[
                    { name: 'Tourist (User)', x: 100, color: '#10B981' },
                    { name: 'Frontend (Next.js)', x: 300, color: '#38BDF8' },
                    { name: 'Backend (Express)', x: 500, color: '#F59E0B' },
                    { name: 'Database (MySQL)', x: 700, color: '#A855F7' },
                    { name: 'Payment Module', x: 900, color: '#EC4899' },
                  ].map((l, idx) => (
                    <g key={idx}>
                      <rect x={l.x - 70} y={15} width={140} height={35} rx={8} fill="#0D1836" stroke={l.color} strokeWidth={2} />
                      <text x={l.x} y={37} fill="#F8FAFC" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{l.name}</text>
                      {/* Vertical Lifeline */}
                      <line x1={l.x} y1={50} x2={l.x} y2={480} stroke="#334155" strokeWidth="1.5" strokeDasharray="6 4" />
                    </g>
                  ))}

                  {/* 1. Tourist clicks "Book Now" */}
                  <line x1="100" y1="90" x2="300" y2="90" stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="200" y="82" fill="#BAE6FD" fontSize="10" fontWeight="bold" textAnchor="middle">1. selectPackage(date, people)</text>

                  {/* 2. Frontend calls API */}
                  <line x1="300" y1="130" x2="500" y2="130" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="400" y="122" fill="#FDE68A" fontSize="10" fontWeight="bold" textAnchor="middle">2. POST /api/bookings</text>

                  {/* 3. Backend verifies seats in DB */}
                  <line x1="500" y1="170" x2="700" y2="170" stroke="#A855F7" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="600" y="162" fill="#E9D5FF" fontSize="10" fontWeight="bold" textAnchor="middle">3. SELECT availableSeats &gt;= N</text>

                  {/* 4. DB confirms available */}
                  <line x1="700" y1="200" x2="500" y2="200" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="600" y="193" fill="#DDD6FE" fontSize="9" textAnchor="middle">4. return seats OK</text>

                  {/* 5. Backend returns Booking ID */}
                  <line x1="500" y1="230" x2="300" y2="230" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="400" y="223" fill="#FEF08A" fontSize="9" textAnchor="middle">5. 201 Created {`{ bookingId: "AKL..." }`}</text>

                  {/* 6. Frontend prompts Payment */}
                  <line x1="300" y1="260" x2="100" y2="260" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="200" y="253" fill="#BAE6FD" fontSize="9" textAnchor="middle">6. displayPaymentModal()</text>

                  {/* 7. Tourist confirms Payment */}
                  <line x1="100" y1="290" x2="300" y2="290" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowEmerald)" />
                  <text x="200" y="282" fill="#6EE7B7" fontSize="10" fontWeight="bold" textAnchor="middle">7. payMockUPI(amount)</text>

                  {/* 8. Frontend calls mock-pay */}
                  <line x1="300" y1="320" x2="500" y2="320" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="400" y="312" fill="#FDE68A" fontSize="10" fontWeight="bold" textAnchor="middle">8. POST /api/payments/mock-pay</text>

                  {/* 9. Backend triggers payment gateway */}
                  <line x1="500" y1="350" x2="900" y2="350" stroke="#EC4899" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="700" y="342" fill="#FBCFE8" fontSize="10" fontWeight="bold" textAnchor="middle">9. processTransaction(bookingId, amount)</text>

                  {/* 10. Gateway responds SUCCESS */}
                  <line x1="900" y1="380" x2="500" y2="380" stroke="#EC4899" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="700" y="373" fill="#FBCFE8" fontSize="9" textAnchor="middle">10. return {`{ status: "SUCCESS", txnId }`}</text>

                  {/* 11. Backend commits Prisma transaction */}
                  <line x1="500" y1="410" x2="700" y2="410" stroke="#A855F7" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="600" y="402" fill="#E9D5FF" fontSize="9" fontWeight="bold" textAnchor="middle">11. UPDATE booking, deductSeats, createNotification</text>

                  {/* 12. Final 200 OK to Tourist */}
                  <line x1="500" y1="440" x2="300" y2="440" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="400" y="433" fill="#6EE7B7" fontSize="9" textAnchor="middle">12. 200 OK Booking Confirmed</text>

                  <line x1="300" y1="465" x2="100" y2="465" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowEmerald)" />
                  <text x="200" y="458" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle">13. Redirect to /dashboard + Invoice</text>

                </svg>
              </div>

            </div>
          )}

          {/* =========================================================
              SLIDE 9: CONCLUSION & FUTURE SCOPE
          ========================================================= */}
          {currentSlide === 8 && (
            <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto py-2">
              
              <div className="text-center space-y-2 border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">Slide 09 / Final Wrap-Up</span>
                <h2 className="text-3xl sm:text-5xl font-black text-white font-heading">Project Summary & Future Enhancements</h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
                  A production-ready digital bridge connecting nature enthusiasts with rural Sahyadri tourism.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Deliverables Achieved */}
                <div className="bg-[#0E1733]/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                  <h3 className="text-lg font-black text-emerald-400 font-heading flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Deliverables & Objectives Met</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-black">✔</span>
                      <span><strong>Complete End-to-End Tour Booking:</strong> Real-time seat inventory, date pickers, dynamic pricing math, and instant tickets.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-black">✔</span>
                      <span><strong>Interactive Geolocation Mapping:</strong> 12+ verified Akole landmarks with GPS coordinates and custom popup detail routing.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-black">✔</span>
                      <span><strong>Enterprise SaaS Admin Panel:</strong> Recharts graphical analytics, booking moderation, user blocking, and broadcast engine.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-black">✔</span>
                      <span><strong>Modern Glassmorphism UI:</strong> Ultra-fast Next.js 14 SSR, custom Navy dark mode, and seamless responsiveness.</span>
                    </li>
                  </ul>
                </div>

                {/* Future Scope */}
                <div className="bg-[#0E1733]/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                  <h3 className="text-lg font-black text-amber-400 font-heading flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Future Scope & Roadmap</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-400 font-black">&bull;</span>
                      <span><strong>Live Payment Gateways:</strong> Integration of production Razorpay / Stripe UPI & NetBanking webhooks.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-400 font-black">&bull;</span>
                      <span><strong>Cross-Platform Mobile App:</strong> React Native iOS & Android apps with offline trekking trail GPS caches.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-400 font-black">&bull;</span>
                      <span><strong>Automated WhatsApp / SMS Gateway:</strong> Instant PDF booking receipts and guide contact dispatched via Twilio.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-400 font-black">&bull;</span>
                      <span><strong>AI Trek Itinerary Assistant:</strong> Weather-aware recommendation bot suggesting optimal trek dates.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Thank You & Q&A Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-emerald-500/10 to-teal-500/20 border border-amber-400/30 text-center space-y-3 shadow-2xl">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  Thank You! Questions & Discussion (Q & A)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                  We invite questions, architectural queries, and feedback from the faculty and evaluation committee.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => goToSlide(0)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
                  >
                    Restart Presentation
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg transition-all"
                  >
                    Launch Live Web Demo &rarr;
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM DOCK NAVIGATION (Slide dots & Quick Bar)
        ───────────────────────────────────────────────────────────── */}
        <footer className="h-16 bg-[#0B132B]/90 backdrop-blur-md border-t border-slate-800/80 px-4 sm:px-8 flex items-center justify-between z-40 shrink-0">
          
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-1 text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Slide</span>
          </button>

          {/* Center Slide Indicator Dots */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx
                    ? 'w-8 h-2.5 bg-amber-400 shadow-md shadow-amber-400/40'
                    : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Jump to Slide ${s.id}: ${s.title}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-1 text-xs font-black uppercase tracking-wider text-amber-400 hover:text-amber-300 disabled:opacity-30 transition-all"
          >
            <span className="hidden sm:inline">Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </footer>

      </div>

    </div>
  );
}
