import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Compass } from 'lucide-react';

interface NavbarProps {
  onSelectRole?: (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
  activeView?: string;
  setActiveView?: (view: 'LANDING' | 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectRole, activeView, setActiveView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sections = ['home', 'about', 'academics', 'research', 'campus-journey', 'campus-life', 'why-vit', 'testimonials'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Academics', href: '#academics', id: 'academics' },
    { name: 'Research', href: '#research', id: 'research' },
    { name: 'Campus Walkthrough', href: '#campus-journey', id: 'campus-journey' },
    { name: 'Life @ VIT', href: '#campus-life', id: 'campus-life' },
    { name: 'Why VIT', href: '#why-vit', id: 'why-vit' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#07111F]/85 backdrop-blur-xl border-b border-[#D6A84F]/20 py-3.5 shadow-2xl shadow-[#07111F]/80'
          : 'bg-gradient-to-b from-[#07111F]/90 via-[#07111F]/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066B3] via-[#07111F] to-[#D6A84F] p-0.5 shadow-lg shadow-[#0066B3]/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#07111F] rounded-[10px] flex items-center justify-center border border-[#D6A84F]/30">
              <span className="font-extrabold text-sm tracking-tighter text-[#E8C477]">VIT</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="text-lg font-black tracking-tight text-[#F5F2EA] font-display">VIT</span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-[#D6A84F]/20 text-[#E8C477] border border-[#D6A84F]/30 uppercase tracking-wider">
                MUMBAI
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#1688D8] font-bold">
              Computer Engineering
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium tracking-wide">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 transition-colors duration-300 hover:text-[#E8C477] ${
                  isActive ? 'text-[#E8C477] font-semibold' : 'text-[#F5F2EA]/80'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#D6A84F] to-[#E8C477] rounded-full shadow-[0_0_8px_#D6A84F]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          {onSelectRole && (
            <div className="flex items-center bg-[#07111F]/80 p-1 rounded-xl border border-[#D6A84F]/25 text-[11px] font-semibold">
              <button
                onClick={() => onSelectRole('STUDENT')}
                className="px-3 py-1.5 rounded-lg text-[#F5F2EA]/80 hover:text-[#E8C477] hover:bg-[#D6A84F]/10 transition-all cursor-pointer"
              >
                Student
              </button>
              <button
                onClick={() => onSelectRole('MENTOR')}
                className="px-3 py-1.5 rounded-lg text-[#F5F2EA]/80 hover:text-[#E8C477] hover:bg-[#D6A84F]/10 transition-all cursor-pointer"
              >
                Faculty
              </button>
            </div>
          )}

          <a
            href="#cta"
            className="btn-gold-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-[#D6A84F]/20 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#07111F]" />
            <span>Explore Campus</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#F5F2EA] hover:text-[#E8C477] focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#E8C477]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07111F]/95 backdrop-blur-2xl border-b border-[#D6A84F]/30 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#F5F2EA] hover:text-[#E8C477] flex items-center justify-between py-2 border-b border-[#F5F2EA]/5"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-[#D6A84F]" />
              </a>
            ))}
          </nav>

          <div className="pt-3 flex flex-col space-y-2">
            {onSelectRole && (
              <div className="grid grid-cols-2 gap-2 pb-2">
                <button
                  onClick={() => {
                    onSelectRole('STUDENT');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 rounded-xl bg-[#0066B3]/30 border border-[#0066B3]/50 text-xs font-bold text-[#F5F2EA]"
                >
                  Student Portal
                </button>
                <button
                  onClick={() => {
                    onSelectRole('MENTOR');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 rounded-xl bg-[#D6A84F]/20 border border-[#D6A84F]/40 text-xs font-bold text-[#E8C477]"
                >
                  Faculty Portal
                </button>
              </div>
            )}
            <a
              href="#cta"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-gold-primary py-3 rounded-xl text-xs text-center font-extrabold flex items-center justify-center space-x-2"
            >
              <span>Explore Campus Now</span>
              <ChevronRight className="w-4 h-4 text-[#07111F]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
