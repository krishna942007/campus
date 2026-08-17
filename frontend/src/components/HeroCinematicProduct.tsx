import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export const HeroCinematicProduct: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center z-10">
      {/* Minimal Editorial Content sitting on top of Natural 300-Frame Campus Video */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 flex flex-col items-center justify-center h-full pt-16">
        
        {/* Sleek Modern Badge */}
        <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full bg-[#07111F]/80 border border-amber-400/30 backdrop-blur-xl shadow-xl">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-amber-300 uppercase">
            VIT MUMBAI • AI STUDENT DEVELOPMENT PLATFORM
          </span>
        </div>

        {/* Clean, Powerful Modern Sans-Serif Headline */}
        <div className="space-y-2">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-[0.92] font-display drop-shadow-2xl">
            YOUR <br />
            JOURNEY <br />
            <span className="text-gold-gradient font-black">
              STARTS HERE.
            </span>
          </h1>
        </div>

        {/* High-Readability Glass Description Card */}
        <p className="text-sm sm:text-base text-slate-100 font-medium tracking-wide max-w-xl mx-auto leading-relaxed bg-[#07111F]/80 p-6 rounded-2xl border border-white/15 backdrop-blur-xl shadow-2xl">
          A connected digital intelligence layer understanding, guiding, and developing every student's academic and professional growth at VIT Mumbai.
        </p>

        {/* User-Friendly Action & Scroll Button */}
        <div className="pt-6 flex flex-col items-center space-y-3">
          <a
            href="#platform"
            className="text-xs font-bold tracking-wider uppercase text-amber-300 hover:text-[#07111F] hover:bg-amber-400 transition-all duration-300 flex items-center space-x-3 cursor-pointer group px-6 py-3 bg-[#07111F]/85 rounded-full border border-amber-400/40 backdrop-blur-xl shadow-2xl"
          >
            <span>EXPLORE CAMPUS & PLATFORM</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <div className="w-px h-8 bg-gradient-to-b from-amber-400/80 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

