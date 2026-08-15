import React from 'react';

export const InsideVITSection: React.FC = () => {
  return (
    <section className="relative py-32 w-full bg-[#07111F] overflow-hidden border-t border-[#D6A84F]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E8C477]">
              03 // INTERIOR SPACES
            </span>
            <h2 className="text-5xl sm:text-6xl font-black text-[#F5F2EA] font-display tracking-tight leading-tight">
              INSIDE <br />
              <span className="font-serif-italic font-normal text-gold-gradient">
                THE ATRIUM.
              </span>
            </h2>
          </div>
          <p className="text-sm text-[#F5F2EA]/75 font-light max-w-md leading-relaxed">
            Sunlit interiors, expansive glass roofs, and quiet research nooks designed for deep focus, collaboration, and high-impact computing.
          </p>
        </div>

        {/* Asymmetric Digital Magazine Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Dominant Image */}
          <div className="md:col-span-8 relative">
            <div className="relative h-[420px] sm:h-[550px] w-full overflow-hidden shadow-2xl">
              <img
                src="/campus/academics-bg.webp"
                alt="VIT Atrium Interior Skylight"
                className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.1] hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent" />
            </div>
            <div className="mt-3 text-[10px] font-mono text-[#F5F2EA]/60 uppercase tracking-widest">
              CENTRAL ATRIUM SKYLIGHT & COLLABORATION LOUNGE
            </div>
          </div>

          {/* Secondary Stacked Accent Images & Thin Gold Rule */}
          <div className="md:col-span-4 space-y-8 flex flex-col justify-between">
            <div className="relative h-64 w-full overflow-hidden shadow-xl">
              <img
                src="/campus/research-bg.webp"
                alt="Advanced Computing Workstation"
                className="w-full h-full object-cover filter brightness-[0.9] hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Vertical Gold Line & Text Paragraph */}
            <div className="pl-6 border-l border-[#D6A84F]/40 space-y-3">
              <span className="text-[10px] font-mono text-[#1688D8] tracking-widest block uppercase">
                RESEARCH ENVIRONMENTS
              </span>
              <p className="text-xs text-[#F5F2EA]/80 font-light leading-relaxed">
                Every floor is equipped with high-speed fiber connectivity, dedicated lab bays, and open break-out areas to turn discussions into prototypes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
