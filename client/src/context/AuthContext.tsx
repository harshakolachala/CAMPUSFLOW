import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

export type UserRole = 'student' | 'faculty' | 'admin' | 'seating_manager' | 'club_coordinator';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication on app load
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('campusflow_user');
        const storedToken = localStorage.getItem('campusflow_token');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          // Set default authorization header for all API requests
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
        // Clear corrupted data
        localStorage.removeItem('campusflow_user');
        localStorage.removeItem('campusflow_token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { 
        email, 
        password 
      });
      
      const userData = response.data;
      const token = userData.token || 'dummy_token'; // Use actual token from backend
      
      setUser(userData);
      
      // Store in localStorage with proper keys
      localStorage.setItem('campusflow_user', JSON.stringify(userData));
      localStorage.setItem('campusflow_token', token);
      
      // Set authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    } catch (error: any) {
      console.error('Login failed:', error);
      const message = error.response?.data?.error || 'Login failed. Please check your credentials.';
      throw new Error(message);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        role
      });

      const userData = response.data;
      const token = userData.token || 'dummy_token'; // Use actual token from backend
      
      setUser(userData);
      
      // Store in localStorage
      localStorage.setItem('campusflow_user', JSON.stringify(userData));
      localStorage.setItem('campusflow_token', token);
      
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      const message = error.response?.data?.error || 'Registration failed. Please try again.';
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusflow_user');
    localStorage.removeItem('campusflow_token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
