import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Network from "@/pages/Network";
import AcceptInvite from "@/pages/AcceptInvite";
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/network" element={<Network />} />
            <Route path="/accept-invite" element={<AcceptInvite />} />
            
            {/* My Section Routes */}
            <Route path="/my/games" element={<MyGames />} />
            <Route 
              path="/my/games/new" 
              element={
                <ProtectedRoute>
                  <NewCampaign />
                </ProtectedRoute>
              } 
            />
            <Route path="/my/gamesystems" element={<MyGameSystems />} />
            <Route path="/my/games" element={<MyGames />} />
            <Route path="/my/retailers" element={<MyRetailers />} />
            <Route path="/my/exams" element={<MyExams />} />
            <Route path="/my/exams/:examId" element={<TakeExam />} />

            {/* Play Section Routes */}
            <Route path="/play/retailer" element={<RetailerGames />} />
            <Route path="/play/convention" element={<ConventionGames />} />
            <Route path="/play/online" element={<Online />} />
            
            {/* Retailer Routes */}
            <Route path="/retailers/search" element={<RetailerSearch />} />
            <Route path="/retailers/:id" element={<RetailerDetail />} />
            <Route path="/retailers/:id/edit" element={<EditCampaign />} />

            {/* Campaign Routes */}
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/campaigns/:id/edit" element={<EditCampaign />} />

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