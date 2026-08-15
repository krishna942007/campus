import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Shield, Menu, X, Sparkles, Compass, Users, Database } from 'lucide-react';

interface CleanNavbarProps {
  onSelectRole: (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
  activeView: string;
  setActiveView: (view: 'LANDING' | 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
}

export const CleanNavbar: React.FC<CleanNavbarProps> = ({ onSelectRole, activeView, setActiveView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-[#FFFCF7]/85 backdrop-blur-2xl border-b border-[#0C2238]/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]' 
          : 'py-3.5 bg-[#F7F4EE]/90 backdrop-blur-xl border-b border-[#0C2238]/06'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
        
        {/* Left: Brand Mark */}
        <button
          onClick={() => {
            setActiveView('LANDING');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3 text-left group cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0C2238] to-[#123B63] text-white flex items-center justify-center font-black text-xs shadow-md border border-[#C99632]/40 group-hover:scale-105 group-hover:shadow-[#C99632]/20 transition-all duration-300">
            <span className="tracking-widest text-[#E8C56B]">VIT</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-extrabold text-[#10253A] tracking-tight flex items-center space-x-1.5">
              <span>VIT MUMBAI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#159A72]" />
            </div>
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-[#C99632]">
              AI Student Development Platform
            </p>
          </div>
        </button>

        {/* Center Navigation Links with Liquid Underline Hover */}
        <nav className="hidden lg:flex items-center space-x-6 text-[11px] font-extrabold uppercase tracking-wider text-[#627083]">
          
          {/* Platform Dropdown */}
          <div 
            className="relative" 
            onMouseEnter={() => setPlatformDropdownOpen(true)}
            onMouseLeave={() => setPlatformDropdownOpen(false)}
          >
            <button 
              onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
              className="flex items-center space-x-1 hover:text-[#10253A] transition-colors py-1 relative group cursor-pointer"
            >
              <span>Platform</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#C99632] transition-transform duration-200 ${platformDropdownOpen ? 'rotate-180' : ''}`} />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C99632] group-hover:w-full transition-all duration-200 rounded-full" />
            </button>

            <AnimatePresence>
              {platformDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 mt-1.5 w-64 bg-[#FFFCF7]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-[#0C2238]/10 p-2 space-y-1 z-50 overflow-hidden"
                >
                  <a 
                    href="#features" 
                    onClick={() => setPlatformDropdownOpen(false)}
                    className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-[#F7F4EE] text-xs font-bold text-[#10253A] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#EFE7D8] flex items-center justify-center text-[#0C2238]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C99632]" />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#10253A]">Core Features</p>
                      <p className="text-[10px] text-[#627083] font-normal">AI Insights & Roadmaps</p>
                    </div>
                  </a>
                  <a 
                    href="#preview" 
                    onClick={() => setPlatformDropdownOpen(false)}
                    className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-[#F7F4EE] text-xs font-bold text-[#10253A] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#EFE7D8] flex items-center justify-center text-[#0C2238]">
                      <Compass className="w-3.5 h-3.5 text-[#123B63]" />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#10253A]">Interactive Preview</p>
                      <p className="text-[10px] text-[#627083] font-normal">3D Dashboard Story</p>
                    </div>
                  </a>
                  <a 
                    href="#community" 
                    onClick={() => setPlatformDropdownOpen(false)}
                    className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-[#F7F4EE] text-xs font-bold text-[#10253A] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#EFE7D8] flex items-center justify-center text-[#0C2238]">
                      <Users className="w-3.5 h-3.5 text-[#159A72]" />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#10253A]">Student Community</p>
                      <p className="text-[10px] text-[#627083] font-normal">Cohort Collaboration</p>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { label: 'AI Assistant', href: '#ai-assistant' },
            { label: 'Roadmap', href: '#roadmap' },
            { label: 'Mentoring', href: '#mentoring' },
            { label: 'ERP Trust', href: '#erp' },
            { label: 'RAG Search', href: '#rag' },
          ].map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="hover:text-[#10253A] transition-colors py-1 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C99632] group-hover:w-full transition-all duration-200 rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          
          {/* Role selector pill */}
          <div className="hidden md:flex items-center bg-[#EFE7D8]/80 backdrop-blur-md rounded-full p-0.5 border border-[#0C2238]/10 shadow-inner">
            <button
              onClick={() => onSelectRole('STUDENT')}
              className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                activeView === 'STUDENT' ? 'bg-[#0C2238] text-white shadow-sm' : 'text-[#627083] hover:text-[#10253A]'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => onSelectRole('MENTOR')}
              className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                activeView === 'MENTOR' ? 'bg-[#0C2238] text-white shadow-sm' : 'text-[#627083] hover:text-[#10253A]'
              }`}
            >
              Faculty
            </button>
            <button
              onClick={() => onSelectRole('ADMIN')}
              className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                activeView === 'ADMIN' ? 'bg-[#0C2238] text-white shadow-sm' : 'text-[#627083] hover:text-[#10253A]'
              }`}
            >
              Admin
            </button>
          </div>

          <button 
            onClick={() => onSelectRole('STUDENT')}
            className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EFE7D8]/90 hover:bg-[#E2D7C6] text-[#10253A] font-extrabold text-xs border border-[#0C2238]/10 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-xs"
          >
            Login
          </button>

          {/* Primary Action Button */}
          <button 
            onClick={() => onSelectRole('STUDENT')}
            className="hidden sm:inline-flex items-center space-x-2 px-4.5 py-2 rounded-full bg-[#0C2238] hover:bg-[#123B63] text-white font-extrabold text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all group cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 text-[#E8C56B]" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#EFE7D8]/80 text-[#10253A] border border-[#0C2238]/10 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#FFFCF7]/95 backdrop-blur-2xl border-b border-[#0C2238]/10 px-6 py-4 space-y-3"
          >
            <div className="grid grid-cols-3 gap-2 pb-3 border-b border-[#0C2238]/08">
              <button
                onClick={() => { onSelectRole('STUDENT'); setMobileMenuOpen(false); }}
                className="py-2 text-center rounded-xl bg-[#0C2238] text-white text-xs font-bold"
              >
                Student
              </button>
              <button
                onClick={() => { onSelectRole('MENTOR'); setMobileMenuOpen(false); }}
                className="py-2 text-center rounded-xl bg-[#EFE7D8] text-[#10253A] text-xs font-bold"
              >
                Faculty
              </button>
              <button
                onClick={() => { onSelectRole('ADMIN'); setMobileMenuOpen(false); }}
                className="py-2 text-center rounded-xl bg-[#EFE7D8] text-[#10253A] text-xs font-bold"
              >
                Admin
              </button>
            </div>

            <div className="space-y-2 text-xs font-bold uppercase text-[#10253A]">
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-xl hover:bg-[#F7F4EE]"
              >
                Core Features
              </a>
              <a 
                href="#ai-assistant" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-xl hover:bg-[#F7F4EE]"
              >
                AI Assistant
              </a>
              <a 
                href="#roadmap" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-xl hover:bg-[#F7F4EE]"
              >
                Learning Roadmap
              </a>
              <a 
                href="#mentoring" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-xl hover:bg-[#F7F4EE]"
              >
                Mentoring Council
              </a>
              <a 
                href="#erp" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-xl hover:bg-[#F7F4EE]"
              >
                Official ERP Trust
              </a>
              <a 
                href="#rag" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-xl hover:bg-[#F7F4EE]"
              >
                RAG Knowledge Base
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
