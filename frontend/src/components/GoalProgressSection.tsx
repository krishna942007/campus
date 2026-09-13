import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { studentGoalsApi } from '../services/api';
import { studentStore } from '../services/studentStateStore';
import { Target, CheckCircle2, Clock, ChevronRight, Plus, Loader2, Sparkles } from 'lucide-react';

interface GoalProgressSectionProps {
  onGoalChange?: (goalId: string) => void;
}

export const GoalProgressSection: React.FC<GoalProgressSectionProps> = ({ onGoalChange }) => {
  const [dbGoals, setDbGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      const res = await studentGoalsApi.getGoals();
      setDbGoals(res.data);
      // Sync primary goal with global store if one exists
      const primary = res.data.find((g: any) => g.isPrimary);
      if (primary) {
        studentStore.setCareerGoal(primary.title);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const currentGoal = useMemo(() => {
    return dbGoals.find(g => g.isPrimary) || dbGoals[0] || null;
  }, [dbGoals]);

  const overallGoalPercentage = currentGoal ? currentGoal.progress : 0;

  // Selected step for detail inspection (default: first in-progress step)
  const [selectedStepId, setSelectedStepId] = useState<string>('');

  useEffect(() => {
    if (currentGoal && currentGoal.roadmap && currentGoal.roadmap.length > 0) {
      const firstActive = currentGoal.roadmap.find((s: any) => s.status === 'IN_PROGRESS');
      setSelectedStepId(firstActive ? firstActive._id : currentGoal.roadmap[0]._id);
    }
  }, [currentGoal]);

  const currentStep = useMemo(() => {
    if (!currentGoal || !currentGoal.roadmap) return null;
    return currentGoal.roadmap.find((s: any) => s._id === selectedStepId) || currentGoal.roadmap[0];
  }, [currentGoal, selectedStepId]);

  if (isLoading) {
    return (
      <div className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 border border-[#0C2238]/08 shadow-xs flex items-center justify-center h-48">
        <Loader2 className="w-6 h-6 text-[#123B63] animate-spin" />
        <span className="ml-3 font-bold text-[#102A43]">Loading Goals...</span>
      </div>
    );
  }

  if (!currentGoal) {
    return (
      <div className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 border border-[#0C2238]/08 shadow-xs flex flex-col items-center justify-center text-center h-48">
        <Target className="w-10 h-10 text-[#E2D7C6] mb-2" />
        <p className="font-extrabold text-[#102A43]">No Goals Found</p>
        <p className="text-xs text-[#5A6E7F] mt-1">Visit Goals & Roadmap to create your first goal.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-[#0C2238]/08 shadow-xs hover:shadow-md transition-all duration-300 space-y-4.5">
      
      {/* 1. COMPACT TOP HEADER WITH OVERALL PROGRESS CARD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-3.5 border-b border-[#0C2238]/08">
        
        {/* Left: Heading & Mini Goal Title */}
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-[#10253A] font-display tracking-tight flex items-center gap-2">
            <Target className="w-5 h-5 text-[#C99632]" />
            Goal Progress
          </h3>
          <div className="flex items-center space-x-2">
             <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-[#0C2238] text-white border border-[#0C2238] shadow-2xs">
               {currentGoal.title}
             </span>
             <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#FEF3C7] text-[#D97706]">
               PRIMARY GOAL
             </span>
          </div>
        </div>

        {/* Right: Compact Overall Goal Progress Card */}
        <div className="bg-[#FAF7F0] border border-[#0C2238]/08 rounded-2xl px-4 py-2.5 flex items-center space-x-3 shadow-2xs shrink-0 self-start sm:self-center">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-11 h-11 transform -rotate-90">
              <circle cx="22" cy="22" r="16" stroke="#EFE7D8" strokeWidth="3.5" fill="transparent" />
              <circle
                cx="22"
                cy="22"
                r="16"
                stroke="#C99632"
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray="100.5"
                strokeDashoffset={100.5 - (100.5 * overallGoalPercentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute text-[11px] font-extrabold text-[#10253A] font-display">
              {overallGoalPercentage}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C99632]">Overall Track</span>
            <span className="text-xs font-bold text-[#627083]">Completion</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HORIZONTAL STEPPER TIMELINE */}
      {currentGoal.roadmapGenerationStatus === 'completed' && currentGoal.roadmap && currentGoal.roadmap.length > 0 ? (
        <div className="relative pt-2 pb-4 overflow-hidden">
          <div className="absolute top-7 left-4 right-4 h-0.5 bg-[#EFE7D8] rounded-full z-0"></div>
          
          <div className="relative z-10 flex justify-between items-start">
            {currentGoal.roadmap.map((step: any, index: number) => {
              const isActive = step._id === selectedStepId;
              const isCompleted = step.status === 'COMPLETED';
              const isInProgress = step.status === 'IN_PROGRESS';
              
              return (
                <div 
                  key={step._id} 
                  className="flex flex-col items-center flex-1 cursor-pointer group"
                  onClick={() => setSelectedStepId(step._id)}
                >
                  {/* Step Marker */}
                  <div className="relative flex items-center justify-center mb-2.5">
                    <motion.div 
                      layoutId={isActive ? "activeStepOutline" : undefined}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xs z-10 relative
                        ${isCompleted ? 'bg-[#15803D] border-2 border-[#15803D] text-white' : 
                          isInProgress ? 'bg-[#FAF7F0] border-[2.5px] border-[#C99632] text-[#C99632]' : 
                          isActive ? 'bg-[#0C2238] border-2 border-[#0C2238] text-white' :
                          'bg-white border-2 border-[#E2D7C6] text-[#A0ABBA] group-hover:border-[#C99632]/50'}`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
                       isInProgress ? <Clock className="w-5 h-5" /> : 
                       <span className="text-xs font-extrabold font-display">{index + 1}</span>}
                    </motion.div>
                    
                    {/* Progress Fill Line for completed segments */}
                    {index < currentGoal.roadmap.length - 1 && (
                      <div className="absolute left-[50%] top-[50%] w-[100%] h-0.5 z-0 origin-left"
                           style={{
                             backgroundColor: isCompleted ? '#15803D' : 'transparent'
                           }}>
                      </div>
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <div className="text-center px-1">
                    <p className={`text-[10px] leading-tight font-extrabold line-clamp-2 transition-colors duration-200
                      ${isCompleted ? 'text-[#15803D]' : 
                        isActive || isInProgress ? 'text-[#10253A]' : 
                        'text-[#627083] group-hover:text-[#10253A]'}`}>
                      {step.title}
                    </p>
                    <p className="text-[9px] font-bold text-[#A0ABBA] mt-0.5">{step.percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="py-6 text-center border border-dashed border-[#E2D7C6] rounded-xl bg-[#F7F2E9]">
          <Sparkles className="w-6 h-6 text-[#C49A52] mx-auto mb-2" />
          <p className="text-sm font-extrabold text-[#102A43]">Roadmap {currentGoal.roadmapGenerationStatus === 'failed' ? 'Generation Failed' : 'Pending Generation'}</p>
          <p className="text-[10px] text-[#5A6E7F] mt-1">Visit Goals & Roadmap page to check AI status.</p>
        </div>
      )}

      {/* 3. SELECTED STEP DETAILS PANEL */}
      <AnimatePresence mode="wait">
        {currentStep && (
          <motion.div
            key={currentStep._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-[#FAF7F0] rounded-2xl p-4 border border-[#0C2238]/08 shadow-2xs relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full blur-3xl opacity-60"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 border-b border-[#0C2238]/06 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider ${
                    currentStep.status === 'COMPLETED' ? 'bg-[#DCFCE7] text-[#15803D]' :
                    currentStep.status === 'IN_PROGRESS' ? 'bg-[#FEF3C7] text-[#D97706]' :
                    'bg-[#EFE7D8] text-[#627083]'
                  }`}>
                    {currentStep.status.replace('_', ' ')}
                  </span>
                  <h4 className="text-sm font-extrabold text-[#10253A] truncate max-w-[200px] sm:max-w-md">{currentStep.title}</h4>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-[#0C2238]/06 shadow-2xs">
                  <span className="text-[11px] font-extrabold text-[#C99632]">{currentStep.percentage}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                {/* Pending Tasks */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-[#627083] flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    Tasks Checklist
                  </h5>
                  <ul className="space-y-1.5">
                    {currentStep.tasks?.filter((t: any) => !t.isCompleted).length > 0 ? (
                      currentStep.tasks.filter((t: any) => !t.isCompleted).map((task: any, i: number) => (
                        <li key={i} className="flex items-start gap-2 group">
                          <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#C99632]/50 group-hover:bg-[#C99632] transition-colors shrink-0"></div>
                          <span className="text-[11px] font-medium text-[#10253A] leading-snug">{task.text}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-[11px] font-medium text-[#A0ABBA] italic pl-3">No pending tasks.</li>
                    )}
                  </ul>
                </div>

                {/* Completed Activities */}
                <div className="space-y-2 pl-0 sm:pl-4 sm:border-l border-[#0C2238]/06">
                  <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </h5>
                  <ul className="space-y-1.5">
                    {currentStep.tasks?.filter((t: any) => t.isCompleted).length > 0 ? (
                      currentStep.tasks.filter((t: any) => t.isCompleted).map((task: any, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0 opacity-80" />
                          <span className="text-[11px] font-medium text-[#627083] leading-snug line-through opacity-80">{task.text}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-[11px] font-medium text-[#A0ABBA] italic pl-3">No tasks completed yet.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
