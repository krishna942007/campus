import React, { useState } from 'react';
import { MousePointer2, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export const InteractiveDepthImage: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="relative py-28 w-full bg-[#07111F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8C477] px-3.5 py-1.5 rounded-full bg-[#0B1A2F] border border-[#D6A84F]/30 inline-flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E8C477]" />
            <span>INTERACTIVE IMMERSIVE VIEW</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#F5F2EA] font-display">
            Experience Campus <br />
            <span className="text-gold-gradient font-serif italic">in 3D Parallax Depth</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F2EA]/75 font-light">
            Move your cursor across the panel below to experience interactive 3D spatial motion and lighting.
          </p>
        </div>

        {/* 3D Interactive Container */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-[480px] sm:h-[560px] w-full rounded-3xl overflow-hidden border border-[#D6A84F]/35 shadow-2xl cursor-crosshair group perspective-1000"
        >
          {/* Background Real Campus Image shifting opposite */}
          <div
            className="absolute inset-0 transition-transform duration-200 ease-out scale-110"
            style={{
              transform: `translate3d(${mousePos.x * -35}px, ${mousePos.y * -35}px, 0px) scale(1.15)`,
            }}
          >
            <img
              src="/campus/interactive-bg.webp"
              alt="VIT Mumbai Interactive Campus Architecture"
              className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1]"
            />
          </div>

          {/* Golden Spotlight Following Cursor */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(214, 168, 79, 0.25), transparent 70%)`,
            }}
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/30 to-transparent pointer-events-none" />

          {/* Shifting Foreground Glass Overlay Panel */}
          <div
            className="absolute bottom-8 left-8 right-8 sm:right-auto sm:max-w-lg p-6 sm:p-8 rounded-3xl glass-card-gold border border-[#D6A84F]/40 backdrop-blur-2xl bg-[#07111F]/90 shadow-2xl transition-transform duration-200 ease-out space-y-4"
            style={{
              transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 20px)`,
            }}
          >
            <div className="flex items-center space-x-2 text-xs font-bold text-[#E8C477]">
              <Layers className="w-4 h-4 text-[#D6A84F]" />
              <span>SPATIAL ARCHITECTURAL DESIGN</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#F5F2EA] font-display">
              Vidyalankar Campus Campus Grounds
            </h3>

            <p className="text-xs sm:text-sm text-[#F5F2EA]/85 font-light leading-relaxed">
              Designed with environmental sustainability, high-speed Wi-Fi 6 coverage, ergonomic research labs, and open green spaces.
            </p>

            <div className="pt-3 border-t border-[#D6A84F]/20 flex items-center justify-between text-xs text-[#1688D8]">
              <span className="flex items-center space-x-1.5">
                <MousePointer2 className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>Move Cursor to Tilt</span>
              </span>
              <ShieldCheck className="w-4 h-4 text-[#E8C477]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
