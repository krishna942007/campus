import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export function useStudentDashboard() {
  return useQuery({
    queryKey: ['studentDashboard'],
    queryFn: async () => {
      const res: any = await api.get('/student/dashboard');
      return res.data;
    },
  });
}

export function useStudentAttendance() {
  return useQuery({
    queryKey: ['studentAttendance'],
    queryFn: async () => {
      const res: any = await api.get('/student/attendance');
      return res.data;
    },
  });
}

export function useStudentAssignments() {
  return useQuery({
    queryKey: ['studentAssignments'],
    queryFn: async () => {
      const res: any = await api.get('/student/assignments');
      return res.data;
    },
  });
}

export function useSubmitAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ assignmentId, fileName, fileUrl }: { assignmentId: string; fileName: string; fileUrl?: string }) => {
      const res: any = await api.post(`/student/assignments/${assignmentId}/submit`, { fileName, fileUrl });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentAssignments'] });
    },
  });
}
