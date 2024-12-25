import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Network from "./pages/Network";
import MyRetailers from "./pages/MyRetailers";
import MyConventions from "./pages/MyConventions";
import MyGames from "./pages/MyGames";
import MyTournaments from "./pages/MyTournaments";
import MyProducts from "./pages/MyProducts";
import { useAuth } from "./contexts/auth";
import { Skeleton } from "./components/ui/skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-3xl px-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-72 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/network"
              element={
                <ProtectedRoute>
                  <Network />
                </ProtectedRoute>
              }
            />
            <Route
              path="/retailers"
              element={
                <ProtectedRoute>
                  <MyRetailers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/conventions"
              element={
                <ProtectedRoute>
                  <MyConventions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games"
              element={
                <ProtectedRoute>
                  <MyGames />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tournaments"
              element={
                <ProtectedRoute>
                  <MyTournaments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <MyProducts />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;