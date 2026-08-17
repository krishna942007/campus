import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';

export const VITKnowledgeRAG: React.FC = () => {
  const [activeQuery, setActiveQuery] = useState(0);

  const ragDocs = [
    {
      q: 'What is the attendance policy for end-semester examinations at VIT Wadala?',
      answer: 'According to VIT Autonomous Ordinance 2024 Section 5.1: Students must maintain a minimum of 75% attendance in every course (theory + lab) to be eligible for end-semester examinations.',
      doc: 'VIT Academic Ordinance 2024 (Doc ID: VIT-ORD-75)',
    },
    {
      q: 'How are honors credit courses allocated in Computer Engineering?',
      answer: 'Students with CGPA >= 7.50 and 0 active backlogs after Semester IV are eligible to register for 18-20 additional Honors credits in AI & Data Science starting Semester V.',
      doc: 'Computer Engineering Curriculum Handbook (Doc ID: CSE-HON-2026)',
    },
    {
      q: 'What are the capstone project submission deadlines?',
      answer: 'Phase I Capstone synopsis must be submitted by September 30. Interim evaluation is scheduled for November 15 with assigned faculty mentor review.',
      doc: 'Department Project Committee Guidelines (Doc ID: DPC-GUIDE-V)',
    },
  ];

  return (
    <section id="rag" className="relative py-24 w-full bg-[#F7F4EE] border-t border-[#0C2238]/08 z-10">
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
            <Sparkles className="w-3.5 h-3.5 text-[#C99632]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A6437]">
              VIT INSTITUTIONAL RAG KNOWLEDGE BASE
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#10253A] tracking-tight leading-[1.12] font-display">
            ASK VIT. <br />
            <span className="text-[#C99632] font-serif-accent italic font-normal">
              GET GROUNDED ANSWERS.
            </span>
          </h2>

          <p className="text-base font-normal text-[#627083] leading-relaxed">
            Grounded vector search over official VIT Wadala academic ordinances, examination rules, and department circulars.
          </p>
        </motion.div>

        {/* RAG Knowledge Box Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FFFCF7] border border-[#0C2238]/10 p-8 sm:p-12 shadow-2xl space-y-8 rounded-3xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0C2238]/08 pb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0C2238] text-white flex items-center justify-center font-bold text-lg shadow-md border border-[#C99632]/40">
                <Search className="w-6 h-6 text-[#E8C56B]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#10253A] font-display">VIT Grounded Ordinance RAG</h3>
                <span className="text-xs text-[#C99632] font-extrabold tracking-wide">OFFICIAL INSTITUTIONAL DOCUMENTS INDEXED</span>
              </div>
            </div>

            <StatusBadge variant="OFFICIAL" label="VECTOR EMBEDDING ACTIVE" />
          </div>

          <div className="space-y-4">
            {ragDocs.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveQuery(idx)}
                className={`p-6 border transition-all duration-200 cursor-pointer space-y-3 rounded-2xl shadow-sm ${
                  activeQuery === idx
                    ? 'bg-[#0C2238] text-white border-[#0C2238] shadow-xl'
                    : 'bg-[#F7F4EE]/80 text-[#10253A] border-[#0C2238]/10 hover:border-[#C99632]/40 hover:bg-[#F7F4EE]'
                }`}
              >
                <div className={`flex items-center justify-between text-xs font-extrabold ${
                  activeQuery === idx ? 'text-[#E8C56B]' : 'text-[#C99632]'
                }`}>
                  <span>QUERY 0{idx + 1}</span>
                  <span className={`text-xs ${activeQuery === idx ? 'text-slate-300' : 'text-[#627083]'}`}>{item.doc}</span>
                </div>
                <div className="text-base font-extrabold font-display leading-snug">
                  "{item.q}"
                </div>
                {activeQuery === idx && (
                  <p className="text-sm text-slate-200 font-normal leading-relaxed pt-3 border-t border-white/10">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

