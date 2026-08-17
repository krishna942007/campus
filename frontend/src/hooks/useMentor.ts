import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export function useMentorRequests() {
  return useQuery({
    queryKey: ['mentorRequests'],
    queryFn: async () => {
      const res: any = await api.get('/mentor/request');
      return res.data;
    },
  });
}

export function useRespondMentorRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, status, feedbackNote }: { requestId: string; status: 'ACCEPTED' | 'DECLINED'; feedbackNote?: string }) => {
      const res: any = await api.patch(`/mentor/request/${requestId}/respond`, { status, feedbackNote });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentorRequests'] });
      queryClient.invalidateQueries({ queryKey: ['mentorMentees'] });
    },
  });
}

export function useAssignOnlineCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData: { studentId: string; title: string; platform?: string; url?: string; category?: string; difficulty?: string; guidanceNotes?: string }) => {
      const res: any = await api.post('/mentor/assign-course', courseData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignedCourses'] });
    },
  });
}

export function useAssignedCourses() {
  return useQuery({
    queryKey: ['assignedCourses'],
    queryFn: async () => {
      const res: any = await api.get('/mentor/assign-course');
      return res.data;
    },
  });
}

export function useMentorMentees() {
  return useQuery({
    queryKey: ['mentorMentees'],
    queryFn: async () => {
      const res: any = await api.get('/mentor/mentees');
      return res.data;
    },
  });
}
