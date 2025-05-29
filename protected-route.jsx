import React from 'react';
import { Route, Redirect } from 'wouter';
import { useAuth } from '../hooks/use-auth';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useAuth();

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <Route {...rest}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <Route {...rest}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  // If authenticated, render the component
  return (
    <Route {...rest}>
      <Component />
    </Route>
  );
}