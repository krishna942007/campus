import React, { useState } from 'react';
import { Users, Trophy, Palette, Sparkles, Code2, ArrowRight } from 'lucide-react';

export const CampusLifeSection: React.FC = () => {
  const categories = [
    {
      id: 'clubs',
      title: 'Clubs & Communities',
      subtitle: '40+ Student Organizations',
      desc: 'Technical chapters (ACM, IEEE, CSI), coding clubs, developer circles, robotics collectives, and literary societies.',
      img: '/campus/life-1.webp',
      icon: Users,
    },
    {
      id: 'sports',
      title: 'Sports & Fitness',
      subtitle: 'Inter-College Championships',
      desc: 'State-of-the-art sports facilities, cricket ground, football turf, basketball courts, and indoor gaming arenas.',
      img: '/campus/life-2.webp',
      icon: Trophy,
    },
    {
      id: 'arts',
      title: 'Arts & Culture',
      subtitle: 'VERVE Annual Cultural Fest',
      desc: 'Music bands, dance troupes, drama societies, photography clubs, and creative media production studios.',
      img: '/campus/life-3.webp',
      icon: Palette,
    },
    {
      id: 'events',
      title: 'Student Events',
      subtitle: '100+ Events Annually',
      desc: 'Hackathons, guest lectures by global tech pioneers, alumni meets, tech symposiums, and cultural carnivals.',
      img: '/campus/life-4.webp',
      icon: Sparkles,
    },
    {
      id: 'hackathons',
      title: 'Innovation & Hackathons',
      subtitle: 'Build, Code & Pitch',
      desc: '24-hour national hackathons, startup pitch competitions, incubator mentorship, and patent filing support.',
      img: '/campus/life-5.webp',
      icon: Code2,
    },
  ];

  return (
    <section id="campus-life" className="relative py-28 w-full bg-[#07111F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8C477] px-3.5 py-1.5 rounded-full bg-[#0B1A2F] border border-[#D6A84F]/30">
              CAMPUS LIFE
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F5F2EA] tracking-tight font-display">
              Beyond <br />
              <span className="text-gold-gradient font-serif italic">Classrooms</span>
            </h2>
          </div>
          <div className="space-y-2 max-w-md">
            <p className="text-sm text-[#F5F2EA]/80 font-light leading-relaxed">
              Clubs, events, sports, arts and vibrant communities that make campus life at VIT Mumbai truly unforgettable.
            </p>
            <div className="flex items-center space-x-6 text-xs font-bold text-[#E8C477] pt-1">
              <span>40+ Clubs</span>
              <span>•</span>
              <span>25+ Sports</span>
              <span>•</span>
              <span>100+ Events/Year</span>
            </div>
          </div>
        </div>

        {/* Interactive Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className={`relative rounded-2xl overflow-hidden border border-[#D6A84F]/25 bg-[#0B1A2F] group hover:border-[#D6A84F]/60 transition-all duration-500 shadow-xl ${
                  idx === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Background Campus Photograph */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1] group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/60 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#07111F]/80 border border-[#D6A84F]/40 backdrop-blur-md flex items-center justify-center text-[#E8C477]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#1688D8] uppercase tracking-wider px-2.5 py-1 rounded bg-[#07111F]/80 border border-[#1688D8]/30 backdrop-blur-md">
                      {cat.subtitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#F5F2EA] font-display group-hover:text-[#E8C477] transition-colors mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#F5F2EA]/80 font-light leading-relaxed max-w-md line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
