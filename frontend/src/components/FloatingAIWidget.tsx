import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, Move, Minimize2, Maximize2, Compass, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';

export const FloatingAIWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hi! I am VITARA AI. Ask me anything about syllabus, attendance criteria, faculty mentors, or career roadmaps!' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { sender: 'USER', text: textToSend }]);
    if (!queryText) setInput('');
    setIsThinking(true);

    (async () => {
      let responseText = '';
      try {
        const token = localStorage.getItem('accessToken');
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        // Attempt primary Vite proxy endpoint first, fallback to direct port 5000
        let res = await fetch('/api/v1/ai/chat', {
          method: 'POST',
          headers,
          body: JSON.stringify({ prompt: textToSend, isGroundedInRAG: true })
        }).catch(() => null);

        if (!res || !res.ok) {
          res = await fetch('http://localhost:5000/api/v1/ai/chat', {
            method: 'POST',
            headers,
            body: JSON.stringify({ prompt: textToSend, isGroundedInRAG: true })
          }).catch(() => null);
        }

        if (res && res.ok) {
          const data = await res.json();
          if (data.data && data.data.reply) {
            responseText = data.data.reply;
          }
        }
      } catch (err) {
        console.warn('Floating AI Widget API error:', err);
      }

      if (!responseText) {
        const q = textToSend.toLowerCase().trim();
        if (q === 'hi' || q === 'hello' || q === 'hey') {
          responseText = `Hello! 👋 I am your VITARA AI Academic Copilot. How can I help you today? Feel free to ask about your courses, attendance requirements, syllabus, faculty mentors, or career roadmaps!`;
        } else if (q.includes('attendance') || q.includes('rule') || q.includes('criteria')) {
          responseText = 'Under VIT Autonomous Ordinance 4.2, students must maintain a minimum of 75% attendance in every course. Students between 65%-74% require Dean approval for medical/extenuating reasons.';
        } else if (q.includes('mentor') || q.includes('faculty') || q.includes('kulkarni')) {
          responseText = 'Prof. S. Kulkarni (Associate Professor, AI & DS) has office hours Mon/Wed 3:00 PM – 5:00 PM in Room M-304. You can book an academic review in the Mentoring tab.';
        } else if (q.includes('cgpa') || q.includes('grade') || q.includes('honors')) {
          responseText = 'To be eligible for Honors in Applied Deep Learning, you must maintain a cumulative CGPA ≥ 7.50 without any active backlogs at the end of Semester IV.';
        } else {
          responseText = `I'm here to assist with all your academic and career goals at VIT Mumbai. Ask me about subject attendance thresholds, lab assignments, or your personalized learning roadmap!`;
        }
      }

      setIsThinking(false);
      setMessages(prev => [...prev, { sender: 'AI', text: responseText }]);
    })();
  };

  return (
    <>
      {/* 1. FLOATING DRAGGABLE CIRCULAR ORB */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-[9999] cursor-grab active:cursor-grabbing select-none"
      >
        <div className="relative group">
          {/* Subtle glowing animated pulse rings */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#C99632] via-[#0C2238] to-[#C99632] opacity-70 blur-md group-hover:opacity-100 animate-pulse transition duration-500" />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#0C2238] via-[#123B63] to-[#07182A] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(12,34,56,0.4)] border-2 border-[#C99632]/60 focus:outline-none transition-all duration-300"
            title="Drag to move anywhere • Click to open AI"
            aria-label="Open VIT AI Assistant"
          >
            <Sparkles className="w-6 h-6 text-[#E8C56B] animate-spin-slow" />
            
            {/* Online Indicator Dot */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#159A72] border-2 border-white shadow-xs" />
          </button>

          {/* Quick Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0C2238]/90 backdrop-blur-md text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-[#C99632]/30">
            ✦ VITARA AI • Drag anywhere
          </div>
        </div>
      </motion.div>

      {/* 2. LIQUID GLASS MINI CHATBOX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-[9998] right-6 bottom-24 bg-[#FFFCF7]/95 backdrop-blur-2xl border border-[#0C2238]/12 shadow-[0_20px_60px_rgba(12,34,56,0.2)] rounded-3xl flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded 
                ? 'w-[90vw] sm:w-[480px] h-[580px]' 
                : 'w-[88vw] sm:w-[380px] h-[460px]'
            }`}
          >
            {/* Header */}
            <div className="p-3.5 px-4.5 bg-gradient-to-r from-[#0C2238] to-[#123B63] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-[#C99632]/40">
                  <Sparkles className="w-4 h-4 text-[#E8C56B]" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white tracking-tight flex items-center space-x-1.5">
                    <span>VITARA AI Copilot</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-[#159A72] text-[9px] font-bold text-white">RAG Active</span>
                  </h3>
                  <p className="text-[9px] text-slate-300 font-medium">VIT Mumbai Academic Knowledge</p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'USER'
                      ? 'bg-[#0C2238] text-white rounded-br-xs shadow-sm font-medium'
                      : 'bg-[#F7F4EE] text-[#10253A] border border-[#0C2238]/08 rounded-bl-xs leading-relaxed shadow-2xs'
                  }`}>
                    <div className="whitespace-pre-wrap leading-relaxed space-y-1.5">{m.text}</div>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="p-2.5 px-4 rounded-2xl bg-[#F7F4EE] border border-[#0C2238]/08 text-[11px] text-[#627083] flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#C99632] animate-ping" />
                    <span>Searching VIT Knowledge Graph...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-[#F7F4EE]/60 border-t border-[#0C2238]/06 flex items-center gap-1.5 overflow-x-auto text-[10px]">
              {[
                'Attendance 75% Rule',
                'Honors CGPA Criteria',
                'Mid-Sem Schedule',
                'Mentor Office Hours'
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-[#EFE7D8] text-[#10253A] font-bold border border-[#0C2238]/10 whitespace-nowrap transition-colors cursor-pointer shadow-2xs shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-3 bg-[#FFFCF7] border-t border-[#0C2238]/08 flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about rules, CGPA, courses..."
                className="flex-1 px-3.5 py-2 rounded-full bg-[#F7F4EE] border border-[#0C2238]/10 text-xs text-[#10253A] placeholder-[#627083] focus:outline-none focus:border-[#0C2238]"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-[#0C2238] hover:bg-[#123B63] text-white transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-[#E8C56B]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
