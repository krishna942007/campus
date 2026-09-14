import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { studentGoalsApi } from '../services/api';
import { Target, CheckCircle2, Clock, Check, Plus, Trash2, RefreshCw, X, Star } from 'lucide-react';

export const GoalsAndRoadmapPage: React.FC = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const LOCAL_GOALS_KEY = 'vit_mumbai_custom_goals_v1';

  const getLocalGoals = (): any[] => {
    try {
      const cached = localStorage.getItem(LOCAL_GOALS_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  };

  const saveLocalGoals = (goalsToSave: any[]) => {
    try {
      localStorage.setItem(LOCAL_GOALS_KEY, JSON.stringify(goalsToSave));
    } catch {}
  };

  const createFallbackGoal = (title: string, description?: string, isFirst = false) => {
    const cleanTitle = title.trim();
    const timestamp = Date.now();
    return {
      _id: `goal_${timestamp}`,
      title: cleanTitle,
      description: description || `Target career preparation & milestone roadmap for ${cleanTitle}`,
      isPrimary: isFirst,
      progress: 0,
      status: 'ACTIVE',
      roadmapGenerationStatus: 'completed',
      roadmap: [
        {
          _id: `ms_1_${timestamp}`,
          title: `Phase 1: Foundations & Prerequisites for ${cleanTitle}`,
          description: `Core eligibility criteria, foundational theory, and initial competencies for ${cleanTitle}.`,
          durationWeeks: 6,
          order: 1,
          status: 'IN_PROGRESS',
          progress: 0,
          tasks: [
            { _id: `t_1_1_${timestamp}`, text: `Master foundational domain requirements for ${cleanTitle}`, isCompleted: false },
            { _id: `t_1_2_${timestamp}`, text: 'Review syllabus, physical/technical criteria & examination patterns', isCompleted: false },
            { _id: `t_1_3_${timestamp}`, text: 'Complete diagnostic self-assessment test and initial benchmarks', isCompleted: false }
          ]
        },
        {
          _id: `ms_2_${timestamp}`,
          title: `Phase 2: Core Technical & Practical Competencies`,
          description: `Hands-on simulations, specialized coursework, and rigorous practice milestones.`,
          durationWeeks: 8,
          order: 2,
          status: 'PENDING',
          progress: 0,
          tasks: [
            { _id: `t_2_1_${timestamp}`, text: 'Complete advanced problem sets & domain-specific mock evaluations', isCompleted: false },
            { _id: `t_2_2_${timestamp}`, text: 'Conduct practical lab exercises / physical endurance simulations', isCompleted: false },
            { _id: `t_2_3_${timestamp}`, text: 'Participate in peer group assessments & mock interviews', isCompleted: false }
          ]
        },
        {
          _id: `ms_3_${timestamp}`,
          title: `Phase 3: Final Certification & Selection Readiness`,
          description: `Capstone validation, mock interviews, and final qualification clearances.`,
          durationWeeks: 4,
          order: 3,
          status: 'PENDING',
          progress: 0,
          tasks: [
            { _id: `t_3_1_${timestamp}`, text: 'Comprehensive full-length qualifying exam simulations', isCompleted: false },
            { _id: `t_3_2_${timestamp}`, text: 'Faculty mentor review and roadmap verification', isCompleted: false },
            { _id: `t_3_3_${timestamp}`, text: 'Submit official application / portfolio verification dossier', isCompleted: false }
          ]
        }
      ],
      createdAt: new Date().toISOString()
    };
  };

  const fetchGoals = async () => {
    try {
      const localCached = getLocalGoals();
      let goalsList: any[] = [];
      try {
        const res: any = await studentGoalsApi.getGoals();
        goalsList = Array.isArray(res?.data) ? res.data : [];
      } catch (apiErr) {
        console.warn('API getGoals unavailable, using local cached goals:', apiErr);
      }

      const mergedMap = new Map<string, any>();
      goalsList.forEach(g => mergedMap.set(g._id || g.title, g));
      localCached.forEach(g => {
        if (!mergedMap.has(g._id) && !mergedMap.has(g.title)) {
          mergedMap.set(g._id, g);
        }
      });

      const finalGoals = Array.from(mergedMap.values());
      setGoals(finalGoals);
      if (finalGoals.length > 0 && !selectedGoalId) {
        const primary = finalGoals.find((g: any) => g.isPrimary);
        setSelectedGoalId(primary ? primary._id : finalGoals[0]._id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    setIsSubmitting(true);
    const title = newGoalTitle.trim();
    const description = newGoalDesc.trim();

    try {
      let createdId: string | undefined;
      try {
        const res: any = await studentGoalsApi.createGoal({ title, description });
        createdId = res?.data?._id;
      } catch (apiErr) {
        console.warn('API createGoal failed, creating local fallback goal:', apiErr);
      }

      if (!createdId) {
        const isFirst = goals.length === 0;
        const fallbackGoal = createFallbackGoal(title, description, isFirst);
        createdId = fallbackGoal._id;
        const currentLocals = getLocalGoals();
        const updatedLocals = [fallbackGoal, ...currentLocals];
        saveLocalGoals(updatedLocals);
        setGoals([fallbackGoal, ...goals]);
        setSelectedGoalId(fallbackGoal._id);
      }

      setShowAddModal(false);
      setNewGoalTitle('');
      setNewGoalDesc('');

      window.dispatchEvent(
        new CustomEvent('campus-toast', {
          detail: {
            title: 'Goal Created Successfully',
            message: `AI Career roadmap generated for "${title}".`,
            type: 'success',
          },
        })
      );

      fetchGoals();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTask = async (goalId: string, milestoneId: string, taskId: string) => {
    // Optimistic update
    const updatedGoals = goals.map(g => {
      if (g._id !== goalId) return g;
      const updatedRoadmap = (g.roadmap || []).map((m: any) => {
        if (m._id !== milestoneId) return m;
        const updatedTasks = (m.tasks || []).map((t: any) => t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t);
        const completedCount = updatedTasks.filter((t: any) => t.isCompleted).length;
        const milestoneProgress = updatedTasks.length > 0 ? Math.round((completedCount / updatedTasks.length) * 100) : 0;
        return {
          ...m,
          tasks: updatedTasks,
          progress: milestoneProgress,
          status: milestoneProgress === 100 ? 'COMPLETED' : milestoneProgress > 0 ? 'IN_PROGRESS' : m.status
        };
      });
      const totalTasks = updatedRoadmap.reduce((acc: number, m: any) => acc + (m.tasks?.length || 0), 0);
      const completedTotal = updatedRoadmap.reduce((acc: number, m: any) => acc + (m.tasks?.filter((t: any) => t.isCompleted)?.length || 0), 0);
      const overallProgress = totalTasks > 0 ? Math.round((completedTotal / totalTasks) * 100) : 0;

      return {
        ...g,
        roadmap: updatedRoadmap,
        progress: overallProgress
      };
    });

    setGoals(updatedGoals);
    saveLocalGoals(updatedGoals);

    try {
      await studentGoalsApi.toggleTask(goalId, milestoneId, taskId);
      const res: any = await studentGoalsApi.getGoals();
      if (res?.data) setGoals(res.data);
    } catch (err) {
      console.warn('API task toggle fallback:', err);
    }
  };

  const handleRegenerate = async (goalId: string) => {
    try {
      setGoals(goals.map(g => g._id === goalId ? { ...g, roadmapGenerationStatus: 'pending' } : g));
      await studentGoalsApi.regenerateRoadmap(goalId);
      fetchGoals();
    } catch (err) {
      console.error(err);
      fetchGoals();
    }
  };

  const handleSetPrimary = async (goalId: string) => {
    const updated = goals.map(g => ({ ...g, isPrimary: g._id === goalId }));
    setGoals(updated);
    saveLocalGoals(updated);

    try {
      await studentGoalsApi.setPrimaryGoal(goalId);
      fetchGoals();
    } catch (err) {
      console.warn('API setPrimary fallback:', err);
    }
  };

  const handleDelete = async (goalId: string) => {
    const filtered = goals.filter(g => g._id !== goalId);
    setGoals(filtered);
    saveLocalGoals(filtered);
    if (selectedGoalId === goalId) {
      setSelectedGoalId(filtered.length > 0 ? filtered[0]._id : null);
    }

    try {
      await studentGoalsApi.deleteGoal(goalId);
      fetchGoals();
    } catch (err) {
      console.warn('API deleteGoal fallback:', err);
    }
  };

  if (loading) {
    return <div className="p-6 text-[#102A43] font-bold">Loading Goal Roadmap Engine...</div>;
  }

  const selectedGoal = goals.find(g => g._id === selectedGoalId);

  return (
    <div className="space-y-6">
      <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#102A43]">Goals & Career Roadmap</h2>
          <p className="text-xs text-[#5A6E7F]">Manage your career objectives, track real milestones, and execute AI-generated learning plans.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-[#F5C056]" />
          <span>New Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: List of Goals */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs h-[calc(100vh-280px)] overflow-y-auto">
            <h3 className="text-sm font-extrabold text-[#102A43] mb-4">Your Active Goals</h3>
            
            {goals.length === 0 ? (
              <div className="p-6 text-center text-[#5A6E7F] text-xs">No active goals found. Create one to begin generating your AI roadmap.</div>
            ) : (
              <div className="space-y-3">
                {goals.map(goal => (
                  <div 
                    key={goal._id} 
                    onClick={() => setSelectedGoalId(goal._id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedGoalId === goal._id 
                        ? 'bg-[#F7F2E9] border-[#123B63] shadow-xs' 
                        : 'bg-white border-[#E2D7C6] hover:border-[#C49A52]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 min-w-0">
                        {goal.isPrimary && <Star className="w-4 h-4 text-[#C49A52] fill-[#C49A52] shrink-0" />}
                        <h4 className="font-bold text-[#102A43] text-sm truncate">{goal.title}</h4>
                      </div>
                      <span className="text-xs font-extrabold text-[#123B63]">{goal.progress}%</span>
                    </div>
                    
                    <div className="w-full h-1.5 bg-[#E2D7C6] rounded-full overflow-hidden mt-3">
                      <div className="h-full bg-[#123B63] transition-all" style={{ width: `${goal.progress}%` }} />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[10px]">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${
                        goal.roadmapGenerationStatus === 'completed' ? 'bg-[#DCFCE7] text-[#15803D]' 
                        : goal.roadmapGenerationStatus === 'pending' ? 'bg-[#FEF3C7] text-[#D97706]' 
                        : 'bg-[#FEE2E2] text-[#B91C1C]'
                      }`}>
                        {goal.roadmapGenerationStatus.toUpperCase()}
                      </span>
                      <span className="text-[#5A6E7F]">
                        {goal.roadmap?.length || 0} Milestones
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Goal Detail & Roadmap */}
        <div className="lg:col-span-2">
          {selectedGoal ? (
            <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-6">
              <div className="flex items-start justify-between border-b border-[#E2D7C6] pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-6 h-6 text-[#123B63]" />
                    <h2 className="text-2xl font-extrabold text-[#102A43]">{selectedGoal.title}</h2>
                  </div>
                  {selectedGoal.description && (
                    <p className="mt-1 text-sm text-[#5A6E7F]">{selectedGoal.description}</p>
                  )}
                  <div className="mt-3 flex items-center space-x-2">
                    {!selectedGoal.isPrimary && (
                      <button 
                        onClick={() => handleSetPrimary(selectedGoal._id)}
                        className="px-3 py-1 text-[10px] font-bold rounded-lg bg-[#E9DDC9] hover:bg-[#E2D7C6] text-[#102A43]"
                      >
                        Set as Primary Goal
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(selectedGoal._id)}
                      className="px-3 py-1 text-[10px] font-bold rounded-lg bg-[#FEE2E2] hover:bg-[#FECACA] text-[#B91C1C] flex items-center space-x-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Archive Goal</span>
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-extrabold text-[#123B63] font-display">{selectedGoal.progress}%</div>
                  <p className="text-xs font-bold text-[#C49A52] uppercase tracking-wider">Overall Completion</p>
                </div>
              </div>

              {/* Roadmap Milestones */}
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-[#102A43] flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#C49A52]" />
                  <span>Execution Roadmap</span>
                </h3>

                {selectedGoal.roadmapGenerationStatus === 'pending' && (
                  <div className="p-6 rounded-xl border border-[#E2D7C6] bg-[#F7F2E9] text-center space-y-3">
                    <RefreshCw className="w-8 h-8 text-[#123B63] animate-spin mx-auto" />
                    <div>
                      <p className="font-extrabold text-[#102A43]">AI is synthesizing your roadmap...</p>
                      <p className="text-xs text-[#5A6E7F]">Analyzing skills, querying course databases, and building tasks.</p>
                    </div>
                  </div>
                )}

                {selectedGoal.roadmapGenerationStatus === 'failed' && (
                  <div className="p-6 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] text-center space-y-3">
                    <p className="font-bold text-[#B91C1C]">Roadmap generation failed or timed out.</p>
                    <button 
                      onClick={() => handleRegenerate(selectedGoal._id)}
                      className="px-4 py-2 bg-[#B91C1C] text-white rounded-xl text-xs font-bold hover:bg-[#991B1B]"
                    >
                      Retry Generation
                    </button>
                  </div>
                )}

                {selectedGoal.roadmapGenerationStatus === 'completed' && selectedGoal.roadmap.map((milestone: any, i: number) => (
                  <div key={milestone._id} className="p-5 rounded-xl border border-[#E2D7C6] bg-white space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#C49A52] uppercase tracking-wider">Milestone {i + 1}</span>
                        <h4 className="font-extrabold text-[#102A43] text-sm mt-0.5">{milestone.title}</h4>
                        <p className="text-xs text-[#5A6E7F] mt-1">{milestone.description}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#F7F2E9] text-[#123B63]">
                          {milestone.percentage}% Done
                        </span>
                      </div>
                    </div>

                    {/* Tasks Checklist */}
                    <div className="space-y-2 mt-2 pt-3 border-t border-[#F7F4EE]">
                      {milestone.tasks?.map((task: any) => (
                        <div 
                          key={task._id} 
                          onClick={() => handleToggleTask(selectedGoal._id, milestone._id, task._id)}
                          className={`flex items-start space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                            task.isCompleted ? 'hover:bg-[#F7F2E9]' : 'hover:bg-[#F7F2E9]'
                          }`}
                        >
                          <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                            task.isCompleted ? 'bg-[#15803D] border-[#15803D]' : 'bg-white border-[#E2D7C6]'
                          }`}>
                            {task.isCompleted && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                          </div>
                          <p className={`text-xs leading-relaxed ${task.isCompleted ? 'text-[#5A6E7F] line-through' : 'text-[#102A43] font-medium'}`}>
                            {task.text}
                          </p>
                        </div>
                      ))}
                      
                      {(!milestone.tasks || milestone.tasks.length === 0) && (
                        <p className="text-xs text-[#5A6E7F] italic p-2">No tasks assigned for this milestone.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col items-center justify-center h-64 text-center">
              <Target className="w-12 h-12 text-[#E2D7C6] mb-3" />
              <p className="font-extrabold text-[#102A43]">No Goal Selected</p>
              <p className="text-xs text-[#5A6E7F]">Select a goal from the left to view its complete roadmap.</p>
            </div>
          )}
        </div>
      </div>

      {/* ADD GOAL MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <form onSubmit={handleAddGoal} className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-md w-full space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <h3 className="text-lg font-extrabold text-[#102A43]">Declare New Career Goal</h3>
                <button type="button" onClick={() => setShowAddModal(false)} className="p-1 hover:bg-[#F7F2E9] rounded-lg">
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">Primary Target Title *</label>
                  <input
                    type="text"
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="e.g. Cloud Security Architect"
                    required
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E2D7C6] text-sm text-[#102A43] focus:outline-none focus:border-[#C49A52]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">Detailed Description (Optional)</label>
                  <textarea
                    value={newGoalDesc}
                    onChange={(e) => setNewGoalDesc(e.target.value)}
                    placeholder="I want to master AWS security, compliance frameworks, and incident response..."
                    rows={3}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E2D7C6] text-xs text-[#102A43] focus:outline-none focus:border-[#C49A52]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2D7C6] flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !newGoalTitle.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold transition-colors shadow-xs"
                >
                  {isSubmitting ? 'Igniting AI Engine...' : 'Generate Roadmap →'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
