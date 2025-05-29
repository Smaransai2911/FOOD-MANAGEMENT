import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "next-themes";

import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import InventoryPage from "@/pages/inventory-page";
import DonatePage from "@/pages/donate-page";
import RecipesPage from "@/pages/recipes-page";
import MapPage from "@/pages/map-page";
import EducationPage from "@/pages/education-page";
import ImpactPage from "@/pages/impact-page";
import SettingsPage from "@/pages/settings-page";
import NotFound from "@/pages/not-found";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/inventory" component={InventoryPage} />
      <ProtectedRoute path="/donate" component={DonatePage} />
      <ProtectedRoute path="/recipes" component={RecipesPage} />
      <ProtectedRoute path="/map" component={MapPage} />
      <ProtectedRoute path="/education" component={EducationPage} />
      <ProtectedRoute path="/impact" component={ImpactPage} />
      <ProtectedRoute path="/settings" component={SettingsPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
