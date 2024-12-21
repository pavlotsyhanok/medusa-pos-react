import { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
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
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticated = false; // Always authenticated for testing

  const login = () => {
    // setIsAuthenticated(true);
    console.log('Login called - always authenticated for testing');
  };

  const logout = () => {
    // setIsAuthenticated(false);
    console.log('Logout called - always authenticated for testing');
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}