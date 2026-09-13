import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { studentGoalsApi } from '../services/api';
import { studentStore } from '../services/studentStateStore';
import {
  Target,
  CheckCircle2,
  Clock,
  ChevronRight,
  GraduationCap,
  Code2,
  Zap,
  BookOpen,
  Briefcase,
  Sparkles,
  Layers,
  CheckSquare,
  AlertCircle,
  Plus,
  Loader2,
  X,
  Star,
  Check
} from 'lucide-react';

interface GoalProgressSectionProps {
  onGoalChange?: (goalId: string) => void;
}

// Helper to determine icon based on goal title or category
const getGoalIcon = (title: string, category?: string) => {
  const text = `${title} ${category || ''}`.toLowerCase();
  if (text.includes('academic') || text.includes('sem') || text.includes('degree') || text.includes('gpa')) {
    return GraduationCap;
  }
  if (text.includes('tcs') || text.includes('placement') || text.includes('job') || text.includes('career') || text.includes('intern')) {
    return Briefcase;
  }
  if (text.includes('ai') || text.includes('ml') || text.includes('data') || text.includes('machine learning') || text.includes('deep learning')) {
    return Sparkles;
  }
  if (text.includes('backend') || text.includes('dev') || text.includes('code') || text.includes('software') || text.includes('frontend') || text.includes('fullstack')) {
    return Code2;
  }
  if (text.includes('sql') || text.includes('db') || text.includes('database') || text.includes('api')) {
    return Layers;
  }
  return Target;
};

