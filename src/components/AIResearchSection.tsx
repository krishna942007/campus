import React, { useState, useEffect } from 'react';

export const AIResearchSection: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="research" className="relative py-32 w-full bg-[#07111F] border-t border-[#D6A84F]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E8C477]">
            05 // ARTIFICIAL INTELLIGENCE & RESEARCH
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#F5F2EA] font-display tracking-tight leading-[0.95]">
            INTELLIGENCE <br />
            <span className="font-serif-italic font-normal text-gold-gradient">
              IN THE MAKING.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#F5F2EA]/80 font-light leading-relaxed">
            From neural architecture search to autonomous robotics, our research centers explore edge AI, computer vision, and computational biology.
          </p>
        </div>

        {/* Interactive Mouse-Tracking Depth Frame */}
        <div className="relative h-[480px] sm:h-[580px] w-full overflow-hidden shadow-2xl">
          {/* Background Shifting Layer */}
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out scale-110"
            style={{
              transform: `translate3d(${mouseOffset.x * -0.8}px, ${mouseOffset.y * -0.8}px, 0px)`,
            }}
          >
            <img
              src="/campus/interactive-bg.webp"
              alt="VIT AI Research Lab Environment"
              className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.12]"
            />
          </div>

          {/* Golden Ambient Cursor Light Layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-70"
            style={{
              background: `radial-gradient(700px circle at ${50 + mouseOffset.x}% ${50 + mouseOffset.y}%, rgba(214, 168, 79, 0.2), transparent 70%)`,
            }}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-[#07111F]/50 pointer-events-none" />

          {/* Shifting Floating Foreground Editorial Caption */}
          <div
            className="absolute bottom-10 left-8 sm:left-12 max-w-lg p-8 bg-[#07111F]/85 border border-[#D6A84F]/30 backdrop-blur-2xl shadow-2xl transition-transform duration-200 ease-out space-y-3"
            style={{
              transform: `translate3d(${mouseOffset.x * 0.9}px, ${mouseOffset.y * 0.9}px, 0px)`,
            }}
          >
            <div className="text-[10px] font-mono text-[#1688D8] tracking-widest uppercase">
              CENTER FOR INTELLIGENT SYSTEMS
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F5F2EA] font-display">
              Autonomous Systems & Neural Computing Lab
            </h3>
            <p className="text-xs text-[#F5F2EA]/80 font-light leading-relaxed">
              Equipped with high-density GPU acceleration rigs, enabling students and faculty researchers to train multi-billion parameter models and deploy edge AI solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
