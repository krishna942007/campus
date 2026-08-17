import React from 'react';
import { motion } from 'framer-motion';
import { Database, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';

export const AcademicAttendanceSection: React.FC = () => {
  return (
    <section id="trust" className="relative py-24 w-full bg-[#F7F4EE] border-t border-[#0C2238]/08 z-10">
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#159A72]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A6437]">
              DATA INTEGRITY & TRUST ARCHITECTURE
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#10253A] tracking-tight leading-[1.12] font-display">
            AUTHORITATIVE RECORDS <br />
            <span className="text-[#C99632] font-serif-accent italic font-normal">
              VS. AI GUIDANCE.
            </span>
          </h2>

          <p className="text-base font-normal text-[#627083] leading-relaxed">
            The platform maintains strict distinction between official VIT ERP academic records and AI advisory intelligence. AI never overrides institutional authority.
          </p>
        </motion.div>

        {/* Side-by-Side Comparison: Official ERP vs AI Advisory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Column 1: Official VIT Academic ERP Record */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 bg-[#FFFCF7] border border-[#0C2238]/10 shadow-2xl space-y-6 rounded-3xl"
          >
            <div className="flex items-center space-x-3.5 border-b border-[#0C2238]/08 pb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#159A72]/15 border border-[#159A72]/30 text-[#159A72] flex items-center justify-center font-bold text-lg shadow-sm">
                <Database className="w-6 h-6 text-[#159A72]" />
              </div>
              <div>
                <StatusBadge variant="OFFICIAL" label="OFFICIAL INSTITUTIONAL SOURCE" />
                <h3 className="text-xl font-extrabold text-[#10253A] font-display mt-1">
                  VIT Academic ERP / MIS Record
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#10253A]">
              <div className="p-4 bg-[#F7F4EE] border border-[#0C2238]/08 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-[#627083]">OFFICIAL CGPA:</span>
                <span className="font-extrabold text-[#10253A]">8.92 / 10.00 (VERIFIED)</span>
              </div>
              <div className="p-4 bg-[#F7F4EE] border border-[#0C2238]/08 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-[#627083]">TOTAL ATTENDANCE:</span>
                <span className="font-extrabold text-[#159A72]">86.4% (REGISTERED)</span>
              </div>
              <div className="p-4 bg-[#F7F4EE] border border-[#0C2238]/08 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-[#627083]">GRADE CARD STATUS:</span>
                <span className="font-extrabold text-[#10253A]">SEMESTER IV SIGNED</span>
              </div>
            </div>

            <div className="pt-2 text-xs font-semibold text-[#159A72] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#159A72] shrink-0" />
              <span>Immutable institutional record synchronized from VIT Academic Controller Office.</span>
            </div>
          </motion.div>

          {/* Column 2: AI Advisory Insight Layer */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 bg-[#0C2238] text-white border border-[#C99632]/30 shadow-2xl space-y-6 rounded-3xl"
          >
            <div className="flex items-center space-x-3.5 border-b border-white/10 pb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#C99632]/20 border border-[#C99632]/40 text-[#E8C56B] flex items-center justify-center font-bold text-lg shadow-sm">
                <Sparkles className="w-6 h-6 text-[#E8C56B]" />
              </div>
              <div>
                <StatusBadge variant="AI_ADVISORY" label="ADVISORY INTELLIGENCE LAYER" />
                <h3 className="text-xl font-extrabold text-white font-display mt-1">
                  Contextual AI Insights & Guidance
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-xs text-white">
              <div className="p-4 bg-[#07182A] border border-[#C99632]/30 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-slate-300">RECOMMENDED ELECTIVE:</span>
                <span className="font-extrabold text-[#E8C56B]">CS-402 DEEP LEARNING</span>
              </div>
              <div className="p-4 bg-[#07182A] border border-[#C99632]/30 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-slate-300">SKILL GAP SUGGESTION:</span>
                <span className="font-extrabold text-[#E8C56B]">PYTORCH FRAMEWORKS</span>
              </div>
              <div className="p-4 bg-[#07182A] border border-[#C99632]/30 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-slate-300">ADVISORY NOTICE:</span>
                <span className="font-extrabold text-[#38BDF8]">NON-BINDING RECOMMENDATION</span>
              </div>
            </div>

            <div className="pt-2 text-xs font-semibold text-[#E8C56B] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#E8C56B] shrink-0" />
              <span>AI recommendations are advisory and do not alter official grades or institutional standing.</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

