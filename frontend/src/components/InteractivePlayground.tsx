import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sliders,
  ShieldAlert,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Send,
  Zap,
  TrendingUp,
  FileText,
  Lock,
  Sparkles,
  RefreshCw,
  GraduationCap
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export const InteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STUDENT_TWIN' | 'MENTOR_MATRIX' | 'RAG_ASSISTANT' | 'ADMIN_CONTROL'>('STUDENT_TWIN');

  // Tab 1: Student Simulator State
  const [currentSgpa, setCurrentSgpa] = useState<number>(8.92);
  const [targetRole, setTargetRole] = useState<'AI_ENGINEER' | 'FULLSTACK' | 'SYSTEMS_ARCHITECT'>('AI_ENGINEER');
  const [skillGapScore, setSkillGapScore] = useState<number>(88);

  // Tab 2: Mentor Matrix State
  const [filterRisk, setFilterRisk] = useState<'ALL' | 'HIGH_RISK' | 'WARNING' | 'SAFE'>('ALL');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [isGeneratingAiSummary, setIsGeneratingAiSummary] = useState(false);
  const [aiSummaryOutput, setAiSummaryOutput] = useState<string | null>(null);

  // Tab 3: RAG Query State
  const [ragQuery, setRagQuery] = useState('What are the attendance criteria for EXTC & CSE lab exams?');
  const [ragResponse, setRagResponse] = useState<{
    answer: string;
    citations: { doc: string; page: number; section: string }[];
    confidence: number;
  } | null>({
    answer: 'Students must maintain a minimum of 75% attendance in both theory and practical lab sessions to be eligible for end-semester examinations. Defaulters below 60% are flagged for mandatory mentor intervention.',
    citations: [
      { doc: 'VIT_Academic_Regulations_2026.pdf', page: 18, section: 'Clause 4.2: Attendance Criteria' },
      { doc: 'VIT_Autonomous_Exam_Guidelines.pdf', page: 6, section: 'Section B: Lab Eligibility' },
    ],
    confidence: 98.4,
  });
  const [isSearchingRag, setIsSearchingRag] = useState(false);

  // Sample Student Skill Radar Data
  const skillData = [
    { subject: 'Data Structures', A: currentSgpa * 10, B: 90 },
    { subject: 'System Design', A: currentSgpa * 9.2, B: 85 },
    { subject: 'Machine Learning', A: targetRole === 'AI_ENGINEER' ? 95 : 75, B: 80 },
    { subject: 'Web Dev (React)', A: targetRole === 'FULLSTACK' ? 98 : 84, B: 75 },
    { subject: 'Cloud & DevOps', A: targetRole === 'SYSTEMS_ARCHITECT' ? 94 : 78, B: 70 },
    { subject: 'Soft Skills', A: 88, B: 85 },
  ];

  // Sample Academic Trend
  const trendData = [
    { sem: 'Sem 1', sgpa: 8.2 },
    { sem: 'Sem 2', sgpa: 8.5 },
    { sem: 'Sem 3', sgpa: 8.7 },
    { sem: 'Sem 4', sgpa: 8.9 },
    { sem: 'Sem 5', sgpa: currentSgpa },
  ];

  // Mentor Roster Mock Data
  const menteeList = [
    { id: '1', name: 'Aarav Sharma', roll: '2023CSE042', sem: 5, cgpa: 5.8, attendance: 68, risk: 'HIGH_RISK', flag: 'Low Attendance & Below 6.0 CGPA' },
    { id: '2', name: 'Riya Deshmukh', roll: '2023CSE118', sem: 5, cgpa: 9.4, attendance: 96, risk: 'SAFE', flag: 'Star Performer - Research Grant Applicant' },
    { id: '3', name: 'Kabir Verma', roll: '2023EXTC089', sem: 5, cgpa: 6.4, attendance: 72, risk: 'WARNING', flag: 'Attendance Warning (72%)' },
    { id: '4', name: 'Ananya Patel', roll: '2023IT055', sem: 5, cgpa: 8.9, attendance: 92, risk: 'SAFE', flag: 'On Track - High Skill Index' },
  ];

  const filteredMentees = menteeList.filter((m) => {
    if (filterRisk === 'HIGH_RISK') return m.risk === 'HIGH_RISK';
    if (filterRisk === 'WARNING') return m.risk === 'WARNING';
    if (filterRisk === 'SAFE') return m.risk === 'SAFE';
    return true;
  });

  const handleRagSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;
    setIsSearchingRag(true);

    setTimeout(() => {
      setIsSearchingRag(false);
      setRagResponse({
        answer: `VITARA RAG Engine processed "${ragQuery}". According to official Vidyalankar Institute regulations, students must complete at least 2 honors credits or 1 industry internship by Sem 6 to qualify for top-tier AI lab access.`,
        citations: [
          { doc: 'VIT_Syllabus_BTech_2026.pdf', page: 42, section: 'Honors & Minors Policy' },
          { doc: 'VIT_Placement_Eligibility_Rules.pdf', page: 9, section: 'Tier-1 Recruiter Policy' },
        ],
        confidence: 97.8,
      });
    }, 900);
  };

  const handleGenerateSummary = (studentName: string) => {
    setIsGeneratingAiSummary(true);
    setSelectedStudent(studentName);
    setTimeout(() => {
      setIsGeneratingAiSummary(false);
      setAiSummaryOutput(
        `AI Mentorship Synthesis for ${studentName}:\n• Academic Trajectory: Current CGPA requires targeted revision in Discrete Math.\n• Risk Mitigation: Attendance at 68% triggers automated notification to HOD.\n• Actionable Steps: Recommended 2 peer-tutoring sessions and weekly check-in before Mid-Term EXTC exams.`
      );
    }, 1100);
  };

  return (
    <section id="interactive-playground" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D1B2A]/10 border border-[#3D5A80]/30 text-[#0D1B2A] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#3D5A80]" />
          <span>Interactive Million-Dollar Sandbox</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D1B2A] tracking-tight">
          Test drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D1B2A] via-[#3D5A80] to-[#4B6B7C]">VITARA</span> live in action
        </h2>
        <p className="text-[#3D5A80] mt-3 text-base md:text-lg font-medium">
          Experience real-time AI engines, digital twin simulations, mentor risk matrices, and RAG knowledge retrieval built for Vidyalankar Institute of Technology.
        </p>
      </div>

      {/* Tab Navigation Controls */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-8">
        {[
          { id: 'STUDENT_TWIN', label: 'Student Digital Twin', icon: Brain },
          { id: 'MENTOR_MATRIX', label: 'Faculty Risk Matrix', icon: ShieldAlert },
          { id: 'RAG_ASSISTANT', label: 'RAG Knowledge Assistant', icon: BookOpen },
          { id: 'ADMIN_CONTROL', label: 'Admin Governance', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#0D1B2A] text-[#F2EFE7] shadow-lg scale-105 border border-[#0D1B2A]'
                  : 'bg-[#FFFFFF] text-[#3D5A80] border border-[#3D5A80]/20 hover:border-[#3D5A80] hover:text-[#0D1B2A] shadow-sm'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Display Card in Navy Contrast Box */}
      <div className="glass-card-navy rounded-3xl p-6 md:p-10 border border-[#C8D9E6]/30 relative overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          {/* TAB 1: STUDENT DIGITAL TWIN SIMULATOR */}
          {activeTab === 'STUDENT_TWIN' && (
            <motion.div
              key="student-twin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#3D5A80]/40 pb-6 gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F2EFE7] text-[#0D1B2A]">
                      Live Student Twin
                    </span>
                    <h3 className="text-2xl font-bold text-white">Aarav Mehta • B.Tech CSE (Sem 5)</h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Roll No: 2023CSE001 | Mentor: Prof. S. Kulkarni (Head of AI Lab)</p>
                </div>

                {/* Target Role Selector */}
                <div className="flex items-center space-x-2 bg-[#0D1B2A] p-1.5 rounded-xl border border-[#3D5A80]/40">
                  <span className="text-xs font-semibold text-slate-400 pl-2">Target Career:</span>
                  {(['AI_ENGINEER', 'FULLSTACK', 'SYSTEMS_ARCHITECT'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setTargetRole(role);
                        setSkillGapScore(role === 'AI_ENGINEER' ? 92 : role === 'FULLSTACK' ? 88 : 84);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        targetRole === role
                          ? 'bg-[#3D5A80] text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {role.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Interactive Slider & Metrics */}
                <div className="space-y-6 bg-[#0D1B2A]/90 p-6 rounded-2xl border border-[#3D5A80]/40">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#C8D9E6] uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#F2EFE7]" />
                      <span>SGPA Projection Slider</span>
                    </h4>
                    <span className="text-2xl font-extrabold text-[#F2EFE7] font-mono">{currentSgpa.toFixed(2)}</span>
                  </div>

                  <p className="text-xs text-slate-300">
                    Drag slider to simulate next semester SGPA impact on graduation CGPA & AI career readiness.
                  </p>

                  <input
                    type="range"
                    min="6.0"
                    max="10.0"
                    step="0.05"
                    value={currentSgpa}
                    onChange={(e) => setCurrentSgpa(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-[#1B263B] rounded-lg appearance-none cursor-pointer accent-[#C8D9E6]"
                  />

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-[#1B263B] rounded-xl border border-[#3D5A80]/40">
                      <p className="text-[11px] text-slate-400">Cumulative CGPA</p>
                      <p className="text-lg font-bold text-white mt-0.5 font-mono">
                        {((8.7 * 4 + currentSgpa) / 5).toFixed(2)}
                      </p>
                    </div>
                    <div className="p-3 bg-[#1B263B] rounded-xl border border-[#3D5A80]/40">
                      <p className="text-[11px] text-slate-400">Skill Gap Match</p>
                      <p className="text-lg font-bold text-[#C8D9E6] mt-0.5 font-mono">{skillGapScore}%</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#3D5A80]/30 border border-[#3D5A80]/50 space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-bold text-[#F2EFE7]">
                      <Zap className="w-4 h-4 text-[#F2EFE7]" />
                      <span>AI Career Strategy</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {currentSgpa >= 8.5
                        ? 'Eligible for Tier-1 Industry Fellowships & VIT Autonomous Honors Thesis in Neural Architecture Search.'
                        : 'Recommended: Enrol in Advanced Data Structures tutoring block before Sem 6 Placement drive.'}
                    </p>
                  </div>
                </div>

                {/* Skill Radar Chart */}
                <div className="bg-[#0D1B2A]/90 p-6 rounded-2xl border border-[#3D5A80]/40 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#C8D9E6] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-[#C8D9E6]" />
                      <span>Skill Radar Competency Map</span>
                    </h4>
                    <p className="text-xs text-slate-300">Live evaluation against VIT Wadala benchmark curriculum</p>
                  </div>

                  <div className="h-64 w-full my-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillData}>
                        <PolarGrid stroke="rgba(200, 217, 230, 0.2)" />
                        <PolarAngleAxis dataKey="subject" stroke="#C8D9E6" tick={{ fill: '#C8D9E6', fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#3D5A80" />
                        <Radar name="Student Level" dataKey="A" stroke="#F2EFE7" fill="#3D5A80" fillOpacity={0.65} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Academic Trend & Mentor Feedback */}
                <div className="space-y-6 bg-[#0D1B2A]/90 p-6 rounded-2xl border border-[#3D5A80]/40">
                  <div>
                    <h4 className="text-sm font-bold text-[#C8D9E6] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#F2EFE7]" />
                      <span>Semester Progression Trend</span>
                    </h4>
                    <div className="h-36 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <XAxis dataKey="sem" stroke="#98B4C7" fontSize={10} />
                          <YAxis domain={[6, 10]} stroke="#98B4C7" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#1B263B', borderColor: '#3D5A80', color: '#fff' }} />
                          <Line type="monotone" dataKey="sgpa" stroke="#F2EFE7" strokeWidth={3} dot={{ fill: '#3D5A80', r: 5 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="border-t border-[#3D5A80]/40 pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Latest Mentor Note</span>
                      <span className="text-[10px] text-slate-400">10 Aug 2026</span>
                    </div>
                    <p className="text-xs text-slate-300 italic bg-[#1B263B] p-3 rounded-xl border border-[#3D5A80]/40">
                      "Aarav demonstrated exceptional initiative on the RAG pipeline capstone. Recommended for VIT Innovation Lab funding."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: FACULTY & MENTOR ATTENTION MATRIX */}
          {activeTab === 'MENTOR_MATRIX' && (
            <motion.div
              key="mentor-matrix"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#3D5A80]/40 pb-4 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-6 h-6 text-[#F2EFE7]" />
                    <span>Faculty Mentorship & Risk Command Center</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">Scoped view of assigned students • Evidence-based attention indicators</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Filter Roster:</span>
                  {[
                    { id: 'ALL', label: 'All Mentees (4)' },
                    { id: 'HIGH_RISK', label: '🚨 High Risk (1)' },
                    { id: 'WARNING', label: '⚠️ Attendance Warning (1)' },
                    { id: 'SAFE', label: '⭐ On Track (2)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilterRisk(f.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        filterRisk === f.id
                          ? 'bg-[#3D5A80] text-white border border-[#C8D9E6]/40 shadow'
                          : 'bg-[#0D1B2A] text-slate-400 border border-[#3D5A80]/30 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roster Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#3D5A80]/40 bg-[#0D1B2A]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#3D5A80]/40 bg-[#1B263B] text-xs font-bold text-[#C8D9E6] uppercase">
                      <th className="p-4">Student Name</th>
                      <th className="p-4">Roll Number</th>
                      <th className="p-4">Current CGPA</th>
                      <th className="p-4">Attendance</th>
                      <th className="p-4">Risk Status Flag</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3D5A80]/30 text-xs">
                    {filteredMentees.map((m) => (
                      <tr key={m.id} className="hover:bg-[#1B263B]/60 transition-colors">
                        <td className="p-4 font-bold text-white flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-[#98B4C7]" />
                          <span>{m.name}</span>
                        </td>
                        <td className="p-4 font-mono text-slate-300">{m.roll}</td>
                        <td className="p-4 font-mono font-bold text-white">{m.cgpa.toFixed(2)}</td>
                        <td className="p-4 font-mono">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              m.attendance < 75 ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            {m.attendance}%
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              m.risk === 'HIGH_RISK'
                                ? 'bg-red-950/80 text-red-200 border border-red-800'
                                : m.risk === 'WARNING'
                                ? 'bg-amber-950/80 text-amber-200 border border-amber-800'
                                : 'bg-emerald-950/80 text-emerald-200 border border-emerald-800'
                            }`}
                          >
                            {m.risk === 'HIGH_RISK' && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                            <span>{m.flag}</span>
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleGenerateSummary(m.name)}
                            className="px-3 py-1.5 rounded-lg bg-[#3D5A80] hover:bg-[#4B6B7C] text-white text-xs font-semibold cursor-pointer inline-flex items-center space-x-1"
                          >
                            <Sparkles className="w-3 h-3 text-[#F2EFE7]" />
                            <span>AI Brief</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedStudent && (
                <div className="p-5 rounded-2xl bg-[#1B263B] border border-[#C8D9E6]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#F2EFE7] flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-[#C8D9E6]" />
                      <span>AI Mentorship Synthesis Output ({selectedStudent})</span>
                    </h4>
                    <button onClick={() => setSelectedStudent(null)} className="text-xs text-slate-400 hover:text-white">
                      Close
                    </button>
                  </div>
                  {isGeneratingAiSummary ? (
                    <div className="flex items-center space-x-3 py-4 text-slate-300 text-xs">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#C8D9E6]" />
                      <span>Synthesizing student attendance, grades, and capstone progress...</span>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-200 font-mono whitespace-pre-line leading-relaxed bg-[#0D1B2A] p-4 rounded-xl border border-[#3D5A80]/40">
                      {aiSummaryOutput}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: INSTITUTIONAL RAG KNOWLEDGE ASSISTANT */}
          {activeTab === 'RAG_ASSISTANT' && (
            <motion.div
              key="rag-assistant"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="border-b border-[#3D5A80]/40 pb-4">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-[#C8D9E6]" />
                  <span>Institutional RAG Knowledge Assistant</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Answers grounded strictly in VIT Wadala official handbooks, syllabus & academic rules with source citations.
                </p>
              </div>

              <form onSubmit={handleRagSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    placeholder="Ask about attendance rules, exam re-evaluation, lab criteria, research grants..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0D1B2A] border border-[#3D5A80]/40 text-white text-xs md:text-sm focus:outline-none focus:border-[#C8D9E6]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearchingRag}
                  className="px-6 py-3.5 rounded-xl bg-[#3D5A80] hover:bg-[#4B6B7C] text-white font-bold text-xs md:text-sm flex items-center space-x-2 cursor-pointer shadow-md"
                >
                  {isSearchingRag ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#F2EFE7]" />
                      <span>Ask RAG</span>
                    </>
                  )}
                </button>
              </form>

              {ragResponse && (
                <div className="bg-[#0D1B2A] p-6 rounded-2xl border border-[#3D5A80]/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        RAG Grounded Answer (Confidence: {ragResponse.confidence}%)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-slate-100 leading-relaxed">
                    {ragResponse.answer}
                  </p>

                  <div className="border-t border-[#3D5A80]/40 pt-4">
                    <h5 className="text-[11px] font-bold text-[#C8D9E6] uppercase tracking-wider mb-2">
                      Source Document Citations:
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ragResponse.citations.map((c, i) => (
                        <div key={i} className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#1B263B] border border-[#3D5A80]/30">
                          <FileText className="w-4 h-4 text-[#F2EFE7] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-white">{c.doc}</p>
                            <p className="text-[11px] text-slate-400">Page {c.page} • {c.section}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: ADMIN GOVERNANCE */}
          {activeTab === 'ADMIN_CONTROL' && (
            <motion.div
              key="admin-control"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="border-b border-[#3D5A80]/40 pb-4">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Lock className="w-6 h-6 text-[#F2EFE7]" />
                  <span>Institutional Governance & Vector Store Telemetry</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  System health monitoring, role-permission matrix (RBAC), and document vector indexing status.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#0D1B2A] border border-[#3D5A80]/40 space-y-2">
                  <p className="text-xs text-slate-400">Indexed Knowledge Documents</p>
                  <p className="text-3xl font-extrabold text-white font-mono">142 Files</p>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>pgvector 1536-dim synced</span>
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#0D1B2A] border border-[#3D5A80]/40 space-y-2">
                  <p className="text-xs text-slate-400">Active Mentor-Mentee Mappings</p>
                  <p className="text-3xl font-extrabold text-[#C8D9E6] font-mono">4,210 Pairs</p>
                  <p className="text-[11px] text-[#F2EFE7]">Auto-synced with Institutional ERP</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#0D1B2A] border border-[#3D5A80]/40 space-y-2">
                  <p className="text-xs text-slate-400">Security & DPDP Audit Trail</p>
                  <p className="text-3xl font-extrabold text-white font-mono">100% Verified</p>
                  <p className="text-[11px] text-slate-300">TLS Encryption at Rest & In-Transit</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
