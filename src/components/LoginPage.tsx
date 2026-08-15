import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  UserCheck,
  ShieldCheck,
  ArrowLeft,
  Lock,
  Mail,
  Sparkles,
  ArrowRight,
  Shield,
  Key,
  CheckCircle2
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
  onBackToLanding: () => void;
  initialRole?: 'STUDENT' | 'MENTOR' | 'ADMIN';
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onBackToLanding,
  initialRole = 'STUDENT'
}) => {
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'MENTOR' | 'ADMIN'>(initialRole);
  
  // Input fields for demo
  const [emailInput, setEmailInput] = useState(() => {
    if (initialRole === 'MENTOR') return 's.kulkarni@vit.edu.in';
    if (initialRole === 'ADMIN') return 'admin@vit.edu.in';
    return '2023CSE001';
  });
  const [passwordInput, setPasswordInput] = useState('password123');

  const handleRoleTabChange = (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => {
    setSelectedRole(role);
    if (role === 'STUDENT') {
      setEmailInput('2023CSE001');
    } else if (role === 'MENTOR') {
      setEmailInput('s.kulkarni@vit.edu.in');
    } else {
      setEmailInput('admin@vit.edu.in');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#10253A] font-sans antialiased flex flex-col justify-between p-4 md:p-8">
      
      {/* Top Header Bar */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between py-4 border-b border-[#0C2238]/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#0C2238] text-white flex items-center justify-center font-bold text-xs shadow-md border border-[#C99632]/40">
            <span className="text-[#E8C56B]">VIT</span>
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-[#10253A] tracking-tight">VIT MUMBAI</h1>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#C99632]">
              UNIFIED AUTHENTICATION GATEWAY
            </p>
          </div>
        </div>

        <button
          onClick={onBackToLanding}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#FFFCF7] hover:bg-[#EFE7D8] text-[#10253A] text-xs font-bold border border-[#0C2238]/10 shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#0C2238]" />
          <span>Back to Portal Overview</span>
        </button>
      </header>

      {/* Main Login Card Container */}
      <main className="max-w-2xl mx-auto w-full my-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-[#0C2238]/10 shadow-2xl space-y-8 relative overflow-hidden"
        >
          
          {/* Card Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EFE7D8] border border-[#C99632]/25">
              <span className="w-2 h-2 rounded-full bg-[#C99632]" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A6437]">
                SELECT INSTITUTIONAL ROLE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10253A] font-display">
              Sign In to VIT Mumbai Platform
            </h2>
            <p className="text-xs text-[#627083]">
              Select your role below to access your personalized command center.
            </p>
          </div>

          {/* 3 Role Selection Cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                id: 'STUDENT',
                title: 'Student',
                desc: 'Academics & AI Growth',
                icon: GraduationCap,
              },
              {
                id: 'MENTOR',
                title: 'Faculty / Mentor',
                desc: 'Mentees & Courses',
                icon: UserCheck,
              },
              {
                id: 'ADMIN',
                title: 'Admin',
                desc: 'System & Analytics',
                icon: ShieldCheck,
              },
            ].map((roleObj) => {
              const IconComp = roleObj.icon;
              const isSelected = selectedRole === roleObj.id;
              return (
                <button
                  key={roleObj.id}
                  type="button"
                  onClick={() => handleRoleTabChange(roleObj.id as any)}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0C2238] text-white border-[#0C2238] shadow-lg -translate-y-1 scale-[1.02]'
                      : 'bg-[#F7F4EE]/80 text-[#10253A] border-[#0C2238]/10 hover:bg-[#EFE7D8]/80 hover:border-[#C99632]/40'
                  }`}
                >
                  <IconComp className={`w-5 h-5 ${isSelected ? 'text-[#E8C56B]' : 'text-[#0C2238]'}`} />
                  <div>
                    <p className="font-extrabold text-xs leading-tight">{roleObj.title}</p>
                    <p className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-[#627083]'}`}>{roleObj.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Role Description Banner */}
          <div className="p-4 rounded-2xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#C49A52]" />
              <span className="font-extrabold text-[#102A43]">
                {selectedRole === 'STUDENT' && 'Student Portal Access'}
                {selectedRole === 'MENTOR' && 'Faculty Mentoring Portal Access'}
                {selectedRole === 'ADMIN' && 'Developer & Admin Console Access'}
              </span>
            </div>
            <p className="text-[11px] text-[#5A6E7F] leading-relaxed">
              {selectedRole === 'STUDENT' && 'Access your academic performance trends, CGPA history, attendance monitor, and AI career roadmap.'}
              {selectedRole === 'MENTOR' && 'Access assigned mentee roster, attendance warning alerts, 1-on-1 meeting logs, and AI mentor advisory.'}
              {selectedRole === 'ADMIN' && 'Access central system health telemetry, user accounts management, RBAC matrix, and RAG vector store indexer.'}
            </p>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input 1: Identity / ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#102A43]">
                {selectedRole === 'STUDENT' && 'Student Roll Number or Institutional Email:'}
                {selectedRole === 'MENTOR' && 'Faculty ID or Institutional Email:'}
                {selectedRole === 'ADMIN' && 'Admin ID or System Root Email:'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#5A6E7F] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs font-semibold text-[#102A43] focus:outline-none focus:border-[#123B63]"
                  required
                />
              </div>
            </div>

            {/* Input 2: Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#102A43]">Password:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#5A6E7F] absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs font-semibold text-[#102A43] focus:outline-none focus:border-[#123B63]"
                  required
                />
              </div>
            </div>

            {/* Quick Demo Sign In Preset Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onLogin(selectedRole)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#E9DDC9] hover:bg-[#E2D7C6] text-[#102A43] font-bold text-xs border border-[#E2D7C6] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                <span>
                  {selectedRole === 'STUDENT' && '⚡ 1-Click Sign In as Krishna Singh (Student)'}
                  {selectedRole === 'MENTOR' && '⚡ 1-Click Sign In as Prof. S. Kulkarni (Faculty)'}
                  {selectedRole === 'ADMIN' && '⚡ 1-Click Sign In as Institutional Admin'}
                </span>
              </button>
            </div>

            {/* Submit Action Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>
                  {selectedRole === 'STUDENT' && 'Sign In to Student Dashboard'}
                  {selectedRole === 'MENTOR' && 'Sign In to Faculty Mentoring Console'}
                  {selectedRole === 'ADMIN' && 'Sign In to Institutional Admin Console'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#F5C056]" />
              </button>
            </div>

          </form>

        </motion.div>
      </main>

      {/* Footer copyright */}
      <footer className="max-w-5xl mx-auto w-full text-center text-xs text-[#5A6E7F] py-4 border-t border-[#E2D7C6]">
        🌾 © 2026 VIT Mumbai. Autonomous AI Student Development & Mentoring Platform. All rights reserved. 🌾
      </footer>

    </div>
  );
};
