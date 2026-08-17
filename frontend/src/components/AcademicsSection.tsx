import React, { useState } from 'react';
import { Cpu, Brain, ShieldAlert, Database, Bot, ArrowRight, BookOpen } from 'lucide-react';

export const AcademicsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BTech' | 'MTech' | 'PhD' | 'Integrated'>('BTech');

  const programs = [
    {
      id: 'ce',
      icon: Cpu,
      title: 'Computer Engineering',
      level: 'B.Tech / M.Tech',
      desc: 'Core algorithms, software architecture, high-performance computing, systems design, and full-stack engineering.',
      tag: 'FLAGSHIP',
    },
    {
      id: 'aiml',
      icon: Brain,
      title: 'AI & Machine Learning',
      level: 'B.Tech Specialization',
      desc: 'Deep neural networks, computer vision, natural language processing, generative AI models, and autonomous systems.',
      tag: 'HIGH DEMAND',
    },
    {
      id: 'cyber',
      icon: ShieldAlert,
      title: 'Cyber Security',
      level: 'B.Tech Specialization',
      desc: 'Network defense, ethical hacking, cryptographic protocols, cloud security architectures, and digital forensics.',
      tag: 'CRITICAL',
    },
    {
      id: 'data',
      icon: Database,
      title: 'Data & Computing',
      level: 'B.Tech / Research',
      desc: 'Big data analytics, distributed systems, cloud computing infrastructure, stream processing, and business intelligence.',
      tag: 'INNOVATION',
    },
    {
      id: 'robotics',
      icon: Bot,
      title: 'Robotics & IoT',
      level: 'B.Tech Specialization',
      desc: 'Embedded systems, microcontrollers, edge AI processing, sensor networks, and intelligent physical automation.',
      tag: 'FUTURE TECH',
    },
  ];

  return (
    <section id="academics" className="relative py-28 w-full bg-[#07111F]">
      {/* Background Atrium Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src="/campus/academics-bg.webp"
          alt="VIT Mumbai Atrium Interior"
          className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07111F] via-transparent to-[#07111F]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Eyebrow & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8C477] px-3.5 py-1.5 rounded-full bg-[#0B1A2F] border border-[#D6A84F]/30">
              ACADEMICS
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F5F2EA] tracking-tight font-display">
              Programs that <br />
              <span className="text-gold-gradient font-serif italic">Inspire</span>
            </h2>
          </div>
          <p className="text-sm text-[#F5F2EA]/75 font-light max-w-md leading-relaxed">
            Industry-aligned programs designed to build deep domain knowledge, practical engineering skills, and future-ready tech capabilities.
          </p>
        </div>

        {/* Program Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-[#D6A84F]/20 pb-4">
          {[
            { key: 'BTech', label: 'B.Tech Programs' },
            { key: 'MTech', label: 'M.Tech Programs' },
            { key: 'PhD', label: 'Ph.D. Programs' },
            { key: 'Integrated', label: 'Integrated Dual Degree' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-[#D6A84F] to-[#E8C477] text-[#07111F] shadow-lg shadow-[#D6A84F]/30'
                  : 'bg-[#0B1A2F]/80 text-[#F5F2EA]/70 border border-[#D6A84F]/20 hover:text-[#E8C477] hover:border-[#D6A84F]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className="glass-card-gold p-7 rounded-2xl border border-[#D6A84F]/25 hover:border-[#D6A84F]/60 transition-all duration-400 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0066B3]/20 border border-[#0066B3]/40 flex items-center justify-center text-[#1688D8] group-hover:bg-[#D6A84F]/20 group-hover:border-[#D6A84F]/50 group-hover:text-[#E8C477] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded bg-[#D6A84F]/15 text-[#E8C477] border border-[#D6A84F]/30">
                      {prog.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F5F2EA] mb-1 font-display group-hover:text-[#E8C477] transition-colors">
                    {prog.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#1688D8] mb-3">
                    {prog.level}
                  </div>
                  <p className="text-xs text-[#F5F2EA]/75 font-light leading-relaxed mb-6">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D6A84F]/15 flex items-center justify-between text-xs font-semibold text-[#E8C477] group-hover:text-[#F5F2EA] transition-colors">
                  <span>Curriculum Details</span>
                  <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Programs CTA */}
        <div className="mt-12 text-center">
          <a
            href="#cta"
            className="btn-gold-primary inline-flex items-center space-x-3 px-8 py-3.5 rounded-2xl text-xs font-extrabold shadow-xl cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#07111F]" />
            <span>View All Engineering Programs</span>
            <ArrowRight className="w-4 h-4 text-[#07111F]" />
          </a>
        </div>
      </div>
    </section>
  );
};
