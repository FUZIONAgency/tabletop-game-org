import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import PageLayout from "@/components/PageLayout";

// Route configurations
import { authRoutes } from "@/routes/authRoutes";
import { myRoutes } from "@/routes/myRoutes";
import { playRoutes } from "@/routes/playRoutes";
import { qualifyRoutes } from "@/routes/qualifyRoutes";
import { earnRoutes } from "@/routes/earnRoutes";
import { recruitRoutes } from "@/routes/recruitRoutes";
import { retailerRoutes } from "@/routes/retailerRoutes";
import { campaignRoutes } from "@/routes/campaignRoutes";
import { footerRoutes } from "@/routes/footerRoutes";

const queryClient = new QueryClient();

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PageLayout><Index /></PageLayout>} />
            
            {/* Auth Routes */}
            {authRoutes.map(route => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={<PageLayout>{route.element}</PageLayout>} 
              />
            ))}

            {/* Protected Routes */}
            {[
              ...myRoutes,
              ...playRoutes,
              ...qualifyRoutes,
              ...earnRoutes,
              ...recruitRoutes,
              ...retailerRoutes,
              ...campaignRoutes
            ].map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PageLayout>
                    <ProtectedRoute>{route.element}</ProtectedRoute>
                  </PageLayout>
                }
              />
            ))}

            {/* Footer Routes */}
            {footerRoutes.map(route => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={<PageLayout>{route.element}</PageLayout>} 
              />
            ))}
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;