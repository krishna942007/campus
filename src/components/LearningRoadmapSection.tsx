import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Circle, Flag, Sparkles } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';

export const LearningRoadmapSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      stage: 'CURRENT SKILLS',
      title: 'Python, DSA & System Fundamentals',
      status: 'VERIFIED',
      desc: 'Verified via Semester IV coursework and internal lab assessments.',
      completed: true,
    },
    {
      num: '02',
      stage: 'SKILL GAP IDENTIFIED',
      title: 'PyTorch Neural Networks & CUDA',
      status: 'IN PROGRESS',
      desc: 'AI gap detector highlighted target role requirement difference.',
      completed: false,
    },
    {
      num: '03',
      stage: 'RECOMMENDED LEARNING',
      title: 'Deep Learning Specialization',
      status: 'RECOMMENDED',
      desc: 'Self-paced module aligned with VIT autonomous elective credits.',
      completed: false,
    },
    {
      num: '04',
      stage: 'PROJECT EVIDENCE',
      title: 'Autonomous Vision Capstone Project',
      status: 'PLANNED',
      desc: 'Faculty-guided capstone research repository for GitHub portfolio.',
      completed: false,
    },
    {
      num: '05',
      stage: 'TARGET GOAL',
      title: 'AI Research Engineer / ML Specialist',
      status: 'GOAL',
      desc: 'Target placement role benchmarked with industry partners.',
      completed: false,
    },
  ];

  return (
    <section id="roadmap" className="relative py-24 w-full bg-[#F7F4EE] border-t border-[#0C2238]/08 z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Headline */}
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
              AI-ASSISTED GUIDANCE ROADMAP
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#10253A] tracking-tight leading-[1.12] font-display">
            FROM WHERE YOU ARE <br />
            <span className="text-[#C99632] font-serif-accent italic font-normal">
              TO WHERE YOU WANT TO BE.
            </span>
          </h2>

          <p className="text-base font-normal text-[#627083] leading-relaxed">
            The platform creates an actionable, step-by-step personalized learning trajectory connecting your current profile to your target engineering role.
          </p>
        </motion.div>

        {/* Step-by-Step Trajectory Path Visual with Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch relative">
          
          {/* Connecting Progressive Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#C99632]/20 -translate-y-6 z-0" />

          {steps.map((s, idx) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, scale: 0.94, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`p-6 border flex flex-col justify-between relative space-y-4 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 z-10 ${
                s.completed
                  ? 'bg-[#0C2238] text-white border-[#0C2238]'
                  : idx === 1
                  ? 'bg-[#FFFCF7] text-[#10253A] border-[#C99632] ring-2 ring-[#C99632]/30'
                  : 'bg-[#FFFCF7]/90 text-[#10253A] border-[#0C2238]/10'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold ${s.completed ? 'text-[#E8C56B]' : 'text-[#C99632]'}`}>
                    STEP {s.num}
                  </span>
                  {s.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#E8C56B]" />
                  ) : (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#C99632]/30 bg-[#EFE7D8] text-[#7A6437]">
                      {s.status}
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-extrabold tracking-wider uppercase text-[#C99632]">
                  {s.stage}
                </div>

                <h3 className="text-base font-extrabold leading-snug font-display">
                  {s.title}
                </h3>
              </div>

              <p className={`text-xs font-normal leading-relaxed pt-3 border-t ${s.completed ? 'text-slate-300 border-white/10' : 'text-[#627083] border-[#0C2238]/08'}`}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

