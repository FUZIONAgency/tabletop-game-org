import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Network from "@/pages/Network";
import AcceptInvite from "@/pages/AcceptInvite";

// My Pages
import MyGames from "@/pages/my/MyGames";
import MyExams from "@/pages/my/MyExams";
import MyEarnings from "@/pages/my/MyEarnings";
import MyInventory from "@/pages/my/MyInventory";
import MyProducts from "@/pages/my/MyProducts";
import MyPurchases from "@/pages/my/MyPurchases";
import MyRetailers from "@/pages/my/MyRetailers";
import MyTournaments from "@/pages/my/MyTournaments";
import MyConventions from "@/pages/my/MyConventions";
import MyFundraisers from "@/pages/my/MyFundraisers";
import MyEquipment from "@/pages/my/MyEquipment";
import TakeExam from "@/pages/my/TakeExam";

// Play Pages
import RetailerGames from "@/pages/play/RetailerGames";
import ConventionGames from "@/pages/play/ConventionGames";
import OnlineGames from "@/pages/play/Online";

// Campaign Pages
import CampaignDetail from "@/pages/campaigns/CampaignDetail";
import CampaignEdit from "@/pages/campaigns/CampaignEdit";

// Qualify Pages
import GetCertified from "@/pages/qualify/GetCertified";
import Ratings from "@/pages/qualify/Ratings";

// Earn Pages
import RetailerSales from "@/pages/earn/RetailerSales";
import ConventionSales from "@/pages/earn/ConventionSales";
import ProductSales from "@/pages/earn/ProductSales";
import PaidGames from "@/pages/earn/PaidGames";
import Overrides from "@/pages/earn/Overrides";

// Retailer Pages
import RetailerSearch from "@/pages/retailers/RetailerSearch";
import RetailerDetail from "@/pages/retailers/RetailerDetail";

// Footer Pages
import Contact from "@/pages/footer/Contact";
import Terms from "@/pages/footer/Terms";
import PrivacyPolicy from "@/pages/footer/PrivacyPolicy";

const queryClient = new QueryClient();

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
            
            {/* My Routes */}
            <Route path="/my/games" element={<MyGames />} />
            <Route path="/my/exams" element={<MyExams />} />
            <Route path="/my/earnings" element={<MyEarnings />} />
            <Route path="/my/inventory" element={<MyInventory />} />
            <Route path="/my/products" element={<MyProducts />} />
            <Route path="/my/purchases" element={<MyPurchases />} />
            <Route path="/my/retailers" element={<MyRetailers />} />
            <Route path="/my/tournaments" element={<MyTournaments />} />
            <Route path="/my/conventions" element={<MyConventions />} />
            <Route path="/my/fundraisers" element={<MyFundraisers />} />
            <Route path="/my/equipment" element={<MyEquipment />} />
            <Route path="/my/exams/:id" element={<TakeExam />} />
            
            {/* Play Routes */}
            <Route path="/play/retailer" element={<RetailerGames />} />
            <Route path="/play/convention" element={<ConventionGames />} />
            <Route path="/play/online" element={<OnlineGames />} />
            
            {/* Campaign Routes */}
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/campaigns/:id/edit" element={<CampaignEdit />} />
            
            {/* Qualify Routes */}
            <Route path="/qualify/certified" element={<GetCertified />} />
            <Route path="/qualify/ratings" element={<Ratings />} />
            
            {/* Earn Routes */}
            <Route path="/earn/retailer" element={<RetailerSales />} />
            <Route path="/earn/convention" element={<ConventionSales />} />
            <Route path="/earn/product" element={<ProductSales />} />
            <Route path="/earn/games" element={<PaidGames />} />
            <Route path="/earn/overrides" element={<Overrides />} />
            
            {/* Retailer Routes */}
            <Route path="/retailers" element={<RetailerSearch />} />
            <Route path="/retailers/:id" element={<RetailerDetail />} />
            
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