import React from 'react';
import { Linkedin, Instagram, Youtube, Mail } from 'lucide-react';

interface ProductFooterProps {
  onSelectRole?: (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
}

export const ProductFooter: React.FC<ProductFooterProps> = ({ onSelectRole }) => {
  return (
    <footer className="bg-[#0C2238] text-white pt-16 pb-8 border-t border-[#C99632]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
        
        {/* Left Column Brand */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#07182A] border border-[#C99632]/40 flex items-center justify-center font-bold text-xs text-[#E8C56B] shadow-md">
              VIT
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-white">VIT MUMBAI</h3>
              <p className="text-xs text-[#E8C56B] font-bold uppercase tracking-wider">AI Student Development Platform</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
            Empowering Vidyalankar Institute of Technology students with context-aware AI academic guidance, career roadmaps, and verified faculty mentorship.
          </p>

          {/* Role Access Buttons */}
          {onSelectRole && (
            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => onSelectRole('STUDENT')}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#C99632] hover:text-white text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                Student Portal
              </button>
              <button
                onClick={() => onSelectRole('MENTOR')}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#C99632] hover:text-white text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                Faculty Portal
              </button>
              <button
                onClick={() => onSelectRole('ADMIN')}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#C99632] hover:text-white text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                Admin Portal
              </button>
            </div>
          )}
        </div>

        {/* Column 1: Platform */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#E8C56B] uppercase tracking-wider">Platform</h4>
          <ul className="space-y-2 text-xs text-slate-300 font-medium">
            <li><a href="#ai-assistant" className="hover:text-white transition-colors">AI Assistant</a></li>
            <li><a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a></li>
            <li><a href="#mentoring" className="hover:text-white transition-colors">Mentoring</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Opportunities</a></li>
            <li><a href="#rag" className="hover:text-white transition-colors">Resources</a></li>
          </ul>
        </div>

        {/* Column 2: Support */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#E8C56B] uppercase tracking-wider">Support</h4>
          <ul className="space-y-2 text-xs text-slate-300 font-medium">
            <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#feedback" className="hover:text-white transition-colors">Feedback</a></li>
            <li><a href="#report" className="hover:text-white transition-colors">Report an Issue</a></li>
          </ul>
        </div>

        {/* Column 3: Legal & Social */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#E8C56B] uppercase tracking-wider">Legal</h4>
            <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-[#E8C56B] uppercase tracking-wider">Stay Connected</h4>
            <div className="flex items-center space-x-4 text-slate-300">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#E8C56B] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#E8C56B] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#E8C56B] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="mailto:support@vit.edu.in" className="hover:text-[#E8C56B] transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex items-center justify-center text-xs text-slate-300 font-medium space-x-2">
        <span className="text-[#E8C56B]">🌾</span>
        <span>© 2026 Vidyalankar Institute of Technology (VIT Mumbai). All rights reserved.</span>
        <span className="text-[#E8C56B]">🌾</span>
      </div>
    </footer>
  );
};
