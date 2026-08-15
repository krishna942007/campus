import React from 'react';
import { Sparkles, Layers, Award, Terminal, ArrowUpRight } from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const researchDomains = [
    'Autonomous Systems & AI',
    'Cyber Physical Systems',
    'Quantum Computing Research',
    'Edge AI & Embedded VLSI',
    'Big Data & Cloud Infrastructure',
    'Blockchain & Cryptography',
  ];

  return (
    <section id="research" className="relative py-28 w-full bg-[#07111F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Real Campus Lab Image & Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D6A84F]/30 bg-[#0B1A2F] shadow-2xl group">
              <img
                src="/campus/research-bg.webp"
                alt="VIT Mumbai Advanced Research Laboratory"
                className="w-full h-[420px] sm:h-[500px] object-cover object-center filter brightness-[0.88] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-[#07111F]/40" />

              {/* Lab Badge */}
              <div className="absolute top-6 left-6 flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#07111F]/90 border border-[#D6A84F]/40 backdrop-blur-md">
                <Terminal className="w-4 h-4 text-[#E8C477]" />
                <span className="text-xs font-bold text-[#E8C477] tracking-wider uppercase">
                  R&D LAB FACILITY
                </span>
              </div>

              {/* Bottom Glass Quote */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#07111F]/85 border border-[#D6A84F]/25 backdrop-blur-xl space-y-2">
                <p className="text-xs text-[#F5F2EA] font-medium leading-relaxed">
                  "Pioneering research in artificial intelligence, neural architectures, and distributed systems to tackle global technological challenges."
                </p>
                <div className="text-[10px] font-mono text-[#1688D8]">
                  VIT MUMBAI RESEARCH COUNCIL
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Animated Progress Bars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8C477] px-3.5 py-1.5 rounded-full bg-[#0B1A2F] border border-[#D6A84F]/30">
                RESEARCH & INNOVATION
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight leading-tight font-display">
                Driving Innovation <br />
                <span className="text-gold-gradient font-serif italic">Creating Impact</span>
              </h2>
              <p className="text-sm text-[#F5F2EA]/80 font-light leading-relaxed">
                Cutting-edge research, state-of-the-art labs, and specialized centers of excellence working on real-world challenges in AI, computing, and cybersecurity.
              </p>
            </div>

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { count: '15+', label: 'Research Centers' },
                { count: '200+', label: 'Research Projects' },
                { count: '500+', label: 'Publications' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card-gold p-4 rounded-xl text-center border border-[#D6A84F]/25"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#E8C477] font-display">
                    {item.count}
                  </div>
                  <div className="text-[10px] font-bold text-[#F5F2EA]/70 uppercase tracking-wider mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Animated Gold Line & Research Domain Pills */}
            <div className="space-y-4 pt-4 border-t border-[#D6A84F]/20">
              <div className="flex items-center justify-between text-xs font-bold text-[#E8C477]">
                <span>KEY RESEARCH DOMAINS</span>
                <span className="text-[10px] text-[#1688D8] font-mono">100% ACTIVE LABS</span>
              </div>

              {/* Animated Gold Line Bar */}
              <div className="w-full h-1.5 bg-[#0B1A2F] rounded-full overflow-hidden border border-[#D6A84F]/30 relative">
                <div className="h-full bg-gradient-to-r from-[#D6A84F] via-[#E8C477] to-[#1688D8] rounded-full animate-line-draw" />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {researchDomains.map((domain, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#0B1A2F]/90 text-[#F5F2EA]/90 border border-[#D6A84F]/20 hover:border-[#D6A84F]/60 transition-colors"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
