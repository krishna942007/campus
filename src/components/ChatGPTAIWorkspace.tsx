import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Globe,
  Bot,
  User,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Cpu,
  Code,
  Search,
  MessageSquare,
  PanelLeftClose,
  PanelLeft,
  FileText,
  Sliders,
  Download
} from 'lucide-react';

interface ChatSession {
  id: string;
  title: string;
  date: string;
  category: 'Today' | 'Yesterday' | 'Previous 7 Days';
  messages: {
    sender: 'AI' | 'USER';
    text: string;
    thoughts?: string;
    timestamp: string;
  }[];
}

interface ChatGPTAIWorkspaceProps {
  userName?: string;
  userRole?: 'STUDENT' | 'MENTOR' | 'ADMIN';
  defaultPrompt?: string;
  onToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ChatGPTAIWorkspace: React.FC<ChatGPTAIWorkspaceProps> = ({
  userName = 'Krishna Singh',
  userRole = 'STUDENT',
  defaultPrompt,
  onToast
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState('Google Gemini 2.0 Pro (RAG Grounded)');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [isGroundedInRAG, setIsGroundedInRAG] = useState(true);
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const [expandedThoughts, setExpandedThoughts] = useState<Record<number, boolean>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [searchHistory, setSearchHistory] = useState('');

  // Chat Sessions History
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: 'session-1',
      title: 'CS503 Deep Learning & RAG Milestone Guidance',
      date: 'Today',
      category: 'Today',
      messages: [
        {
          sender: 'AI',
          text: `Hello ${userName}! I am your VITARA AI Operations & Academic Copilot. How can I assist your coursework, research, or system telemetry today?`,
          timestamp: '10:15 AM'
        },
        {
          sender: 'USER',
          text: 'What are the criteria for enrolling in the Honors Degree in Applied Deep Learning?',
          timestamp: '10:16 AM'
        },
        {
          sender: 'AI',
          text: `According to the **VIT Mumbai Autonomous Academic Ordinance 2026 (Sec 4.8)**:\n\n1. **CGPA Prerequisite**: Cumulative CGPA $\\ge 7.50$ at the end of Semester IV with zero active backlogs.\n2. **Credit Structure**: Requires **20 additional credits** across 4 semesters (Sem V through Sem VIII).\n3. **Core Electives Included**:\n   - *Deep Generative Models & Transformers (CS581)*\n   - *Reinforcement Learning in Robotics (CS582)*\n   - *Honors Capstone Industry Project (CS589)*\n4. **Faculty Mentor Endorsement**: Mandatory sign-off from your assigned mentor (**Prof. S. Kulkarni**).`,
          thoughts: 'Reasoning: Checked RAG vector database for "Honors Degree in Applied Deep Learning" in VIT Academic Regulations v2.1. Validated 20 additional credits requirement and 7.50 CGPA threshold.',
          timestamp: '10:16 AM'
        }
      ]
    },
    {
      id: 'session-2',
      title: 'Attendance Criteria & Medical Exemption Rules',
      date: 'Today',
      category: 'Today',
      messages: [
        {
          sender: 'USER',
          text: 'Explain the 75% attendance rule and condonation process.',
          timestamp: '11:42 AM'
        },
        {
          sender: 'AI',
          text: `Here is the authoritative attendance policy:\n\n- **Minimum Required**: 75% attendance in theory & practical separately.\n- **Condonation Bracket (65%–74%)**: Permissible only with formal medical certificate or institutional representation approval by Dean Academics.\n- **Below 65%**: Direct grade drop / detention under University Ordinance.`,
          thoughts: 'Reasoning: Retrieved attendance condonation parameters from Ordinance 4.2 in RAG database.',
          timestamp: '11:43 AM'
        }
      ]
    },
    {
      id: 'session-3',
      title: 'Semester IV Coursework & Placement Plan',
      date: 'Yesterday',
      category: 'Yesterday',
      messages: [
        {
          sender: 'USER',
          text: 'Give me a 6-week roadmap to prepare for AI engineering internships.',
          timestamp: 'Yesterday'
        },
        {
          sender: 'AI',
          text: `Here is your structured 6-Week AI Placement Roadmap tailored for your 8.92 CGPA profile:\n\n- **Weeks 1-2**: Advanced DSA (Graph Algorithms, Dynamic Programming on LeetCode).\n- **Weeks 3-4**: PyTorch & HuggingFace LLM Fine-Tuning hands-on project.\n- **Weeks 5-6**: System Design & Mock Technical Interviews with Prof. S. Kulkarni.`,
          timestamp: 'Yesterday'
        }
      ]
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState('session-1');
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isGenerating]);

  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: 'New Conversation',
      date: 'Today',
      category: 'Today',
      messages: [
        {
          sender: 'AI',
          text: `Hello ${userName}! I am your VITARA AI Copilot. Ask me anything about academic ordinances, course roadmaps, or research guidance.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
    if (onToast) onToast('New Chat Started', 'Ready for a fresh academic session.', 'info');
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessions.length === 1) {
      handleNewChat();
      return;
    }
    const remaining = sessions.filter(s => s.id !== id);
    setSessions(remaining);
    if (activeSessionId === id) {
      setActiveSessionId(remaining[0].id);
    }
    if (onToast) onToast('Chat Deleted', 'Removed conversation from history.', 'info');
  };

  const handleSendMessage = (customText?: string) => {
    const text = customText || inputMessage;
    if (!text.trim() || isGenerating) return;

    const userMsg = {
      sender: 'USER' as const,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update active session with user message
    const updatedSessions = sessions.map(s => {
      if (s.id === activeSessionId) {
        const title = s.title === 'New Conversation' ? text.slice(0, 42) + '...' : s.title;
        return {
          ...s,
          title,
          messages: [...s.messages, userMsg]
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    if (!customText) setInputMessage('');
    setIsGenerating(true);

    // Simulate AI generation with step-by-step reasoning
    setTimeout(() => {
      setIsGenerating(false);
      const query = text.toLowerCase();
      let reply = '';
      let thoughts = '';

      if (query.includes('cgpa') || query.includes('grade') || query.includes('marks')) {
        reply = `Your official academic record shows a **Current CGPA of 8.92** (Top 5% in Division A). To maintain your trajectory towards a 9.0+ milestone at the end of Semester IV, you need a minimum SGPA of **9.25** in the upcoming End-Sem exams.`;
        thoughts = `Reasoning: Accessed student academic ledger via PostgreSQL database mirror. Total earned credits: 84. Projected formula calculation: (8.92 * 84 + target_sgpa * 22) / 106.`;
      } else if (query.includes('attendance') || query.includes('leave') || query.includes('absent')) {
        reply = `You currently have **91.4% overall attendance** (113 attended out of 126 classes). You are well above the statutory 75% threshold across all subjects including CS501 Algorithms (93.3%) and CS502 DBMS (92.8%).`;
        thoughts = `Reasoning: Queried smart campus RFID attendance log. Validated that zero condonation flags exist for student ID 2023CSE001.`;
      } else if (query.includes('mentor') || query.includes('kulkarni') || query.includes('faculty')) {
        reply = `Your assigned faculty mentor is **Prof. S. Kulkarni** (Associate Professor, AI & DS). His office hours are **Mon & Wed 3:00 PM – 5:00 PM** in Room M-304. You can book an 1-on-1 session directly from your Mentoring portal tab.`;
        thoughts = `Reasoning: Resolved faculty pairing from Shared Mentoring Store. Active status: ACCEPTED.`;
      } else if (query.includes('course') || query.includes('recommend') || query.includes('online')) {
        reply = `Based on your goal (*AI / Machine Learning Engineer*), here are the top 3 verified online courses:\n\n1. **Deep Learning Specialization by Andrew Ng** (Coursera) — 16 Weeks, 4.9 ★\n2. **CS50's Introduction to AI with Python** (Harvard / edX) — 7 Weeks, 100% Free\n3. **PostgreSQL Bootcamp & pgvector** (Udemy) — Matches your RAG development milestone.`;
        thoughts = `Reasoning: Queried curated course catalog matching student interest: "AI / Machine Learning" and semester IV prerequisites.`;
      } else {
        reply = `I have analyzed your query against the **VIT Mumbai Academic Knowledge Graph**:\n\nRegarding *"${text}"*, our institutional guidelines emphasize continuous project development and faculty mentorship. Your profile is currently on track for Year 3 Honors and Tier-1 Placement drives.`;
        thoughts = `Reasoning: Formulated response using model ${selectedModel} with pgvector RAG context matching (Similarity score: 0.91).`;
      }

      const aiMsg = {
        sender: 'AI' as const,
        text: reply,
        thoughts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: [...s.messages, aiMsg] } : s));
    }, 850);
  };

  const handleCopyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
    if (onToast) onToast('Copied to Clipboard', 'Text copied successfully.', 'success');
  };

  return (
    <div className="flex h-[calc(100vh-140px)] w-full rounded-3xl bg-[#FFFDF8] border border-[#E2D7C6] shadow-xl overflow-hidden text-[#102A43]">
      
      {/* 1. CHATGPT-STYLE SIDEBAR (HISTORY) */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-[#F7F2E9] border-r border-[#E2D7C6] flex flex-col justify-between shrink-0 overflow-hidden"
          >
            <div className="p-3.5 space-y-3 flex-1 overflow-y-auto">
              
              {/* New Chat Button */}
              <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-[#F5C056]" />
                  <span>New Academic Chat</span>
                </div>
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
              </button>

              {/* Search History */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#5A6E7F] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchHistory}
                  onChange={(e) => setSearchHistory(e.target.value)}
                  placeholder="Search chat history..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#FFFDF8] border border-[#E2D7C6] text-[11px] text-[#102A43] focus:outline-none focus:border-[#123B63]"
                />
              </div>

              {/* Grouped History List */}
              <div className="space-y-4 pt-1">
                {['Today', 'Yesterday', 'Previous 7 Days'].map((cat) => {
                  const catSessions = sessions.filter(s => 
                    s.category === cat && 
                    s.title.toLowerCase().includes(searchHistory.toLowerCase())
                  );
                  if (catSessions.length === 0) return null;

                  return (
                    <div key={cat} className="space-y-1">
                      <p className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-[#5A6E7F]">
                        {cat}
                      </p>
                      <div className="space-y-0.5">
                        {catSessions.map((session) => {
                          const isActive = session.id === activeSessionId;
                          return (
                            <div
                              key={session.id}
                              onClick={() => setActiveSessionId(session.id)}
                              className={`w-full group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isActive 
                                  ? 'bg-[#E9DDC9] text-[#102A43] font-bold shadow-2xs' 
                                  : 'text-[#5A6E7F] hover:bg-[#E9DDC9]/50 hover:text-[#102A43]'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate pr-2">
                                <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#123B63]' : 'text-[#5A6E7F]'}`} />
                                <span className="truncate">{session.title}</span>
                              </div>

                              <button
                                onClick={(e) => handleDeleteSession(session.id, e)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:text-[#B91C1C] transition-opacity"
                                title="Delete chat"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Sidebar Bottom Info */}
            <div className="p-3 border-t border-[#E2D7C6] bg-[#F7F2E9] text-[11px] text-[#5A6E7F] space-y-1">
              <div className="flex items-center justify-between font-bold text-[#102A43]">
                <span>VIT RAG Corpus</span>
                <span className="text-[#15803D] flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                  <span>270 Chunks</span>
                </span>
              </div>
              <p className="text-[10px] text-[#5A6E7F]">Autonomous Ordinances & Syllabi</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 2. MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FFFDF8] relative">
        
        {/* Top Chat Header */}
        <div className="px-5 py-3 border-b border-[#E2D7C6] bg-[#FFFDF8]/90 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-[#F7F2E9] hover:bg-[#E9DDC9] text-[#102A43] border border-[#E2D7C6] transition-colors cursor-pointer"
              title={sidebarOpen ? 'Collapse history' : 'Expand history'}
            >
              {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
            </button>

            {/* Model Selector Pill */}
            <div className="relative">
              <button
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#F7F2E9] hover:bg-[#E9DDC9] border border-[#E2D7C6] text-xs font-bold text-[#102A43] transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C49A52]" />
                <span>{selectedModel}</span>
                <ChevronDown className="w-3 h-3 text-[#5A6E7F]" />
              </button>

              <AnimatePresence>
                {modelDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#FFFDF8] border border-[#E2D7C6] shadow-2xl p-2 space-y-1 z-50 text-xs font-semibold"
                  >
                    {[
                      { name: 'Google Gemini 2.0 Pro (RAG Grounded)', desc: 'Full institutional ordinance reasoning' },
                      { name: 'Google Gemini 2.0 Flash (Fast Reasoning)', desc: 'Ultra-low latency student guidance' },
                      { name: 'DeepSeek R1 (Chain-of-Thought)', desc: 'Step-by-step mathematical logic' },
                      { name: 'Anthropic Claude 3.5 Sonnet', desc: 'Advanced code & paper synthesis' },
                    ].map((m) => (
                      <button
                        key={m.name}
                        onClick={() => {
                          setSelectedModel(m.name);
                          setModelDropdownOpen(false);
                          if (onToast) onToast('Model Switched', `Active model: ${m.name}`, 'info');
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-colors ${
                          selectedModel === m.name ? 'bg-[#123B63] text-white font-bold' : 'hover:bg-[#F7F2E9]'
                        }`}
                      >
                        <p>{m.name}</p>
                        <p className={`text-[10px] ${selectedModel === m.name ? 'text-slate-300' : 'text-[#5A6E7F]'}`}>{m.desc}</p>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsGroundedInRAG(!isGroundedInRAG);
                if (onToast) onToast(isGroundedInRAG ? 'RAG Disabled' : 'RAG Grounding Enabled', isGroundedInRAG ? 'Standard LLM reasoning' : 'Strict institutional knowledge lookup', 'info');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                isGroundedInRAG 
                  ? 'bg-[#DCFCE7] border-[#15803D]/30 text-[#15803D]' 
                  : 'bg-[#F7F2E9] border-[#E2D7C6] text-[#5A6E7F]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isGroundedInRAG ? 'VIT Knowledge Active' : 'Knowledge Off'}</span>
            </button>
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Active Session Messages */}
          {activeSession.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-4xl mx-auto ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'AI' && (
                <div className="w-8 h-8 rounded-xl bg-[#123B63] text-[#F5C056] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm border border-[#C49A52]/40 mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div className={`space-y-2 max-w-[82%] sm:max-w-[75%] ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}>
                
                {/* Expandable Chain-of-Thought Reasoning Block */}
                {msg.thoughts && (
                  <div className="rounded-xl border border-[#E2D7C6] bg-[#F7F2E9]/80 overflow-hidden text-xs">
                    <button
                      onClick={() => setExpandedThoughts(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      className="w-full px-3 py-2 flex items-center justify-between text-[#5A6E7F] hover:text-[#102A43] font-bold cursor-pointer"
                    >
                      <div className="flex items-center space-x-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#C49A52]" />
                        <span>View Reasoning Process ({selectedModel.split(' ')[1] || 'AI'})</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedThoughts[idx] ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedThoughts[idx] && (
                      <div className="p-3 border-t border-[#E2D7C6] font-mono text-[11px] text-[#5A6E7F] leading-relaxed bg-[#FFFDF8]">
                        {msg.thoughts}
                      </div>
                    )}
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'USER'
                    ? 'bg-[#123B63] text-white rounded-br-none font-medium'
                    : 'bg-[#F7F2E9] text-[#102A43] border border-[#E2D7C6] rounded-bl-none'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>

                {/* AI Action Toolbar */}
                {msg.sender === 'AI' && (
                  <div className="flex items-center space-x-2 text-[#5A6E7F] text-xs pt-0.5 px-1">
                    <button
                      onClick={() => handleCopyMessage(msg.text, idx)}
                      className="hover:text-[#102A43] p-1 rounded-md hover:bg-[#F7F2E9] transition-colors flex items-center space-x-1"
                      title="Copy response"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleSendMessage(activeSession.messages[idx - 1]?.text || 'Regenerate')}
                      className="hover:text-[#102A43] p-1 rounded-md hover:bg-[#F7F2E9] transition-colors"
                      title="Regenerate"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { if (onToast) onToast('Feedback Saved', 'Thank you for your rating.', 'success'); }}
                      className="hover:text-[#15803D] p-1 rounded-md hover:bg-[#F7F2E9] transition-colors"
                      title="Helpful"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-[#5A6E7F] ml-2">{msg.timestamp}</span>
                  </div>
                )}

              </div>

              {msg.sender === 'USER' && (
                <div className="w-8 h-8 rounded-xl bg-[#E9DDC9] text-[#102A43] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm border border-[#E2D7C6] mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Thinking animation */}
          {isGenerating && (
            <div className="flex gap-3 max-w-4xl mx-auto items-center">
              <div className="w-8 h-8 rounded-xl bg-[#123B63] text-[#F5C056] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="p-3.5 px-5 rounded-2xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#5A6E7F] flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C49A52] animate-ping" />
                <span className="font-semibold text-[#102A43]">Synthesizing verified institutional answer...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        {activeSession.messages.length <= 2 && (
          <div className="px-6 py-2 max-w-4xl mx-auto w-full">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#5A6E7F] mb-2">
              Suggested Academic Prompts:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { title: 'Evaluate my CGPA trajectory for Honors Track', category: 'Academics' },
                { title: 'List verified online courses for AI & Machine Learning', category: 'Curriculum' },
                { title: 'Explain attendance condonation & medical rules', category: 'Regulations' },
                { title: 'Schedule review with Prof. S. Kulkarni', category: 'Mentoring' },
              ].map((card) => (
                <button
                  key={card.title}
                  onClick={() => handleSendMessage(card.title)}
                  className="p-3 rounded-2xl bg-[#F7F2E9] hover:bg-[#E9DDC9] border border-[#E2D7C6] text-left text-xs font-bold text-[#102A43] transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <span className="text-[9px] uppercase tracking-wider text-[#C49A52] font-black block mb-0.5">{card.category}</span>
                  <span>{card.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom ChatGPT Prompt Input Box */}
        <div className="p-4 bg-[#FFFDF8] border-t border-[#E2D7C6] shrink-0">
          <div className="max-w-4xl mx-auto space-y-2">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="relative bg-[#F7F2E9] rounded-3xl border border-[#E2D7C6] shadow-sm focus-within:border-[#123B63] focus-within:shadow-md transition-all p-2 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => { if (onToast) onToast('Attach Syllabus', 'Select PDF or assignment rubric to analyze with RAG.', 'info'); }}
                className="p-2 rounded-full hover:bg-[#E9DDC9] text-[#5A6E7F] hover:text-[#102A43] transition-colors cursor-pointer"
                title="Attach Document / Syllabus"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask ${selectedModel.split(' ')[1] || 'AI'} anything about courses, ordinances, or career path...`}
                className="flex-1 bg-transparent text-xs sm:text-sm text-[#102A43] placeholder-[#5A6E7F] focus:outline-none px-2"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isGenerating}
                className="p-2.5 rounded-full bg-[#123B63] hover:bg-[#1D4E73] disabled:opacity-40 text-white transition-all cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4 text-[#F5C056]" />
              </button>
            </form>

            <p className="text-center text-[10px] text-[#5A6E7F]">
              VITARA AI answers are strictly grounded in official VIT Mumbai ordinances and autonomous department regulations.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
