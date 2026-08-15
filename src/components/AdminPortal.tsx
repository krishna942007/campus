import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Shield,
  FileText,
  Database,
  Cpu,
  Activity,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  Settings,
  LogOut,
  Bell,
  Lock,
  Eye,
  Key,
  Layers,
  Server,
  Link,
  ShieldCheck,
  FolderTree,
  UserCheck,
  RotateCw,
  X,
  ChevronRight,
  ExternalLink,
  Download,
  Trash2,
  Edit,
  Sliders,
  Check,
  GraduationCap,
  Send
} from 'lucide-react';

import { ToastNotification, ToastMessage } from './ToastNotification';

interface AdminPortalProps {
  onBackToLanding: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToLanding }) => {
  const [activeNav, setActiveNav] = useState<
    | 'Overview'
    | 'Users'
    | 'Students'
    | 'Faculty / Mentors'
    | 'Roles & Permissions'
    | 'Departments'
    | 'Programs'
    | 'Academic Structure'
    | 'Mentor Assignments'
    | 'AI Configuration'
    | 'Knowledge Base'
    | 'RAG Documents'
    | 'ERP / Data Sources'
    | 'Integration Health'
    | 'Audit Logs'
    | 'Security'
    | 'System Activity'
    | 'Settings'
    | 'System Health'
  >('Overview');

  // Website Theme Toast Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState<any | null>(null);

  // RAG Documents List
  const [documents, setDocuments] = useState([
    { id: 1, name: 'VIT Academic Regulations 2026', category: 'Academic Policy', version: 'v2.1', size: '2.4 MB', vectors: 48, status: 'Indexed', date: 'Aug 01, 2026' },
    { id: 2, name: 'VIT Autonomous Exam Rules', category: 'Examination Policy', version: 'v1.4', size: '1.8 MB', vectors: 36, status: 'Indexed', date: 'Aug 05, 2026' },
    { id: 3, name: 'CSE Department Syllabus 2026', category: 'Curriculum', version: 'v3.0', size: '4.1 MB', vectors: 92, status: 'Indexed', date: 'Aug 09, 2026' },
    { id: 4, name: 'Faculty Mentoring Guidelines & Rubrics', category: 'Mentoring Standard', version: 'v1.2', size: '3.2 MB', vectors: 64, status: 'Indexed', date: 'Aug 10, 2026' },
  ]);

  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Academic Policy');
  const [isUploading, setIsUploading] = useState(false);

  // Users Roster
  const [userSearch, setUserSearch] = useState('');
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Krishna Singh', role: 'Student', dept: 'Computer Engineering', status: 'Active', lastActive: 'Today', email: 'krishna.s@vit.edu.in' },
    { id: 2, name: 'Prof. S. Kulkarni', role: 'Faculty / Mentor', dept: 'AI & Data Science', status: 'Active', lastActive: 'Today', email: 's.kulkarni@vit.edu.in' },
    { id: 3, name: 'Dr. R. Mehta', role: 'Department Admin', dept: 'Computer Engineering', status: 'Active', lastActive: 'Yesterday', email: 'r.mehta@vit.edu.in' },
    { id: 4, name: 'Aarav Sharma', role: 'Student', dept: 'Computer Engineering', status: 'Attention', lastActive: '12 days ago', email: 'aarav.s@vit.edu.in' },
    { id: 5, name: 'Super Administrator', role: 'Institution Admin', dept: 'Central IT Governance', status: 'Active', lastActive: 'Now', email: 'admin@vit.edu.in' },
  ]);

  // AI Assistant Chat Messages
  const [chatMessages, setChatMessages] = useState([
    { sender: 'AI', text: 'Hello Admin! I am the VIT Institutional AI Operations Assistant. How can I assist system monitoring today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const filteredUsers = usersList.filter((u) =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()) || u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      setDocuments((prev) => [
        {
          id: Date.now(),
          name: newDocName,
          category: newDocCategory,
          version: 'v1.0',
          size: '2.9 MB',
          vectors: 52,
          status: 'Indexed',
          date: 'Just now',
        },
        ...prev,
      ]);
      setNewDocName('');
      setShowUploadModal(false);
    }, 1200);
  };

  const handleSendMessage = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || inputMessage;
    if (!query.trim()) return;

    setChatMessages((prev) => [...prev, { sender: 'USER', text: query }]);
    if (!customQuery) setInputMessage('');

    setTimeout(() => {
      let reply = 'I have queried the VIT Wadala system telemetry & audit trail. ';
      const lower = query.toLowerCase();
      if (lower.includes('health') || lower.includes('issue')) {
        reply += 'All 6 critical system services (Auth, Academic Sync, AI Provider, RAG, Database, Notifications) are operating at 99.98% uptime.';
      } else if (lower.includes('user') || lower.includes('count')) {
        reply += 'System has 4,360 total active accounts (4,120 students, 214 faculty/mentors, 26 institution admins).';
      } else if (lower.includes('usage') || lower.includes('token') || lower.includes('limit')) {
        reply += 'Monthly AI provider API token consumption is currently at 72% of the configured institutional quota.';
      } else {
        reply += 'Audit trail shows 42 administrative actions logged today with zero security violations.';
      }
      setChatMessages((prev) => [...prev, { sender: 'AI', text: reply }]);
    }, 650);
  };

  return (
    <div className="min-h-screen bg-[#F7F2E9] text-[#102A43] font-sans antialiased flex flex-col lg:flex-row">
      
      {/* 1. ADMIN SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 bg-[#FFFDF8] border-r border-[#E2D7C6] flex flex-col justify-between shrink-0">
        <div>
          {/* Top Brand Header */}
          <div className="p-6 border-b border-[#E2D7C6] flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#123B63] text-white flex items-center justify-center font-bold text-xs shadow-sm border border-[#C49A52]/40">
              <span className="text-[#F5C056]">VIT</span>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#102A43] tracking-tight">VIT MUMBAI</h2>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#C49A52]">
                INSTITUTIONAL ADMIN
              </p>
            </div>
          </div>

          {/* Grouped Navigation Links */}
          <nav className="p-4 space-y-4 text-xs font-semibold">
            
            {/* Group 1: Overview */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveNav('Overview')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeNav === 'Overview' ? 'bg-[#123B63] text-white shadow-sm font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <LayoutDashboard className={`w-4 h-4 ${activeNav === 'Overview' ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                  <span>Overview</span>
                </div>
              </button>
            </div>

            {/* Group 2: USER MANAGEMENT */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">USER MANAGEMENT</p>
              {[
                { name: 'Users', icon: Users },
                { name: 'Students', icon: GraduationCap },
                { name: 'Faculty / Mentors', icon: UserCheck },
                { name: 'Roles & Permissions', icon: ShieldCheck },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Group 3: ACADEMIC STRUCTURE */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">ACADEMIC STRUCTURE</p>
              {[
                { name: 'Departments', icon: FolderTree },
                { name: 'Programs', icon: Layers },
                { name: 'Academic Structure', icon: FolderTree },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Group 4: MENTORING */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">MENTORING</p>
              <button
                onClick={() => setActiveNav('Mentor Assignments')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                  activeNav === 'Mentor Assignments' ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                }`}
              >
                <UserCheck className={`w-3.5 h-3.5 ${activeNav === 'Mentor Assignments' ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                <span>Mentor Assignments</span>
              </button>
            </div>

            {/* Group 5: AI & KNOWLEDGE */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">AI & KNOWLEDGE</p>
              {[
                { name: 'AI Configuration', icon: Cpu },
                { name: 'Knowledge Base', icon: Database },
                { name: 'RAG Documents', icon: FileText },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Group 6: INTEGRATIONS */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">INTEGRATIONS</p>
              {[
                { name: 'ERP / Data Sources', icon: Link },
                { name: 'Integration Health', icon: Server },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Group 7: SECURITY & GOVERNANCE */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">SECURITY & GOVERNANCE</p>
              {[
                { name: 'Audit Logs', icon: FileText },
                { name: 'Security', icon: ShieldCheck },
                { name: 'System Activity', icon: Activity },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

          </nav>
        </div>

        {/* Sidebar Footer Support & Exit */}
        <div className="p-4 border-t border-[#E2D7C6] space-y-2 text-xs">
          <button 
            onClick={() => setActiveNav('Settings')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-[#102A43] hover:bg-[#E9DDC9]/50 font-semibold ${
              activeNav === 'Settings' ? 'bg-[#E9DDC9] font-bold' : ''
            }`}
          >
            <Settings className="w-4 h-4 text-[#1D4E73]" />
            <span>Settings & Preferences</span>
          </button>

          <button
            onClick={onBackToLanding}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl bg-[#E9DDC9]/60 hover:bg-[#E2D7C6] text-[#102A43] font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#123B63]" />
            <span>Back to Portal Overview</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP ADMIN IDENTITY HEADER */}
        <header className="bg-[#FFFDF8] border-b border-[#E2D7C6] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#123B63] text-white flex items-center justify-center font-bold text-sm shadow-sm border border-[#C49A52]/40">
              <span className="text-[#F5C056]">AD</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-extrabold text-[#102A43]">VIT Institutional Administration</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#E9DDC9] text-[#102A43] text-[10px] font-bold border border-[#E2D7C6]">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-[#5A6E7F]">
                System configuration • Data governance • AI operations | VIT Wadala
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAiDrawerOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5C056]" />
              <span>✦ Admin AI Assistant</span>
            </button>

            <button 
              onClick={() => setActiveNav('Audit Logs')}
              className="p-2 rounded-full bg-[#F7F2E9] hover:bg-[#E9DDC9] text-[#102A43] border border-[#E2D7C6] relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>

            <button
              onClick={onBackToLanding}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white hover:bg-[#F7F2E9] text-[#102A43] text-xs font-bold border border-[#E2D7C6] shadow-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#123B63]" />
              <span>Back to Portal Overview</span>
            </button>
          </div>
        </header>

        {/* MAIN BODY WRAPPER */}
        <main className="p-6 max-w-7xl mx-auto space-y-6 w-full flex-1">
          
          {/* VIEW 1: OVERVIEW */}
          {activeNav === 'Overview' && (
            <div className="space-y-6">
              
              {/* PAGE TITLE & SUBTITLE */}
              <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Institution Overview</h2>
                  <p className="text-xs text-[#5A6E7F]">Monitor users, academic data, mentoring operations and AI services.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E9DDC9] text-xs font-bold text-[#102A43]">
                  CENTRAL PLATFORM CONTROL
                </span>
              </div>

              {/* 4 HIGH-QUALITY KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E7F]">Active Users</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-[#102A43]">4,360</span>
                    <span className="text-xs font-bold text-[#15803D]">Total</span>
                  </div>
                  <p className="text-xs text-[#5A6E7F]">Students + Faculty + Administrators</p>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E7F]">Students</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-[#123B63]">4,120</span>
                    <span className="text-xs font-semibold text-[#15803D]">Active Accounts</span>
                  </div>
                  <p className="text-xs text-[#5A6E7F]">Synced with VIT ERP</p>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E7F]">Faculty / Mentors</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-[#102A43]">214</span>
                    <span className="text-xs font-semibold text-[#123B63]">Active Faculty</span>
                  </div>
                  <p className="text-xs text-[#5A6E7F]">Department Mentors Assigned</p>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E7F]">System Health</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-[#15803D]">99.9%</span>
                    <span className="text-xs font-bold text-[#15803D]">Operational</span>
                  </div>
                  <p className="text-xs text-[#5A6E7F]">All 6 Critical Services Operational</p>
                </div>

              </div>

              {/* 1. SYSTEM HEALTH MONITOR (6 CORE MICROSERVICES) */}
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-[#102A43]">System Health & Telemetry</h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#15803D]">
                    ALL SYSTEMS HEALTHY
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  {[
                    { name: 'Authentication', status: 'Operational', ping: '12ms' },
                    { name: 'Academic Sync', status: 'Operational', ping: '45ms' },
                    { name: 'AI Provider', status: 'Operational', ping: '88ms' },
                    { name: 'RAG / Vector', status: 'Operational', ping: '32ms' },
                    { name: 'Database', status: 'Operational', ping: '8ms' },
                    { name: 'Notifications', status: 'Operational', ping: '18ms' },
                  ].map((svc) => (
                    <div key={svc.name} className="p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                        <p className="font-bold text-[#102A43] truncate">{svc.name}</p>
                      </div>
                      <p className="text-[11px] font-semibold text-[#15803D]">{svc.status}</p>
                      <p className="text-[10px] text-[#5A6E7F]">Latency: {svc.ping}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* MAIN 2-COLUMN GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT COLUMN (7 COLS): USER ROSTER, ROLES MATRIX, KNOWLEDGE BASE */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* USER MANAGEMENT ROSTER */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-extrabold text-[#102A43]">User Management</h3>
                        <p className="text-xs text-[#5A6E7F]">Control system accounts & role permissions</p>
                      </div>

                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-[#5A6E7F] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                          placeholder="Search users..."
                          className="pl-8 pr-3 py-1.5 rounded-full bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                            <th className="py-2.5 px-3 font-bold">NAME</th>
                            <th className="py-2.5 px-3 font-bold">ROLE</th>
                            <th className="py-2.5 px-3 font-bold">DEPARTMENT</th>
                            <th className="py-2.5 px-3 font-bold">STATUS</th>
                            <th className="py-2.5 px-3 font-bold">LAST ACTIVE</th>
                            <th className="py-2.5 px-3 font-bold">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2D7C6]">
                          {filteredUsers.map((u) => (
                            <tr key={u.id} className="hover:bg-[#F7F2E9]/60">
                              <td className="py-3 px-3">
                                <div>
                                  <p className="font-bold text-[#102A43]">{u.name}</p>
                                  <p className="text-[10px] text-[#5A6E7F]">{u.email}</p>
                                </div>
                              </td>
                              <td className="py-3 px-3 font-semibold text-[#123B63]">{u.role}</td>
                              <td className="py-3 px-3 text-[#5A6E7F]">{u.dept}</td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">
                                  {u.status}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-[#5A6E7F]">{u.lastActive}</td>
                              <td className="py-3 px-3">
                                <button
                                  onClick={() => setShowDeactivateModal(u)}
                                  className="text-xs font-bold text-[#B91C1C] hover:underline"
                                >
                                  Deactivate
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ROLES & PERMISSIONS MATRIX */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <h3 className="text-base font-extrabold text-[#102A43]">Role & Permission Scope Matrix</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                            <th className="py-2 px-3 font-bold">PERMISSION SCOPE</th>
                            <th className="py-2 px-3 font-bold text-center">STUDENT</th>
                            <th className="py-2 px-3 font-bold text-center">FACULTY</th>
                            <th className="py-2 px-3 font-bold text-center">DEPT ADMIN</th>
                            <th className="py-2 px-3 font-bold text-center">INSTITUTION ADMIN</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2D7C6]">
                          {[
                            { name: 'View Own Academic Profile', student: true, faculty: true, deptAdmin: true, instAdmin: true },
                            { name: 'View Assigned Mentees Roster', student: false, faculty: true, deptAdmin: true, instAdmin: true },
                            { name: 'Manage Department Users', student: false, faculty: false, deptAdmin: true, instAdmin: true },
                            { name: 'Configure AI & RAG Vector Knowledge', student: false, faculty: false, deptAdmin: false, instAdmin: true },
                            { name: 'View System Audit Logs', student: false, faculty: false, deptAdmin: false, instAdmin: true },
                          ].map((row, idx) => (
                            <tr key={idx}>
                              <td className="py-2.5 px-3 font-semibold text-[#102A43]">{row.name}</td>
                              <td className="py-2.5 px-3 text-center">{row.student ? <Check className="w-4 h-4 text-[#15803D] mx-auto" /> : '–'}</td>
                              <td className="py-2.5 px-3 text-center">{row.faculty ? <Check className="w-4 h-4 text-[#15803D] mx-auto" /> : '–'}</td>
                              <td className="py-2.5 px-3 text-center">{row.deptAdmin ? <Check className="w-4 h-4 text-[#15803D] mx-auto" /> : '–'}</td>
                              <td className="py-2.5 px-3 text-center">{row.instAdmin ? <Check className="w-4 h-4 text-[#15803D] mx-auto" /> : '–'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* KNOWLEDGE BASE & RAG DOCUMENTS */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-[#102A43]">RAG Knowledge Base & Institutional Docs</h3>
                        <p className="text-xs text-[#5A6E7F]">Manage approved institutional policies for AI knowledge engine</p>
                      </div>
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        + Upload Document
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                            <th className="py-2.5 px-3 font-bold">DOCUMENT</th>
                            <th className="py-2.5 px-3 font-bold">CATEGORY</th>
                            <th className="py-2.5 px-3 font-bold">VERSION</th>
                            <th className="py-2.5 px-3 font-bold">VECTORS</th>
                            <th className="py-2.5 px-3 font-bold">STATUS</th>
                            <th className="py-2.5 px-3 font-bold">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2D7C6]">
                          {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-[#F7F2E9]/60">
                              <td className="py-3 px-3 font-bold text-[#102A43]">{doc.name}</td>
                              <td className="py-3 px-3 text-[#5A6E7F]">{doc.category}</td>
                              <td className="py-3 px-3 font-semibold text-[#123B63]">{doc.version}</td>
                              <td className="py-3 px-3 font-bold text-[#C49A52]">{doc.vectors} chunks</td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">
                                  {doc.status}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <button className="text-xs font-bold text-[#123B63] hover:underline">
                                  Replace Version
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN (5 COLS): AI CONFIG, INTEGRATIONS, AUDIT LOGS, AI ASSISTANT */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* AI CONFIGURATION CARD */}
                  <div className="bg-[#123B63] text-white rounded-2xl p-6 border border-[#C49A52]/40 shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Cpu className="w-5 h-5 text-[#F5C056]" />
                        <h3 className="text-base font-extrabold text-white">AI Configuration & Quotas</h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#C49A52]/30 text-[9px] font-extrabold text-[#F5C056]">
                        PROTECTED
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Provider & Model:</span>
                        <span className="font-bold text-[#F5C056]">Google Gemini 2.0 Pro / Flash</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">RAG Vector Store:</span>
                        <span className="font-bold text-white">pgvector (Cosine Sim 0.88)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">API Key Secret:</span>
                        <span className="font-mono text-slate-300">••••••••••••••••</span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300">Monthly Quota Consumption:</span>
                        <span className="font-bold text-[#F5C056]">72% Used</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F5C056]" style={{ width: '72%' }} />
                      </div>
                    </div>

                    <button 
                      onClick={() => addToast('API Key Secret Rotated', 'API key secret rotated and persisted securely.', 'success')}
                      className="w-full py-2 rounded-xl bg-[#F5C056] text-[#102A43] font-bold text-xs hover:bg-[#E5B046]"
                    >
                      Rotate API Key Secret
                    </button>
                  </div>

                  {/* INTEGRATION HEALTH */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <h3 className="text-base font-extrabold text-[#102A43]">Enterprise Integration Health</h3>
                    
                    <div className="space-y-2.5 text-xs">
                      {[
                        { name: 'VIT ERP System', status: 'Connected', sync: '5 mins ago' },
                        { name: 'Academic Data Feed', status: 'Synced', sync: '12 mins ago' },
                        { name: 'Attendance Monitor', status: 'Synced', sync: '2 mins ago' },
                        { name: 'Identity & SSO', status: 'Connected', sync: 'Realtime' },
                      ].map((int) => (
                        <div key={int.name} className="p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] flex items-center justify-between">
                          <div>
                            <p className="font-bold text-[#102A43]">{int.name}</p>
                            <p className="text-[10px] text-[#5A6E7F]">Last sync: {int.sync}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold">
                            {int.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* IMMUTABLE AUDIT LOG SNAPSHOT */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-[#102A43]">Immutable Audit Trail</h3>
                      <button 
                        onClick={() => setActiveNav('Audit Logs')}
                        className="text-xs font-bold text-[#123B63] hover:underline"
                      >
                        View Full Log →
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      {[
                        { time: '14:32', actor: 'Admin', action: 'Role Scope Updated', result: 'Success' },
                        { time: '14:18', actor: 'Admin', action: 'RAG Document Uploaded', result: 'Success' },
                        { time: '13:52', actor: 'System', action: 'ERP Synchronization', result: 'Success' },
                      ].map((log, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] flex items-center justify-between">
                          <div>
                            <span className="font-mono font-bold text-[#123B63] mr-2">{log.time}</span>
                            <span className="font-bold text-[#102A43]">{log.action}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold">
                            {log.result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* OTHER SUB-VIEWS */}
          {activeNav === 'Users' && (
            <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#102A43]">All 4,360 System Users</h2>
              <p className="text-xs text-[#5A6E7F]">Directory of Students, Faculty, Department Admins & Institution Admins</p>
            </div>
          )}

          {activeNav === 'Audit Logs' && (
            <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#102A43]">Full Institutional Audit Log</h2>
              <p className="text-xs text-[#5A6E7F]">Immutable audit records for compliance and data governance</p>
            </div>
          )}

          {activeNav === 'Settings' && (
            <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#102A43]">System Administration Settings</h2>
              <p className="text-xs text-[#5A6E7F]">Global platform parameters & AI guardrail rules</p>
            </div>
          )}

        </main>
      </div>

      {/* 3. DOCUMENT UPLOAD MODAL */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <form onSubmit={handleUploadDoc} className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-lg w-full space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <h3 className="text-base font-extrabold text-[#102A43]">
                  Upload Approved RAG Institutional Document
                </h3>
                <button type="button" onClick={() => setShowUploadModal(false)} className="p-1 rounded-lg hover:bg-[#F7F2E9]">
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#102A43]">Document Title:</label>
                  <input
                    type="text"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    placeholder="e.g. VIT Academic Guidelines 2026.pdf"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43] focus:outline-none focus:border-[#123B63]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Category:</label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  >
                    <option>Academic Policy</option>
                    <option>Examination Policy</option>
                    <option>Curriculum</option>
                    <option>Mentoring Standard</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl border-2 border-dashed border-[#E2D7C6] bg-[#F7F2E9] text-center space-y-1">
                  <FileText className="w-8 h-8 text-[#123B63] mx-auto" />
                  <p className="font-bold text-[#102A43]">Drag & Drop PDF document here</p>
                  <p className="text-[10px] text-[#5A6E7F]">Supports PDF, DOCX up to 25 MB</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold"
                >
                  {isUploading ? 'Processing & Vectorizing...' : 'Upload & Vectorize Document'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. DEACTIVATE USER CONFIRMATION MODAL */}
      <AnimatePresence>
        {showDeactivateModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-md w-full space-y-4">
              <div className="flex items-center space-x-3 text-[#B91C1C]">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-base font-extrabold text-[#102A43]">Confirm Account Deactivation</h3>
              </div>

              <p className="text-xs text-[#5A6E7F] leading-relaxed">
                Are you sure you want to deactivate the user account for <strong>{showDeactivateModal.name}</strong> ({showDeactivateModal.email})? This action will revoke platform access and log an audit entry.
              </p>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeactivateModal(null)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setUsersList(prev => prev.filter(u => u.id !== showDeactivateModal.id));
                    setShowDeactivateModal(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#B91C1C] text-white text-xs font-bold"
                >
                  Confirm Deactivation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. PERSISTENT FLOATING AI COPILOT DRAWER */}
      <AnimatePresence>
        {aiDrawerOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-[#FFFDF8] border-l border-[#E2D7C6] shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Copilot Header */}
            <div className="p-5 bg-[#123B63] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-5 h-5 text-[#F5C056]" />
                <div>
                  <h3 className="text-sm font-bold text-white">VITARA AI Admin Operations Assistant</h3>
                  <p className="text-[10px] text-slate-300">Institutional Governance & System Telemetry</p>
                </div>
              </div>
              <button 
                onClick={() => setAiDrawerOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Conversation Area */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-2xl ${
                    msg.sender === 'USER' 
                      ? 'bg-[#123B63] text-white rounded-br-none' 
                      : 'bg-[#F7F2E9] border border-[#E2D7C6] text-[#102A43] rounded-bl-none'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Prompts */}
            <div className="p-3 bg-[#F7F2E9] border-t border-[#E2D7C6] space-y-1.5">
              <p className="text-[10px] font-bold uppercase text-[#5A6E7F]">Suggested Prompts:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Show me system issues.',
                  'Which integrations are unhealthy?',
                  'Summarize today\'s admin activity.',
                  'Summarize AI usage this month.'
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(undefined, prompt)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-[#E9DDC9] text-[#102A43] text-[10px] font-semibold border border-[#E2D7C6] transition-colors text-left cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={(e) => handleSendMessage(e)} className="p-4 border-t border-[#E2D7C6] flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask AI about system telemetry, users, RAG..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43] focus:outline-none focus:border-[#123B63]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-[#123B63] text-white hover:bg-[#1D4E73] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Theme Toast Notifications */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
};
