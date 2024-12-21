import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe } from './functions/getMe';
import { login as loginFn } from './functions/login';
import { LoginCredentials } from './types/Login';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  
  // Use React Query to manage auth state
  const { data, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await getMe();
        return true; // If we get here, the API call was successful and user is authenticated
      } catch (error) {
        console.log('Authentication check failed:', error);
        return false;
      }
    },
  });

  const login = async (credentials: LoginCredentials) => {
    console.log('Attempting login...');
    try {
      await loginFn(credentials);
      // Invalidate and refetch auth query after successful login
      await queryClient.invalidateQueries({ queryKey: ['auth'] });
      // Redirect handled by the login form component instead
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    // Set auth query data to false
    queryClient.setQueryData(['auth'], false);
    console.log('User logged out');
  };

  const value = {
    isAuthenticated: !!data,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}