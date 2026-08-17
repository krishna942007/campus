import React from 'react';
import { Network, Globe2, Lightbulb, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const WhyVITSection: React.FC = () => {
  const features = [
    {
      icon: Network,
      title: 'Industry Connect',
      desc: 'Direct partnerships with leading tech corporations, tech mentorships, industrial visits, and high-impact placement drives.',
    },
    {
      icon: Globe2,
      title: 'Global Exposure',
      desc: 'International conference opportunities, collaborative academic exchange programs, and globally recognized curriculum.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Ecosystem',
      desc: 'In-house incubation center, seed funding grants for student startups, patent assistance, and maker labs.',
    },
    {
      icon: HeartHandshake,
      title: 'Holistic Development',
      desc: 'Personality grooming, leadership workshops, ethical engineering values, mental health counseling, and wellness.',
    },
  ];

  return (
    <section id="why-vit" className="relative py-28 w-full bg-[#07111F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & 4 Feature Points */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8C477] px-3.5 py-1.5 rounded-full bg-[#0B1A2F] border border-[#D6A84F]/30">
                WHY VIT MUMBAI
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight leading-tight font-display">
                A Place to <br />
                <span className="text-gold-gradient font-serif italic">Grow, Lead & Build</span>
              </h2>
              <p className="text-sm text-[#F5F2EA]/80 font-light leading-relaxed">
                World-class infrastructure, experienced faculty, industry connect and a supportive ecosystem for your overall growth as an engineer.
              </p>
            </div>

            {/* Feature Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card-gold p-5 rounded-2xl border border-[#D6A84F]/25 hover:border-[#D6A84F]/60 transition-all duration-300 space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0066B3]/20 border border-[#0066B3]/40 flex items-center justify-center text-[#1688D8] group-hover:bg-[#D6A84F]/20 group-hover:border-[#D6A84F]/50 group-hover:text-[#E8C477] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#F5F2EA] font-display group-hover:text-[#E8C477] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#F5F2EA]/75 font-light leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Real Campus Building Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#D6A84F]/30 bg-[#0B1A2F] shadow-2xl group">
              <img
                src="/campus/why-vit-bg.webp"
                alt="VIT Mumbai Glass Architecture & Gardens"
                className="w-full h-[450px] sm:h-[550px] object-cover filter brightness-[0.88] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent" />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#07111F]/85 border border-[#D6A84F]/30 backdrop-blur-xl flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#D6A84F]/20 flex items-center justify-center text-[#E8C477] flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#E8C477] uppercase tracking-wider">
                    NAAC A+ ACCREDITED
                  </h4>
                  <p className="text-xs text-[#F5F2EA]/90 font-medium">
                    Recognized for academic excellence and state-of-the-art infrastructure.
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
