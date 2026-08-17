import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Cpu, ShieldCheck, Trophy, Rocket } from 'lucide-react';

export const CampusShowcase: React.FC = () => {
  const highlights = [
    {
      icon: Cpu,
      title: 'Autonomous AI & Neural Labs',
      desc: 'State-of-the-art Wadala research facility equipped with high-throughput GPUs, pgvector clusters, and real-time model deployment sandbox.',
      badge: 'VIT Wadala Campus',
    },
    {
      icon: Rocket,
      title: 'Wadala Innovation Incubator',
      desc: 'Pre-seed funding, mentor acceleration, and patent filing support for student-led startups and AI capstone projects.',
      badge: 'Rs 50L+ Seed Grants',
    },
    {
      icon: Trophy,
      title: '98.4% Top-Tier Placements',
      desc: 'Direct campus recruitment by global AI leaders, product companies, and research labs with personalized AI career match score.',
      badge: 'Career Ecosystem',
    },
    {
      icon: ShieldCheck,
      title: 'DPDP Act & ISO Compliant',
      desc: 'Enterprise-grade encryption in transit and at rest, ensuring complete privacy protection for student records and mentor logs.',
      badge: 'Institutional Trust',
    },
  ];

  return (
    <section id="campus" className="py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D1B2A]/10 border border-[#3D5A80]/30 text-[#0D1B2A] text-xs font-bold uppercase tracking-wider shadow-sm">
          <GraduationCap className="w-3.5 h-3.5 text-[#3D5A80]" />
          <span>Vidyalankar Institute of Technology</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D1B2A] tracking-tight">
          Where Academic Excellence Meets Next-Gen Tech
        </h2>
        <p className="text-[#3D5A80] text-base md:text-lg font-medium">
          An autonomous institute in Wadala, Mumbai committed to empowering students with evidence-based AI mentorship and industry leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="glass-card p-6 rounded-3xl border border-[#3D5A80]/20 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0D1B2A] flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6 text-[#F2EFE7]" />
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#3D5A80]/15 text-[#3D5A80] border border-[#3D5A80]/30">
                  {item.badge}
                </span>
                <h3 className="text-lg font-bold text-[#0D1B2A] leading-snug">{item.title}</h3>
                <p className="text-xs text-[#4B6B7C] leading-relaxed font-medium">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
