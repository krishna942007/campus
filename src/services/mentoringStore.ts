export interface MentorRequest {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  branch: string;
  semester: string;
  cgpa: number;
  attendancePct: number;
  goal: string;
  goals: string[];
  field: string;
  matchScore: number;
  matchReason: string;
  note: string;
  requestDate: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'CHANGE_PENDING';
  declineReason?: string;
}

export interface ChangeMentorRequest {
  id: string;
  studentId: string;
  studentName: string;
  currentMentor: string;
  requestedMentor?: string;
  reason: string;
  date: string;
  status: 'CHANGE_PENDING' | 'APPROVED' | 'DECLINED';
}

export interface CourseworkAssignment {
  id: number;
  code: string;
  title: string;
  assignedBy: string;
  assignedDate: string;
  deadline: string;
  deadlineFormatted: string;
  maxMarks: number;
  latePolicy: string;
  submissions: {
    studentId: string;
    studentName: string;
    fileName: string;
    submittedAt: string;
    status: 'SUBMITTED' | 'LATE';
  }[];
}

export interface MentoringMeeting {
  id: string;
  studentId: string;
  studentName: string;
  mentorName: string;
  date: string;
  title: string;
  type: string;
  status: 'REQUESTED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

export interface SessionFeedbackLog {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  mentorName: string;
  sessionType: string;
  notesPrivate: string;
  feedbackStudentVisible: string;
  followUpAction?: string;
  followUpCompleted?: boolean;
}

export interface AssignedOnlineCourse {
  id: string;
  courseTitle: string;
  platform: string;
  provider: string;
  url: string;
  category: string;
  difficulty: string;
  duration: string;
  syllabusOverview: string;
  assignedBy: string;
  assignedToStudentId: string;
  assignedToStudentName: string;
  assignedDate: string;
  guidanceNote: string;
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED';
}

const STORE_KEY = 'vit_mumbai_mentoring_store_v2';

const defaultStoreState = {
  mentorRequests: [
    {
      id: 'req-101',
      studentId: '2023CSE001',
      studentName: 'Krishna Singh',
      program: 'B.Tech Engineering',
      branch: 'Computer Engineering & AI',
      semester: 'Semester IV',
      cgpa: 8.92,
      attendancePct: 91.4,
      goal: 'Get placed in software development',
      goals: ['Get placed in software development', 'Become an AI/ML engineer'],
      field: 'AI / Machine Learning',
      matchScore: 96,
      matchReason: '✓ Goal compatibility (40%) • ✓ AI/ML expertise (25%) • ✓ Relevant subject CS503 (10%) • ✓ Department compatibility (10%)',
      note: "I'd like guidance in AI/ML and building my first production-level project.",
      requestDate: 'Aug 15, 2026',
      status: 'PENDING' as const
    }
  ],
  changeMentorRequests: [] as ChangeMentorRequest[],
  assignments: [
    {
      id: 1,
      code: 'CS503',
      title: 'Lab Assignment 3: Implement RAG Pipeline with pgvector & LangChain',
      assignedBy: 'Prof. S. Kulkarni (HOD Computer Engineering)',
      assignedDate: 'Aug 10, 2026',
      deadline: '2026-08-18T23:59:00',
      deadlineFormatted: 'Aug 18, 2026 at 11:59 PM IST',
      maxMarks: 50,
      latePolicy: 'Late submissions allowed up to 24 hrs with -10% mark deduction penalty.',
      submissions: [
        {
          studentId: '2023CSE001',
          studentName: 'Krishna Singh',
          fileName: 'CS503_KrishnaSingh_Lab3_RAG.zip',
          submittedAt: 'Aug 15, 2026 at 7:32 PM IST',
          status: 'SUBMITTED' as const
        }
      ]
    },
    {
      id: 2,
      code: 'CS501',
      title: 'Problem Set 4: Dynamic Programming & Shortest Path Algorithms',
      assignedBy: 'Prof. V. Sharma',
      assignedDate: 'Aug 01, 2026',
      deadline: '2026-08-14T23:59:00',
      deadlineFormatted: 'Aug 14, 2026 at 11:59 PM IST',
      maxMarks: 30,
      latePolicy: 'CLOSED • Strict deadline. No submissions accepted after Aug 14 at 11:59 PM.',
      submissions: []
    },
    {
      id: 3,
      code: 'CS502',
      title: 'Mini-Project: B-Tree Indexing & Transaction Concurrency Control',
      assignedBy: 'Dr. R. Mehta',
      assignedDate: 'Jul 28, 2026',
      deadline: '2026-08-12T17:00:00',
      deadlineFormatted: 'Aug 12, 2026 at 5:00 PM IST',
      maxMarks: 40,
      latePolicy: 'Submitted on time',
      submissions: [
        {
          studentId: '2023CSE001',
          studentName: 'Krishna Singh',
          fileName: 'CS502_KrishnaSingh_BTree_Project.zip',
          submittedAt: 'Aug 11, 2026 at 4:32 PM IST',
          status: 'SUBMITTED' as const
        }
      ]
    }
  ] as CourseworkAssignment[],
  meetings: [
    {
      id: 'mtg-1',
      studentId: '2023CSE001',
      studentName: 'Krishna Singh',
      mentorName: 'Prof. S. Kulkarni',
      date: 'Aug 20, 2026 at 3:00 PM IST',
      title: '1-on-1 Check-in with Prof. S. Kulkarni',
      type: 'Mentoring',
      status: 'SCHEDULED' as const
    }
  ] as MentoringMeeting[],
  feedbackLogs: [
    {
      id: 'log-1',
      date: 'Aug 10, 2026',
      studentId: '2023CSE001',
      studentName: 'Krishna Singh',
      mentorName: 'Prof. S. Kulkarni',
      sessionType: '1-on-1 Mentoring',
      notesPrivate: 'Krishna showed solid grasp of vector embeddings. Needs practice with SQL index tuning.',
      feedbackStudentVisible: 'Approved capstone proposal on RAG. Instructed Krishna to focus on PostgreSQL index tuning.',
      followUpAction: 'Complete PostgreSQL indexing experiment',
      followUpCompleted: false
    },
    {
      id: 'log-2',
      date: 'Jul 22, 2026',
      studentId: '2023CSE001',
      studentName: 'Krishna Singh',
      mentorName: 'Prof. S. Kulkarni',
      sessionType: 'Semester Review',
      notesPrivate: 'High performer with top 5% CGPA. Recommended IEEE paper grant.',
      feedbackStudentVisible: 'Reviewed Sem III SGPA (8.90). Advised applying for IEEE Student Research Grant.',
      followUpAction: 'Draft IEEE Grant proposal outline',
      followUpCompleted: true
    }
  ] as SessionFeedbackLog[],
  studentNotifications: [
    { id: 1, category: 'Academic', title: 'Attendance Record Synced', text: 'Discrete Math attendance recorded at 71.4%', time: '2h ago', read: false },
    { id: 2, category: 'Mentoring', title: 'Mentor Match Recommended', text: 'AI matched Prof. S. Kulkarni (96% match score)', time: '1d ago', read: false },
  ],
  facultyNotifications: [
    { id: 1, category: 'Mentoring', title: 'New Mentor Request', text: 'Krishna Singh (2023CSE001) requested you as mentor (96% Match)', time: '10m ago', read: false },
    { id: 2, category: 'Assignment', title: 'Assignment Submission', text: 'Krishna Singh submitted CS503 Lab Assignment 3', time: '1h ago', read: false },
  ],
  assignedOnlineCourses: [
    {
      id: 'oc-101',
      courseTitle: 'Stanford CS229: Machine Learning',
      platform: 'Stanford Online / YouTube',
      provider: 'Stanford University',
      url: 'https://cs229.stanford.edu/',
      category: 'AI / Machine Learning',
      difficulty: 'Advanced',
      duration: '10 Weeks (Self-Paced)',
      syllabusOverview: 'Supervised Learning, Deep Learning, Support Vector Machines, Kernels, Reinforcement Learning & Neural Nets.',
      assignedBy: 'Prof. S. Kulkarni (HOD Computer Engineering)',
      assignedToStudentId: '2023CSE001',
      assignedToStudentName: 'Krishna Singh',
      assignedDate: 'Aug 15, 2026',
      guidanceNote: 'Recommended by Prof. S. Kulkarni for strengthening mathematical foundations for your RAG & Neural Networks capstone project.',
      status: 'ASSIGNED' as const
    },
    {
      id: 'oc-102',
      courseTitle: 'DeepLearning.AI: Deep Learning Specialization',
      platform: 'Coursera',
      provider: 'DeepLearning.AI / Andrew Ng',
      url: 'https://www.coursera.org/specializations/deep-learning',
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      duration: '16 Weeks',
      syllabusOverview: 'Neural Networks, Hyperparameter Tuning, Convolutional Nets (CNNs), Sequence Models (RNNs & Transformers).',
      assignedBy: 'Prof. S. Kulkarni (HOD Computer Engineering)',
      assignedToStudentId: '2023CSE001',
      assignedToStudentName: 'Krishna Singh',
      assignedDate: 'Aug 12, 2026',
      guidanceNote: 'Complete Modules 1 & 2 before starting the vision classifier capstone.',
      status: 'IN_PROGRESS' as const
    }
  ] as AssignedOnlineCourse[]
};

export const getMentoringStore = () => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) {
      localStorage.setItem(STORE_KEY, JSON.stringify(defaultStoreState));
      return defaultStoreState;
    }
    return JSON.parse(raw);
  } catch (err) {
    return defaultStoreState;
  }
};

export const saveMentoringStore = (state: typeof defaultStoreState) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error('Error saving mentoring store', err);
  }
};
