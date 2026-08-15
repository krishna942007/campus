import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Shield } from 'lucide-react';

interface CleanNavbarProps {
  onSelectRole: (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
  activeView: string;
  setActiveView: (view: 'LANDING' | 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
}

export const CleanNavbar: React.FC<CleanNavbarProps> = ({ onSelectRole, activeView, setActiveView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled 
          ? 'py-2.5 bg-[#FFFCF7]/90 backdrop-blur-xl border-b border-[#0C2238]/10 shadow-md' 
          : 'py-4 bg-[#F7F4EE]/80 backdrop-blur-md border-b border-[#0C2238]/05'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 sm:h-18">
        
        {/* Left: Brand Mark */}
        <button
          onClick={() => setActiveView('LANDING')}
          className="flex items-center space-x-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0C2238] text-white flex items-center justify-center font-bold text-xs shadow-md border border-[#C99632]/40 group-hover:scale-105 transition-transform duration-200">
            <span className="tracking-widest text-[#E8C56B]">VIT</span>
          </div>
          <div>
            <div className="text-base font-extrabold text-[#10253A] tracking-tight flex items-center space-x-2">
              <span>VIT MUMBAI</span>
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#C99632]">
              AI STUDENT DEVELOPMENT PLATFORM
            </p>
          </div>
        </button>

        {/* Center Navigation Links with Underline Hover Micro-Interactions */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-[#627083]">
          <div className="relative" onMouseLeave={() => setPlatformDropdownOpen(false)}>
            <button 
              onMouseEnter={() => setPlatformDropdownOpen(true)}
              onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
              className="flex items-center space-x-1 hover:text-[#10253A] transition-colors py-1 relative group cursor-pointer"
            >
              <span>Platform</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C99632] group-hover:rotate-180 transition-transform duration-200" />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C99632] group-hover:w-full transition-all duration-200" />
            </button>

            {platformDropdownOpen && (
              <div className="absolute top-full left-0 w-60 bg-[#FFFCF7]/95 backdrop-blur-xl rounded-2xl shadow-xl border border-[#0C2238]/10 p-2 space-y-1 z-50">
                <a href="#features" className="block px-4 py-2.5 rounded-xl hover:bg-[#F7F4EE] text-xs font-bold text-[#10253A] transition-colors">
                  Pillar Architecture
                </a>
                <a href="#preview" className="block px-4 py-2.5 rounded-xl hover:bg-[#F7F4EE] text-xs font-bold text-[#10253A] transition-colors">
                  Platform Dashboard Preview
                </a>
                <a href="#community" className="block px-4 py-2.5 rounded-xl hover:bg-[#F7F4EE] text-xs font-bold text-[#10253A] transition-colors">
                  Student Community
                </a>
              </div>
            )}
          </div>

          {[
            { label: 'AI Assistant', href: '#ai-assistant' },
            { label: 'Roadmap', href: '#roadmap' },
            { label: 'Mentoring', href: '#mentoring' },
            { label: 'ERP Trust', href: '#erp' },
            { label: 'Resources', href: '#rag' },
            { label: 'About Us', href: '#about' },
          ].map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="hover:text-[#10253A] transition-colors py-1 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C99632] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Role switcher selector */}
          <div className="hidden sm:flex items-center bg-[#EFE7D8]/80 rounded-full p-1 border border-[#0C2238]/10">
            <button
              onClick={() => onSelectRole('STUDENT')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'STUDENT' ? 'bg-[#0C2238] text-white shadow-sm' : 'text-[#627083] hover:text-[#10253A]'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => onSelectRole('MENTOR')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'MENTOR' ? 'bg-[#0C2238] text-white shadow-sm' : 'text-[#627083] hover:text-[#10253A]'
              }`}
            >
              Faculty
            </button>
            <button
              onClick={() => onSelectRole('ADMIN')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'ADMIN' ? 'bg-[#0C2238] text-white shadow-sm' : 'text-[#627083] hover:text-[#10253A]'
              }`}
            >
              Admin
            </button>
          </div>

          <button 
            onClick={() => onSelectRole('STUDENT')}
            className="px-4 py-2 rounded-full bg-[#EFE7D8]/90 hover:bg-[#EFE7D8] text-[#10253A] font-bold text-xs border border-[#0C2238]/10 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Login
          </button>

          {/* Get Started Button with Arrow Motion */}
          <button 
            onClick={() => onSelectRole('STUDENT')}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#0C2238] hover:bg-[#07182A] text-white font-bold text-xs shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all group cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200 text-[#E8C56B]" />
          </button>
        </div>

      </div>
    </header>
  );
};
