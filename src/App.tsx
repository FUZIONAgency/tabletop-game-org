import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Network from "@/pages/Network";
import AcceptInvite from "@/pages/AcceptInvite";
import MyProfile from "@/pages/my/MyProfile";
import MyGames from "@/pages/my/MyGames";
import NewCampaign from "@/pages/my/NewCampaign";
import MyGameSystems from "@/pages/my/MyGameSystems";
import MyRetailers from "@/pages/my/MyRetailers";
import MyExams from "@/pages/my/MyExams";
import TakeExam from "@/pages/my/TakeExam";
import RetailerGames from "@/pages/play/RetailerGames";
import ConventionGames from "@/pages/play/ConventionGames";
import Online from "@/pages/play/Online";
import CampaignDetail from "@/pages/campaigns/CampaignDetail";
import EditCampaign from "@/pages/campaigns/EditCampaign";

import RetailerDetail from "@/pages/retailers/RetailerDetail";
import RetailerSearch from "@/pages/retailers/RetailerSearch";

// Earn pages
import ConventionSales from "./pages/earn/ConventionSales";
import Overrides from "./pages/earn/Overrides";
import PaidGames from "./pages/earn/PaidGames";
import ProductSales from "./pages/earn/ProductSales";
import RetailerSales from "./pages/earn/RetailerSales";

// Footer pages
import Contact from "@/pages/footer/Contact";
import Terms from "@/pages/footer/Terms";
import PrivacyPolicy from "@/pages/footer/PrivacyPolicy";

const queryClient = new QueryClient();

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading spinner
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
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/network" element={<Network />} />
            <Route path="/accept-invite" element={<AcceptInvite />} />
            
            {/* My Section Routes */}
            <Route path="/my/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
            <Route path="/my/games" element={<ProtectedRoute><MyGames /></ProtectedRoute>} />
            <Route path="/my/games/new" element={<ProtectedRoute><NewCampaign /></ProtectedRoute>} />
            <Route path="/my/gamesystems" element={<ProtectedRoute><MyGameSystems /></ProtectedRoute>} />
            <Route path="/my/games" element={<ProtectedRoute><MyGames /></ProtectedRoute>} />
            <Route path="/my/retailers" element={<ProtectedRoute><MyRetailers /></ProtectedRoute>} />
            <Route path="/my/exams" element={<ProtectedRoute><MyExams /></ProtectedRoute>} />
            <Route path="/my/exams/:examId" element={<ProtectedRoute><TakeExam /></ProtectedRoute>} />

            {/* Play Section Routes */}
            <Route path="/play/retailer" element={<ProtectedRoute><RetailerGames /></ProtectedRoute>} />
            <Route path="/play/convention" element={<ProtectedRoute><ConventionGames /></ProtectedRoute>} />
            <Route path="/play/online" element={<ProtectedRoute><Online /></ProtectedRoute>} />
            
            {/* Earn Section Routes */}
            <Route path="/earn/product-sales" element={<ProtectedRoute><ProductSales /></ProtectedRoute>} />
            <Route path="/earn/overrides" element={<ProtectedRoute><Overrides /></ProtectedRoute>} />
            <Route path="/earn/convention-sales" element={<ProtectedRoute><ConventionSales /></ProtectedRoute>} />
            <Route path="/earn/retailer-sales" element={<ProtectedRoute><RetailerSales /></ProtectedRoute>} />
            <Route path="/earn/paid-games" element={<ProtectedRoute><PaidGames /></ProtectedRoute>} />

            {/* Retailer Routes */}
            <Route path="/retailers/search" element={<ProtectedRoute><RetailerSearch /></ProtectedRoute>} />
            <Route path="/retailers/:id" element={<ProtectedRoute><RetailerDetail /></ProtectedRoute>} />
            <Route path="/retailers/:id/edit" element={<ProtectedRoute><EditCampaign /></ProtectedRoute>} />

            {/* Campaign Routes */}
            <Route path="/campaigns/:id" element={<ProtectedRoute><CampaignDetail /></ProtectedRoute>} />
            <Route path="/campaigns/:id/edit" element={<ProtectedRoute><EditCampaign /></ProtectedRoute>} />

            {/* Footer Routes */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;