import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

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

