import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, BookOpen, TrendingUp } from 'lucide-react';

interface StudentCommunitySectionProps {
  onSelectRole: (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
}

export const StudentCommunitySection: React.FC<StudentCommunitySectionProps> = ({ onSelectRole }) => {
  return (
    <section id="community" className="py-16 bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FFFCF7] rounded-3xl p-8 sm:p-12 border border-[#0C2238]/10 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          
          {/* Left Side 4 Students Laptop Collaboration Vector Illustration */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              <svg viewBox="0 0 500 350" className="w-full h-auto drop-shadow-sm">
                <defs>
                  <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#C99632" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0C2238" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Soft Aura Circle */}
                <circle cx="250" cy="180" r="140" fill="url(#bgGrad)" />

                {/* Decorative Foliage Leaves */}
                <path d="M 60 260 Q 40 200 70 140 Q 100 200 60 260 Z" fill="#0C2238" opacity="0.7" />
                <path d="M 440 260 Q 460 200 430 140 Q 400 200 440 260 Z" fill="#0C2238" opacity="0.7" />

                {/* Table Surface */}
                <ellipse cx="250" cy="270" rx="190" ry="25" fill="#D4C5A9" opacity="0.6" />

                {/* Laptop in Center */}
                <rect x="210" y="220" width="80" height="50" rx="6" fill="#0C2238" />
                <rect x="216" y="226" width="68" height="38" rx="3" fill="#FFFFFF" />
                <path d="M 195 270 L 305 270 L 295 275 L 205 275 Z" fill="#64748B" />

                {/* Student 1 (Far Left) */}
                <circle cx="140" cy="150" r="28" fill="#0C2238" />
                <circle cx="140" cy="155" r="20" fill="#FCA5A5" />
                <path d="M 110 270 C 110 200, 170 200, 170 270 Z" fill="#0C2238" />

                {/* Student 2 (Female Center-Left - Gold Sweater) */}
                <circle cx="205" cy="170" r="30" fill="#0F172A" />
                <circle cx="205" cy="175" r="20" fill="#FED7AA" />
                <path d="M 175 270 C 175 210, 235 210, 235 270 Z" fill="#C99632" />

                {/* Student 3 (Male Center-Right) */}
                <circle cx="265" cy="160" r="30" fill="#1E1B4B" />
                <circle cx="265" cy="165" r="22" fill="#FDBA74" />
                <path d="M 230 270 C 230 200, 300 200, 300 270 Z" fill="#10253A" />

                {/* Student 4 (Female Far-Right) */}
                <circle cx="340" cy="175" r="32" fill="#0F172A" />
                <circle cx="340" cy="180" r="22" fill="#FCA5A5" />
                <path d="M 305 270 C 305 215, 375 215, 375 270 Z" fill="#0C2238" />
              </svg>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EFE7D8] border border-[#C99632]/25">
              <Users className="w-3.5 h-3.5 text-[#C99632]" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A6437]">
                TOGETHER WE EXCEL
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10253A] tracking-tight leading-[1.2] font-display">
              Be a part of a smarter,<br />
              stronger and more connected<br />
              <span className="text-[#C99632] font-serif-accent italic font-normal">VIT community.</span>
            </h2>

            {/* Button */}
            <div>
              <button
                onClick={() => onSelectRole('STUDENT')}
                className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-[#0C2238] hover:bg-[#10253A] text-white font-extrabold text-xs shadow-lg transition-all duration-200 group cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Join the Journey</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E8C56B] group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* 3 Bullet Points */}
            <div className="space-y-4 pt-4 border-t border-[#0C2238]/08">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#F7F4EE] border border-[#0C2238]/10 flex items-center justify-center text-[#C99632] shrink-0">
                  <Users className="w-4 h-4 text-[#C99632]" />
                </div>
                <span className="text-xs font-extrabold text-[#10253A]">Collaborate with peers across departments</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#F7F4EE] border border-[#0C2238]/10 flex items-center justify-center text-[#C99632] shrink-0">
                  <BookOpen className="w-4 h-4 text-[#C99632]" />
                </div>
                <span className="text-xs font-extrabold text-[#10253A]">Learn from shared academic experiences</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#F7F4EE] border border-[#0C2238]/10 flex items-center justify-center text-[#C99632] shrink-0">
                  <TrendingUp className="w-4 h-4 text-[#C99632]" />
                </div>
                <span className="text-xs font-extrabold text-[#10253A]">Grow together as an academic cohort</span>
              </div>
            </div>

          </div>

          {/* Far Right Decorative Dot Grid */}
          <div className="absolute right-4 top-12 bottom-12 w-12 hidden xl:flex flex-col justify-between opacity-20 pointer-events-none">
            <div className="grid grid-cols-3 gap-1.5">
              {[...Array(12)].map((_, i) => (
                <span key={i} className="w-1 h-1 rounded-full bg-[#C99632]" />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[...Array(12)].map((_, i) => (
                <span key={i} className="w-1 h-1 rounded-full bg-[#C99632]" />
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

