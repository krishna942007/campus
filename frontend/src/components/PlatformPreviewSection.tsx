import React, { useState } from 'react';
import { 
  CheckCircle2, ArrowRight, LayoutDashboard, Bot, Compass, UserCheck, 
  BookOpen, Briefcase, HeartHandshake, FolderOpen, Calendar, Settings,
  Bell, Sparkles, ChevronRight, Check
} from 'lucide-react';

export const PlatformPreviewSection: React.FC = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState('Dashboard');
  const [rotatePos, setRotatePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotatePos({
      x: -y / 140, // max ~2-3 deg
      y: x / 140
    });
  };

  const handleMouseLeave = () => {
    setRotatePos({ x: 0, y: 0 });
  };

  return (
    <section id="preview" className="py-20 bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Information */}
        <div className="lg:col-span-5 space-y-7">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EFE7D8] border border-[#C99632]/25">
            <span className="w-2 h-2 rounded-full bg-[#C99632]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A6437]">
              ALL YOU NEED, ALL IN ONE PLACE
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#10253A] tracking-tight leading-[1.15] font-display">
            Designed Around You.<br />
            <span className="text-[#C99632] font-serif-accent italic font-normal">Built for Your Success.</span>
          </h2>

          {/* Benefits Bullet List */}
          <div className="space-y-4 pt-2">
            {[
              'AI Assistant that understands your academic trajectory',
              'Smart online courses recommended for your goals',
              'Stay on track with milestones and MS Teams deadlines',
              'Never miss placement capstones & mentoring opportunities'
            ].map((text, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-5.5 h-5.5 rounded-full bg-[#0C2238] flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3.5 h-3.5 text-[#E8C56B] stroke-[3]" />
                </div>
                <span className="text-sm font-bold text-[#10253A] leading-snug">{text}</span>
              </div>
            ))}
          </div>

          {/* Discover More Button */}
          <div className="pt-4">
            <a
              href="#dashboard"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-[#FFFCF7] hover:bg-[#EFE7D8] text-[#10253A] font-bold text-xs border border-[#0C2238]/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Discover Dashboard Capabilities</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C99632]" />
            </a>
          </div>
        </div>

        {/* Right Side Dashboard Showcase Card with Subtle 3D Tilt */}
        <div className="lg:col-span-7 perspective-1000">
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotatePos.x}deg) rotateY(${rotatePos.y}deg)`,
              transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="bg-[#FFFCF7] rounded-3xl border border-[#0C2238]/10 shadow-2xl overflow-hidden grid grid-cols-12 min-h-[500px]"
          >
            
            {/* Left Navy Sidebar matching screenshot */}
            <div className="col-span-3 bg-[#0C2340] text-white p-4 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Shield Logo */}
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs text-[#F5C056]">
                  VIT
                </div>

                {/* Sidebar Links */}
                <nav className="space-y-1 text-xs">
                  <button 
                    onClick={() => setActiveSidebarItem('Dashboard')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                      activeSidebarItem === 'Dashboard' ? 'bg-white/15 text-white font-bold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </button>

                  <button 
                    onClick={() => setActiveSidebarItem('AI Assistant')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                      activeSidebarItem === 'AI Assistant' ? 'bg-white/15 text-white font-bold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5 text-[#F5C056]" />
                    <span className="hidden sm:inline">AI Assistant</span>
                  </button>

                  <button 
                    onClick={() => setActiveSidebarItem('Roadmap')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                      activeSidebarItem === 'Roadmap' ? 'bg-white/15 text-white font-bold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Roadmap</span>
                  </button>

                  <button 
                    onClick={() => setActiveSidebarItem('Mentoring')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                      activeSidebarItem === 'Mentoring' ? 'bg-white/15 text-white font-bold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mentoring</span>
                  </button>

                  <button 
                    onClick={() => setActiveSidebarItem('Academics')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                      activeSidebarItem === 'Academics' ? 'bg-white/15 text-white font-bold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Academics</span>
                  </button>

                  <button 
                    onClick={() => setActiveSidebarItem('Opportunities')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                      activeSidebarItem === 'Opportunities' ? 'bg-white/15 text-white font-bold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Opportunities</span>
                  </button>

                  <button 
                    onClick={() => setActiveSidebarItem('Well-being')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                      activeSidebarItem === 'Well-being' ? 'bg-white/15 text-white font-bold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Well-being</span>
                  </button>

                  <button 
                    onClick={() => setActiveSidebarItem('Resources')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                      activeSidebarItem === 'Resources' ? 'bg-white/15 text-white font-bold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Resources</span>
                  </button>

                  <button 
                    onClick={() => setActiveSidebarItem('Calendar')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                      activeSidebarItem === 'Calendar' ? 'bg-white/15 text-white font-bold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Calendar</span>
                  </button>

                  <button 
                    onClick={() => setActiveSidebarItem('Settings')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                      activeSidebarItem === 'Settings' ? 'bg-white/15 text-white font-bold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Settings</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area matching screenshot */}
            <div className="col-span-9 p-5 bg-[#FAF9F5] space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F2537] flex items-center space-x-1.5">
                    <span>Welcome back, Krishna!</span>
                    <span>👋</span>
                  </h3>
                  <p className="text-[11px] text-[#64748B]">Let's make today productive.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#EAE2D5] text-slate-600">
                    <Bell className="w-4 h-4" />
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Krishna Profile"
                    className="w-8 h-8 rounded-full object-cover border border-[#EAE2D5]"
                  />
                </div>
              </div>

              {/* 4 Stat Boxes matching screenshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-2xl border border-[#EAE2D5]">
                  <p className="text-[10px] text-[#64748B] font-medium">Courses</p>
                  <p className="text-xl font-bold text-[#0F2537]">06</p>
                  <p className="text-[9px] text-[#64748B]">Active Courses</p>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-[#EAE2D5]">
                  <p className="text-[10px] text-[#64748B] font-medium">Tasks</p>
                  <p className="text-xl font-bold text-[#0F2537]">12</p>
                  <p className="text-[9px] text-[#64748B]">Pending Tasks</p>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-[#EAE2D5]">
                  <p className="text-[10px] text-[#64748B] font-medium">Progress</p>
                  <p className="text-xl font-bold text-[#B58A3C]">75%</p>
                  <p className="text-[9px] text-[#64748B]">This Semester</p>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-[#EAE2D5]">
                  <p className="text-[10px] text-[#64748B] font-medium">Opportunities</p>
                  <p className="text-xl font-bold text-[#B58A3C]">08</p>
                  <p className="text-[9px] text-[#64748B]">New Matches</p>
                </div>
              </div>

              {/* Your Progress Timeline Bar matching screenshot */}
              <div className="bg-white p-4 rounded-2xl border border-[#EAE2D5] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F2537]">Your Progress</span>
                  <span className="text-[10px] font-semibold text-[#64748B]">67% Completed</span>
                </div>

                {/* Progress bar line */}
                <div className="relative w-full h-1.5 bg-[#E2D9C8] rounded-full my-2">
                  <div className="absolute top-0 left-0 h-full bg-[#0C2340] rounded-full w-[67%]" />
                  <div className="absolute top-1/2 left-[67%] -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0C2340] rounded-full border-2 border-white" />
                </div>

                {/* 4 Steps matching screenshot */}
                <div className="grid grid-cols-4 text-center gap-1 pt-1">
                  <div>
                    <p className="text-[11px] font-bold text-[#0F2537]">Learn</p>
                    <p className="text-[9px] text-[#64748B]">Core Concepts</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#0F2537]">Practice</p>
                    <p className="text-[9px] text-[#64748B]">Hands-on Projects</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#0F2537]">Build</p>
                    <p className="text-[9px] text-[#64748B]">Real-world Skills</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#0F2537]">Grow</p>
                    <p className="text-[9px] text-[#64748B]">Career Ready</p>
                  </div>
                </div>
              </div>

              {/* Bottom 2 Action Cards matching screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-[#EAE2D5] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-[#64748B]">Upcoming Event</span>
                    <h5 className="text-xs font-bold text-[#0F2537]">Tech Talk: AI in Future</h5>
                    <p className="text-[10px] text-[#64748B]">18 May 2024 • 11:00 AM</p>
                    <a href="#register" className="inline-flex items-center space-x-1 text-[10px] font-bold text-[#2563EB] pt-1">
                      <span>Register Now</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#D97706] shrink-0">
                    <Calendar className="w-5 h-5 text-[#D97706]" />
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-[#EAE2D5] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-[#64748B]">AI Recommendation</span>
                    <h5 className="text-xs font-bold text-[#0F2537]">Focus on Data Structures</h5>
                    <p className="text-[10px] text-[#64748B]">Based on your progress</p>
                    <a href="#explore" className="inline-flex items-center space-x-1 text-[10px] font-bold text-[#2563EB] pt-1">
                      <span>Explore Now</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                    <Sparkles className="w-5 h-5 text-[#2563EB]" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
