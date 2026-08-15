import React from 'react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="relative py-32 w-full bg-[#07111F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Asymmetric Image Block — NO ROUNDED CARDS! */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full h-[500px] sm:h-[650px] overflow-hidden shadow-2xl">
              <img
                src="/campus/about-bg.webp"
                alt="VIT Mumbai Glass Architecture Building"
                className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.12] hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle Linear Gradient Edge Overlap */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#07111F]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent" />
            </div>

            {/* Micro Caption near edge */}
            <div className="mt-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#D6A84F]">
              <span>FIG. 01 — ACADEMIC GLASS FACADE</span>
              <span>WADALA, MUMBAI</span>
            </div>
          </div>

          {/* Overlapping Editorial Typography Column */}
          <div className="lg:col-span-5 space-y-8 lg:-ml-12 z-10">
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#1688D8]">
                SPATIAL PHILOSOPHY
              </span>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#F5F2EA] leading-[0.95] font-display">
                BUILT <br />
                <span className="font-serif-italic font-normal text-gold-gradient">
                  TO INSPIRE.
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#F5F2EA]/80 font-light leading-relaxed max-w-md">
              Designed to reflect ambition, light, and transparency. VIT Mumbai's campus architecture merges reflective blue glass blocks with open elevated walkways, creating a physical space where technical ideas flow effortlessly.
            </p>

            {/* Thin Gold Accent Line */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#D6A84F] to-transparent" />

            {/* Editorial Features List without cards */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-4">
                <span className="text-xs font-mono font-bold text-[#E8C477]">01</span>
                <div>
                  <h3 className="text-sm font-bold text-[#F5F2EA] font-display">
                    BLUE GLASS FACADES
                  </h3>
                  <p className="text-xs text-[#F5F2EA]/70 font-light mt-0.5">
                    Engineered for maximum natural daylight and energy conservation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-xs font-mono font-bold text-[#E8C477]">02</span>
                <div>
                  <h3 className="text-sm font-bold text-[#F5F2EA] font-display">
                    OPEN ELEVATED WALKWAYS
                  </h3>
                  <p className="text-xs text-[#F5F2EA]/70 font-light mt-0.5">
                    Connecting academic blocks, computing labs, and student lounges seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
