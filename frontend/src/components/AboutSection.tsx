import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck, Target } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 w-full bg-[#07111F] overflow-hidden">
      {/* Background Campus Building Asset & Atmospheric Lighting */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative rounded-3xl overflow-hidden border border-[#D6A84F]/25 bg-[#0B1A2F]/80 shadow-2xl">
          {/* Real Campus Image */}
          <div className="relative h-[480px] lg:h-[580px] w-full overflow-hidden">
            <img
              src="/campus/about-bg.webp"
              alt="VIT Mumbai Main Campus Architecture"
              className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.08] hover:scale-105 transition-transform duration-700"
            />
            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07111F]/90 via-[#07111F]/30 to-transparent" />
          </div>

          {/* Foreground Floating Editorial Cards & Typography */}
          <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between z-10">
            {/* Top Tagline */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8C477] px-3.5 py-1.5 rounded-full bg-[#07111F]/80 border border-[#D6A84F]/30 backdrop-blur-md">
                ABOUT VIT MUMBAI
              </span>
              <span className="hidden sm:inline-block text-xs font-mono text-[#1688D8]">
                ESTD. EXCELLENCE
              </span>
            </div>

            {/* Main Editorial Text Overlay */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7 space-y-5">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F5F2EA] tracking-tight leading-none font-display">
                  A Vision <br />
                  <span className="text-gold-gradient font-serif italic">for the Future</span>
                </h2>

                <p className="text-sm sm:text-base text-[#F5F2EA]/85 font-light leading-relaxed max-w-xl">
                  VIT Mumbai is committed to academic rigor, cutting-edge research, innovation, and holistic development in a vibrant learning environment. We empower students to break technological boundaries and solve real-world problems.
                </p>

                <div className="pt-2">
                  <a
                    href="#academics"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#07111F]/80 border border-[#D6A84F]/40 text-xs font-bold text-[#E8C477] hover:bg-[#D6A84F] hover:text-[#07111F] transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <span>Know More</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Floating Glass "Our Mission" Card */}
              <div className="lg:col-span-5">
                <div className="glass-card-gold p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/30 shadow-2xl backdrop-blur-xl bg-[#07111F]/85 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D6A84F]/20 flex items-center justify-center border border-[#D6A84F]/40">
                    <Target className="w-5 h-5 text-[#E8C477]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#E8C477] mb-1">
                      Our Mission
                    </h3>
                    <p className="text-sm text-[#F5F2EA] font-medium leading-snug">
                      "To transform lives through quality education and innovation-driven research, nurturing social responsibility and ethical leadership."
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#D6A84F]/20 flex items-center justify-between text-[11px] text-[#1688D8]">
                    <span>Center of Excellence</span>
                    <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
