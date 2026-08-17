import React from 'react';
import { ArrowRight, Sparkles, MoveDown } from 'lucide-react';

interface HeroProps {
  onSelectRole?: (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectRole }) => {
  const stats = [
    { number: '5000+', label: 'Students', desc: 'Active scholars & innovators' },
    { number: '300+', label: 'Faculty', desc: 'Renowned researchers & mentors' },
    { number: '50+', label: 'Programs', desc: 'Industry-aligned curriculum' },
    { number: '100+', label: 'Recruiters', desc: 'Top tier global partners' },
  ];

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#07111F]">
      {/* Background Real Campus Image with Cinematic Color Grading */}
      <div className="absolute inset-0 z-0">
        <img
          src="/campus/hero-bg.webp"
          alt="VIT Mumbai Campus View"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow filter brightness-[0.78] contrast-[1.1] saturate-[1.05]"
        />
        {/* Layered Cinematic Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/60 to-[#07111F]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07111F]/40 to-[#07111F]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-[#07111F]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        {/* Left Editorial Heading Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#07111F]/80 border border-[#D6A84F]/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E8C477] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E8C477]">
              VIT MUMBAI • COMPUTER ENGINEERING
            </span>
          </div>

          {/* Main Large Editorial Typography */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F5F2EA] leading-[0.95] font-display">
              Engineering <br />
              <span className="text-gold-gradient font-serif italic font-normal">Excellence</span> <br />
              Redefined.
            </h1>
          </div>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg text-[#F5F2EA]/80 font-light max-w-xl leading-relaxed">
            A next-generation university shaping innovators, leaders, and changemakers of tomorrow through cutting-edge computing, AI, and research-driven education.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#campus-journey"
              className="btn-gold-primary px-8 py-4 rounded-2xl text-sm font-extrabold flex items-center space-x-3 shadow-xl shadow-[#D6A84F]/25 cursor-pointer group"
            >
              <span>EXPLORE CAMPUS</span>
              <ArrowRight className="w-4 h-4 text-[#07111F] group-hover:translate-x-1.5 transition-transform" />
            </a>

            <a
              href="#academics"
              className="btn-glass-secondary px-7 py-4 rounded-2xl text-sm font-semibold flex items-center space-x-2 cursor-pointer"
            >
              <span>View Programs</span>
            </a>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-8 flex items-center space-x-3 text-[#F5F2EA]/60 text-xs font-semibold tracking-widest uppercase">
            <div className="w-7 h-11 rounded-full border-2 border-[#D6A84F]/40 flex items-center justify-center p-1">
              <div className="w-1.5 h-2.5 rounded-full bg-[#E8C477] animate-bounce" />
            </div>
            <span>Scroll to Explore</span>
          </div>
        </div>

        {/* Right Stats Cards Column (Matching Reference Visual Structure) */}
        <div className="lg:col-span-5 flex flex-col space-y-3.5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card-gold p-5 rounded-2xl flex items-center justify-between group border border-[#D6A84F]/20 hover:border-[#D6A84F]/60 transition-all duration-300"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#F5F2EA] tracking-tight font-display group-hover:text-[#E8C477] transition-colors">
                  {stat.number}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#E8C477]">
                  {stat.label}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#F5F2EA]/60 font-light max-w-[140px] block">
                  {stat.desc}
                </span>
              </div>
            </div>
          ))}

          {/* Section Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-[#D6A84F]/70 font-mono pt-2 px-1">
            <span>01</span>
            <div className="flex-1 mx-4 h-0.5 bg-[#D6A84F]/20 relative overflow-hidden rounded-full">
              <div className="w-1/5 h-full bg-[#D6A84F] rounded-full animate-pulse" />
            </div>
            <span>05</span>
          </div>
        </div>
      </div>

      {/* Decorative Golden Ambient Accent Rays */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
