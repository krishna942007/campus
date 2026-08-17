import React, { useState, useEffect } from 'react';

export const MinimalNavbar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 50;
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } py-6 px-6 sm:px-12 pointer-events-none`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Mark */}
        <a href="#hero" className="flex items-center space-x-2.5 group">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D6A84F] group-hover:scale-125 transition-transform" />
          <span className="text-sm font-black tracking-widest text-[#F5F2EA] font-display uppercase">
            VIT MUMBAI
          </span>
        </a>

        {/* Minimal Navigation */}
        <nav className="hidden sm:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-widest text-[#F5F2EA]/70">
          <a href="#hero" className="hover:text-[#E8C477] transition-colors">
            ENTER
          </a>
          <a href="#journey" className="hover:text-[#E8C477] transition-colors">
            JOURNEY
          </a>
          <a href="#architecture" className="hover:text-[#E8C477] transition-colors">
            ARCHITECTURE
          </a>
          <a href="#cse" className="hover:text-[#E8C477] transition-colors">
            COMPUTER ENG
          </a>
          <a href="#life" className="hover:text-[#E8C477] transition-colors">
            LIFE @ VIT
          </a>
        </nav>

        {/* Action Button */}
        <a
          href="#journey"
          className="text-xs font-bold px-4 py-2 rounded-full border border-[#D6A84F]/40 bg-[#07111F]/80 backdrop-blur-md text-[#E8C477] hover:bg-[#D6A84F] hover:text-[#07111F] transition-all cursor-pointer"
        >
          EXPLORE
        </a>
      </div>
    </header>
  );
};
