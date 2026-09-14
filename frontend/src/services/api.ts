import axios from 'axios';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' &&
  window.location.hostname === 'localhost' &&
  window.location.port !== '5173' &&
  window.location.port !== '5000'
    ? 'http://localhost:5000/api/v1'
    : '/api/v1');

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to format backend ApiResponse objects
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Admin Student Data Management API Calls
export const studentAdminApi = {
  getStudents: (params?: { search?: string; department?: string; semester?: string; status?: string; page?: number; limit?: number }) =>
    api.get('/admin/students', { params }),

  getStudentById: (id: string) =>
    api.get(`/admin/students/${id}`),

  createStudent: (data: any) =>
    api.post('/admin/students', data),

  updateStudent: (id: string, data: any) =>
    api.put(`/admin/students/${id}`, data),

  updateStatus: (id: string, status: 'ACTIVE' | 'INACTIVE') =>
    api.patch(`/admin/students/${id}/status`, { status }),

  deleteStudent: (id: string) =>
    api.delete(`/admin/students/${id}`),

  previewImport: (rows: any[]) =>
    api.post('/admin/students/import-preview', { rows }),

  commitImport: (rows: any[]) =>
    api.post('/admin/students/import-commit', { rows }),
};

// Student Goals API Calls
export const studentGoalsApi = {
  getGoals: () => 
    api.get('/student/goals'),

  createGoal: (data: { title: string; description?: string }) => 
    api.post('/student/goals', data),

  setPrimaryGoal: (goalId: string) => 
    api.patch(`/student/goals/${goalId}/primary`),

  toggleTask: (goalId: string, milestoneId: string, taskId: string) =>
    api.patch(`/student/goals/${goalId}/milestones/${milestoneId}/tasks/${taskId}/toggle`),

  regenerateRoadmap: (goalId: string) =>
    api.post(`/student/goals/${goalId}/roadmap/regenerate`),

  updateGoal: (goalId: string, data: { title?: string; description?: string; status?: string }) =>
    api.patch(`/student/goals/${goalId}`, data),

  deleteGoal: (goalId: string) =>
    api.delete(`/student/goals/${goalId}`),
};

// Event & AI Recommendation Types
export interface AiEventMetadata {
  targetDomains: string[];
  extractedSkills: string[];
  keyTopics: string[];
  targetAudienceLevel: 'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  summary: string;
  processedAt?: string;
  status: 'PENDING' | 'PROCESSED' | 'FAILED';
}

export interface CampusEvent {
  _id: string;
  title: string;
  description: string;
  eventType: 'WORKSHOP' | 'SEMINAR' | 'HACKATHON' | 'GUEST_LECTURE' | 'COMPETITION' | 'CAREER_FAIR' | 'WEBINAR' | 'OTHER';
  eventDate: string;
  endDate?: string;
  location: string;
  registrationLink?: string;
  capacity: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  createdBy?: {
    _id: string;
    name: string;
    email: string;
    department?: string;
    designation?: string;
  };
  department: string;
  aiMetadata?: AiEventMetadata;
  relevanceScore?: number;
  matchReason?: string;
  matchType?: string;
  matchedSkills?: string[];
  matchedTopics?: string[];
  createdAt: string;
  updatedAt: string;
}

// Events API Calls
export const eventApi = {
  getAll: (params?: { status?: string; eventType?: string; department?: string; search?: string }) =>
    api.get<any, { success: boolean; data: CampusEvent[]; message: string }>('/events', { params }),

  getRecommendations: () =>
    api.get<any, { success: boolean; data: { recommendations: CampusEvent[]; studentTargetGoal?: string; totalEvents: number }; message: string }>('/events/recommendations'),

  getMentorEvents: () =>
    api.get<any, { success: boolean; data: CampusEvent[]; message: string }>('/events/mentor'),

  getById: (id: string) =>
    api.get<any, { success: boolean; data: CampusEvent; message: string }>(`/events/${id}`),

  create: (data: Partial<CampusEvent>) =>
    api.post<any, { success: boolean; data: CampusEvent; message: string }>('/events', data),

  update: (id: string, data: Partial<CampusEvent>) =>
    api.put<any, { success: boolean; data: CampusEvent; message: string }>(`/events/${id}`, data),

  delete: (id: string) =>
    api.delete<any, { success: boolean; data: { deletedId: string }; message: string }>(`/events/${id}`),
};

