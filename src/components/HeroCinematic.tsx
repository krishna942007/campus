import React, { useState, useEffect } from 'react';

export const HeroCinematic: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#07111F] flex items-center justify-center">
      {/* Background Layer: Real Campus Road Image (Responds subtly to mouse opposite) */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out scale-110"
        style={{
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0px) scale(1.12)`,
        }}
      >
        <img
          src="/campus/hero-bg.webp"
          alt="VIT Mumbai Campus Road Approach"
          className="w-full h-full object-cover filter brightness-[0.72] contrast-[1.12] saturate-[1.05]"
        />
      </div>

      {/* Midground Atmospheric Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/40 to-[#07111F]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07111F]/50 to-[#07111F] pointer-events-none" />

      {/* Foreground Shifting Light Rays (Moves with cursor) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 30}px, 0px)`,
          background: `radial-gradient(800px circle at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(214, 168, 79, 0.15), transparent 70%)`,
        }}
      />

      {/* Editorial Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8 flex flex-col items-center justify-center h-full pt-16">
        {/* Uppercase Category Label */}
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-[#07111F]/70 border border-[#D6A84F]/30 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E8C477] animate-ping" />
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#E8C477] uppercase">
            VIT MUMBAI • COMPUTER ENGINEERING
          </span>
        </div>

        {/* Human Editorial Typography */}
        <div className="space-y-2">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#F5F2EA] leading-[0.9] font-display">
            ENGINEERING, <br />
            <span className="font-serif-italic font-normal text-gold-gradient">
              IN MOTION.
            </span>
          </h1>
        </div>

        {/* Small Editorial Subtitle */}
        <p className="text-sm sm:text-base text-[#F5F2EA]/80 font-light tracking-wide max-w-lg mx-auto leading-relaxed">
          Where curiosity becomes engineering. A digital journey through the architectural and academic heartbeat of VIT Mumbai.
        </p>

        {/* Bottom Interactive Scroll Indicator */}
        <div className="pt-12 flex flex-col items-center space-y-3">
          <a
            href="#journey"
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E8C477] hover:text-[#F5F2EA] transition-colors flex items-center space-x-2 group cursor-pointer"
          >
            <span>SCROLL TO ENTER</span>
            <span className="group-hover:translate-y-1 transition-transform">↓</span>
          </a>
          <div className="w-px h-12 bg-gradient-to-b from-[#D6A84F] to-transparent animate-pulse" />
        </div>
      </div>

      {/* Micro Architectural Coordinate Markers */}
      <div className="absolute bottom-8 left-8 text-[9px] font-mono text-[#D6A84F]/60 tracking-widest hidden sm:block">
        LAT 19.018° N // LON 72.865° E
      </div>
      <div className="absolute bottom-8 right-8 text-[9px] font-mono text-[#1688D8]/60 tracking-widest hidden sm:block">
        WADALA CAMPUS ECOSYSTEM
      </div>
    </section>
  );
};
