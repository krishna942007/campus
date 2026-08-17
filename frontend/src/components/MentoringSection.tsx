import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileCheck, AlertTriangle, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';

export const MentoringSection: React.FC = () => {
  return (
    <section id="mentoring" className="relative py-24 w-full bg-[#F7F4EE] border-t border-[#0C2238]/08 z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EFE7D8] border border-[#C99632]/25">
            <Users className="w-3.5 h-3.5 text-[#C99632]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A6437]">
              STRUCTURED FACULTY MENTORING
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#10253A] tracking-tight leading-[1.12] font-display">
            GUIDANCE, <br />
            <span className="text-[#C99632] font-serif-accent italic font-normal">
              WITH REAL CONTEXT.
            </span>
          </h2>

          <p className="text-base font-normal text-[#627083] leading-relaxed">
            Faculty mentors get controlled, evidence-based visibility into their assigned students — tracking performance trends, meeting outcomes, and attention indicators.
          </p>
        </motion.div>

        {/* Dual View: Student Permitted View vs Mentor Controlled View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: Student Permitted View */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 bg-[#FFFCF7] border border-[#0C2238]/10 shadow-2xl space-y-6 rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-[#0C2238]/08 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#C99632] tracking-wider block uppercase">
                  STUDENT PERMITTED VIEW
                </span>
                <h3 className="text-xl font-extrabold font-display text-[#10253A]">My Mentorship Summary</h3>
              </div>
              <StatusBadge variant="ON_TRACK" label="ACTIVE RELATIONSHIP" />
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-5 bg-[#F7F4EE] border border-[#0C2238]/08 rounded-2xl space-y-2">
                <span className="text-[10px] font-extrabold text-[#C99632] block uppercase">ASSIGNED FACULTY MENTOR</span>
                <div className="text-base font-extrabold text-[#10253A] font-display">Prof. S. Kulkarni</div>
                <div className="text-xs text-[#627083] font-medium">Department of Computer Engineering</div>
              </div>

              <div className="p-5 bg-[#F7F4EE] border border-[#0C2238]/08 rounded-2xl space-y-2">
                <span className="text-[10px] font-extrabold text-[#C99632] block uppercase">LAST MEETING LOGGED (12-AUG-2026)</span>
                <p className="text-[#10253A] font-normal leading-relaxed text-xs">
                  "Discussed capstone research project. Advised student to focus on PyTorch neural network benchmarking and prepare manuscript draft for IEEE conference."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Mentor Controlled View */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 bg-[#0C2238] text-white border border-[#C99632]/30 shadow-2xl space-y-6 rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#E8C56B] tracking-wider block uppercase">
                  FACULTY MENTOR CONTROLLED VIEW
                </span>
                <h3 className="text-xl font-extrabold font-display text-white">Assigned Student Roster</h3>
              </div>
              <span className="text-xs font-extrabold text-[#E8C56B] bg-[#C99632]/20 px-3 py-1 border border-[#C99632]/40 rounded-full">
                20 STUDENTS ASSIGNED
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-[#07182A] border border-[#159A72]/30 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-white text-sm block">Krishna Singh (2023CSE001)</span>
                  <span className="text-xs text-[#E8C56B] font-bold">CGPA 8.92 • 86.4% Attendance</span>
                </div>
                <StatusBadge variant="ON_TRACK" label="ON TRACK" />
              </div>

              <div className="p-4 bg-[#07182A] border border-[#C88A16]/30 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-white text-sm block">Rohan Mehta (2023CSE088)</span>
                  <span className="text-xs text-[#E8C56B] font-bold">CGPA 7.10 • 72.0% Attendance</span>
                </div>
                <StatusBadge variant="ATTENTION" label="ATTENTION NEEDED" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