export const GoalProgressSection: React.FC<GoalProgressSectionProps> = ({ onGoalChange }) => {
  const [dbGoals, setDbGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');
  const [selectedStepId, setSelectedStepId] = useState<string>('');

  // Add Goal Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);

  // Fetch real goals from MongoDB
  const fetchGoals = async (preferredSelectedId?: string) => {
    try {
      setIsLoading(true);
      const res = await studentGoalsApi.getGoals();
      const goalsList = res.data || [];
      setDbGoals(goalsList);

      // Determine active goal
      let activeGoal = null;
      if (preferredSelectedId) {
        activeGoal = goalsList.find((g: any) => g._id === preferredSelectedId);
      }
      if (!activeGoal) {
        activeGoal = goalsList.find((g: any) => g.isPrimary) || goalsList[0] || null;
      }

      if (activeGoal) {
        setSelectedGoalId(activeGoal._id);
        if (activeGoal.isPrimary) {
          studentStore.setCareerGoal(activeGoal.title);
        }
        // Set selected milestone step
        if (activeGoal.roadmap && activeGoal.roadmap.length > 0) {
          const firstActive = activeGoal.roadmap.find((s: any) => s.status === 'IN_PROGRESS');
          setSelectedStepId(firstActive ? firstActive._id : activeGoal.roadmap[0]._id);
        }
      }
    } catch (err: any) {
      console.error('Failed to load goals:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Currently active goal object
  const currentGoal = useMemo(() => {
    return dbGoals.find((g) => g._id === selectedGoalId) || dbGoals.find((g) => g.isPrimary) || dbGoals[0] || null;
  }, [dbGoals, selectedGoalId]);

  // Update selected step when active goal changes
  const handleSelectGoal = (goalId: string) => {
    setSelectedGoalId(goalId);
    const target = dbGoals.find((g) => g._id === goalId);
    if (target && target.roadmap && target.roadmap.length > 0) {
      const firstActive = target.roadmap.find((s: any) => s.status === 'IN_PROGRESS');
      setSelectedStepId(firstActive ? firstActive._id : target.roadmap[0]._id);
    } else {
      setSelectedStepId('');
    }
    if (onGoalChange) onGoalChange(goalId);
  };

  // Currently selected step/milestone
  const currentStep = useMemo(() => {
    if (!currentGoal || !currentGoal.roadmap || currentGoal.roadmap.length === 0) return null;
    return currentGoal.roadmap.find((s: any) => s._id === selectedStepId) || currentGoal.roadmap[0];
  }, [currentGoal, selectedStepId]);

  // Overall goal percentage calculated from backend progress or milestone average
  const overallGoalPercentage = currentGoal ? Math.round(currentGoal.progress || 0) : 0;

  // Task toggling handler (optimistic update + MongoDB persistence)
  const handleToggleTask = async (milestoneId: string, taskId: string) => {
    if (!currentGoal) return;
    const goalId = currentGoal._id;

    // Optimistic local state update
    setDbGoals((prevGoals) =>
      prevGoals.map((g) => {
        if (g._id !== goalId) return g;
        return {
          ...g,
          roadmap: (g.roadmap || []).map((m: any) => {
            if (m._id !== milestoneId) return m;
            return {
              ...m,
              tasks: (m.tasks || []).map((t: any) =>
                t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
              )
            };
          })
        };
      })
    );

    try {
      await studentGoalsApi.toggleTask(goalId, milestoneId, taskId);
      // Re-fetch to synchronize exact backend progress calculation
      const res = await studentGoalsApi.getGoals();
      setDbGoals(res.data || []);
    } catch (err) {
      console.error('Failed to toggle task:', err);
      // Revert on error
      fetchGoals(goalId);
    }
  };

  // Handle Set as Primary Goal
  const handleSetPrimary = async (goalId: string) => {
    try {
      await studentGoalsApi.setPrimaryGoal(goalId);
      fetchGoals(goalId);
    } catch (err) {
      console.error('Failed to set primary goal:', err);
    }
  };

  // Handle Create Goal from Dashboard Modal
  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    setIsCreatingGoal(true);
    try {
      const res: any = await studentGoalsApi.createGoal({
        title: newGoalTitle.trim(),
        description: newGoalDesc.trim()
      });
      setShowAddModal(false);
      setNewGoalTitle('');
      setNewGoalDesc('');
      const createdId = res.data?._id;
      await fetchGoals(createdId);
    } catch (err) {
      console.error('Failed to create goal:', err);
    } finally {
      setIsCreatingGoal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 border border-[#0C2238]/08 shadow-xs flex items-center justify-center h-48">
        <Loader2 className="w-6 h-6 text-[#123B63] animate-spin" />
        <span className="ml-3 font-bold text-[#102A43]">Loading Goal Progress...</span>
      </div>
    );
  }

  if (!currentGoal || dbGoals.length === 0) {
    return (
      <div className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 border border-[#0C2238]/08 shadow-xs flex flex-col items-center justify-center text-center py-8 space-y-3">
        <Target className="w-10 h-10 text-[#C99632]/60 mb-1" />
        <p className="font-extrabold text-[#102A43] text-base">No Goals Found</p>
        <p className="text-xs text-[#5A6E7F] max-w-sm">Create your first career or academic goal to activate your automated AI roadmap.</p>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-2 px-4 py-2 rounded-xl text-xs font-extrabold bg-[#0C2238] text-white hover:bg-[#10253A] flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          Add First Goal
        </button>

        {/* Add Goal Modal */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C2238]/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#FFFDF8] rounded-2xl border border-[#E2D7C6] p-6 max-w-md w-full shadow-2xl space-y-4 text-left"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#0C2238]/08">
                  <h3 className="text-base font-extrabold text-[#102A43] flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#C99632]" />
                    Add Career or Academic Goal
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-1 hover:bg-[#0C2238]/06 rounded-lg text-[#627083] hover:text-[#10253A]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleCreateGoal} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#102A43] block mb-1">Goal Title</label>
                    <input
                      type="text"
                      placeholder="e.g. TCS Placement, AI/ML Career, Backend Developer"
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#0C2238]/15 rounded-xl focus:outline-none focus:border-[#C99632] bg-[#FAF7F0]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#102A43] block mb-1">Description (Optional)</label>
                    <textarea
                      placeholder="Brief details about your target role or requirements..."
                      value={newGoalDesc}
                      onChange={(e) => setNewGoalDesc(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 text-xs border border-[#0C2238]/15 rounded-xl focus:outline-none focus:border-[#C99632] bg-[#FAF7F0]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#627083] hover:bg-[#0C2238]/06"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreatingGoal || !newGoalTitle.trim()}
                      className="px-4 py-1.5 rounded-xl text-xs font-extrabold bg-[#0C2238] text-white hover:bg-[#10253A] disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {isCreatingGoal ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                      Create Goal & Generate Roadmap
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Filter tasks for the selected milestone step
  const completedTasks = currentStep?.tasks?.filter((t: any) => t.isCompleted) || [];
  const remainingTasks = currentStep?.tasks?.filter((t: any) => !t.isCompleted) || [];
  const milestonesList = currentGoal.roadmap || [];
  const clearedMilestonesCount = milestonesList.filter((s: any) => s.status === 'COMPLETED' || s.percentage === 100).length;

  return (
    <div className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-[#0C2238]/08 shadow-xs hover:shadow-md transition-all duration-300 space-y-4.5">
      
      {/* 1. COMPACT TOP HEADER WITH GOAL TABS & OVERALL PROGRESS CARD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-3.5 border-b border-[#0C2238]/08">
        
        {/* Left: Heading & Mini Goal Selection Tabs */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold text-[#10253A] font-display tracking-tight flex items-center gap-2">
              <Target className="w-5 h-5 text-[#C99632]" />
              Goal Progress
            </h3>
          </div>

          {/* Goal Mini-Tabs / Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {dbGoals.map((goal) => {
              const isSelected = goal._id === currentGoal._id;
              const IconComp = getGoalIcon(goal.title, goal.category);
              return (
                <button
                  key={goal._id}
                  onClick={() => handleSelectGoal(goal._id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#0C2238] text-white border-[#0C2238] shadow-2xs scale-[1.02]'
                      : 'bg-[#FAF7F0] text-[#627083] border-[#0C2238]/08 hover:border-[#C99632]/50 hover:text-[#10253A]'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C99632]' : 'text-[#627083]'}`} />
                  <span className="truncate max-w-[130px]">{goal.title}</span>
                  {goal.isPrimary && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#C99632]/20 text-[#C99632] text-[8px] font-extrabold tracking-wider">
                      PRIMARY
                    </span>
                  )}
                </button>
              );
            })}

            {/* Add Goal Action Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 text-[#C99632] bg-[#FAF7F0] border border-dashed border-[#C99632]/40 hover:bg-[#FAF7F0]/80 hover:border-[#C99632] transition-colors cursor-pointer"
              title="Add New Goal"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Goal</span>
            </button>
          </div>
        </div>

        {/* Right: Compact Overall Goal Progress Card */}
        <div className="bg-[#FAF7F0] border border-[#0C2238]/08 rounded-2xl px-4 py-2.5 flex items-center space-x-3 shadow-2xs shrink-0 self-start sm:self-center">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-11 h-11 transform -rotate-90">
              <circle
                cx="22"
                cy="22"
                r="16"
                stroke="#EFE7D8"
                strokeWidth="3.5"
                fill="transparent"
              />
              <circle
                cx="22"
                cy="22"
                r="16"
                stroke="#C99632"
                strokeWidth="3.5"
                strokeDasharray={2 * Math.PI * 16}
                strokeDashoffset={2 * Math.PI * 16 * (1 - overallGoalPercentage / 100)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-[#10253A] font-display">
              {overallGoalPercentage}%
            </span>
          </div>

          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#627083] block">
              Overall Goal Progress
            </span>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-extrabold text-[#10253A] truncate max-w-[130px]">
                {currentGoal.title}
              </span>
              {currentGoal.isPrimary ? (
                <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706]">
                  PRIMARY GOAL
                </span>
              ) : (
                <button
                  onClick={() => handleSetPrimary(currentGoal._id)}
                  className="text-[9px] font-bold text-[#627083] hover:text-[#C99632] flex items-center gap-0.5 underline cursor-pointer"
                >
                  <Star className="w-2.5 h-2.5" /> Make Primary
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* 2. VERTICAL SEQUENTIAL ROADMAP TIMELINE */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-[#627083]">
          <span className="font-bold text-[#10253A] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#C99632]" />
            Sequential Roadmap Timeline: Click any milestone to inspect activities
          </span>
          <span className="font-extrabold text-[#C99632]">
            {clearedMilestonesCount} / {milestonesList.length} Milestones Cleared
          </span>
        </div>

        {/* Vertical Timeline List */}
        {milestonesList.length > 0 ? (
          <div className="space-y-2 relative">
            {milestonesList.map((step: any, idx: number) => {
              const isSelected = currentStep?._id === step._id;
              const isCompleted = step.status === 'COMPLETED' || step.percentage === 100;
              const isInProgress = step.status === 'IN_PROGRESS' || (!isCompleted && step.percentage > 0);
              const isLast = idx === milestonesList.length - 1;

              const stepTasks = step.tasks || [];
              const stepCompletedTasks = stepTasks.filter((t: any) => t.isCompleted);
              const stepRemainingTasks = stepTasks.filter((t: any) => !t.isCompleted);

              return (
                <div key={step._id || idx} className="relative">
                  {/* Connecting Vertical Line */}
                  {!isLast && (
                    <div
                      className={`absolute left-[15px] top-[34px] bottom-[-9px] w-0.5 z-0 ${
                        isCompleted ? 'bg-[#15803D]/30' : isInProgress ? 'bg-[#C99632]/40' : 'bg-[#0C2238]/10'
                      }`}
                    />
                  )}

                  {/* Milestone Node Row */}
                  <div
                    onClick={() => setSelectedStepId(step._id)}
                    className={`relative z-10 p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#FFFCF7] border-[#C99632] shadow-2xs ring-2 ring-[#C99632]/30 scale-[1.008]'
                        : isCompleted
                        ? 'bg-[#FFFCF7] border-[#BBF7D0] shadow-2xs hover:border-[#15803D]'
                        : isInProgress
                        ? 'bg-[#FFFCF7] border-[#FDE68A] shadow-2xs hover:border-[#C99632]'
                        : 'bg-[#FAF7F0]/60 border-[#0C2238]/08 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* Left Indicator Dot + Title */}
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                          isCompleted
                            ? 'bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]'
                            : isInProgress
                            ? 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]'
                            : 'bg-[#EFE7D8] text-[#627083] border border-[#0C2238]/10'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> : idx + 1}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs sm:text-sm font-extrabold text-[#10253A] truncate">
                            Step {idx + 1} — {step.title}
                          </h4>
                          {isCompleted && (
                            <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[9px] font-extrabold shrink-0">
                              ✓ Done
                            </span>
                          )}
                          {isInProgress && (
                            <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[9px] font-extrabold shrink-0">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#627083] block truncate">
                          {stepCompletedTasks.length > 0
                            ? stepCompletedTasks[0].text
                            : stepRemainingTasks.length > 0
                            ? `Next: ${stepRemainingTasks[0].text}`
                            : 'Milestone pending'}
                        </span>
                      </div>
                    </div>

                    {/* Right Progress Bar & Percentage */}
                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="w-24 sm:w-32 hidden sm:block">
                        <div className="w-full bg-[#EFE7D8] h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isCompleted
                                ? 'bg-[#15803D]'
                                : isInProgress
                                ? 'bg-[#C99632]'
                                : 'bg-[#627083]'
                            }`}
                            style={{ width: `${step.percentage || 0}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-[#10253A] min-w-[36px] text-right font-display">
                        {step.percentage || 0}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-dashed border-[#C99632]/40 text-center space-y-1">
            <Sparkles className="w-5 h-5 text-[#C99632] mx-auto mb-1" />
            <p className="text-xs font-extrabold text-[#102A43]">
              {currentGoal.roadmapGenerationStatus === 'pending'
                ? 'AI is generating your personalized roadmap...'
                : 'Roadmap pending generation'}
            </p>
            <p className="text-[10px] text-[#627083]">Visit Goals & Roadmap page to view or regenerate milestones.</p>
          </div>
        )}
      </div>

      {/* 3. ACTIVITY CONNECTION DETAIL PANEL FOR SELECTED STEP */}
      {currentStep && (
        <div className="bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#0C2238]/08 space-y-3">
          
          <div className="flex items-center justify-between pb-2 border-b border-[#0C2238]/08">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4 text-[#C99632]" />
              <h4 className="text-xs sm:text-sm font-extrabold text-[#10253A] truncate max-w-[200px] sm:max-w-md">
                Activity Connection: {currentStep.title} ({currentStep.percentage || 0}% Complete)
              </h4>
            </div>

            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              currentStep.status === 'COMPLETED' || currentStep.percentage === 100
                ? 'bg-[#DCFCE7] text-[#15803D]'
                : currentStep.status === 'IN_PROGRESS' || (currentStep.percentage > 0)
                ? 'bg-[#FEF3C7] text-[#D97706]'
                : 'bg-[#EFE7D8] text-[#627083]'
            }`}>
              {currentStep.status === 'COMPLETED' || currentStep.percentage === 100
                ? '100% Cleared'
                : currentStep.status === 'IN_PROGRESS' || (currentStep.percentage > 0)
                ? 'Active Step'
                : 'Upcoming'}
            </span>
          </div>

          {/* 2-Column Grid: Completed Activities vs Remaining Tasks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            
            {/* Completed Activities */}
            <div className="bg-[#FFFCF7] p-3.5 rounded-xl border border-[#0C2238]/06 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#15803D] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                Completed Activities ({completedTasks.length})
              </span>

              {completedTasks.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-[#0C2238]/90">
                  {completedTasks.map((task: any, idx: number) => (
                    <li key={task._id || idx} className="flex items-start gap-2 leading-snug group">
                      <button
                        onClick={() => handleToggleTask(currentStep._id, task._id)}
                        className="mt-0.5 w-4 h-4 rounded bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#15803D] shrink-0 cursor-pointer hover:bg-[#FEE2E2] hover:border-[#FCA5A5] hover:text-[#DC2626] transition-colors"
                        title="Click to uncheck task"
                      >
                        <Check className="w-3 h-3 group-hover:hidden" />
                        <X className="w-3 h-3 hidden group-hover:block" />
                      </button>
                      <span className="line-through text-[#627083]">{task.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#627083] italic">No completed activities logged for this step yet.</p>
              )}
            </div>

            {/* Remaining Tasks */}
            <div className="bg-[#FFFCF7] p-3.5 rounded-xl border border-[#0C2238]/06 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D97706] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />
                Remaining Tasks ({remainingTasks.length})
              </span>

              {remainingTasks.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-[#0C2238]/90">
                  {remainingTasks.map((task: any, idx: number) => (
                    <li key={task._id || idx} className="flex items-start gap-2 leading-snug group">
                      <button
                        onClick={() => handleToggleTask(currentStep._id, task._id)}
                        className="mt-0.5 w-4 h-4 rounded border border-[#0C2238]/20 bg-white hover:border-[#15803D] hover:bg-[#DCFCE7]/30 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                        title="Click to complete task"
                      >
                      </button>
                      <span className="text-[#10253A] font-medium">{task.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#15803D] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  All requirements completed!
                </p>
              )}
            </div>

          </div>

        </div>
      )}

      {/* Add Goal Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C2238]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFDF8] rounded-2xl border border-[#E2D7C6] p-6 max-w-md w-full shadow-2xl space-y-4 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#0C2238]/08">
                <h3 className="text-base font-extrabold text-[#102A43] flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#C99632]" />
                  Add Career or Academic Goal
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-[#0C2238]/06 rounded-lg text-[#627083] hover:text-[#10253A]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateGoal} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#102A43] block mb-1">Goal Title</label>
                  <input
                    type="text"
                    placeholder="e.g. TCS Placement, AI/ML Career, Backend Developer"
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#0C2238]/15 rounded-xl focus:outline-none focus:border-[#C99632] bg-[#FAF7F0]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#102A43] block mb-1">Description (Optional)</label>
                  <textarea
                    placeholder="Brief details about your target role or requirements..."
                    value={newGoalDesc}
                    onChange={(e) => setNewGoalDesc(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 text-xs border border-[#0C2238]/15 rounded-xl focus:outline-none focus:border-[#C99632] bg-[#FAF7F0]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#627083] hover:bg-[#0C2238]/06"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingGoal || !newGoalTitle.trim()}
                    className="px-4 py-1.5 rounded-xl text-xs font-extrabold bg-[#0C2238] text-white hover:bg-[#10253A] disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isCreatingGoal ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                    Create Goal & Generate Roadmap
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
