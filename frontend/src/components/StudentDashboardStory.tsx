import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, AlertCircle, Sparkles, MessageSquare, Compass, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';

export const StudentDashboardStory: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const studentQuestions = [
    {
      q: "HOW AM I PERFORMING ACADEMICALLY?",
      answer: "Current CGPA is 8.92 (Rank 4 in Computer Engineering Dept). Attendance across all 6 core subjects is 86.4%, comfortably above the 75% institutional requirement.",
      metric: "8.92 CGPA // 86.4% ATTENDANCE",
      status: "EXCELLENT",
    },
    {
      q: "WHERE ARE MY SKILL GAPS?",
      answer: "Strong in Python, Algorithms, and Data Structures. Target role (AI Engineer) requires additional proficiency in Deep Neural Networks (PyTorch) and Distributed System Design.",
      metric: "GAP DETECTED: PYTORCH & CUDA",
      status: "ADVISORY ACTION",
    },
    {
      q: "WHAT HAS MY MENTOR SAID?",
      answer: "Faculty Mentor Prof. S. Kulkarni logged meeting outcome: 'Strong academic performance. Recommended focusing on final year capstone AI research paper submission for IEEE.'",
      metric: "MEETING LOGGED 12-AUG-2026",
      status: "MENTOR SIGN-OFF",
    },
    {
      q: "WHAT SHOULD I DO NEXT?",
      answer: "Complete Module 3 of Deep Learning Specialization and publish GitHub repository for Autonomous Computer Vision project before next mentor check-in.",
      metric: "RECOMMENDED ACTION ITEM",
      status: "NEXT STEP",
    },
  ];

  return (
    <section id="dashboard" className="relative py-24 w-full bg-[#F7F4EE] border-t border-[#0C2238]/08 z-10">
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
              PERSONALIZED STUDENT DASHBOARD
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#10253A] tracking-tight leading-[1.12] font-display">
            UNDERSTAND YOUR <br />
            <span className="text-[#C99632] font-serif-accent italic font-normal">
              ENTIRE JOURNEY.
            </span>
          </h2>

          <p className="text-base font-normal text-[#627083] leading-relaxed">
            The student dashboard translates academic data, attendance logs, skill profiles, and mentor feedback into clear, actionable answers.
          </p>
        </motion.div>

        {/* Question Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {studentQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => setActiveQuestion(idx)}
              className={`p-5 text-left border rounded-2xl transition-all duration-200 cursor-pointer ${
                activeQuestion === idx
                  ? 'bg-[#0C2238] text-white border-[#0C2238] shadow-xl -translate-y-1'
                  : 'bg-[#FFFCF7] text-[#10253A] border-[#0C2238]/10 hover:border-[#C99632]/40 hover:bg-[#F7F4EE]'
              }`}
            >
              <div className={`text-[10px] font-extrabold tracking-wider uppercase mb-1.5 ${
                activeQuestion === idx ? 'text-[#E8C56B]' : 'text-[#C99632]'
              }`}>
                QUESTION 0{idx + 1}
              </div>
              <div className="text-xs font-extrabold font-display leading-snug">
                {sq.q}
              </div>
            </button>
          ))}
        </div>

        {/* Conceptual Dashboard Card with Smooth Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FFFCF7] border border-[#0C2238]/10 shadow-2xl p-8 sm:p-12 space-y-8 rounded-3xl"
        >
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0C2238]/08 pb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0C2238] text-white flex items-center justify-center font-bold text-lg shadow-md border border-[#C99632]/40">
                <User className="w-6 h-6 text-[#E8C56B]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#10253A] font-display">
                  Krishna Singh
                </h3>
                <span className="text-xs text-[#C99632] font-extrabold tracking-wide">
                  B.Tech Computer Engineering (Batch 2023-2027) • ID: 2023CSE001
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <StatusBadge variant="OFFICIAL" label="OFFICIAL ERP VERIFIED" />
            </div>
          </div>

          {/* Active Question Highlight Display */}
          <div className="p-8 bg-[#0C2238] text-white border border-[#C99632]/30 space-y-4 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[#E8C56B]">ACTIVE INTELLIGENCE QUERY</span>
              <span className="text-emerald-400">{studentQuestions[activeQuestion].status}</span>
            </div>
            <h4 className="text-2xl font-extrabold text-white font-display">
              "{studentQuestions[activeQuestion].q}"
            </h4>
            <p className="text-sm text-slate-200 font-normal leading-relaxed">
              {studentQuestions[activeQuestion].answer}
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#E8C56B]">
              <span>SIGNAL METRIC:</span>
              <span className="font-extrabold text-white">{studentQuestions[activeQuestion].metric}</span>
            </div>
          </div>

          {/* Student Profile Quick Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 bg-[#F7F4EE]/80 border border-[#0C2238]/08 space-y-2 rounded-2xl">
              <span className="text-[10px] font-extrabold text-[#C99632] tracking-wider uppercase">ACADEMIC CGPA</span>
              <div className="text-3xl font-extrabold text-[#10253A] font-display">8.92 / 10</div>
              <span className="text-xs text-[#627083] font-medium">No active backlogs • First Class Distinction</span>
            </div>

            <div className="p-6 bg-[#F7F4EE]/80 border border-[#0C2238]/08 space-y-2 rounded-2xl">
              <span className="text-[10px] font-extrabold text-[#C99632] tracking-wider uppercase">ATTENDANCE LOG</span>
              <div className="text-3xl font-extrabold text-[#159A72] font-display">86.4%</div>
              <span className="text-xs text-[#627083] font-medium">Above 75% institutional requirement</span>
            </div>

            <div className="p-6 bg-[#F7F4EE]/80 border border-[#0C2238]/08 space-y-2 rounded-2xl">
              <span className="text-[10px] font-extrabold text-[#C99632] tracking-wider uppercase">ASSIGNED FACULTY MENTOR</span>
              <div className="text-base font-extrabold text-[#10253A] font-display">Prof. S. Kulkarni</div>
              <span className="text-xs text-[#627083] font-medium">Department of Computer Engineering</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