// Profile Intelligence & Ranking Types
export interface CategoryScores {
  technical: number;
  academic: number;
  projects: number;
  competitive: number;
  engagement: number;
  careerReadiness: number;
}

export interface ProfileIntelligenceDoc {
  _id: string;
  student: string;
  overallScore: number;
  profileStrength: 'EXCEPTIONAL' | 'EXCELLENT' | 'STRONG' | 'COMPETENT' | 'DEVELOPING' | 'EMERGING';
  categoryScores: CategoryScores;
  strengths: Array<{ title: string; reason: string }>;
  improvementAreas: Array<{ title: string; reason: string }>;
  careerReadiness: {
    score: number;
    targetRole: string;
    strengths: string[];
    gaps: string[];
  };
  evidence: Array<{ type: string; referenceTitle: string; reason: string }>;
  confidence: number;
  summary: string;
  profileCompleteness: number;
  profileDataHash: string;
  status: 'CURRENT' | 'STALE' | 'PENDING' | 'FAILED';
  analyzedAt: string;
  analysisVersion: number;
  previousScore?: number;
  previousRank?: number;
  rankChange: number;
  rankChangeReasons: Array<{ change: string; reason: string }>;
  history?: Array<{
    analyzedAt: string;
    overallScore: number;
    rank: number;
    strengthsSummary: string;
    majorChanges: string[];
  }>;
}

export interface RankInfo {
  overallRank: number;
  totalStudents: number;
  tier: string;
  percentile: number;
  overallScore: number;
  profileStrength: string;
  rankChange: number;
  categoryRanks: {
    technical: number;
    careerReadiness: number;
    projects: number;
    academic: number;
    competitive: number;
  };
  categoryScores: CategoryScores;
}

export interface LeaderboardEntry {
  rank: number;
  score: number;
  overallScore: number;
  profileStrength: string;
  tier: string;
  percentile: number;
  categoryScores: CategoryScores;
  targetRole: string;
  topStrength: string;
  analyzedAt: string;
  student: {
    _id: string;
    name: string;
    rollNo: string;
    department: string;
    semester: number;
    avatar?: string;
    cgpa: number;
  };
  isCurrentUser: boolean;
}

export interface LeaderboardResponse {
  category: string;
  entries: LeaderboardEntry[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  currentUserRankInfo?: RankInfo | null;
}

export const profileIntelligenceApi = {
  getIntelligence: () =>
    api.get<any, {
      success: boolean;
      data: {
        intelligence: ProfileIntelligenceDoc;
        rankInfo: RankInfo;
        isStale: boolean;
        profileCompleteness: number;
        evidence: {
          skills: any[];
          projects: any[];
          competitions: any[];
          certifications: any[];
          achievements: any[];
          targetRole: string;
        };
      };
      message: string;
    }>('/student/profile-intelligence'),

  reanalyze: () =>
    api.post<any, {
      success: boolean;
      data: {
        intelligence: ProfileIntelligenceDoc;
        rankInfo: RankInfo;
        isStale: boolean;
        profileCompleteness: number;
      };
      message: string;
    }>('/student/profile-intelligence/reanalyze'),

  updateEvidence: (data: {
    skills?: any[];
    projects?: any[];
    competitions?: any[];
    certifications?: any[];
    achievements?: any[];
    bio?: string;
    github?: string;
    linkedin?: string;
  }) =>
    api.patch<any, { success: boolean; data: any; message: string }>('/student/profile-intelligence/evidence', data),

  getMyRank: () =>
    api.get<any, { success: boolean; data: RankInfo; message: string }>('/student/rank'),

  getLeaderboard: (params?: {
    category?: string;
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
  }) =>
    api.get<any, { success: boolean; data: LeaderboardResponse; message: string }>('/student/leaderboard', { params }),
};

