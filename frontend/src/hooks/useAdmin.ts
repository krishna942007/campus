import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export function useAdminTelemetry() {
  return useQuery({
    queryKey: ['adminTelemetry'],
    queryFn: async () => {
      const res: any = await api.get('/admin/telemetry');
      return res.data;
    },
    refetchInterval: 30000,
  });
}

export function useAdminUsers(filters?: { role?: string; department?: string }) {
  return useQuery({
    queryKey: ['adminUsers', filters],
    queryFn: async () => {
      const res: any = await api.get('/admin/users', { params: filters });
      return res.data;
    },
  });
}

export function useTriggerErpSync() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res: any = await api.post('/admin/erp-sync');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTelemetry'] });
    },
  });
}
