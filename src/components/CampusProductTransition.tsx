import React, { useEffect, useState } from 'react';
import { MapPin, Compass } from 'lucide-react';

export const CampusProductTransition: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      setScrollProgress(window.scrollY / maxScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const milestones = [
    {
      step: '01 / ENTER',
      title: 'YOUR CAMPUS.',
      desc: 'Entering Vidyalankar Institute of Technology — Wadala\'s flagship engineering campus.',
      location: 'VIT Main Entrance Avenue',
    },
    {
      step: '02 / DISCOVER',
      title: 'YOUR POTENTIAL.',
      desc: 'Reflective glass academic wings housing modern research labs, AI centers, and collaborative spaces.',
      location: 'Academic Block A & B',
    },
    {
      step: '03 / DEVELOP',
      title: 'YOUR SKILLS.',
      desc: 'Connecting academics, attendance, technical skills, projects, certifications, and hackathon achievements.',
      location: 'Central Atrium & Quadrangle',
    },
    {
      step: '04 / BUILD',
      title: 'YOUR FUTURE.',
      desc: 'One connected digital profile with personalized learning roadmaps, mentor visibility, and AI guidance.',
      location: 'Computer Engineering Department',
    },
  ];

  // Determine active milestone based on global scroll progress
  const activeIdx = Math.min(3, Math.floor(scrollProgress * 4));
  const activeMilestone = milestones[activeIdx];

  return (
    <section id="journey" className="relative py-28 w-full z-10 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8 pointer-events-auto">
        {/* Floating Milestone Card — Modern Glass Overlay */}
        <div className="p-8 bg-[#07111F]/85 border border-white/15 backdrop-blur-xl text-white shadow-2xl max-w-lg space-y-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
            <span className="font-bold tracking-wider">{activeMilestone.step}</span>
            <span className="flex items-center space-x-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeMilestone.location}</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            {activeMilestone.title}
          </h2>

          <p className="text-sm text-slate-200 font-normal leading-relaxed">
            {activeMilestone.desc}
          </p>

          <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-medium text-amber-300">
            <span className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>CAMPUS EXPLORATION</span>
            </span>
            <span className="font-bold text-emerald-400">{(scrollProgress * 100).toFixed(0)}% JOURNEY</span>
          </div>
        </div>

        {/* Global Journey Indicator Banner */}
        <div className="p-6 bg-[#07111F]/85 border border-white/15 backdrop-blur-xl text-center space-y-2 max-w-sm rounded-2xl shadow-2xl">
          <span className="text-xs font-bold tracking-wider text-amber-300 uppercase block">
            INTERACTIVE CAMPUS SCRUB
          </span>
          <h3 className="text-lg font-bold text-white font-display">
            PHYSICAL CAMPUS → DIGITAL PLATFORM
          </h3>
          <p className="text-xs text-slate-300 font-normal leading-relaxed">
            Scroll smoothly to traverse the campus grounds and discover our connected platform architecture.
          </p>
        </div>
      </div>
    </section>
  );
};
