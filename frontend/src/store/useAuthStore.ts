import { create } from 'zustand';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'MENTOR' | 'ADMIN';
  department: string;
  avatar?: string;
  rollNo?: string;
  cgpa?: number;
  attendancePercentage?: number;
  designation?: string;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  activeRole: 'STUDENT' | 'MENTOR' | 'ADMIN';
  setUser: (user: UserProfile | null) => void;
  setActiveRole: (role: 'STUDENT' | 'MENTOR' | 'ADMIN') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  activeRole: 'STUDENT',
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      activeRole: user?.role || 'STUDENT',
    }),
  setActiveRole: (activeRole) => set({ activeRole }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      activeRole: 'STUDENT',
    }),
}));
