import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getMe } from './functions/getMe';
import { login as loginFn } from './functions/login';
import { logout as logoutFn } from './functions/logout';
import { LoginCredentials } from './types/Login';

// useAuthQuery is a hook that provides authentication state and login/logout functionality

export function useAuthQuery() {
  const queryClient = useQueryClient();
  
  // 1. Check for user authentication

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

  // 2. Login

  const { mutateAsync: login } = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginFn(credentials),
    onSuccess: async () => {
      queryClient.setQueryData(['auth'], true);
      await queryClient.invalidateQueries({ queryKey: ['auth'] });
      console.log('Login successful!');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      throw error;
    }
  });

  // 3. Logout

  const { mutateAsync: logout } = useMutation({
    mutationFn: () => logoutFn(),
    onMutate: async () => {
      queryClient.setQueryData(['auth'], false);
    },
    onSuccess: async () => {
      await queryClient.resetQueries();
      console.log('User logged out');
    },
    onError: (error) => {
      queryClient.setQueryData(['auth'], true);
      console.error('Logout failed:', error);
      throw error;
    }
  });

  return {
    isAuthenticated: !!isAuthenticated,
    isLoading,
    login,
    logout,
  };
}