import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe } from './functions/getMe';
import { login as loginFn } from './functions/login';
import { LoginCredentials } from './types/Login';
import { User } from './types/User';

interface LoginCallbacks {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
}

export function useAuthQuery() {
  const queryClient = useQueryClient();
  
  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await getMe();
        return true;
      } catch (error) {
        console.log('Authentication check failed:', error);
        return false;
      }
    },
  });

  const login = async (credentials: LoginCredentials, callbacks?: LoginCallbacks) => {
    console.log('Attempting login...');
    try {
      const response = await loginFn(credentials);
      
      // Set the auth state immediately
      queryClient.setQueryData(['auth'], true);
      
      // Then invalidate to trigger a background refresh
      await queryClient.invalidateQueries({ queryKey: ['auth'] });
      
      console.log('Login successful!');
      callbacks?.onSuccess?.();
    } catch (error) {
      console.error('Login failed:', error);
      callbacks?.onError?.(error);
      throw error;
    } finally {
      callbacks?.onSettled?.();
    }
  };

  const logout = () => {
    // Set auth query data to false
    queryClient.setQueryData(['auth'], false);
    console.log('User logged out');
  };

  return {
    isAuthenticated: !!isAuthenticated,
    isLoading,
    login,
    logout,
  };
}