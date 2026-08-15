import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, PlusCircle, ShieldAlert, Sparkles } from 'lucide-react';

export const SkillGapSection: React.FC = () => {
  const verifiedSkills = [
    { name: 'Python Programming', percent: 95, level: 'ADVANCED (95%)' },
    { name: 'Data Structures & Algorithms', percent: 90, level: 'ADVANCED (90%)' },
    { name: 'SQL & Database Architecture', percent: 85, level: 'INTERMEDIATE (85%)' },
    { name: 'Full-Stack Web (React & FastAPI)', percent: 80, level: 'INTERMEDIATE (80%)' },
    { name: 'Linux & Shell Scripting', percent: 78, level: 'INTERMEDIATE (78%)' },
  ];

  return (
    <section className="relative py-24 w-full bg-[#F7F4EE] border-t border-[#0C2238]/08 z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EFE7D8] border border-[#C99632]/25">
            <Sparkles className="w-3.5 h-3.5 text-[#C99632]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A6437]">
              SKILL GAP INTELLIGENCE
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#10253A] tracking-tight leading-[1.12] font-display">
            KNOW WHERE <br />
            <span className="text-[#C99632] font-serif-accent italic font-normal">
              YOU STAND.
            </span>
          </h2>

          <p className="text-base font-normal text-[#627083] leading-relaxed">
            Automatic comparison between your current verified skills and your target engineering role benchmark.
          </p>
        </motion.div>

        {/* Current vs Target Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Current Verified Profile with Animated Bars */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-8 bg-[#FFFCF7] border border-[#0C2238]/10 shadow-2xl space-y-6 rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-[#0C2238]/08 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#C99632] tracking-wider block uppercase">
                  VERIFIED PROFILE
                </span>
                <h3 className="text-xl font-extrabold font-display text-[#10253A]">Current Competencies</h3>
              </div>
              <span className="text-xs font-extrabold text-[#159A72] bg-[#E6F4ED] px-3 py-1 border border-[#159A72]/20 rounded-full">
                8 SKILLS VERIFIED
              </span>
            </div>

            <div className="space-y-4">
              {verifiedSkills.map((item) => (
                <div key={item.name} className="space-y-1.5 p-3.5 bg-[#F7F4EE]/80 border border-[#0C2238]/05 rounded-2xl text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-[#159A72]" />
                      <span className="font-bold text-[#10253A]">{item.name}</span>
                    </div>
                    <span className="font-extrabold text-xs text-[#C99632]">{item.level}</span>
                  </div>
                  {/* Animated Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[#0C2238]/10 overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${item.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-[#0C2238] to-[#C99632]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Center VS Divider Arrow */}
          <div className="lg:col-span-2 text-center space-y-1 py-4">
            <span className="text-sm font-extrabold text-[#C99632] bg-[#EFE7D8] px-4 py-2 rounded-full border border-[#C99632]/30 inline-block shadow-sm">
              VS
            </span>
            <div className="w-full h-px bg-[#0C2238]/10 my-2" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#627083]">BENCHMARK</span>
          </div>

          {/* Right: Target Role Requirements & Gap Breakdown */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-8 bg-[#0C2238] text-white border border-[#C99632]/30 shadow-2xl space-y-6 rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#E8C56B] tracking-wider block uppercase">
                  TARGET BENCHMARK
                </span>
                <h3 className="text-xl font-extrabold font-display text-white">AI Research Engineer</h3>
              </div>
              <span className="text-xs font-extrabold text-[#E8C56B] bg-[#C99632]/20 px-3 py-1 border border-[#C99632]/40 rounded-full">
                2 SKILL GAPS
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#07182A] border border-[#C99632]/30 rounded-2xl text-xs">
                <div className="flex items-center space-x-2.5">
                  <AlertCircle className="w-4 h-4 text-[#E8C56B]" />
                  <span className="font-bold text-white">PyTorch & Deep Neural Networks</span>
                </div>
                <span className="text-xs text-[#E8C56B] font-extrabold">GAP IDENTIFIED</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#07182A] border border-[#C99632]/30 rounded-2xl text-xs">
                <div className="flex items-center space-x-2.5">
                  <AlertCircle className="w-4 h-4 text-[#E8C56B]" />
                  <span className="font-bold text-white">Distributed System Design & CUDA</span>
                </div>
                <span className="text-xs text-[#E8C56B] font-extrabold">GAP IDENTIFIED</span>
              </div>
            </div>

            {/* Advisory Action Notice */}
            <div className="pt-3 border-t border-white/10 flex items-center space-x-2 text-xs text-[#E8C56B] font-medium">
              <ShieldAlert className="w-4 h-4 text-[#E8C56B] shrink-0" />
              <span>Skill gaps are advisory indicators for student self-development.</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

