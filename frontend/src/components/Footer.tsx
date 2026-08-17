import React from 'react';
import { Linkedin, Youtube, Twitter, Github, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#D6A84F]/20 bg-[#07111F] py-14 px-6 md:px-12 text-[#F5F2EA]/75 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066B3] via-[#07111F] to-[#D6A84F] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#07111F] rounded-[10px] flex items-center justify-center border border-[#D6A84F]/30">
                <span className="font-extrabold text-xs text-[#E8C477]">VIT</span>
              </div>
            </div>
            <span className="text-xl font-extrabold text-[#F5F2EA] font-display">VIT Mumbai</span>
          </div>

          <p className="text-xs text-[#F5F2EA]/70 leading-relaxed max-w-sm">
            Department of Computer Engineering, Vidyalankar Institute of Technology, Wadala, Mumbai. Shaping world-class innovators and tech leaders.
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <a href="#" className="p-2 rounded-lg bg-[#0B1A2F] border border-[#D6A84F]/25 text-[#E8C477] hover:border-[#D6A84F]/60 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-[#0B1A2F] border border-[#D6A84F]/25 text-[#E8C477] hover:border-[#D6A84F]/60 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-[#0B1A2F] border border-[#D6A84F]/25 text-[#E8C477] hover:border-[#D6A84F]/60 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-[#0B1A2F] border border-[#D6A84F]/25 text-[#E8C477] hover:border-[#D6A84F]/60 transition-colors">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-[#E8C477] uppercase tracking-wider">Quick Navigation</h4>
          <ul className="space-y-2 font-medium">
            <li><a href="#home" className="hover:text-[#E8C477] transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-[#E8C477] transition-colors">About VIT</a></li>
            <li><a href="#academics" className="hover:text-[#E8C477] transition-colors">Academic Programs</a></li>
            <li><a href="#research" className="hover:text-[#E8C477] transition-colors">Research & Innovation</a></li>
            <li><a href="#campus-journey" className="hover:text-[#E8C477] transition-colors">Campus Walkthrough</a></li>
            <li><a href="#campus-life" className="hover:text-[#E8C477] transition-colors">Life @ VIT</a></li>
          </ul>
        </div>

        {/* Accreditation & Accreditation */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold text-[#E8C477] uppercase tracking-wider">Accreditation & Standards</h4>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-[#E8C477] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
              <span>NAAC A+ Accredited Institution</span>
            </li>
            <li>NBA Accredited Computer Engineering Program</li>
            <li>Affiliated with University of Mumbai</li>
            <li>Approved by AICTE, New Delhi</li>
          </ul>

          <div className="pt-2">
            <span className="text-[10px] text-[#1688D8] font-mono block">
              SYSTEM STATUS: 100% OPERATIONAL
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#D6A84F]/15 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#F5F2EA]/60 gap-4">
        <p>© 2026 VIT Mumbai (Vidyalankar Institute of Technology). All Rights Reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#E8C477]">Privacy Policy</a>
          <a href="#" className="hover:text-[#E8C477]">Terms of Service</a>
          <a href="#" className="hover:text-[#E8C477]">Mandatory Disclosure</a>
        </div>
      </div>
    </footer>
  );
};
