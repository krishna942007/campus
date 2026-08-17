import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Sparkles, GraduationCap, Users, BarChart3, Bell } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface CleanHeroProps {
  onSelectRole: (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
}

export const CleanHero: React.FC<CleanHeroProps> = ({ onSelectRole }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left - rect.width / 2) / 30; // max ~5-8px
    const y = (clientY - rect.top - rect.height / 2) / 30;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#F7F4EE] bg-no-repeat overflow-hidden pt-2 sm:pt-4 pb-6 min-h-[860px] lg:min-h-[960px] flex flex-col justify-between"
      style={{ 
        backgroundImage: "url('/bg.png')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center top',
        transform: `translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px, 0)`,
        transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Soft gradient blend overlays to connect seamlessly with adjacent sections */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F7F4EE]/60 to-transparent pointer-events-none z-1" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F7F4EE] via-[#F7F4EE]/60 to-transparent pointer-events-none z-10" />

      {/* Upper Hero Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full pt-1 pb-4 flex-1">
        
        {/* Left Headline Column with Staggered Entrance Animations */}
        <div className="lg:col-span-7 space-y-7 z-10 py-6">
          
          {/* Eyebrow Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFCF7]/90 backdrop-blur-md border border-[#0C2238]/10 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#C99632]" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7A6437]">
              VIT MUMBAI • AI STUDENT DEVELOPMENT PLATFORM
            </span>
          </motion.div>

          {/* Headline - Line by Line Stagger */}
          <div className="space-y-1 font-display">
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#10253A] tracking-tight leading-[1.08]"
            >
              Learn Smarter.
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#10253A] tracking-tight leading-[1.08]"
            >
              Grow Stronger.
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif-accent italic font-normal text-[#C99632] tracking-tight leading-[1.08]"
            >
              Lead the Future.
            </motion.h1>
          </div>

          {/* Subtitle Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg font-normal text-[#627083] max-w-xl leading-relaxed"
          >
            A unified AI platform that understands, guides, and accelerates every student's academic and professional growth at VIT Mumbai.
          </motion.p>

          {/* Action Buttons with Micro-interactions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => onSelectRole('STUDENT')}
              className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-[#0C2238] hover:bg-[#07182A] text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all group cursor-pointer"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4 text-[#E8C56B] group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>

            <a
              href="#features"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-[#FFFCF7]/90 backdrop-blur-md hover:bg-[#FFFCF7] text-[#10253A] font-bold text-sm border border-[#0C2238]/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-[#10253A] text-[#10253A]" />
              <span>Explore Platform</span>
            </a>
          </motion.div>

          {/* Trust Social Proof Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pt-6 border-t border-[#0C2238]/10 flex flex-wrap items-center gap-8"
          >
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Student"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Student"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Student"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#10253A]">Trusted by 5000+ VITians</p>
                <p className="text-[11px] font-medium text-[#627083]">and growing every day!</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#EFE7D8]/90 flex items-center justify-center border border-[#0C2238]/10">
                <Shield className="w-4 h-4 text-[#0C2238]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#10253A]">Secure. Reliable.</p>
                <p className="text-[11px] font-medium text-[#627083]">Built for Students.</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Open space showing background artwork with subtle parallax */}
        <div className="lg:col-span-5 min-h-[380px] pointer-events-none" />

      </div>

      {/* Embedded 5 Feature Cards Floating Seamlessly Over Bottom of Hero Background */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.04, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        id="features" 
        className="max-w-7xl mx-auto px-6 w-full pt-4 pb-8 z-20"
      >
        <div className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#0C2238]/10 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {[
            {
              title: 'AI-Powered Insights',
              desc: 'Smart recommendations tailored just for you.',
              icon: Sparkles,
              bg: 'bg-[#EEF2FF]',
              border: 'border-[#E0E7FF]',
              iconColor: 'text-[#4F46E5]'
            },
            {
              title: 'Personalized Roadmap',
              desc: 'Clear academic & career path to achieve your goals.',
              icon: GraduationCap,
              bg: 'bg-[#FEF3C7]',
              border: 'border-[#FDE68A]',
              iconColor: 'text-[#D97706]'
            },
            {
              title: 'Expert Mentorship',
              desc: 'Connect with mentors who guide and inspire.',
              icon: Users,
              bg: 'bg-[#E0E7FF]',
              border: 'border-[#C7D2FE]',
              iconColor: 'text-[#4338CA]'
            },
            {
              title: 'Track & Improve',
              desc: 'Track progress and unlock your potential.',
              icon: BarChart3,
              bg: 'bg-[#FEF9C3]',
              border: 'border-[#FEF08A]',
              iconColor: 'text-[#CA8A04]'
            },
            {
              title: 'Everything in One Place',
              desc: 'Academics, resources, opportunities & more.',
              icon: Bell,
              bg: 'bg-[#DBEAFE]',
              border: 'border-[#BFDBFE]',
              iconColor: 'text-[#2563EB]'
            }
          ].map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div 
                key={idx}
                className="flex flex-col items-center text-center space-y-3 p-5 rounded-2xl bg-[#FFFCF7]/80 hover:bg-[#F7F4EE] border border-[#0C2238]/05 hover:border-[#C99632]/40 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-2xl ${card.bg} border ${card.border} flex items-center justify-center ${card.iconColor} group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
                  <IconComp className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <h4 className="text-sm font-bold text-[#10253A]">{card.title}</h4>
                <p className="text-xs text-[#627083] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}

        </div>
      </motion.div>
    </section>
  );
};
