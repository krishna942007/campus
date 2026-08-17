import React from 'react';

export const ComputerEngineeringSection: React.FC = () => {
  const tracks = [
    {
      code: '01',
      title: 'Systems & Algorithms',
      desc: 'High-performance computing, memory optimization, data structures, operating systems, and kernel programming.',
    },
    {
      code: '02',
      title: 'AI & Neural Systems',
      desc: 'Deep learning architectures, computer vision pipelines, natural language processing, and generative AI models.',
    },
    {
      code: '03',
      title: 'Cybersecurity & Forensics',
      desc: 'Network defense, cryptographic protocols, cloud security models, vulnerability assessment, and digital forensics.',
    },
    {
      code: '04',
      title: 'Cloud & Distributed Systems',
      desc: 'Microservices, containerization, stream processing, distributed databases, and cloud-native architecture.',
    },
  ];

  return (
    <section id="cse" className="relative py-32 w-full bg-[#07111F] border-t border-[#D6A84F]/15">
      {/* Background Subtle Tech Micro Grid */}
      <div className="absolute inset-0 bg-grid-gold opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
        {/* Editorial Headline Column */}
        <div className="max-w-3xl mb-20 space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-[#E8C477] uppercase">
            <span>COMPUTER ENGINEERING DEPARTMENT</span>
            <span>•</span>
            <span className="text-[#1688D8]">BUILD_TAG #2026</span>
          </div>

          <h2 className="text-6xl sm:text-7xl md:text-8xl font-black text-[#F5F2EA] font-display tracking-tight leading-[0.9]">
            BUILD. <br />
            BREAK. <br />
            <span className="font-serif-italic font-normal text-gold-gradient">
              REBUILD.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#F5F2EA]/80 font-light leading-relaxed max-w-xl">
            Computer Engineering at VIT Mumbai brings together systems, software, intelligence, and human creativity. We train engineers to design robust systems from silicon to the cloud.
          </p>
        </div>

        {/* Minimalist 4-Column Program Tracks Without Rounded Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#D6A84F]/20 pt-12">
          {tracks.map((track) => (
            <div key={track.code} className="space-y-3 group cursor-default">
              <div className="text-xs font-mono font-bold text-[#E8C477] tracking-wider">
                [{track.code}]
              </div>
              <h3 className="text-lg font-bold text-[#F5F2EA] font-display group-hover:text-[#E8C477] transition-colors">
                {track.title}
              </h3>
              <p className="text-xs text-[#F5F2EA]/70 font-light leading-relaxed">
                {track.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Technical Micro Telemetry */}
        <div className="mt-16 pt-8 border-t border-[#D6A84F]/10 flex flex-wrap items-center justify-between text-[9px] font-mono text-[#F5F2EA]/40 gap-4">
          <span>DEPT_CODE: CSE_VIT_WADALA</span>
          <span>CURRICULUM: AUTONOMOUS_V2.0</span>
          <span>ACCREDITATION: NAAC_A+ // NBA</span>
          <span>LOCATION: BLOCK_B_LEVEL_4</span>
        </div>
      </div>
    </section>
  );
};
