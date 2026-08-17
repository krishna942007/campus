import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function useAIChat() {
  return useMutation({
    mutationFn: async ({ prompt, model, sessionId }: { prompt: string; model?: string; sessionId?: string }) => {
      const res: any = await api.post('/ai/chat', { prompt, model, sessionId });
      return res.data;
    },
  });
}

export function useRAGSearch() {
  return useMutation({
    mutationFn: async (query: string) => {
      const res: any = await api.post('/ai/rag-search', { query });
      return res.data;
    },
  });
}

export function useAIChatSessions() {
  return useQuery({
    queryKey: ['aiChatSessions'],
    queryFn: async () => {
      const res: any = await api.get('/ai/sessions');
      return res.data;
    },
  });
}
