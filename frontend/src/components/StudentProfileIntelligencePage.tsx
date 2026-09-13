import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Trophy,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Target,
  Brain,
  Cpu,
  Loader2,
  RefreshCw,
  Award,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  User,
  ExternalLink,
  Plus,
  X,
  Layers,
  ChevronLeft,
  ChevronRight,
  Edit3,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import {
  profileIntelligenceApi,
  ProfileIntelligenceDoc,
  RankInfo,
  LeaderboardEntry,
  LeaderboardResponse
} from '../services/api';

interface StudentProfileIntelligencePageProps {
  onNavigateToRoadmap?: () => void;
}

export const StudentProfileIntelligencePage: React.FC<StudentProfileIntelligencePageProps> = ({
  onNavigateToRoadmap,
}) => {
  // Main Data States
  const [intelligenceData, setIntelligenceData] = useState<{
    intelligence: ProfileIntelligenceDoc;
    rankInfo: RankInfo;
    isStale: boolean;
    profileCompleteness: number;
    evidence?: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [reanalyzing, setReanalyzing] = useState(false);

  // Leaderboard States
  const [activeCategory, setActiveCategory] = useState<string>('overall');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardResponse | null>(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Evidence Editor Modal States
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [savingEvidence, setSavingEvidence] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('INTERMEDIATE');
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');
  const [newCompTitle, setNewCompTitle] = useState('');
  const [newCompPosition, setNewCompPosition] = useState('');
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');

  // Fetch student intelligence
  const fetchIntelligence = async () => {
    try {
      setLoading(true);
      const res = await profileIntelligenceApi.getIntelligence();
      setIntelligenceData(res.data);
    } catch (err) {
      console.error('Failed to load profile intelligence:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch leaderboard
  const fetchLeaderboard = async (cat = activeCategory, page = currentPage, search = searchQuery, dept = departmentFilter) => {
    try {
      setLeaderboardLoading(true);
      const res = await profileIntelligenceApi.getLeaderboard({
        category: cat,
        page,
        limit: 10,
        search,
        department: dept,
      });
      setLeaderboardData(res.data);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLeaderboardLoading(false);
    }
  };

  useEffect(() => {
    fetchIntelligence();
  }, []);

  useEffect(() => {
    fetchLeaderboard(activeCategory, currentPage, searchQuery, departmentFilter);
  }, [activeCategory, currentPage, departmentFilter]);

  // Handle on-demand reanalysis
  const handleReanalyze = async () => {
    try {
      setReanalyzing(true);
      const res = await profileIntelligenceApi.reanalyze();
      setIntelligenceData((prev) => prev ? {
        ...prev,
        intelligence: res.data.intelligence,
        rankInfo: res.data.rankInfo,
        isStale: false,
        profileCompleteness: res.data.profileCompleteness,
      } : null);
      fetchLeaderboard(activeCategory, currentPage, searchQuery, departmentFilter);
    } catch (err) {
      console.error('Reanalysis failed:', err);
    } finally {
      setReanalyzing(false);
    }
  };

  // Handle Evidence Submission
  const handleSaveEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEvidence(true);
    try {
      const currentSkills = intelligenceData?.evidence?.skills || [];
      const currentProjects = intelligenceData?.evidence?.projects || [];
      const currentComps = intelligenceData?.evidence?.competitions || [];
      const currentCerts = intelligenceData?.evidence?.certifications || [];

      const updatedSkills = [...currentSkills];
      if (newSkill.trim()) {
        updatedSkills.push({ name: newSkill.trim(), proficiency: newSkillLevel, category: 'Technical' });
      }

      const updatedProjects = [...currentProjects];
      if (newProjectTitle.trim()) {
        updatedProjects.push({
          title: newProjectTitle.trim(),
          description: newProjectDesc.trim() || 'Software engineering implementation',
          techStack: newProjectTech.split(',').map((s) => s.trim()).filter(Boolean),
          grade: 'A+',
          status: 'COMPLETED',
        });
      }

      const updatedComps = [...currentComps];
      if (newCompTitle.trim()) {
        updatedComps.push({
          title: newCompTitle.trim(),
          type: 'Hackathon',
          position: newCompPosition.trim() || 'Winner',
        });
      }

      const updatedCerts = [...currentCerts];
      if (newCertTitle.trim()) {
        updatedCerts.push({
          title: newCertTitle.trim(),
          issuer: newCertIssuer.trim() || 'Academy',
          status: 'VERIFIED',
        });
      }

      await profileIntelligenceApi.updateEvidence({
        skills: updatedSkills,
        projects: updatedProjects,
        competitions: updatedComps,
        certifications: updatedCerts,
      });

      // Reset form
      setNewSkill('');
      setNewProjectTitle('');
      setNewProjectDesc('');
      setNewProjectTech('');
      setNewCompTitle('');
      setNewCompPosition('');
      setNewCertTitle('');
      setNewCertIssuer('');
      setShowEvidenceModal(false);

      // Refresh intelligence & mark stale
      await fetchIntelligence();
    } catch (err) {
      console.error('Failed to update evidence:', err);
    } finally {
      setSavingEvidence(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FFFDF8] rounded-3xl p-12 border border-[#E2D7C6] shadow-xs flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#123B63] animate-spin" />
        <p className="font-extrabold text-[#102A43] text-sm">Synthesizing AI Profile Intelligence & Leaderboard...</p>
      </div>
    );
  }

  if (!intelligenceData || !intelligenceData.intelligence) {
    return (
      <div className="bg-[#FFFDF8] rounded-3xl p-12 border border-[#E2D7C6] shadow-xs text-center space-y-3">
        <Sparkles className="w-10 h-10 text-[#C49A52] mx-auto" />
        <h3 className="text-base font-extrabold text-[#102A43]">No Profile Intelligence Available</h3>
        <p className="text-xs text-[#5A6E7F] max-w-sm mx-auto">
          Add your skills, projects, and career goals to trigger your initial evaluation.
        </p>
        <button
          onClick={handleReanalyze}
          className="px-4 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold cursor-pointer"
        >
          Initialize AI Evaluation
        </button>
      </div>
    );
  }

  const { intelligence, rankInfo, isStale, profileCompleteness } = intelligenceData;
  const overallScore = intelligence.overallScore || 75;

  return (
    <div className="space-y-6">
      
      {/* 1. TOP HERO: PROFILE STRENGTH & REANALYZE ACTION */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E2D7C6] shadow-xs relative overflow-hidden space-y-6">
        
        {/* Decorative ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C49A52]/08 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left: Overall Score Dial + Strength Details */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="38" stroke="#EFE7D8" strokeWidth="7" fill="transparent" />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="#C99632"
                  strokeWidth="7"
                  fill="transparent"
                  strokeDasharray={238}
                  strokeDashoffset={238 - (238 * overallScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-[#10253A] font-display leading-none">
                  {overallScore}
                </span>
                <span className="text-[10px] font-bold text-[#627083]">/100</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide ${
                  intelligence.profileStrength === 'EXCEPTIONAL' ? 'bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]' :
                  intelligence.profileStrength === 'EXCELLENT' ? 'bg-[#E0E7FF] text-[#4338CA] border border-[#C7D2FE]' :
                  intelligence.profileStrength === 'STRONG' ? 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]' :
                  'bg-[#FAF7F0] text-[#627083] border border-[#0C2238]/10'
                }`}>
                  {intelligence.profileStrength} PROFILE
                </span>

                {isStale ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[10px] font-extrabold flex items-center gap-1 border border-[#FDE68A]">
                    <RefreshCw className="w-3 h-3" /> EVIDENCE UPDATED • REANALYSIS READY
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-extrabold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> AI VERIFIED & SYNCED
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#102A43] font-display tracking-tight">
                AI Profile Intelligence & Ranking
              </h2>
              <p className="text-xs text-[#5A6E7F] max-w-xl leading-relaxed">
                {intelligence.summary || 'Holistic synthesis of your academic performance, verified skills, engineering repositories, competition awards, and goal progression evaluated by Google Gemini.'}
              </p>
            </div>
          </div>

          {/* Right: Actions (Reanalyze & Update Evidence) */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={handleReanalyze}
              disabled={reanalyzing}
              className="px-5 py-2.5 rounded-xl bg-[#0C2238] hover:bg-[#123B63] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {reanalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#F5C056]" />
                  <span>Evaluating Profile...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#F5C056]" />
                  <span>Reanalyze Profile with AI</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowEvidenceModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#FAF7F0]/80 text-[#102A43] text-xs font-extrabold border border-[#E2D7C6] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C49A52]" />
              <span>Add Projects & Credentials</span>
            </button>
          </div>

        </div>

        {/* PROFILE COMPLETENESS PROGRESS BAR */}
        <div className="pt-4 border-t border-[#E2D7C6] space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#102A43] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C49A52]" />
              Profile Completeness: <strong className="text-[#C49A52]">{profileCompleteness}%</strong>
            </span>
            <span className="text-[11px] text-[#5A6E7F]">
              {profileCompleteness >= 80 ? 'Comprehensive profile evidence available' : 'Add more projects, hackathons & certifications to raise completeness'}
            </span>
          </div>
          <div className="w-full bg-[#EFE7D8] h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#123B63] rounded-full transition-all duration-700"
              style={{ width: `${profileCompleteness}%` }}
            />
          </div>
        </div>

      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Overall Rank */}
        <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#123B63] text-white flex items-center justify-center shadow-2xs">
              <Trophy className="w-4 h-4 text-[#F5C056]" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[9px] font-extrabold">
              {rankInfo?.tier || 'Top 5%'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5A6E7F] block mb-0.5">
              Overall Campus Rank
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-extrabold text-[#10253A] font-display">
                #{rankInfo?.overallRank || 1}
              </span>
              <span className="text-xs font-bold text-[#5A6E7F]">
                / {rankInfo?.totalStudents || 1}
              </span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#E2D7C6] flex items-center justify-between text-[10px] text-[#5A6E7F]">
            <span>Percentile Standing</span>
            <span className="font-bold text-[#15803D]">{rankInfo?.percentile || 99}th Percentile</span>
          </div>
        </div>

        {/* Stat 2: Technical Rank */}
        <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shadow-2xs">
              <Brain className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[9px] font-extrabold">
              {intelligence.categoryScores?.technical || 0}/100
            </span>
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5A6E7F] block mb-0.5">
              Technical Skill Rank
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-extrabold text-[#10253A] font-display">
                #{rankInfo?.categoryRanks?.technical || 1}
              </span>
              <span className="text-xs font-bold text-[#5A6E7F]">in Engineering</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#E2D7C6] flex items-center justify-between text-[10px] text-[#5A6E7F]">
            <span>Projects Evaluated</span>
            <span className="font-bold text-[#102A43]">{intelligenceData.evidence?.projects?.length || 1} Repositories</span>
          </div>
        </div>

        {/* Stat 3: Career Readiness */}
        <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shadow-2xs">
              <Target className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[9px] font-extrabold">
              TARGET ROLE
            </span>
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5A6E7F] block mb-0.5">
              Career Readiness
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-extrabold text-[#10253A] font-display">
                {intelligence.careerReadiness?.score || intelligence.categoryScores?.careerReadiness || 0}%
              </span>
              <span className="text-xs font-bold text-[#D97706] truncate max-w-[100px]">
                {intelligence.careerReadiness?.targetRole || 'Software Engineer'}
              </span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#E2D7C6] flex items-center justify-between text-[10px] text-[#5A6E7F]">
            <span>Readiness Standing</span>
            <span className="font-bold text-[#102A43]">#{rankInfo?.categoryRanks?.careerReadiness || 1} in Role</span>
          </div>
        </div>

        {/* Stat 4: Academic Standing */}
        <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shadow-2xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[9px] font-extrabold">
              OFFICIAL
            </span>
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5A6E7F] block mb-0.5">
              Academic Foundation
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-extrabold text-[#10253A] font-display">
                {intelligence.categoryScores?.academic || 85}
              </span>
              <span className="text-xs font-bold text-[#5A6E7F]">/100 Rating</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#E2D7C6] flex items-center justify-between text-[10px] text-[#5A6E7F]">
            <span>Academic Standing</span>
            <span className="font-bold text-[#102A43]">#{rankInfo?.categoryRanks?.academic || 1} in Batch</span>
          </div>
        </div>

      </div>

      {/* 3. CATEGORY RATINGS BREAKDOWN */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
          <div>
            <h3 className="text-base font-extrabold text-[#102A43]">Multi-Dimensional Intelligence Breakdown</h3>
            <p className="text-xs text-[#5A6E7F]">Category scores normalized and contextually assessed across peer cohort</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Technical Depth', score: intelligence.categoryScores?.technical || 0, rank: rankInfo?.categoryRanks?.technical, icon: Brain, color: '#4F46E5', desc: 'Core programming, algorithms, and technical mastery' },
            { name: 'Career Readiness', score: intelligence.categoryScores?.careerReadiness || 0, rank: rankInfo?.categoryRanks?.careerReadiness, icon: Target, color: '#D97706', desc: `Alignment with target role: ${intelligence.careerReadiness?.targetRole}` },
            { name: 'Projects & Systems', score: intelligence.categoryScores?.projects || 0, rank: rankInfo?.categoryRanks?.projects, icon: Cpu, color: '#15803D', desc: 'Practical software building and architecture complexity' },
            { name: 'Academic Record', score: intelligence.categoryScores?.academic || 0, rank: rankInfo?.categoryRanks?.academic, icon: GraduationCap, color: '#123B63', desc: 'Official CGPA and lecture compliance consistency' },
            { name: 'Competitive Track', score: intelligence.categoryScores?.competitive || 0, rank: rankInfo?.categoryRanks?.competitive, icon: Trophy, color: '#C49A52', desc: 'Hackathon achievements and algorithmic competitions' },
            { name: 'Engagement & Roadmap', score: intelligence.categoryScores?.engagement || 0, rank: 1, icon: CheckCircle2, color: '#059669', desc: 'Task execution speed and roadmap milestones completed' },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.name} className="p-4 rounded-2xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" style={{ color: cat.color }} />
                    <span className="text-xs font-extrabold text-[#102A43]">{cat.name}</span>
                  </div>
                  <span className="text-xs font-extrabold text-[#102A43] font-display">{cat.score}/100</span>
                </div>

                <div className="w-full bg-[#E2D7C6] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.score}%`, backgroundColor: cat.color }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#5A6E7F] pt-1">
                  <span className="truncate max-w-[150px]">{cat.desc}</span>
                  <span className="font-bold text-[#102A43] shrink-0">Rank #{cat.rank || 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. KEY STRENGTHS & GROWTH AREAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top Strengths */}
        <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#E2D7C6] pb-3">
            <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
            <h3 className="text-base font-extrabold text-[#102A43]">Verified Strengths</h3>
          </div>

          <div className="space-y-3">
            {intelligence.strengths && intelligence.strengths.length > 0 ? (
              intelligence.strengths.map((st, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#DCFCE7]/40 border border-[#BBF7D0] space-y-1">
                  <h4 className="text-xs font-extrabold text-[#15803D] flex items-center gap-1.5">
                    <span>✓</span> {st.title}
                  </h4>
                  <p className="text-[11px] text-[#102A43]/80 leading-relaxed">{st.reason}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#5A6E7F] italic">No strengths analyzed yet.</p>
            )}
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#E2D7C6] pb-3">
            <AlertCircle className="w-5 h-5 text-[#D97706]" />
            <h3 className="text-base font-extrabold text-[#102A43]">Priority Improvement Areas</h3>
          </div>

          <div className="space-y-3">
            {intelligence.improvementAreas && intelligence.improvementAreas.length > 0 ? (
              intelligence.improvementAreas.map((ia, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#FEF3C7]/40 border border-[#FDE68A] space-y-1">
                  <h4 className="text-xs font-extrabold text-[#D97706] flex items-center gap-1.5">
                    <span>⚡</span> {ia.title}
                  </h4>
                  <p className="text-[11px] text-[#102A43]/80 leading-relaxed">{ia.reason}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#5A6E7F] italic">No growth areas noted.</p>
            )}
          </div>
        </div>

      </div>

      {/* 5. CAREER READINESS & GOAL ALIGNMENT */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2D7C6] pb-3">
          <div>
            <h3 className="text-base font-extrabold text-[#102A43]">Career Goal Alignment & Gap Analysis</h3>
            <p className="text-xs text-[#5A6E7F]">Target Role: <strong className="text-[#102A43]">{intelligence.careerReadiness?.targetRole || 'Software Engineer'}</strong></p>
          </div>
          {onNavigateToRoadmap && (
            <button
              onClick={onNavigateToRoadmap}
              className="px-3 py-1.5 rounded-xl bg-[#E9DDC9] hover:bg-[#E2D7C6] text-[#102A43] text-xs font-extrabold flex items-center gap-1 cursor-pointer self-start sm:self-center"
            >
              <span>View Roadmaps & Tasks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-2">
            <span className="text-[10px] font-extrabold uppercase text-[#15803D] block">Target Role Strengths</span>
            <div className="flex flex-wrap gap-1.5">
              {intelligence.careerReadiness?.strengths?.map((st, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-[#E2D7C6] text-xs font-bold text-[#102A43]">
                  ✓ {st}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-2">
            <span className="text-[10px] font-extrabold uppercase text-[#D97706] block">Identified Skill Gaps</span>
            <div className="flex flex-wrap gap-1.5">
              {intelligence.careerReadiness?.gaps?.map((gap, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-[#E2D7C6] text-xs font-bold text-[#D97706]">
                  ⚡ {gap}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. WHY YOUR RANK CHANGED */}
      {intelligence.rankChangeReasons && intelligence.rankChangeReasons.length > 0 && (
        <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#123B63]" />
              <h3 className="text-base font-extrabold text-[#102A43]">Why Your Rank Changed</h3>
            </div>
            <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
              DATA DRIVEN
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {intelligence.rankChangeReasons.map((rc, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] flex items-start space-x-3">
                <span className="px-2 py-0.5 rounded-full bg-[#123B63] text-white text-[10px] font-extrabold shrink-0 mt-0.5">
                  {rc.change}
                </span>
                <p className="text-xs text-[#102A43] leading-snug">{rc.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. FULL CAMPUS LEADERBOARD SECTION */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E2D7C6] shadow-xs space-y-6">
        
        {/* Header & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2D7C6] pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#102A43] font-display tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#C49A52]" />
              Campus Engineering Leaderboard
            </h3>
            <p className="text-xs text-[#5A6E7F]">Deterministic rankings updated from stored AI profile assessments</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'overall', label: 'Overall Standing' },
              { id: 'technical', label: 'Technical Depth' },
              { id: 'careerReadiness', label: 'Career Readiness' },
              { id: 'projects', label: 'Projects & Systems' },
              { id: 'academic', label: 'Academics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#123B63] text-white shadow-xs'
                    : 'bg-[#FAF7F0] text-[#627083] hover:text-[#102A43] border border-[#0C2238]/08'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Department Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#5A6E7F] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              onKeyDown={(e) => e.key === 'Enter' && fetchLeaderboard(activeCategory, 1, searchQuery, departmentFilter)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#E2D7C6] text-[#102A43] focus:outline-none focus:border-[#C49A52]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#E2D7C6] text-[#102A43] focus:outline-none cursor-pointer"
            >
              <option value="">All Departments</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="AI & Data Science">AI & Data Science</option>
              <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
            </select>
          </div>
        </div>

        {/* Leaderboard Table */}
        {leaderboardLoading ? (
          <div className="py-12 text-center text-[#5A6E7F] text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-[#123B63] mx-auto mb-2" />
            Loading Leaderboard Entries...
          </div>
        ) : leaderboardData && leaderboardData.entries.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-[#E2D7C6]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-[#627083] font-extrabold uppercase text-[10px] border-b border-[#E2D7C6]">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Department & Roll No</th>
                  <th className="py-3 px-4 text-center">Category Score</th>
                  <th className="py-3 px-4 text-center">Strength Tier</th>
                  <th className="py-3 px-4">Top Specialization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D7C6]">
                {leaderboardData.entries.map((entry) => (
                  <tr
                    key={entry.student._id}
                    className={`transition-colors ${
                      entry.isCurrentUser
                        ? 'bg-[#FEF3C7]/40 font-bold border-l-4 border-l-[#C49A52]'
                        : 'hover:bg-[#FAF7F0]'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3 px-4 font-display font-extrabold text-sm text-[#10253A]">
                      <div className="flex items-center gap-1.5">
                        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                        {entry.isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#123B63] text-white text-[8px] font-extrabold">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Student */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#123B63] text-white flex items-center justify-center font-bold text-[10px]">
                          {entry.student.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-extrabold text-[#102A43] block">{entry.student.name}</span>
                          <span className="text-[10px] text-[#5A6E7F]">CGPA: {entry.student.cgpa}</span>
                        </div>
                      </div>
                    </td>

                    {/* Department & Roll */}
                    <td className="py-3 px-4 text-[#5A6E7F]">
                      <span className="block font-medium text-[#102A43]">{entry.student.department}</span>
                      <span className="text-[10px]">{entry.student.rollNo || 'Sem IV'}</span>
                    </td>

                    {/* Score */}
                    <td className="py-3 px-4 text-center font-extrabold font-display text-sm text-[#10253A]">
                      {entry.score}
                      <span className="text-[10px] text-[#627083] font-normal block">
                        Overall: {entry.overallScore}
                      </span>
                    </td>

                    {/* Tier */}
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        entry.tier === 'Top 1%' ? 'bg-[#DCFCE7] text-[#15803D]' :
                        entry.tier === 'Top 5%' ? 'bg-[#E0E7FF] text-[#4338CA]' :
                        entry.tier === 'Top 10%' ? 'bg-[#FEF3C7] text-[#D97706]' :
                        'bg-[#FAF7F0] text-[#627083]'
                      }`}>
                        {entry.tier}
                      </span>
                    </td>

                    {/* Top Specialization */}
                    <td className="py-3 px-4 text-[#5A6E7F]">
                      <span className="font-bold text-[#102A43] block truncate max-w-[160px]">
                        {entry.topStrength}
                      </span>
                      <span className="text-[10px] text-[#C49A52]">{entry.targetRole}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-[#5A6E7F] text-xs">
            No students found matching current filters.
          </div>
        )}

        {/* Pagination Controls */}
        {leaderboardData && leaderboardData.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between text-xs pt-2">
            <span className="text-[#5A6E7F]">
              Showing page {leaderboardData.pagination.page} of {leaderboardData.pagination.totalPages} ({leaderboardData.pagination.total} total peers)
            </span>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-[#E2D7C6] hover:bg-[#FAF7F0] disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-bold text-[#102A43]">{currentPage}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(leaderboardData.pagination.totalPages, p + 1))}
                disabled={currentPage >= leaderboardData.pagination.totalPages}
                className="p-1.5 rounded-lg border border-[#E2D7C6] hover:bg-[#FAF7F0] disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 8. EVIDENCE EDITOR MODAL */}
      <AnimatePresence>
        {showEvidenceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C2238]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFDF8] rounded-3xl border border-[#E2D7C6] p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E2D7C6]">
                <h3 className="text-base font-extrabold text-[#102A43] flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#C49A52]" />
                  Add Profile Evidence & Credentials
                </h3>
                <button
                  onClick={() => setShowEvidenceModal(false)}
                  className="p-1 hover:bg-[#E9DDC9]/50 rounded-lg text-[#5A6E7F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEvidence} className="space-y-4 text-xs">
                {/* 1. Add Skill */}
                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E2D7C6] space-y-2">
                  <span className="font-extrabold text-[#102A43] block">1. Add Technical Skill</span>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="e.g. PyTorch, Docker, Kubernetes"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="col-span-2 px-3 py-2 rounded-xl bg-white border border-[#E2D7C6] focus:outline-none"
                    />
                    <select
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(e.target.value)}
                      className="px-2 py-2 rounded-xl bg-white border border-[#E2D7C6] focus:outline-none"
                    >
                      <option value="BEGINNER">Beginner</option>
                      <option value="INTERMEDIATE">Intermediate</option>
                      <option value="ADVANCED">Advanced</option>
                      <option value="EXPERT">Expert</option>
                    </select>
                  </div>
                </div>

                {/* 2. Add Project */}
                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E2D7C6] space-y-2">
                  <span className="font-extrabold text-[#102A43] block">2. Add Project / Repository</span>
                  <input
                    type="text"
                    placeholder="Project Title (e.g. Distributed Key-Value Store)"
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D7C6] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Tech Stack (comma separated: Go, Raft, gRPC)"
                    value={newProjectTech}
                    onChange={(e) => setNewProjectTech(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D7C6] focus:outline-none"
                  />
                  <textarea
                    placeholder="Brief description of project architecture and achievements..."
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D7C6] focus:outline-none"
                  />
                </div>

                {/* 3. Add Hackathon / Competition */}
                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E2D7C6] space-y-2">
                  <span className="font-extrabold text-[#102A43] block">3. Add Hackathon or Competition</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Competition Name"
                      value={newCompTitle}
                      onChange={(e) => setNewCompTitle(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white border border-[#E2D7C6] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Position (e.g. 1st Place / Winner)"
                      value={newCompPosition}
                      onChange={(e) => setNewCompPosition(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white border border-[#E2D7C6] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Add Certification */}
                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E2D7C6] space-y-2">
                  <span className="font-extrabold text-[#102A43] block">4. Add Certification</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Certification Title"
                      value={newCertTitle}
                      onChange={(e) => setNewCertTitle(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white border border-[#E2D7C6] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Issuer (e.g. AWS, Coursera, MIT)"
                      value={newCertIssuer}
                      onChange={(e) => setNewCertIssuer(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white border border-[#E2D7C6] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-[#E2D7C6]">
                  <button
                    type="button"
                    onClick={() => setShowEvidenceModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#5A6E7F] hover:bg-[#E9DDC9]/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingEvidence}
                    className="px-5 py-2 rounded-xl text-xs font-extrabold bg-[#123B63] hover:bg-[#1D4E73] text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {savingEvidence ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5 text-[#F5C056]" />}
                    Save Evidence to Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
