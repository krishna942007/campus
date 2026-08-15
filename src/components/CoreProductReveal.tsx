import React from 'react';
import { BookOpen, CheckCircle, Code2, Award, Target, Users, Sparkles } from 'lucide-react';

export const CoreProductReveal: React.FC = () => {
  return (
    <section id="platform" className="relative py-32 w-full bg-transparent border-t border-white/10 z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Headline */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="text-xs font-bold tracking-wider uppercase text-amber-300 px-4 py-2 rounded-full bg-[#07111F]/80 border border-amber-400/30 backdrop-blur-xl inline-block shadow-lg">
            THE PLATFORM ARCHITECTURE
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white font-display tracking-tight leading-[0.95] drop-shadow-2xl">
            EVERYTHING THAT <br />
            <span className="text-gold-gradient font-black">
              DEFINES YOUR PROGRESS.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed bg-[#07111F]/80 p-6 rounded-2xl border border-white/15 backdrop-blur-xl shadow-2xl">
            One connected student profile bringing together academics, attendance, skills, projects, certifications, goals, and mentoring — with AI-assisted guidance built around your journey.
          </p>
        </div>

        {/* 7 Pillars Asymmetric Editorial Layout — MODERN GLASS CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Pillar 1 & 2: Academics & Attendance Region */}
          <div className="lg:col-span-7 space-y-8">
            {/* Academics Region */}
            <div className="p-8 sm:p-10 bg-[#07111F]/85 backdrop-blur-xl border border-white/15 shadow-2xl text-white rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center font-bold border border-amber-400/30">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-300 tracking-wider block uppercase">
                      PILLAR 01 // AUTONOMOUS ACADEMICS
                    </span>
                    <h3 className="text-xl font-extrabold text-white font-display">
                      Academic Monitoring & Course Credits
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full">
                  CGPA 9.2 / 10
                </span>
              </div>

              <p className="text-sm text-slate-200 font-normal leading-relaxed">
                Direct synchronization with VIT official academic ERP/MIS. Real-time visibility into internal assessments, mid-term evaluations, lab assignments, and autonomous SGPA/CGPA trends.
              </p>

              {/* Course Progress Snippet */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-xs font-semibold text-amber-300 block uppercase">SEMESTER V</span>
                  <span className="text-sm font-bold text-white">6 Core Courses</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-300 block uppercase">CREDITS EARNED</span>
                  <span className="text-sm font-bold text-white">118 / 160 Total</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-300 block uppercase">BACKLOG STATUS</span>
                  <span className="text-sm font-bold text-emerald-400">0 Active</span>
                </div>
              </div>
            </div>

            {/* Pillar 3 & 4: Skills & Projects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Pillar 3: Skills Typography Flow */}
              <div className="p-7 bg-[#07111F]/85 backdrop-blur-xl border border-white/15 rounded-2xl space-y-4 shadow-2xl">
                <span className="text-xs font-bold text-amber-300 tracking-wider block uppercase">
                  PILLAR 02 // SKILLS PROFILE
                </span>
                <h4 className="text-lg font-bold text-white font-display">Verified Competencies</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Python', 'PyTorch', 'React.js', 'PostgreSQL', 'Docker', 'System Design', 'FastAPI', 'Git'].map((skill) => (
                    <span key={skill} className="text-xs px-3 py-1.5 bg-white/10 text-amber-300 border border-white/15 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pillar 4: Projects Evidence */}
              <div className="p-7 bg-[#07111F]/85 backdrop-blur-xl text-white border border-white/15 rounded-2xl space-y-4 shadow-2xl">
                <span className="text-xs font-bold text-amber-300 tracking-wider block uppercase">
                  PILLAR 03 // PROJECT EVIDENCE
                </span>
                <h4 className="text-lg font-bold text-white font-display">Verified Artifacts</h4>
                <div className="space-y-3 text-xs text-slate-200">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-medium">Autonomous AI Navigation</span>
                    <span className="text-xs font-bold text-amber-400">GITHUB</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-medium">RAG Document Q&A Engine</span>
                    <span className="text-xs font-bold text-emerald-400">LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 5, 6 & 7: Attendance, Goals & Mentoring */}
          <div className="lg:col-span-5 space-y-8">
            {/* Pillar 5: Attendance Metric Bar */}
            <div className="p-8 bg-[#07111F]/85 backdrop-blur-xl border border-white/15 shadow-2xl text-white rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 tracking-wider uppercase">
                  PILLAR 04 // ATTENDANCE MONITORING
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 border border-emerald-500/30 rounded-full">
                  88.5% ATTENDANCE
                </span>
              </div>
              <h4 className="text-xl font-bold text-white font-display">
                Institutional Minimum Met (75% Threshold)
              </h4>
              <div className="w-full h-2.5 bg-white/10 overflow-hidden border border-white/20 rounded-full">
                <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 w-[88.5%]" />
              </div>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Continuous tracking across lectures and lab practicals synchronized from official attendance registers.
              </p>
            </div>

            {/* Pillar 6: Mentoring Relationship */}
            <div className="p-8 bg-[#07111F]/85 backdrop-blur-xl text-white border border-white/15 rounded-2xl space-y-4 shadow-2xl">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 tracking-wider uppercase">
                <Users className="w-4 h-4 text-amber-400" />
                <span>PILLAR 05 // FACULTY MENTORING</span>
              </div>
              <h4 className="text-xl font-bold text-white font-display">
                Assigned Mentorship & Guidance
              </h4>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Evidence-based mentor visibility. Faculty mentors review student performance trends, log meeting feedback, set action items, and track attention indicators.
              </p>
              <div className="pt-3 text-xs font-semibold text-amber-300 border-t border-white/10 flex items-center justify-between">
                <span>ASSIGNED MENTOR: DR. S. KULKARNI</span>
                <span className="text-emerald-400 font-bold">LOGGED</span>
              </div>
            </div>

            {/* Pillar 7: AI Advisory Layer */}
            <div className="p-7 bg-[#07111F]/85 backdrop-blur-xl border border-white/15 rounded-2xl space-y-3 shadow-2xl">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>PILLAR 06 // AI ADVISORY LAYER</span>
              </div>
              <h4 className="text-lg font-bold text-white font-display">
                Context-Aware Intelligence
              </h4>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                AI analyzes permitted student profile context to recommend custom learning roadmaps and skill-gap suggestions. AI outputs are advisory and never replace official VIT academic records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

