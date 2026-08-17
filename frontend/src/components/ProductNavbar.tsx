import React, { useState, useEffect } from 'react';
import { LogIn, ChevronRight, Menu, X } from 'lucide-react';

interface ProductNavbarProps {
  onSelectRole: (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
  activeView: string;
  setActiveView: (view: 'LANDING' | 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
}

export const ProductNavbar: React.FC<ProductNavbarProps> = ({ onSelectRole, activeView, setActiveView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07111F]/90 backdrop-blur-xl border-b border-white/15 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#07111F]/95 via-[#07111F]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Brand Mark */}
        <button
          onClick={() => setActiveView('LANDING')}
          className="flex items-center space-x-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#07111F] rounded-[10px] flex items-center justify-center border border-amber-400/40">
              <span className="font-extrabold text-xs text-amber-300">VIT</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold tracking-tight font-display text-white">
                VIT MUMBAI
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 uppercase border border-amber-400/30">
                PLATFORM
              </span>
            </div>
            <span className="text-xs font-medium text-slate-300 block">
              Student Development & Mentoring
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold uppercase tracking-wider text-slate-200">
          <a href="#hero" className="hover:text-amber-300 transition-colors">ENTER</a>
          <a href="#platform" className="hover:text-amber-300 transition-colors">PLATFORM</a>
          <a href="#dashboard" className="hover:text-amber-300 transition-colors">PROFILE</a>
          <a href="#ai-assistant" className="hover:text-amber-300 transition-colors">AI ASSISTANT</a>
          <a href="#roadmap" className="hover:text-amber-300 transition-colors">ROADMAP</a>
          <a href="#mentoring" className="hover:text-amber-300 transition-colors">MENTORING</a>
          <a href="#trust" className="hover:text-amber-300 transition-colors">ERP TRUST</a>
        </nav>

        {/* Role Switcher Action */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="flex items-center bg-[#040C1A]/90 p-1.5 rounded-xl border border-white/15 shadow-xl">
            <button
              onClick={() => onSelectRole('STUDENT')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'STUDENT'
                  ? 'bg-amber-400 text-[#07111F] shadow-lg'
                  : 'text-slate-200 hover:text-amber-300'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => onSelectRole('MENTOR')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'MENTOR'
                  ? 'bg-sky-500 text-white shadow-lg'
                  : 'text-slate-200 hover:text-amber-300'
              }`}
            >
              Faculty Mentor
            </button>
            <button
              onClick={() => onSelectRole('ADMIN')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'ADMIN'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'text-slate-200 hover:text-amber-300'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-amber-300 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07111F]/95 backdrop-blur-2xl border-b border-white/15 px-6 py-6 space-y-4 shadow-2xl">
          <div className="grid grid-cols-3 gap-2 pb-4 border-b border-white/15">
            <button
              onClick={() => {
                onSelectRole('STUDENT');
                setMobileMenuOpen(false);
              }}
              className="py-2.5 rounded-xl bg-amber-400 text-[#07111F] text-xs font-bold text-center shadow"
            >
              Student
            </button>
            <button
              onClick={() => {
                onSelectRole('MENTOR');
                setMobileMenuOpen(false);
              }}
              className="py-2.5 rounded-xl bg-sky-500 text-white text-xs font-bold text-center shadow"
            >
              Faculty
            </button>
            <button
              onClick={() => {
                onSelectRole('ADMIN');
                setMobileMenuOpen(false);
              }}
              className="py-2.5 rounded-xl bg-indigo-500 text-white text-xs font-bold text-center shadow"
            >
              Admin
            </button>
          </div>

          <nav className="flex flex-col space-y-3 text-xs font-semibold text-white">
            <a href="#platform" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/10 flex justify-between items-center">
              <span>Platform Overview</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </a>
            <a href="#dashboard" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/10 flex justify-between items-center">
              <span>Student Profile</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </a>
            <a href="#ai-assistant" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/10 flex justify-between items-center">
              <span>AI Second Brain</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </a>
            <a href="#roadmap" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/10 flex justify-between items-center">
              <span>Learning Roadmap</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </a>
            <a href="#mentoring" onClick={() => setMobileMenuOpen(false)} className="py-2 flex justify-between items-center">
              <span>Mentoring & Visibility</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

