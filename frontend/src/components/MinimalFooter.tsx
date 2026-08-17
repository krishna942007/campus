import React from 'react';

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#D6A84F]/20 bg-[#07111F] py-20 px-6 sm:px-12 text-[#F5F2EA]/75">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Left Column: Brand & Editorial Statement */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D6A84F]" />
            <span className="text-2xl font-black text-[#F5F2EA] font-display uppercase tracking-wider">
              VIT MUMBAI
            </span>
          </div>

          <p className="text-lg text-[#E8C477] font-serif-italic max-w-md">
            "Where curiosity becomes engineering."
          </p>

          <p className="text-xs text-[#F5F2EA]/70 max-w-md leading-relaxed font-light">
            Department of Computer Engineering, Vidyalankar Institute of Technology, Wadala, Mumbai 400037. NAAC A+ Accredited Institution.
          </p>
        </div>

        {/* Right Column: Navigation & Contact */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-8 text-xs">
          <div className="space-y-3">
            <div className="text-[10px] font-mono tracking-widest text-[#E8C477] uppercase">
              SECTIONS
            </div>
            <ul className="space-y-2 font-medium">
              <li><a href="#hero" className="hover:text-[#E8C477] transition-colors">01 // ENTER VIT</a></li>
              <li><a href="#journey" className="hover:text-[#E8C477] transition-colors">02 // THE JOURNEY</a></li>
              <li><a href="#architecture" className="hover:text-[#E8C477] transition-colors">03 // ARCHITECTURE</a></li>
              <li><a href="#cse" className="hover:text-[#E8C477] transition-colors">04 // COMPUTER ENG</a></li>
              <li><a href="#research" className="hover:text-[#E8C477] transition-colors">05 // AI & RESEARCH</a></li>
              <li><a href="#life" className="hover:text-[#E8C477] transition-colors">06 // LIFE @ VIT</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[10px] font-mono tracking-widest text-[#E8C477] uppercase">
              ADMISSIONS & CONTACT
            </div>
            <div className="space-y-2 text-[#F5F2EA]/80 font-light">
              <p>Phone: +91 22 6776 5000</p>
              <p>Email: admissions@vit.edu.in</p>
              <p>Web: www.vit.edu.in</p>
              <p>Wadala Campus, Mumbai, MH, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Line */}
      <div className="max-w-7xl mx-auto border-t border-[#D6A84F]/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-[#F5F2EA]/50 gap-4">
        <span>© 2026 VIT MUMBAI • ALL RIGHTS RESERVED</span>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#E8C477]">PRIVACY POLICY</a>
          <a href="#" className="hover:text-[#E8C477]">TERMS OF USE</a>
          <a href="#" className="hover:text-[#E8C477]">MANDATORY DISCLOSURE</a>
        </div>
      </div>
    </footer>
  );
};
