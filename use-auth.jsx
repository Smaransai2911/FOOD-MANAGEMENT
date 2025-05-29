import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getQueryFn, apiRequest, queryClient } from '../lib/queryClient';
import { toast } from 'react-hot-toast';

// Auth context type
const AuthContext = createContext(null);

// Provider component
export function AuthProvider({ children }) {
  // Query to get the current user
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['/api/user'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const res = await apiRequest('POST', '/api/login', credentials);
      return res.json();
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(['/api/user'], userData);
      toast.success('Logged in successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await apiRequest('POST', '/api/register', userData);
      return res.json();
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(['/api/user'], userData);
      toast.success('Registered successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Registration failed');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('POST', '/api/logout');
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/user'], null);
      toast.success('Logged out successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Logout failed');
    },
  });

  // Create the auth context value
  const value = {
    user: user || null,
    isLoading,
    error,
    loginMutation,
    registerMutation,
    logoutMutation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}