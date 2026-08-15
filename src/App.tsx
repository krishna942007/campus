import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CleanNavbar } from './components/CleanNavbar';
import { CleanHero } from './components/CleanHero';
import { EverythingYouNeedSection } from './components/EverythingYouNeedSection';
import { PlatformPreviewSection } from './components/PlatformPreviewSection';
import { StudentCommunitySection } from './components/StudentCommunitySection';

import { StudentDashboardStory } from './components/StudentDashboardStory';
import { AIAssistantSection } from './components/AIAssistantSection';
import { LearningRoadmapSection } from './components/LearningRoadmapSection';
import { SkillGapSection } from './components/SkillGapSection';
import { MentoringSection } from './components/MentoringSection';
import { AcademicAttendanceSection } from './components/AcademicAttendanceSection';
import { VITKnowledgeRAG } from './components/VITKnowledgeRAG';
import { ProductFooter } from './components/ProductFooter';

import { LoginPage } from './components/LoginPage';
import { StudentPortal } from './components/StudentPortal';
import { MentorPortal } from './components/MentorPortal';
import { AdminPortal } from './components/AdminPortal';

export function App() {
  const [loginRole, setLoginRole] = useState<'STUDENT' | 'MENTOR' | 'ADMIN'>('STUDENT');
  const [activeView, setActiveView] = useState<'LANDING' | 'LOGIN' | 'STUDENT' | 'MENTOR' | 'ADMIN'>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/login')) return 'LOGIN';
    if (path.startsWith('/student')) return 'STUDENT';
    if (path.startsWith('/mentor')) return 'MENTOR';
    if (path.startsWith('/admin')) return 'ADMIN';
    return 'LANDING';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/login')) {
        setActiveView('LOGIN');
      } else if (path.startsWith('/student')) {
        setActiveView('STUDENT');
      } else if (path.startsWith('/mentor')) {
        setActiveView('MENTOR');
      } else if (path.startsWith('/admin')) {
        setActiveView('ADMIN');
      } else {
        setActiveView('LANDING');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateToRoot = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    setActiveView('LANDING');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenLogin = (role: 'STUDENT' | 'MENTOR' | 'ADMIN' = 'STUDENT') => {
    setLoginRole(role);
    if (window.location.pathname !== '/login') {
      window.history.pushState({}, '', '/login');
    }
    setActiveView('LOGIN');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handlePerformLogin = (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => {
    const route = role === 'STUDENT' ? '/student' : role === 'MENTOR' ? '/mentor' : '/admin';
    if (window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    setActiveView(role);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#10253A] font-sans antialiased relative selection:bg-[#C99632] selection:text-white">
      <AnimatePresence mode="wait">
        {activeView === 'LANDING' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Section 1: Sticky Glass Navigation Bar */}
            <CleanNavbar
              onSelectRole={handleOpenLogin}
              activeView={activeView}
              setActiveView={setActiveView}
            />

            {/* Main Content Flow */}
            <main className="w-full space-y-0">
              {/* Section 2: Hero Section with Architectural Background & Staggered Reveal */}
              <CleanHero onSelectRole={handleOpenLogin} />

              {/* Section 3: 5 Core Feature Cards ("Everything You Need to Grow") */}
              <EverythingYouNeedSection />

              {/* Section 4: Platform Preview & Dashboard Showcase */}
              <PlatformPreviewSection />

              {/* Section 5: Student Profile Story */}
              <div id="dashboard">
                <StudentDashboardStory />
              </div>

              {/* Section 6: AI Assistant Second Brain */}
              <div id="ai-assistant">
                <AIAssistantSection />
              </div>

              {/* Section 7: Learning Roadmap & Skill-Gap Analysis */}
              <div id="roadmap">
                <LearningRoadmapSection />
                <SkillGapSection />
              </div>

              {/* Section 8: Faculty Mentoring */}
              <div id="mentoring">
                <MentoringSection />
              </div>

              {/* Section 9: Academic ERP Trust Integrity */}
              <div id="erp">
                <AcademicAttendanceSection />
              </div>

              {/* Section 10: Student Community */}
              <StudentCommunitySection onSelectRole={handleOpenLogin} />

              {/* Section 11: VIT Institutional RAG Knowledge Base */}
              <div id="rag">
                <VITKnowledgeRAG />
              </div>
            </main>

            {/* Section 12: Footer */}
            <ProductFooter onSelectRole={handleOpenLogin} />
          </motion.div>
        )}

        {activeView === 'LOGIN' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <LoginPage
              initialRole={loginRole}
              onLogin={handlePerformLogin}
              onBackToLanding={handleNavigateToRoot}
            />
          </motion.div>
        )}

        {activeView === 'STUDENT' && (
          <motion.div
            key="student"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <StudentPortal onBackToLanding={handleNavigateToRoot} />
          </motion.div>
        )}

        {activeView === 'MENTOR' && (
          <motion.div
            key="mentor"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <MentorPortal onBackToLanding={handleNavigateToRoot} />
          </motion.div>
        )}

        {activeView === 'ADMIN' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <AdminPortal onBackToLanding={handleNavigateToRoot} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
