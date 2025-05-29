import React from 'react';
import { Switch, Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { AuthProvider } from './hooks/use-auth';
import { Toaster } from "react-hot-toast";

// Page imports
import HomePage from './pages/home-page';
import AuthPage from './pages/auth-page';
import InventoryPage from './pages/inventory-page';
import DonatePage from './pages/donate-page';
import RecipesPage from './pages/recipes-page';
import MapPage from './pages/map-page';
import EducationPage from './pages/education-page';
import ImpactPage from './pages/impact-page';
import SettingsPage from './pages/settings-page';
import NotFound from './pages/not-found';

// Component imports
import Layout from './components/layout';


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/inventory" component={InventoryPage} />
            <Route path="/recipes" component={RecipesPage} />
            <Route path="/donate" component={DonatePage} />
            <Route path="/impact" component={ImpactPage} />
            <Route path="/education" component={EducationPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}