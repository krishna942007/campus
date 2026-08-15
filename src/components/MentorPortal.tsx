import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Sparkles,
  Search,
  Plus,
  MessageSquare,
  ChevronRight,
  GraduationCap,
  ArrowLeft,
  UserCheck,
  Brain,
  Award,
  Clock,
  ShieldCheck,
  FileText,
  Filter,
  Send,
  X,
  Lock,
  Eye,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  HelpCircle,
  ExternalLink,
  Target,
  Check,
  AlertCircle,
  FileCode,
  Upload,
  BookOpen,
  User,
  RotateCcw,
  CheckSquare
} from 'lucide-react';
import {
  getMentoringStore,
  saveMentoringStore,
  MentorRequest,
  ChangeMentorRequest,
  CourseworkAssignment,
  MentoringMeeting,
  SessionFeedbackLog,
  AssignedOnlineCourse
} from '../services/mentoringStore';
import { ToastNotification, ToastMessage } from './ToastNotification';

interface MentorPortalProps {
  onBackToLanding: () => void;
}

export const MentorPortal: React.FC<MentorPortalProps> = ({ onBackToLanding }) => {
  const [activeNav, setActiveNav] = useState<
    | 'Overview'
    | 'Mentor Requests'
    | 'My Students'
    | 'Assignments'
    | 'Online Course Explorer'
    | 'Attention & Risk'
    | 'Meetings'
    | 'Feedback & Goals'
    | 'Progress Analytics'
    | 'AI Mentor Assistant'
    | 'Notifications'
    | 'Settings'
  >('Overview');

  // Shared Mentoring Store State
  const [storeState, setStoreState] = useState(() => getMentoringStore());

  useEffect(() => {
    const syncStore = () => setStoreState(getMentoringStore());
    window.addEventListener('storage', syncStore);
    return () => window.removeEventListener('storage', syncStore);
  }, []);

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

  const [filterRisk, setFilterRisk] = useState<'ALL' | 'ATTENTION' | 'WARNING' | 'HIGH_PERFORMER'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Selection States
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [acceptConfirmModal, setAcceptConfirmModal] = useState<MentorRequest | null>(null);
  const [declineModal, setDeclineModal] = useState<MentorRequest | null>(null);
  const [declineReason, setDeclineReason] = useState('Current mentoring capacity reached');
  
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionMentee, setSessionMentee] = useState<any | null>(null);
  const [sessionType, setSessionType] = useState('1-on-1 Mentoring');
  const [privateNotes, setPrivateNotes] = useState('');
  const [studentVisibleFeedback, setStudentVisibleFeedback] = useState('');
  const [followUpAction, setFollowUpAction] = useState('');

  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    code: 'CS503',
    title: '',
    deadline: '',
    maxMarks: 50,
    latePolicy: 'Late submissions allowed up to 24 hrs with -10% mark deduction penalty.'
  });

  const [showScheduleMeetingModal, setShowScheduleMeetingModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    studentId: '2023CSE001',
    studentName: 'Krishna Singh',
    date: 'Aug 22, 2026 at 4:00 PM IST',
    title: '1-on-1 Placement & Capstone Review'
  });

  // Online Course Explorer & Assignment Modal State
  const [selectedCourseToAssign, setSelectedCourseToAssign] = useState<any | null>(null);
  const [assignStudentId, setAssignStudentId] = useState<string>('2023CSE001');
  const [assignNote, setAssignNote] = useState<string>('');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<string>('ALL');

  const verifiedOnlineCourses = [
    {
      id: 'oc-01',
      title: 'Stanford CS229: Machine Learning',
      provider: 'Stanford University',
      platform: 'Stanford Online / YouTube',
      url: 'https://cs229.stanford.edu/',
      category: 'AI / Machine Learning',
      difficulty: 'Advanced',
      duration: '10 Weeks (Self-Paced)',
      description: 'Supervised Learning, Deep Learning, Support Vector Machines, Kernels, Reinforcement Learning & Neural Nets.',
      syllabus: ['Linear Regression & Logistic Models', 'Support Vector Machines & Kernel Tricks', 'Deep Neural Networks & Backpropagation', 'Reinforcement Learning & Policy Search'],
      recommendedGoal: 'AI / ML Engineer & Data Science Placement'
    },
    {
      id: 'oc-02',
      title: 'DeepLearning.AI: Deep Learning Specialization',
      provider: 'DeepLearning.AI / Andrew Ng',
      platform: 'Coursera',
      url: 'https://www.coursera.org/specializations/deep-learning',
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      duration: '16 Weeks',
      description: 'Master Neural Networks, Hyperparameter Tuning, Convolutional Nets (CNNs), and Sequence Models (Transformers).',
      syllabus: ['Neural Networks and Deep Learning', 'Improving Deep Neural Networks: Hyperparameter Tuning', 'Structuring Machine Learning Projects', 'Convolutional Neural Networks (CNNs)', 'Sequence Models & Attention'],
      recommendedGoal: 'Neural Network Architect & Computer Vision'
    },
    {
      id: 'oc-03',
      title: 'MIT 6.006: Introduction to Algorithms',
      provider: 'MIT OpenCourseWare',
      platform: 'MIT OCW',
      url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/',
      category: 'Core Computer Science',
      difficulty: 'Intermediate to Advanced',
      duration: '12 Weeks',
      description: 'Mathematical analysis of algorithms, Data Structures, Sorting, Searching, Graphs, Dynamic Programming & Shortest Paths.',
      syllabus: ['Algorithmic Thinking & Peak Finding', 'Heap Sort & Binary Search Trees', 'Hashing & Resizing Array Maps', 'Shortest Paths & Dijkstra Algorithm', 'Dynamic Programming & Fibonacci Subproblems'],
      recommendedGoal: 'Software Engineering Placements & Technical Interviews'
    },
    {
      id: 'oc-04',
      title: 'Harvard CS50: Introduction to Computer Science',
      provider: 'Harvard University',
      platform: 'edX / Harvard Online',
      url: 'https://pll.harvard.edu/course/cs50-introduction-computer-science',
      category: 'Full-Stack & Systems',
      difficulty: 'Beginner to Intermediate',
      duration: '12 Weeks',
      description: 'An entry-level course teaching algorithmic thinking and problem-solving. Covers C, Python, SQL, HTML/CSS, JavaScript, and Web Development.',
      syllabus: ['Scratch & C Foundations', 'Arrays, Memory & Pointers', 'Data Structures & Hash Tables', 'Python, SQL & Database Queries', 'Flask / Web App Architecture'],
      recommendedGoal: 'Full-Stack Developer & Software Generalist'
    },
    {
      id: 'oc-05',
      title: 'fast.ai: Practical Deep Learning for Coders',
      provider: 'fast.ai / Jeremy Howard',
      platform: 'fast.ai',
      url: 'https://course.fast.ai/',
      category: 'AI / Machine Learning',
      difficulty: 'Intermediate',
      duration: '8 Weeks',
      description: 'Hands-on practical deep learning for coders. Building computer vision, NLP, and tabular models using PyTorch & fastai.',
      syllabus: ['Getting Started with Neural Nets', 'Image Classification & Segmentation', 'Natural Language Processing & Transformers', 'Tabular Data & Collaborative Filtering', 'Clean Code to Production Models'],
      recommendedGoal: 'Applied Machine Learning & Kaggle Competitions'
    },
    {
      id: 'oc-06',
      title: 'Vector Search & RAG Systems with PostgreSQL',
      provider: 'DeepLearning.AI / pgvector',
      platform: 'DeepLearning.AI',
      url: 'https://www.deeplearning.ai/short-courses/',
      category: 'Database Systems & AI',
      difficulty: 'Intermediate',
      duration: '2 Weeks (Short Course)',
      description: 'Learn vector search, HNSW indexing, pgvector extension, and building RAG pipelines backed by PostgreSQL.',
      syllabus: ['Embedding Generation & Cosine Similarity', 'PostgreSQL pgvector Extension Setup', 'HNSW & IVFFlat Index Optimization', 'LangChain Integration for RAG Retrieval'],
      recommendedGoal: 'Generative AI & Backend Vector Search Capstones'
    }
  ];

  // ASSIGN ONLINE COURSE TO STUDENT HANDLER
  const handleAssignOnlineCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseToAssign) return;

    const studentObj = allMentees.find(m => m.roll === assignStudentId) || { name: 'Krishna Singh', roll: '2023CSE001' };

    const newAssignedCourse: AssignedOnlineCourse = {
      id: `oc-assigned-${Date.now()}`,
      courseTitle: selectedCourseToAssign.title,
      platform: selectedCourseToAssign.platform,
      provider: selectedCourseToAssign.provider,
      url: selectedCourseToAssign.url,
      category: selectedCourseToAssign.category,
      difficulty: selectedCourseToAssign.difficulty,
      duration: selectedCourseToAssign.duration,
      syllabusOverview: selectedCourseToAssign.syllabus.join(' • '),
      assignedBy: 'Prof. S. Kulkarni (HOD Computer Engineering)',
      assignedToStudentId: studentObj.roll,
      assignedToStudentName: studentObj.name,
      assignedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      guidanceNote: assignNote || `Assigned by Prof. S. Kulkarni to support your ${selectedCourseToAssign.category} goals.`,
      status: 'ASSIGNED'
    };

    const newStudentNotif = {
      id: Date.now(),
      category: 'Online Course',
      title: 'New Online Course Assigned',
      text: `Prof. S. Kulkarni assigned you: "${selectedCourseToAssign.title}" (${selectedCourseToAssign.platform}).`,
      time: 'Just now',
      read: false
    };

    const existingAssigned = storeState.assignedOnlineCourses || [];
    const updatedStore = {
      ...storeState,
      assignedOnlineCourses: [newAssignedCourse, ...existingAssigned],
      studentNotifications: [newStudentNotif, ...storeState.studentNotifications]
    };

    saveMentoringStore(updatedStore);
    setStoreState(updatedStore);
    setSelectedCourseToAssign(null);
    setAssignNote('');
    addToast(
      'Online Course Assigned!', 
      `"${selectedCourseToAssign.title}" successfully assigned to ${studentObj.name} with study guidance notes.`, 
      'success'
    );
  };

  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'AI', text: 'Good day Prof. Kulkarni! I am your VIT Mentor Advisory Engine. How can I assist your mentee review today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Base Mentees List + Dynamic Accepted Mentees
  const baseMentees = [
    {
      id: '2023CSE042',
      name: 'Aarav Sharma',
      roll: '2023CSE042',
      sem: 4,
      branch: 'Computer Engineering',
      cgpa: 5.80,
      attendance: 68.0,
      status: 'NEEDS ATTENTION',
      severity: 'CRITICAL',
      reason: 'Low attendance (68%) & CGPA drop below 6.0',
      lastMeeting: '12 days ago',
      devProgress: '42%',
      email: 'aarav.s@vit.edu.in',
      goal: 'Improve academic performance',
      skills: ['C++', 'Data Structures'],
      projects: ['Basic Portfolio Website']
    },
    {
      id: '2023CSE118',
      name: 'Riya Deshmukh',
      roll: '2023CSE118',
      sem: 4,
      branch: 'Computer Engineering',
      cgpa: 9.40,
      attendance: 96.0,
      status: 'HIGH PERFORMER',
      severity: 'SAFE',
      reason: 'Star Performer - Wadala AI Lab Student Lead',
      lastMeeting: '3 days ago',
      devProgress: '88%',
      email: 'riya.d@vit.edu.in',
      goal: 'Become an AI/ML engineer',
      skills: ['Python', 'PyTorch', 'React', 'RAG'],
      projects: ['Neural Speech Synthesizer', 'Autonomous Drone Navigation']
    },
    {
      id: '2023EXTC089',
      name: 'Kabir Verma',
      roll: '2023EXTC089',
      sem: 4,
      branch: 'Electronics & Telecom',
      cgpa: 6.40,
      attendance: 72.0,
      status: 'ATTENDANCE WARNING',
      severity: 'WARNING',
      reason: 'Attendance warning (72% - below 75% threshold)',
      lastMeeting: 'Yesterday',
      devProgress: '58%',
      email: 'kabir.v@vit.edu.in',
      goal: 'Get an internship',
      skills: ['Embedded C', 'IoT', 'Python'],
      projects: ['Smart Campus Meter']
    }
  ];

  // Dynamically include accepted student Krishna Singh if request status is ACCEPTED
  const acceptedRequests = storeState.mentorRequests.filter((r: MentorRequest) => r.status === 'ACCEPTED');
  const dynamicMentees = acceptedRequests.map((r: MentorRequest) => ({
    id: r.studentId,
    name: r.studentName,
    roll: r.studentId,
    sem: 4,
    branch: r.branch,
    cgpa: r.cgpa,
    attendance: r.attendancePct,
    status: 'ACTIVE MENTEE',
    severity: 'SAFE',
    reason: `Assigned Mentee • Matches ${r.field} track`,
    lastMeeting: 'Aug 10, 2026',
    devProgress: '72%',
    email: 'krishna.s@vit.edu.in',
    goal: r.goal,
    skills: ['Python', 'React', 'TypeScript', 'pgvector RAG', 'PyTorch'],
    projects: ['Full-Stack RAG Vector Search Platform', 'CNN Medical Classifier']
  }));

  const allMentees = [...baseMentees, ...dynamicMentees];

  const filteredMentees = allMentees.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.roll.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterRisk === 'ATTENTION') return m.status === 'NEEDS ATTENTION';
    if (filterRisk === 'WARNING') return m.status === 'ATTENDANCE WARNING';
    if (filterRisk === 'HIGH_PERFORMER') return m.status === 'HIGH PERFORMER' || m.status === 'ACTIVE MENTEE';
    return true;
  });

  // HANDLE ACCEPT MENTOR REQUEST
  const handleConfirmAccept = () => {
    if (!acceptConfirmModal) return;

    const updatedRequests = storeState.mentorRequests.map((r: MentorRequest) => 
      r.id === acceptConfirmModal.id ? { ...r, status: 'ACCEPTED' as const } : r
    );

    const newFacultyNotif = {
      id: Date.now(),
      category: 'Mentoring',
      title: 'Mentor Request Accepted',
      text: `You accepted ${acceptConfirmModal.studentName} as your assigned mentee.`,
      time: 'Just now',
      read: false
    };

    const newStudentNotif = {
      id: Date.now(),
      category: 'Mentoring',
      title: 'Mentor Request Approved!',
      text: `Prof. S. Kulkarni has accepted your mentor request. Your mentoring workspace is now active!`,
      time: 'Just now',
      read: false
    };

    const updatedStore = {
      ...storeState,
      mentorRequests: updatedRequests,
      facultyNotifications: [newFacultyNotif, ...storeState.facultyNotifications],
      studentNotifications: [newStudentNotif, ...storeState.studentNotifications]
    };

    saveMentoringStore(updatedStore);
    setStoreState(updatedStore);
    setAcceptConfirmModal(null);
    addToast('Mentor Request Accepted', `${acceptConfirmModal.studentName} has been added to your My Students roster.`, 'success');
  };

  // HANDLE DECLINE MENTOR REQUEST
  const handleConfirmDecline = () => {
    if (!declineModal) return;

    const updatedRequests = storeState.mentorRequests.map((r: MentorRequest) => 
      r.id === declineModal.id ? { ...r, status: 'DECLINED' as const, declineReason } : r
    );

    const newStudentNotif = {
      id: Date.now(),
      category: 'Mentoring',
      title: 'Mentor Request Declined',
      text: `Prof. S. Kulkarni was unable to accept your request: ${declineReason}. You can request another recommended mentor.`,
      time: 'Just now',
      read: false
    };

    const updatedStore = {
      ...storeState,
      mentorRequests: updatedRequests,
      studentNotifications: [newStudentNotif, ...storeState.studentNotifications]
    };

    saveMentoringStore(updatedStore);
    setStoreState(updatedStore);
    setDeclineModal(null);
    addToast('Mentor Request Declined', `Decline status recorded for ${declineModal.studentName}. Notification sent.`, 'warning');
  };

  // HANDLE LOG SESSION FEEDBACK
  const handleSaveSessionLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentVisibleFeedback.trim()) return;

    const mentee = sessionMentee || allMentees[0];
    const newLog: SessionFeedbackLog = {
      id: `log-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      studentId: mentee.id,
      studentName: mentee.name,
      mentorName: 'Prof. S. Kulkarni',
      sessionType,
      notesPrivate: privateNotes || 'Routine mentoring session.',
      feedbackStudentVisible: studentVisibleFeedback,
      followUpAction: followUpAction || undefined,
      followUpCompleted: false
    };

    const newStudentNotif = {
      id: Date.now(),
      category: 'Mentoring',
      title: 'New Mentor Session Feedback',
      text: `Prof. S. Kulkarni posted session feedback: "${studentVisibleFeedback.slice(0, 60)}..."`,
      time: 'Just now',
      read: false
    };

    const updatedStore = {
      ...storeState,
      feedbackLogs: [newLog, ...storeState.feedbackLogs],
      studentNotifications: [newStudentNotif, ...storeState.studentNotifications]
    };

    saveMentoringStore(updatedStore);
    setStoreState(updatedStore);
    setShowSessionModal(false);
    setPrivateNotes('');
    setStudentVisibleFeedback('');
    setFollowUpAction('');
    addToast('Session Feedback Published', `Mentoring feedback published to ${mentee.name}'s Student Portal.`, 'success');
  };

  // HANDLE CREATE NEW FACULTY ASSIGNMENT
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignment.title.trim() || !newAssignment.deadline.trim()) return;

    const created: CourseworkAssignment = {
      id: Date.now(),
      code: newAssignment.code,
      title: newAssignment.title,
      assignedBy: 'Prof. S. Kulkarni (HOD Computer Engineering)',
      assignedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      deadline: newAssignment.deadline,
      deadlineFormatted: `${newAssignment.deadline} at 11:59 PM IST`,
      maxMarks: Number(newAssignment.maxMarks),
      latePolicy: newAssignment.latePolicy,
      submissions: []
    };

    const newStudentNotif = {
      id: Date.now(),
      category: 'Assignment',
      title: 'New Faculty Assignment Assigned',
      text: `${newAssignment.code}: ${newAssignment.title} assigned by Prof. S. Kulkarni (Due ${newAssignment.deadline})`,
      time: 'Just now',
      read: false
    };

    const updatedStore = {
      ...storeState,
      assignments: [created, ...storeState.assignments],
      studentNotifications: [newStudentNotif, ...storeState.studentNotifications]
    };

    saveMentoringStore(updatedStore);
    setStoreState(updatedStore);
    setShowCreateAssignmentModal(false);
    setNewAssignment({
      code: 'CS503',
      title: '',
      deadline: '',
      maxMarks: 50,
      latePolicy: 'Late submissions allowed up to 24 hrs (-10% penalty).'
    });
    addToast('Assignment Published', `"${created.title}" successfully created and published to all mentees.`, 'success');
  };

  // HANDLE SCHEDULE NEW 1-ON-1 MEETING
  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeeting.title.trim() || !newMeeting.date.trim()) return;

    const mtg: MentoringMeeting = {
      id: `mtg-${Date.now()}`,
      studentId: newMeeting.studentId,
      studentName: newMeeting.studentName,
      mentorName: 'Prof. S. Kulkarni',
      date: newMeeting.date,
      title: newMeeting.title,
      type: 'Mentoring',
      status: 'SCHEDULED'
    };

    const newStudentNotif = {
      id: Date.now(),
      category: 'Mentoring',
      title: '1-on-1 Meeting Scheduled',
      text: `${newMeeting.title} scheduled with Prof. S. Kulkarni for ${newMeeting.date}.`,
      time: 'Just now',
      read: false
    };

    const updatedStore = {
      ...storeState,
      meetings: [mtg, ...storeState.meetings],
      studentNotifications: [newStudentNotif, ...storeState.studentNotifications]
    };

    saveMentoringStore(updatedStore);
    setStoreState(updatedStore);
    setShowScheduleMeetingModal(false);
    addToast('Meeting Scheduled', `Meeting scheduled with ${newMeeting.studentName} for ${newMeeting.date}.`, 'success');
  };

  const handleSendMessage = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || inputMessage;
    if (!query.trim()) return;

    setChatMessages((prev) => [...prev, { sender: 'USER', text: query }]);
    if (!customQuery) setInputMessage('');

    setTimeout(() => {
      let reply = 'I have analyzed your assigned mentee dataset. ';
      const lower = query.toLowerCase();
      if (lower.includes('krishna') || lower.includes('request')) {
        reply += 'Krishna Singh (2023CSE001) has an incoming request with 96% match score based on AI/ML goals & CS503 curriculum.';
      } else if (lower.includes('attention') || lower.includes('risk') || lower.includes('aarav')) {
        reply += 'Aarav Sharma (2023CSE042) has 68% attendance and a CGPA drop to 5.80. Attendance in Discrete Math is critical.';
      } else {
        reply += 'All 24 assigned mentees are in safe academic standing with an average CGPA of 8.42 across your CSE batch.';
      }
      setChatMessages((prev) => [...prev, { sender: 'AI', text: reply }]);
    }, 650);
  };

  const pendingRequestsCount = storeState.mentorRequests.filter((r: MentorRequest) => r.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#F7F2E9] text-[#102A43] font-sans antialiased flex flex-col lg:flex-row">
      
      {/* 1. SIDEBAR NAVIGATION */}
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
                FACULTY MENTOR CENTER
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-xs font-semibold">
            {[
              { name: 'Overview', icon: LayoutDashboard },
              { name: 'Mentor Requests', icon: UserCheck, badge: pendingRequestsCount > 0 ? `${pendingRequestsCount}` : undefined },
              { name: 'My Students', icon: Users, badge: `${allMentees.length}` },
              { name: 'Assignments', icon: CheckSquare, badge: `${storeState.assignments.length}` },
              { name: 'Online Course Explorer', icon: BookOpen, badge: 'Curriculum' },
              { name: 'Attention & Risk', icon: AlertTriangle, badge: '1' },
              { name: 'Meetings', icon: Calendar },
              { name: 'Feedback & Goals', icon: Target },
              { name: 'Progress Analytics', icon: TrendingUp },
              { name: 'AI Mentor Assistant', icon: Sparkles, badge: 'Copilot' },
              { name: 'Notifications', icon: Bell, badge: `${storeState.facultyNotifications.filter((n: any) => !n.read).length}` },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveNav(item.name as any);
                    if (item.name === 'AI Mentor Assistant') setAiDrawerOpen(true);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#123B63] text-white shadow-sm font-bold'
                      : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#C49A52] text-[#102A43]' : 'bg-[#E9DDC9] text-[#102A43]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
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
        
        {/* TOP FACULTY IDENTITY HEADER */}
        <header className="bg-[#FFFDF8] border-b border-[#E2D7C6] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#123B63] text-[#F5C056] flex items-center justify-center font-extrabold text-sm shadow-sm border border-[#C49A52]/40">
              SK
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-extrabold text-[#102A43]">Prof. S. Kulkarni</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E9DDC9] text-[#102A43] text-[10px] font-bold border border-[#E2D7C6]">
                  HOD & ASSOCIATE PROFESSOR
                </span>
              </div>
              <p className="text-xs text-[#5A6E7F]">
                Department of Computer Engineering • Wadala AI Research Lab Lead | Mentees: <strong className="text-[#123B63]">{allMentees.length} Active</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCreateAssignmentModal(true)}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E9DDC9] hover:bg-[#E2D7C6] text-[#102A43] text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#123B63]" />
              <span>Post New Assignment</span>
            </button>

            <button
              onClick={() => setAiDrawerOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5C056]" />
              <span>✦ AI Faculty Assistant</span>
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
              
              {/* 4 MENTOR METRIC CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E7F]">Assigned Mentees</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-[#102A43]">{allMentees.length}</span>
                    <span className="text-xs font-bold text-[#15803D]">Students</span>
                  </div>
                  <p className="text-[11px] text-[#5A6E7F]">CSE & AI/ML Stream</p>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E7F]">Pending Requests</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-[#123B63]">{pendingRequestsCount}</span>
                    <span className="text-xs font-bold text-[#D97706]">Awaiting Review</span>
                  </div>
                  <p className="text-[11px] text-[#5A6E7F]">96% Avg Deterministic Match</p>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E7F]">Attention Flagged</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-[#B91C1C]">1</span>
                    <span className="text-xs font-bold text-[#B91C1C]">Critical</span>
                  </div>
                  <p className="text-[11px] text-[#5A6E7F]">Aarav Sharma (Attendance 68%)</p>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E7F]">Avg Batch CGPA</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-[#102A43]">8.42</span>
                    <span className="text-xs font-bold text-[#15803D]">Top Tier</span>
                  </div>
                  <p className="text-[11px] text-[#5A6E7F]">91.2% Batch Attendance Avg</p>
                </div>
              </div>

              {/* MAIN 2-COLUMN GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT COLUMN (7 COLS): INCOMING MENTOR REQUESTS & ATTENTION CENTER */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* INCOMING MENTOR REQUESTS CARD */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <UserCheck className="w-5 h-5 text-[#123B63]" />
                        <h3 className="text-base font-extrabold text-[#102A43]">Incoming Student Mentor Requests</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold">
                        {pendingRequestsCount} PENDING
                      </span>
                    </div>

                    {storeState.mentorRequests.filter((r: MentorRequest) => r.status === 'PENDING').length === 0 ? (
                      <p className="text-xs text-[#5A6E7F] italic p-4 bg-[#F7F2E9] rounded-xl text-center">
                        No pending mentor requests at this time.
                      </p>
                    ) : (
                      storeState.mentorRequests.filter((r: MentorRequest) => r.status === 'PENDING').map((req: MentorRequest) => (
                        <div key={req.id} className="p-4 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-extrabold text-[#102A43] text-sm">{req.studentName}</p>
                              <p className="text-xs text-[#5A6E7F]">ID: {req.studentId} • {req.branch} ({req.semester})</p>
                            </div>
                            <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
                              {req.matchScore}% Match
                            </span>
                          </div>

                          <div className="p-3 rounded-xl bg-[#FFFDF8] border border-[#E2D7C6] text-xs space-y-1">
                            <p className="font-bold text-[#102A43]">Selected Goal: {req.goal}</p>
                            <p className="text-[#123B63] font-semibold">Match Breakdown: {req.matchReason}</p>
                            {req.note && (
                              <p className="text-[#5A6E7F] italic pt-1 border-t border-[#E2D7C6]">
                                "Student Note: {req.note}"
                              </p>
                            )}
                          </div>

                          <div className="flex justify-end space-x-2 pt-1 text-xs">
                            <button
                              onClick={() => setDeclineModal(req)}
                              className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] font-bold cursor-pointer"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => setAcceptConfirmModal(req)}
                              className="px-5 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white font-bold cursor-pointer"
                            >
                              Accept Request →
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* MENTEE ROSTER OVERVIEW TABLE */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-[#102A43]">Assigned Mentees Roster</h3>
                      <button 
                        onClick={() => setActiveNav('My Students')}
                        className="text-xs font-bold text-[#123B63] hover:underline"
                      >
                        View All Mentees ({allMentees.length}) →
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                            <th className="py-2.5 px-3 font-bold">STUDENT</th>
                            <th className="py-2.5 px-3 font-bold">CGPA</th>
                            <th className="py-2.5 px-3 font-bold">ATTENDANCE</th>
                            <th className="py-2.5 px-3 font-bold">STATUS</th>
                            <th className="py-2.5 px-3 font-bold">ACTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2D7C6]">
                          {allMentees.map((m) => (
                            <tr key={m.id} className="hover:bg-[#F7F2E9]">
                              <td className="py-3 px-3">
                                <p className="font-bold text-[#102A43]">{m.name}</p>
                                <p className="text-[10px] text-[#5A6E7F]">{m.roll} • {m.branch}</p>
                              </td>
                              <td className="py-3 px-3 font-bold text-[#102A43]">{m.cgpa.toFixed(2)}</td>
                              <td className="py-3 px-3 font-bold">
                                <span className={m.attendance < 75 ? 'text-[#B91C1C]' : 'text-[#15803D]'}>
                                  {m.attendance.toFixed(1)}%
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  m.severity === 'CRITICAL' 
                                    ? 'bg-[#FEE2E2] text-[#B91C1C]' 
                                    : m.severity === 'WARNING'
                                    ? 'bg-[#FEF3C7] text-[#D97706]'
                                    : 'bg-[#DCFCE7] text-[#15803D]'
                                }`}>
                                  {m.status}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <button
                                  onClick={() => setSelectedStudent(m)}
                                  className="px-2.5 py-1 rounded-lg bg-[#123B63] text-white font-bold text-[10px]"
                                >
                                  View Student →
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN (5 COLS): MENTORING WORKSPACE & UPCOMING MEETINGS */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* LOG SESSION FEEDBACK BUTTON & ACTION CARD */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-3">
                    <h3 className="text-base font-extrabold text-[#102A43]">Mentoring Workspace Actions</h3>
                    <p className="text-xs text-[#5A6E7F]">Record 1-on-1 session feedback or schedule next check-in</p>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setSessionMentee(allMentees[0]);
                          setShowSessionModal(true);
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-[#F5C056]" />
                        <span>Log 1-on-1 Mentoring Session →</span>
                      </button>

                      <button
                        onClick={() => setShowScheduleMeetingModal(true)}
                        className="w-full py-2.5 rounded-xl bg-[#E9DDC9] hover:bg-[#E2D7C6] text-[#102A43] font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-[#123B63]" />
                        <span>Schedule 1-on-1 Check-in Meeting</span>
                      </button>
                    </div>
                  </div>

                  {/* SCHEDULED MEETINGS & AGENDA */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-[#102A43]">Scheduled Mentoring Meetings</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E9DDC9] text-[#102A43] text-[10px] font-bold">
                        SHARED CALENDAR
                      </span>
                    </div>

                    <div className="space-y-3">
                      {storeState.meetings.map((mtg: MentoringMeeting) => (
                        <div key={mtg.id} className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-1.5 text-xs">
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-[#102A43]">{mtg.studentName}</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[9px]">
                              {mtg.status}
                            </span>
                          </div>
                          <p className="text-[#123B63] font-semibold">{mtg.title}</p>
                          <p className="text-[10px] text-[#C49A52]">{mtg.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI MENTOR ADVISORY INSIGHT CARD */}
                  <div className="bg-[#123B63] text-white rounded-2xl p-6 border border-[#C49A52]/40 shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-[#F5C056]" />
                        <h3 className="text-base font-extrabold text-white">✦ AI Mentoring Advisory</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#C49A52]/30 text-[9px] font-extrabold text-[#F5C056]">
                        FACULTY COPILOT
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      "Prof. Kulkarni, Krishna Singh has a 96% match score and requested mentorship for AI/ML and PostgreSQL RAG capstone guidance. Accepting this request aligns with your research lab goals."
                    </p>

                    <button
                      onClick={() => setAiDrawerOpen(true)}
                      className="w-full py-2 rounded-xl bg-[#F5C056] text-[#102A43] font-bold text-xs hover:bg-[#E5B046]"
                    >
                      Open Faculty Copilot
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* VIEW 2: MENTOR REQUESTS TAB */}
          {activeNav === 'Mentor Requests' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Student Mentor Requests & Match Evidence</h2>
                  <p className="text-xs text-[#5A6E7F]">Incoming student requests generated from 5-factor deterministic matching</p>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-extrabold">
                  {pendingRequestsCount} PENDING REQUESTS
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {storeState.mentorRequests.map((req: MentorRequest) => (
                  <div key={req.id} className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2D7C6] pb-3">
                      <div>
                        <h3 className="font-extrabold text-[#102A43] text-base">{req.studentName}</h3>
                        <p className="text-xs text-[#5A6E7F]">ID: {req.studentId} • {req.program} ({req.branch})</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full">
                          {req.matchScore}% Match Score
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          req.status === 'PENDING' ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#DCFCE7] text-[#15803D]'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-1">
                        <span className="text-[#5A6E7F] font-semibold">Student Goal:</span>
                        <p className="font-bold text-[#102A43]">{req.goal}</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-1">
                        <span className="text-[#5A6E7F] font-semibold">Academic Context:</span>
                        <p className="font-bold text-[#102A43]">CGPA: {req.cgpa.toFixed(2)} | Attendance: {req.attendancePct.toFixed(1)}%</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-1">
                        <span className="text-[#5A6E7F] font-semibold">Match Evidence:</span>
                        <p className="font-semibold text-[#123B63]">{req.matchReason}</p>
                      </div>
                    </div>

                    {req.note && (
                      <div className="p-3.5 rounded-xl bg-[#FEF3C7]/40 border border-[#D97706]/40 text-xs">
                        <p className="font-bold text-[#102A43]">Student Guidance Note:</p>
                        <p className="text-[#5A6E7F] italic">"{req.note}"</p>
                      </div>
                    )}

                    {req.status === 'PENDING' && (
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          onClick={() => setDeclineModal(req)}
                          className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] font-bold text-xs cursor-pointer"
                        >
                          Decline Request
                        </button>
                        <button
                          onClick={() => setAcceptConfirmModal(req)}
                          className="px-5 py-2 rounded-xl bg-[#123B63] text-white font-bold text-xs cursor-pointer"
                        >
                          Accept Request & Assign Mentee →
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: MY STUDENTS TAB */}
          {activeNav === 'My Students' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Assigned Mentees Roster</h2>
                  <p className="text-xs text-[#5A6E7F]">Authorized mentoring cohort under Prof. S. Kulkarni</p>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#123B63] text-white text-xs font-bold">
                  {allMentees.length} Mentees Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allMentees.map((m) => (
                  <div key={m.id} className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-[#102A43] text-sm">{m.name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          m.severity === 'CRITICAL' ? 'bg-[#FEE2E2] text-[#B91C1C]' : 'bg-[#DCFCE7] text-[#15803D]'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#5A6E7F]">Roll: {m.roll} | {m.branch}</p>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E2D7C6]">
                        <span className="text-[#5A6E7F]">CGPA: <strong className="text-[#102A43]">{m.cgpa.toFixed(2)}</strong></span>
                        <span className="text-[#5A6E7F]">Attendance: <strong className={m.attendance < 75 ? 'text-[#B91C1C]' : 'text-[#15803D]'}>{m.attendance.toFixed(1)}%</strong></span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedStudent(m)}
                      className="w-full py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white font-bold text-xs cursor-pointer"
                    >
                      View Student Profile →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 4: FACULTY ASSIGNMENTS TAB */}
          {activeNav === 'Assignments' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Faculty Coursework & Submissions Manager</h2>
                  <p className="text-xs text-[#5A6E7F]">Manage lab assignments & track live mentee submissions</p>
                </div>
                <button
                  onClick={() => setShowCreateAssignmentModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold cursor-pointer"
                >
                  + Post New Assignment
                </button>
              </div>

              <div className="space-y-4">
                {storeState.assignments.map((asgn: CourseworkAssignment) => (
                  <div key={asgn.id} className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#123B63] text-white font-mono text-xs font-bold mr-2">
                          {asgn.code}
                        </span>
                        <h3 className="font-extrabold text-[#102A43] text-sm inline">{asgn.title}</h3>
                      </div>
                      <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full">
                        Due: {asgn.deadlineFormatted}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]">
                        <span className="text-[#5A6E7F]">Total Mentees Assigned:</span>
                        <p className="font-bold text-[#102A43]">{allMentees.length} Students</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]">
                        <span className="text-[#5A6E7F]">Submissions Received:</span>
                        <p className="font-bold text-[#15803D]">{asgn.submissions.length} Turn-ins</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]">
                        <span className="text-[#5A6E7F]">Late Policy:</span>
                        <p className="font-semibold text-[#102A43]">{asgn.latePolicy}</p>
                      </div>
                    </div>

                    {asgn.submissions.length > 0 && (
                      <div className="space-y-2 text-xs">
                        <p className="font-bold text-[#102A43]">Turned-in Student Files:</p>
                        <div className="space-y-1.5">
                          {asgn.submissions.map((sub: any, idx: number) => (
                            <div key={idx} className="p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] flex items-center justify-between">
                              <div>
                                <p className="font-bold text-[#102A43]">{sub.studentName} ({sub.studentId})</p>
                                <p className="text-[11px] text-[#5A6E7F]">File: {sub.fileName} • {sub.submittedAt}</p>
                              </div>
                              <span className="px-2.5 py-1 rounded-full bg-[#15803D] text-white text-[10px] font-bold">
                                {sub.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: ONLINE COURSE & CURRICULUM EXPLORER */}
          {activeNav === 'Online Course Explorer' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-[#123B63]" />
                    <h2 className="text-xl font-extrabold text-[#102A43]">Global Online Curriculum & Course Explorer</h2>
                  </div>
                  <p className="text-xs text-[#5A6E7F] mt-1">
                    Verified, 100% legit online courses from MIT, Stanford, Harvard, DeepLearning.AI & Coursera. Assign directly to mentees with personalized study guidance.
                  </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['ALL', 'AI / Machine Learning', 'Deep Learning', 'Core Computer Science', 'Full-Stack & Systems', 'Database Systems & AI'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCourseCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                        courseCategoryFilter === cat
                          ? 'bg-[#123B63] text-white shadow-xs'
                          : 'bg-[#F7F2E9] text-[#102A43] hover:bg-[#E9DDC9]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* ONLINE COURSES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {verifiedOnlineCourses
                  .filter(c => courseCategoryFilter === 'ALL' || c.category === courseCategoryFilter)
                  .map((course) => (
                    <div key={course.id} className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4 flex flex-col justify-between hover:border-[#123B63] transition-all">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-[#E9DDC9] text-[#102A43] text-[10px] font-extrabold uppercase tracking-wider">
                            {course.platform}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[9px] font-bold">
                            {course.difficulty}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-extrabold text-[#102A43] text-base leading-snug">{course.title}</h3>
                          <p className="text-xs font-semibold text-[#C49A52] mt-0.5">{course.provider} • {course.duration}</p>
                        </div>

                        <p className="text-xs text-[#5A6E7F] leading-relaxed">
                          {course.description}
                        </p>

                        <div className="p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-1 text-xs">
                          <span className="font-bold text-[#102A43]">Syllabus Highlights:</span>
                          <ul className="list-disc list-inside text-[#123B63] space-y-0.5 text-[11px]">
                            {course.syllabus.map((topic, i) => (
                              <li key={i}>{topic}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E2D7C6] space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#5A6E7F]">Target Goal:</span>
                          <span className="font-bold text-[#123B63]">{course.recommendedGoal}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                          <a
                            href={course.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-xl bg-[#F7F2E9] hover:bg-[#E9DDC9] text-[#102A43] font-bold text-center flex items-center justify-center space-x-1"
                          >
                            <span>View Course</span>
                            <ExternalLink className="w-3 h-3 text-[#123B63]" />
                          </a>

                          <button
                            onClick={() => setSelectedCourseToAssign(course)}
                            className="py-2 px-3 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white font-bold text-center cursor-pointer shadow-xs"
                          >
                            Assign to Mentee →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* PREVIOUSLY ASSIGNED ONLINE COURSES BY FACULTY SUMMARY */}
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-[#102A43]">Assigned Online Courses & Mentee Guidance Log</h3>
                    <p className="text-xs text-[#5A6E7F]">Real-time record of curated courses assigned to mentees</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#123B63] text-white text-xs font-bold">
                    {(storeState.assignedOnlineCourses || []).length} Active Assignments
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {(storeState.assignedOnlineCourses || []).map((assigned: AssignedOnlineCourse) => (
                    <div key={assigned.id} className="p-4 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-bold">
                        <div className="flex items-center space-x-2">
                          <span className="text-[#102A43] text-sm">{assigned.courseTitle}</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#E9DDC9] text-[#102A43] text-[10px]">
                            {assigned.platform}
                          </span>
                        </div>
                        <span className="text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full text-[10px]">
                          Assigned to: {assigned.assignedToStudentName} ({assigned.assignedToStudentId})
                        </span>
                      </div>

                      <p className="text-[#123B63] font-semibold">Faculty Guidance Note: "{assigned.guidanceNote}"</p>
                      
                      <div className="flex items-center justify-between text-[11px] text-[#5A6E7F] pt-1 border-t border-[#E2D7C6]">
                        <span>Assigned Date: {assigned.assignedDate}</span>
                        <a 
                          href={assigned.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-bold text-[#123B63] hover:underline flex items-center space-x-1"
                        >
                          <span>Open Real Online Course Link</span>
                          <ExternalLink className="w-3 h-3 text-[#123B63]" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 5: ATTENTION & RISK */}
          {activeNav === 'Attention & Risk' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Attention & Academic Risk Center</h2>
                  <p className="text-xs text-[#5A6E7F]">Early warning detection for low attendance (&lt;75%) or CGPA drop</p>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#FEE2E2] text-[#B91C1C] text-xs font-extrabold">
                  1 CRITICAL • 1 WARNING
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: 'Aarav Sharma',
                    roll: '2023CSE042',
                    branch: 'Computer Engineering',
                    cgpa: 5.80,
                    attendance: 68.0,
                    status: 'NEEDS ATTENTION',
                    severity: 'CRITICAL',
                    reason: 'Low attendance (68%) & CGPA drop below 6.0 in Discrete Math & Algorithms',
                    recommendedAction: 'Schedule mandatory 1-on-1 counseling & assign peer tutoring mentor'
                  },
                  {
                    name: 'Kabir Verma',
                    roll: '2023EXTC089',
                    branch: 'Electronics & Telecom',
                    cgpa: 6.40,
                    attendance: 72.0,
                    status: 'ATTENDANCE WARNING',
                    severity: 'WARNING',
                    reason: 'Attendance warning (72% - 3 classes below 75% mandatory threshold)',
                    recommendedAction: 'Send attendance deficit alert notice'
                  }
                ].map((st) => (
                  <div key={st.roll} className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                      <div>
                        <h3 className="font-extrabold text-[#102A43] text-base">{st.name}</h3>
                        <p className="text-xs text-[#5A6E7F]">ID: {st.roll} • {st.branch}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                        st.severity === 'CRITICAL' ? 'bg-[#FEE2E2] text-[#B91C1C]' : 'bg-[#FEF3C7] text-[#D97706]'
                      }`}>
                        {st.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]">
                        <span className="text-[#5A6E7F]">Current CGPA:</span>
                        <p className="font-bold text-[#102A43] text-sm">{st.cgpa.toFixed(2)}</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]">
                        <span className="text-[#5A6E7F]">Overall Attendance:</span>
                        <p className="font-bold text-[#B91C1C] text-sm">{st.attendance.toFixed(1)}%</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]">
                        <span className="text-[#5A6E7F]">Risk Trigger:</span>
                        <p className="font-semibold text-[#102A43]">{st.reason}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FEF3C7]/40 border border-[#D97706]/40 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#102A43]">AI Recommended Intervention:</span>
                        <p className="text-[#5A6E7F]">{st.recommendedAction}</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowScheduleMeetingModal(true);
                          setNewMeeting({
                            studentId: st.roll,
                            studentName: st.name,
                            date: 'Tomorrow at 3:00 PM IST',
                            title: 'Urgent Attendance & Academic Counseling'
                          });
                        }}
                        className="px-4 py-2 rounded-xl bg-[#123B63] text-white font-bold text-xs cursor-pointer whitespace-nowrap"
                      >
                        Schedule Urgent 1-on-1 →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 6: MEETINGS */}
          {activeNav === 'Meetings' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Mentoring Meetings Agenda</h2>
                  <p className="text-xs text-[#5A6E7F]">Scheduled & requested 1-on-1 student check-in sessions</p>
                </div>
                <button
                  onClick={() => setShowScheduleMeetingModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold cursor-pointer"
                >
                  + Schedule New Meeting
                </button>
              </div>

              <div className="space-y-3">
                {storeState.meetings.map((mtg: MentoringMeeting) => (
                  <div key={mtg.id} className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-[#102A43] text-sm">{mtg.studentName}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold text-[10px]">
                          {mtg.status}
                        </span>
                      </div>
                      <p className="font-bold text-[#123B63]">{mtg.title}</p>
                      <p className="text-[#C49A52] font-semibold">{mtg.date}</p>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSessionMentee(allMentees.find(m => m.name === mtg.studentName) || allMentees[0]);
                          setShowSessionModal(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#123B63] text-white font-bold cursor-pointer"
                      >
                        Log Session Feedback →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 7: FEEDBACK & GOALS */}
          {activeNav === 'Feedback & Goals' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Session Feedback & Goal Tracker</h2>
                  <p className="text-xs text-[#5A6E7F]">Published student feedback & assigned mentoring action items</p>
                </div>
                <button
                  onClick={() => setShowSessionModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold cursor-pointer"
                >
                  + Log 1-on-1 Feedback
                </button>
              </div>

              <div className="space-y-4">
                {storeState.feedbackLogs.map((log: SessionFeedbackLog) => (
                  <div key={log.id} className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-2 font-bold">
                      <span className="text-[#102A43] text-sm">{log.studentName} ({log.sessionType})</span>
                      <span className="text-[#C49A52]">{log.date}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-1">
                      <span className="font-bold text-[#102A43]">Student-Visible Published Feedback:</span>
                      <p className="text-[#123B63] leading-relaxed">{log.feedbackStudentVisible}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#E2D7C6] space-y-1">
                      <span className="font-bold text-[#5A6E7F]">Faculty Private Notes (Mentor Only):</span>
                      <p className="text-[#5A6E7F] italic">{log.notesPrivate}</p>
                    </div>

                    {log.followUpAction && (
                      <div className="p-3 rounded-xl bg-[#FEF3C7]/40 border border-[#D97706]/40 flex items-center justify-between">
                        <span className="font-bold text-[#102A43]">Assigned Follow-up: {log.followUpAction}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] font-bold text-[10px]">
                          ACTION ASSIGNED TO STUDENT
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 8: PROGRESS ANALYTICS */}
          {activeNav === 'Progress Analytics' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs">
                <h2 className="text-xl font-extrabold text-[#102A43]">Batch Progress Analytics</h2>
                <p className="text-xs text-[#5A6E7F]">Comprehensive performance analytics for your assigned CSE batch</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold text-[#5A6E7F]">Batch CGPA Distribution</span>
                  <p className="text-2xl font-extrabold text-[#102A43]">8.42 Avg</p>
                  <p className="text-[11px] text-[#15803D] font-bold">85% Mentees Above 8.0 CGPA</p>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold text-[#5A6E7F]">Batch Attendance Rate</span>
                  <p className="text-2xl font-extrabold text-[#123B63]">91.2% Avg</p>
                  <p className="text-[11px] text-[#15803D] font-bold">22 / 24 Students Safe (&gt;75%)</p>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-2">
                  <span className="text-xs font-bold text-[#5A6E7F]">Milestone Completion Rate</span>
                  <p className="text-2xl font-extrabold text-[#102A43]">78% Completed</p>
                  <p className="text-[11px] text-[#C49A52] font-bold">18 Mentees Completed RAG Capstone</p>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 9: NOTIFICATIONS */}
          {activeNav === 'Notifications' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Faculty Notification Center</h2>
                  <p className="text-xs text-[#5A6E7F]">Alerts for new mentor requests, assignment turn-ins, and meetings</p>
                </div>
                <button
                  onClick={() => {
                    const updatedNotifs = storeState.facultyNotifications.map((n: any) => ({ ...n, read: true }));
                    const updatedStore = { ...storeState, facultyNotifications: updatedNotifs };
                    saveMentoringStore(updatedStore);
                    setStoreState(updatedStore);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] text-xs font-bold cursor-pointer"
                >
                  Mark All as Read
                </button>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-3">
                {storeState.facultyNotifications.map((n: any) => (
                  <div key={n.id} className={`p-4 rounded-xl border flex items-start justify-between text-xs ${
                    n.read ? 'bg-[#F7F2E9] border-[#E2D7C6]' : 'bg-[#FFFDF8] border-[#123B63]'
                  }`}>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#123B63]">{n.category}:</span>
                        <span className="font-extrabold text-[#102A43]">{n.title}</span>
                      </div>
                      <p className="text-[#5A6E7F] mt-1">{n.text}</p>
                    </div>
                    <span className="text-[10px] text-[#C49A52] font-semibold">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 10: SETTINGS */}
          {activeNav === 'Settings' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs">
                <h2 className="text-xl font-extrabold text-[#102A43]">Faculty Mentoring Preferences</h2>
                <p className="text-xs text-[#5A6E7F]">Configure alert thresholds and automated counseling triggers</p>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#E2D7C6]">
                  <div>
                    <h4 className="font-bold text-[#102A43]">Attendance Alert Threshold</h4>
                    <p className="text-[#5A6E7F]">Trigger critical risk alert when mentee attendance drops below 75%</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#123B63]" />
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#E2D7C6]">
                  <div>
                    <h4 className="font-bold text-[#102A43]">Automatic Mentor Request Notifications</h4>
                    <p className="text-[#5A6E7F]">Send instant notifications when a student requests mentorship</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#123B63]" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="font-bold text-[#102A43]">Assignment Submission Digest</h4>
                    <p className="text-[#5A6E7F]">Email daily summary of turned-in mentee assignments</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#123B63]" />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CONFIRM ACCEPT MODAL */}
      <AnimatePresence>
        {acceptConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-md w-full space-y-4">
              <h3 className="text-base font-extrabold text-[#102A43]">
                Accept {acceptConfirmModal.studentName} as Mentee?
              </h3>

              <div className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs space-y-1">
                <p className="font-bold text-[#102A43]">Goal: {acceptConfirmModal.goal}</p>
                <p className="text-[#123B63] font-semibold">Match Score: {acceptConfirmModal.matchScore}% Match</p>
                <p className="text-[#5A6E7F]">{acceptConfirmModal.matchReason}</p>
              </div>

              <div className="flex justify-end space-x-2 pt-2 text-xs">
                <button
                  onClick={() => setAcceptConfirmModal(null)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAccept}
                  className="px-5 py-2 rounded-xl bg-[#123B63] text-white font-bold cursor-pointer"
                >
                  Confirm & Accept Mentee →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DECLINE MODAL */}
      <AnimatePresence>
        {declineModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-md w-full space-y-4">
              <h3 className="text-base font-extrabold text-[#102A43]">Decline Mentor Request</h3>
              <p className="text-xs text-[#5A6E7F]">Student: {declineModal.studentName}</p>

              <div className="space-y-2 text-xs">
                <label className="font-bold text-[#102A43]">Reason for Declining:</label>
                <select
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs font-semibold text-[#102A43]"
                >
                  <option>Current mentoring capacity reached</option>
                  <option>Specialization track mismatch</option>
                  <option>Schedule conflict</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2 text-xs">
                <button
                  onClick={() => setDeclineModal(null)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDecline}
                  className="px-5 py-2 rounded-xl bg-[#B91C1C] text-white font-bold cursor-pointer"
                >
                  Confirm Decline
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOG MENTOR SESSION MODAL */}
      <AnimatePresence>
        {showSessionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <form onSubmit={handleSaveSessionLog} className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-lg w-full space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <h3 className="text-base font-extrabold text-[#102A43]">Log Mentoring Session</h3>
                <button type="button" onClick={() => setShowSessionModal(false)}>
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#102A43]">Select Mentee:</label>
                  <select
                    value={sessionMentee?.id || allMentees[0].id}
                    onChange={(e) => setSessionMentee(allMentees.find(m => m.id === e.target.value))}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] font-bold text-[#102A43]"
                  >
                    {allMentees.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.roll})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Faculty Private Notes (Hidden from Student):</label>
                  <textarea
                    value={privateNotes}
                    onChange={(e) => setPrivateNotes(e.target.value)}
                    placeholder="e.g. Needs extra practice in SQL indexing..."
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Student-Visible Session Feedback (Published to Student Portal):</label>
                  <textarea
                    value={studentVisibleFeedback}
                    onChange={(e) => setStudentVisibleFeedback(e.target.value)}
                    placeholder="e.g. Approved RAG capstone proposal. Focus on PostgreSQL index tuning..."
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Follow-up Action for Student:</label>
                  <input
                    type="text"
                    value={followUpAction}
                    onChange={(e) => setFollowUpAction(e.target.value)}
                    placeholder="e.g. Complete PostgreSQL indexing experiment"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowSessionModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#123B63] text-white font-bold"
                >
                  Save & Publish Feedback →
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED COMPREHENSIVE STUDENT MENTORING PROFILE MODAL */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E2D7C6] shadow-2xl max-w-4xl w-full space-y-6 my-8 max-h-[92vh] overflow-y-auto relative">
              
              {/* MODAL HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D7C6] pb-5">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#123B63] text-[#F5C056] flex items-center justify-center font-extrabold text-xl shadow-md border border-[#C49A52]/40">
                    {selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-extrabold text-[#102A43]">{selectedStudent.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold">
                        OFFICIAL RECORD
                      </span>
                    </div>
                    <p className="text-xs text-[#5A6E7F]">
                      ID: {selectedStudent.roll} • {selectedStudent.branch} | {selectedStudent.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => {
                      setSessionMentee(selectedStudent);
                      setSelectedStudent(null);
                      setShowSessionModal(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#123B63] text-white font-bold text-xs hover:bg-[#1D4E73] cursor-pointer"
                  >
                    Log Mentoring Session →
                  </button>

                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="p-2 rounded-xl hover:bg-[#F7F2E9] text-[#102A43] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6 text-xs">
                
                {/* 1. AUTHORITATIVE ACADEMIC METRICS BANNER */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F7F2E9] p-4 rounded-2xl border border-[#E2D7C6]">
                  <div>
                    <span className="text-[#5A6E7F] font-semibold">Cumulative CGPA:</span>
                    <p className="text-2xl font-extrabold text-[#102A43]">{selectedStudent.cgpa.toFixed(2)}</p>
                    <span className="text-[10px] font-bold text-[#15803D]">Top 5% Batch Standing</span>
                  </div>

                  <div>
                    <span className="text-[#5A6E7F] font-semibold">Overall Attendance %:</span>
                    <p className={`text-2xl font-extrabold ${selectedStudent.attendance < 75 ? 'text-[#B91C1C]' : 'text-[#15803D]'}`}>
                      {selectedStudent.attendance.toFixed(1)}%
                    </p>
                    <span className="text-[10px] font-bold text-[#123B63]">
                      {selectedStudent.attendance < 75 ? 'Requires Attention' : 'Eligible for Exams'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#5A6E7F] font-semibold">Development Progress:</span>
                    <p className="text-2xl font-extrabold text-[#102A43]">{selectedStudent.devProgress || '72%'}</p>
                    <span className="text-[10px] font-bold text-[#C49A52]">On Track Milestone Progress</span>
                  </div>
                </div>

                {/* 2. CAREER GOALS & DIRECTION (STUDENT PROVIDED) */}
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-2">
                    <h4 className="font-extrabold text-[#102A43] text-sm">Career Direction & Selected Goals</h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#E9DDC9] text-[9px] font-bold text-[#102A43]">
                      STUDENT PROVIDED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#5A6E7F] font-semibold">Primary Goal:</span>
                      <p className="font-bold text-[#123B63] text-xs mt-0.5">{selectedStudent.goal}</p>
                    </div>
                    <div>
                      <span className="text-[#5A6E7F] font-semibold">Field of Interest:</span>
                      <p className="font-bold text-[#102A43] text-xs mt-0.5">{selectedStudent.branch}</p>
                    </div>
                  </div>
                </div>

                {/* 3. CURRENT WORK & MILESTONES ROADMAP */}
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-2">
                    <h4 className="font-extrabold text-[#102A43] text-sm">Current Work & Milestone Progress</h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#E9DDC9] text-[9px] font-bold text-[#102A43]">
                      WORK IN PROGRESS
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { title: 'Programming & Data Structures Foundations', category: 'Core AI', done: true, points: 50 },
                      { title: 'Implement RAG Architecture with pgvector', category: 'Capstone', done: true, points: 100 },
                      { title: 'Backend Systems & PostgreSQL Module', category: 'In Progress', done: false, active: true, points: 120 },
                      { title: 'Publish IEEE Conference Paper on Neural Nets', category: 'Research', done: false, points: 150 },
                      { title: 'Complete AWS Cloud Practitioner Certification', category: 'Industry', done: false, points: 80 },
                    ].map((m, idx) => (
                      <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between ${
                        m.done ? 'bg-[#F7F2E9] border-[#E2D7C6]' : m.active ? 'bg-[#FFFDF8] border-[#123B63]' : 'bg-[#FFFDF8] border-[#E2D7C6]'
                      }`}>
                        <div className="flex items-center space-x-2.5">
                          <span className={`w-5 h-5 rounded-md border flex items-center justify-center font-bold text-[10px] ${
                            m.done ? 'bg-[#123B63] text-white border-[#123B63]' : 'border-[#1D4E73]'
                          }`}>
                            {m.done ? '✓' : ''}
                          </span>
                          <div>
                            <p className={`font-bold ${m.done ? 'line-through text-[#5A6E7F]' : 'text-[#102A43]'}`}>{m.title}</p>
                            <span className="text-[10px] text-[#C49A52] font-semibold">{m.category}</span>
                          </div>
                        </div>
                        <span className="font-extrabold text-[#123B63]">+{m.points} XP</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. ENROLLED SUBJECT GRADES & ATTENDANCE */}
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-2">
                    <h4 className="font-extrabold text-[#102A43] text-sm">Enrolled Subject Grades & Attendance</h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[9px] font-bold">
                      OFFICIAL RECORD
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                          <th className="py-2 px-2 font-bold">CODE</th>
                          <th className="py-2 px-2 font-bold">SUBJECT NAME</th>
                          <th className="py-2 px-2 font-bold">ATTENDANCE</th>
                          <th className="py-2 px-2 font-bold">GRADE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2D7C6]">
                        {[
                          { code: 'CS501', name: 'Design & Analysis of Algorithms', att: '93.3%', grade: 'A' },
                          { code: 'CS502', name: 'Database Management Systems', att: '92.8%', grade: 'A+' },
                          { code: 'CS503', name: 'Artificial Intelligence & Neural Nets', att: '96.0%', grade: 'A+' },
                          { code: 'EX504', name: 'Discrete Mathematics & Graph Theory', att: '71.4%', grade: 'B+', warning: true },
                          { code: 'CS505L', name: 'Full-Stack Development Lab', att: '100.0%', grade: 'O' },
                        ].map((sub) => (
                          <tr key={sub.code} className="hover:bg-[#F7F2E9]">
                            <td className="py-2 px-2 font-mono font-bold text-[#123B63]">{sub.code}</td>
                            <td className="py-2 px-2 font-bold text-[#102A43]">{sub.name}</td>
                            <td className={`py-2 px-2 font-bold ${sub.warning ? 'text-[#B91C1C]' : 'text-[#15803D]'}`}>
                              {sub.att} {sub.warning && '(Low)'}
                            </td>
                            <td className="py-2 px-2 font-bold text-[#15803D]">{sub.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 5. SKILL MATRIX & PROJECTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* SKILLS */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] space-y-3">
                    <h4 className="font-extrabold text-[#102A43] text-sm border-b border-[#E2D7C6] pb-2">Verified Skill Competency</h4>
                    <div className="space-y-2">
                      {[
                        { name: 'Python, C++', pct: 90 },
                        { name: 'React, TypeScript', pct: 85 },
                        { name: 'Backend & SQL', pct: 65 },
                        { name: 'RAG & Vector Search', pct: 70 },
                        { name: 'AI / ML & PyTorch', pct: 78 }
                      ].map((sk) => (
                        <div key={sk.name} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-[#102A43]">{sk.name}</span>
                            <span className="text-[#123B63]">{sk.pct}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#E2D7C6] rounded-full overflow-hidden">
                            <div className="h-full bg-[#123B63]" style={{ width: `${sk.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PROJECTS */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] space-y-3">
                    <h4 className="font-extrabold text-[#102A43] text-sm border-b border-[#E2D7C6] pb-2">Evaluated Projects</h4>
                    <div className="space-y-2.5">
                      {[
                        { title: 'Full-Stack RAG Vector Search Platform', tech: 'React, pgvector, LangChain', grade: 'A+' },
                        { title: 'CNN Neural Classifier for Medical Imaging', tech: 'Python, PyTorch, OpenCV', grade: 'A' }
                      ].map((p, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-1">
                          <div className="flex justify-between font-bold text-[#102A43]">
                            <span>{p.title}</span>
                            <span className="text-[#15803D]">{p.grade}</span>
                          </div>
                          <p className="text-[10px] text-[#5A6E7F]">{p.tech}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* 6. TURNED IN ASSIGNMENTS */}
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] space-y-3">
                  <h4 className="font-extrabold text-[#102A43] text-sm border-b border-[#E2D7C6] pb-2">Turned-in Coursework Submissions</h4>
                  <div className="space-y-2">
                    {storeState.assignments.map((asgn: CourseworkAssignment) => {
                      const sub = asgn.submissions.find((s: any) => s.studentId === selectedStudent.roll || selectedStudent.roll === '2023CSE001');
                      return (
                        <div key={asgn.id} className="p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] flex items-center justify-between">
                          <div>
                            <p className="font-bold text-[#102A43]">{asgn.code}: {asgn.title}</p>
                            <p className="text-[10px] text-[#5A6E7F]">
                              {sub ? `File: ${sub.fileName} • ${sub.submittedAt}` : 'Submission Pending'}
                            </p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            sub ? 'bg-[#15803D] text-white' : 'bg-[#FEF3C7] text-[#D97706]'
                          }`}>
                            {sub ? 'SUBMITTED' : 'ACTIVE'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* MODAL FOOTER */}
              <div className="pt-4 border-t border-[#E2D7C6] flex justify-end space-x-2 text-xs">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#E9DDC9] text-[#102A43] font-bold cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ASSIGN ONLINE COURSE TO MENTEE MODAL */}
      <AnimatePresence>
        {selectedCourseToAssign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <form onSubmit={handleAssignOnlineCourse} className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E2D7C6] shadow-2xl max-w-lg w-full space-y-5 relative">
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-[#123B63]" />
                  <h3 className="text-base font-extrabold text-[#102A43]">Assign Online Course to Mentee</h3>
                </div>
                <button type="button" onClick={() => setSelectedCourseToAssign(null)}>
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-1 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-[#123B63] text-white text-[9px] font-bold">
                  {selectedCourseToAssign.platform}
                </span>
                <p className="font-extrabold text-[#102A43] text-sm mt-1">{selectedCourseToAssign.title}</p>
                <p className="text-[#5A6E7F]">{selectedCourseToAssign.provider} • {selectedCourseToAssign.duration}</p>
                <a 
                  href={selectedCourseToAssign.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-[#123B63] hover:underline text-[11px] inline-flex items-center space-x-1 mt-1"
                >
                  <span>Verify Course Syllabus & Link</span>
                  <ExternalLink className="w-3 h-3 text-[#123B63]" />
                </a>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#102A43]">Select Mentee / Student:</label>
                  <select
                    value={assignStudentId}
                    onChange={(e) => setAssignStudentId(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] font-bold text-[#102A43]"
                  >
                    {allMentees.map(m => (
                      <option key={m.id} value={m.roll}>{m.name} ({m.roll} • {m.branch})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Faculty Study Guidance & Instructions:</label>
                  <textarea
                    value={assignNote}
                    onChange={(e) => setAssignNote(e.target.value)}
                    placeholder="e.g. Please complete Modules 1-3 to support your AI/ML capstone project..."
                    className="w-full mt-1 p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-[#102A43]"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCourseToAssign(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#E9DDC9] text-[#102A43] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white font-bold cursor-pointer shadow-xs"
                >
                  Confirm & Assign Course →
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE NEW ASSIGNMENT MODAL */}
      <AnimatePresence>
        {showCreateAssignmentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <form onSubmit={handleCreateAssignment} className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E2D7C6] shadow-2xl max-w-lg w-full space-y-4 relative">
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <div className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-[#123B63]" />
                  <h3 className="text-base font-extrabold text-[#102A43]">Post New Coursework Assignment</h3>
                </div>
                <button type="button" onClick={() => setShowCreateAssignmentModal(false)}>
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#102A43]">Subject / Course Code:</label>
                    <input
                      type="text"
                      value={newAssignment.code}
                      onChange={(e) => setNewAssignment({ ...newAssignment, code: e.target.value })}
                      placeholder="e.g. CS503"
                      className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] font-mono font-bold text-[#102A43]"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#102A43]">Maximum Marks:</label>
                    <input
                      type="number"
                      value={newAssignment.maxMarks}
                      onChange={(e) => setNewAssignment({ ...newAssignment, maxMarks: Number(e.target.value) })}
                      className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] font-bold text-[#102A43]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Assignment Title & Description:</label>
                  <input
                    type="text"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    placeholder="e.g. Lab Assignment 4: Neural Net Optimization & Hyperparameters"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] font-bold text-[#102A43]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Submission Deadline (MS Teams Style Lockout):</label>
                  <input
                    type="datetime-local"
                    value={newAssignment.deadline}
                    onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] font-bold text-[#102A43]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Late Submission Policy:</label>
                  <input
                    type="text"
                    value={newAssignment.latePolicy}
                    onChange={(e) => setNewAssignment({ ...newAssignment, latePolicy: e.target.value })}
                    placeholder="e.g. Late submissions allowed up to 24 hrs with -10% penalty."
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-[#102A43]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowCreateAssignmentModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#E9DDC9] text-[#102A43] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white font-bold cursor-pointer shadow-xs"
                >
                  Post Assignment to Mentees →
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCHEDULE 1-ON-1 MEETING MODAL */}
      <AnimatePresence>
        {showScheduleMeetingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <form onSubmit={handleScheduleMeeting} className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E2D7C6] shadow-2xl max-w-lg w-full space-y-4 relative">
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#123B63]" />
                  <h3 className="text-base font-extrabold text-[#102A43]">Schedule 1-on-1 Mentoring Meeting</h3>
                </div>
                <button type="button" onClick={() => setShowScheduleMeetingModal(false)}>
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#102A43]">Select Mentee / Student:</label>
                  <select
                    value={newMeeting.studentId}
                    onChange={(e) => setNewMeeting({ ...newMeeting, studentId: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] font-bold text-[#102A43]"
                  >
                    {allMentees.map(m => (
                      <option key={m.id} value={m.roll}>{m.name} ({m.roll} • {m.branch})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Meeting Topic & Agenda:</label>
                  <input
                    type="text"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                    placeholder="e.g. 1-on-1 Placement & Capstone Review"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] font-bold text-[#102A43]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Meeting Date & Time:</label>
                  <input
                    type="text"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                    placeholder="e.g. Aug 22, 2026 at 4:00 PM IST"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] font-bold text-[#102A43]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowScheduleMeetingModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#E9DDC9] text-[#102A43] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white font-bold cursor-pointer shadow-xs"
                >
                  Confirm Meeting Schedule →
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PERSISTENT FLOATING AI COPILOT DRAWER */}
      <AnimatePresence>
        {aiDrawerOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-[#FFFDF8] border-l border-[#E2D7C6] shadow-2xl z-50 flex flex-col justify-between"
          >
            <div className="p-5 bg-[#123B63] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-5 h-5 text-[#F5C056]" />
                <div>
                  <h3 className="text-sm font-bold text-white">VITARA AI Faculty Assistant</h3>
                  <p className="text-[10px] text-slate-300">Context-Aware RAG Engine</p>
                </div>
              </div>
              <button 
                onClick={() => setAiDrawerOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

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

            <form onSubmit={(e) => handleSendMessage(e)} className="p-4 border-t border-[#E2D7C6] flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask AI about mentees, attendance, assignments..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43] focus:outline-none focus:border-[#123B63]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-[#123B63] text-white hover:bg-[#1D4E73] transition-colors cursor-pointer"
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
