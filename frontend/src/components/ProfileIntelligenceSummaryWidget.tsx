import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Award
} from 'lucide-react';
import { profileIntelligenceApi, ProfileIntelligenceDoc, RankInfo } from '../services/api';
import { createDefaultIntelligence } from './StudentProfileIntelligencePage';

interface ProfileIntelligenceSummaryWidgetProps {
  onOpenFullIntelligence: () => void;
}

export const ProfileIntelligenceSummaryWidget: React.FC<ProfileIntelligenceSummaryWidgetProps> = ({
  onOpenFullIntelligence,
}) => {
  const [data, setData] = useState<{
    intelligence: ProfileIntelligenceDoc;
    rankInfo: RankInfo;
    isStale: boolean;
    profileCompleteness: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const LOCAL_INTEL_KEY = 'vit_mumbai_intelligence_cache_v1';

  const fetchSummary = async () => {
    try {
      setLoading(true);
      try {
        const res = await profileIntelligenceApi.getIntelligence();
        if (res?.data?.intelligence) {
          setData(res.data);
          return;
        }
      } catch (apiErr) {
        console.warn('API getIntelligence failed for widget, using fallback:', apiErr);
      }

      // Check localStorage or use default
      try {
        const cached = localStorage.getItem(LOCAL_INTEL_KEY);
        if (cached) {
          setData(JSON.parse(cached));
          return;
        }
      } catch {}

      setData(createDefaultIntelligence());
    } catch (err) {
      console.error('Failed to load profile intelligence summary:', err);
      setData(createDefaultIntelligence());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 border border-[#0C2238]/08 shadow-xs flex items-center justify-center h-48">
        <Loader2 className="w-6 h-6 text-[#123B63] animate-spin" />
        <span className="ml-3 font-bold text-[#102A43] text-xs">Evaluating AI Profile Intelligence...</span>
      </div>
    );
  }

  if (!data || !data.intelligence) {
    return null;
  }

  const { intelligence, rankInfo, isStale, profileCompleteness } = data;
  const overallScore = intelligence.overallScore || 75;

  return (
    <div className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-[#0C2238]/08 shadow-xs hover:shadow-md transition-all duration-300 space-y-4">
      
      {/* 1. HEADER WITH BRANDING & BADGE */}
      <div className="flex items-center justify-between pb-3 border-b border-[#0C2238]/08">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-[#D97706] shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#10253A] font-display tracking-tight flex items-center gap-1.5">
              AI Profile Intelligence
            </h3>
            <p className="text-[10px] font-bold text-[#627083] uppercase tracking-wider">
              Evaluated by Google Gemini Engine
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isStale && (
            <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[9px] font-extrabold flex items-center gap-1">
              <RefreshCw className="w-2.5 h-2.5" /> STALE
            </span>
          )}
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${
            intelligence.profileStrength === 'EXCEPTIONAL' ? 'bg-[#DCFCE7] text-[#15803D]' :
            intelligence.profileStrength === 'EXCELLENT' ? 'bg-[#E0E7FF] text-[#4338CA]' :
            intelligence.profileStrength === 'STRONG' ? 'bg-[#FEF3C7] text-[#D97706]' :
            'bg-[#FAF7F0] text-[#627083] border border-[#0C2238]/10'
          }`}>
            {intelligence.profileStrength}
          </span>
        </div>
      </div>

      {/* 2. TOP METRICS HERO: OVERALL SCORE & CAMPUS RANK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* Score Card */}
        <div className="bg-[#FAF7F0] rounded-2xl p-3.5 border border-[#0C2238]/08 shadow-2xs flex items-center space-x-3.5">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="18" stroke="#EFE7D8" strokeWidth="4" fill="transparent" />
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke="#C99632"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={113}
                strokeDashoffset={113 - (113 * overallScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-[#10253A] font-display">
              {overallScore}
            </span>
          </div>

          <div className="min-w-0">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#627083] block">
              Profile Strength
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-sm font-extrabold text-[#10253A]">
                {overallScore}/100
              </span>
              <span className="text-[10px] font-bold text-[#15803D]">
                {profileCompleteness}% Complete
              </span>
            </div>
            <p className="text-[10px] text-[#627083] truncate mt-0.5">
              {intelligence.strengths?.[0]?.title || 'Strong technical foundation'}
            </p>
          </div>
        </div>

        {/* Overall Rank Card */}
        <div className="bg-[#FAF7F0] rounded-2xl p-3.5 border border-[#0C2238]/08 shadow-2xs flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#123B63] text-white flex flex-col items-center justify-center shrink-0 shadow-2xs">
            <Trophy className="w-5 h-5 text-[#F5C056]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#627083]">
                Campus Standing
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[9px] font-extrabold">
                {rankInfo?.tier || 'Top 5%'}
              </span>
            </div>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-sm font-extrabold text-[#10253A] font-display">
                Rank #{rankInfo?.overallRank || 1}
              </span>
              <span className="text-[10px] font-bold text-[#627083]">
                of {rankInfo?.totalStudents || 1} Peers
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#15803D] mt-0.5">
              <TrendingUp className="w-3 h-3 text-[#15803D]" />
              <span>{rankInfo?.percentile || 99}th Percentile</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. CATEGORY RATINGS MINI BARS */}
      <div className="bg-[#FAF7F0]/70 rounded-2xl p-3 border border-[#0C2238]/06 grid grid-cols-3 gap-2 text-center">
        <div className="p-1.5 rounded-xl bg-white/70 border border-[#0C2238]/05">
          <span className="text-[9px] font-bold text-[#627083] uppercase block">Technical</span>
          <span className="text-xs font-extrabold text-[#10253A] font-display">
            {intelligence.categoryScores?.technical || 0}
          </span>
        </div>
        <div className="p-1.5 rounded-xl bg-white/70 border border-[#0C2238]/05">
          <span className="text-[9px] font-bold text-[#627083] uppercase block">Readiness</span>
          <span className="text-xs font-extrabold text-[#D97706] font-display">
            {intelligence.categoryScores?.careerReadiness || 0}%
          </span>
        </div>
        <div className="p-1.5 rounded-xl bg-white/70 border border-[#0C2238]/05">
          <span className="text-[9px] font-bold text-[#627083] uppercase block">Projects</span>
          <span className="text-xs font-extrabold text-[#15803D] font-display">
            {intelligence.categoryScores?.projects || 0}
          </span>
        </div>
      </div>

      {/* 4. FOOTER ACTION */}
      <button
        onClick={onOpenFullIntelligence}
        className="w-full py-2.5 px-4 rounded-2xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-extrabold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs group"
      >
        <span>View Full Profile Intelligence & Leaderboard</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#F5C056]" />
      </button>

    </div>
  );
};
