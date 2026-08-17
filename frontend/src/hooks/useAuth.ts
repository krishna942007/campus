import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

export function useAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const logoutStore = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email?: string; rollNo?: string; password?: string; role?: string }) => {
      const res: any = await api.post('/auth/login', credentials);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.user) {
        setUser(data.user);
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: { name: string; email: string; password?: string; role?: string; department?: string }) => {
      const res: any = await api.post('/auth/register', userData);
      return res.data;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res: any = await api.post('/auth/logout');
      return res.data;
    },
    onSuccess: () => {
      logoutStore();
    },
  });

  const currentUserQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const res: any = await api.get('/auth/current-user');
      return res.data;
    },
    retry: false,
  });

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,

    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    currentUser: currentUserQuery.data,
    isLoadingCurrentUser: currentUserQuery.isLoading,
  };
}
