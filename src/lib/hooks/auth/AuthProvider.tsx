import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe } from './functions/getMe';
import { login as loginFn } from './functions/login';
import { logout as logoutFn } from './functions/logout';
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

  const logout = async (callbacks?: LoginCallbacks) => {
    try {
      // First, update the cache to ensure UI updates immediately
      queryClient.setQueryData(['auth'], false);
      
      // Then perform the actual logout
      await logoutFn();
      
      // Clear all queries from the cache
      await queryClient.resetQueries();
      
      console.log('User logged out');
      callbacks?.onSuccess?.();
    } catch (error) {
      // If logout fails, revert the cache
      queryClient.setQueryData(['auth'], true);
      console.error('Logout failed:', error);
      callbacks?.onError?.(error);
      throw error;
    } finally {
      callbacks?.onSettled?.();
    }
  };

  return {
    isAuthenticated: !!isAuthenticated,
    isLoading,
    login,
    logout,
  };
}