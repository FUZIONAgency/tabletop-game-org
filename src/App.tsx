import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Network from "@/pages/Network";
import AcceptInvite from "@/pages/AcceptInvite";
import ConventionSales from "@/pages/earn/ConventionSales";
import RetailerSales from "@/pages/earn/RetailerSales";
import ProductSales from "@/pages/earn/ProductSales";
import PaidGames from "@/pages/earn/PaidGames";
import Overrides from "@/pages/earn/Overrides";
import GetCertified from "@/pages/qualify/GetCertified";
import Ratings from "@/pages/qualify/Ratings";
import Online from "@/pages/play/Online";
import RetailerGames from "@/pages/play/RetailerGames";
import ConventionGames from "@/pages/play/ConventionGames";
import Contact from "@/pages/footer/Contact";
import Terms from "@/pages/footer/Terms";
import PrivacyPolicy from "@/pages/footer/PrivacyPolicy";
import MyGames from "@/pages/my/MyGames";
import MyRetailers from "@/pages/my/MyRetailers";
import MyGameSystems from "@/pages/my/MyGameSystems";
import MyEquipment from "@/pages/my/MyEquipment";
import MyInventory from "@/pages/my/MyInventory";
import MyPurchases from "@/pages/my/MyPurchases";
import MyEarnings from "@/pages/my/MyEarnings";
import MyExams from "@/pages/my/MyExams";
import MyTournaments from "@/pages/my/MyTournaments";
import MyFundraisers from "@/pages/my/MyFundraisers";
import MyConventions from "@/pages/my/MyConventions";
import TakeExam from "@/pages/my/TakeExam";
import NewCampaign from "@/pages/my/NewCampaign";
import CampaignDetail from "@/pages/campaigns/CampaignDetail";
import EditCampaign from "@/pages/campaigns/EditCampaign";
import RetailerSearch from "@/pages/retailers/RetailerSearch";
import RetailerDetail from "@/pages/retailers/RetailerDetail";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/network" element={<Network />} />
          <Route path="/accept-invite" element={<AcceptInvite />} />
          <Route path="/earn/convention-sales" element={<ConventionSales />} />
          <Route path="/earn/retailer-sales" element={<RetailerSales />} />
          <Route path="/earn/product-sales" element={<ProductSales />} />
          <Route path="/earn/paid-games" element={<PaidGames />} />
          <Route path="/earn/overrides" element={<Overrides />} />
          <Route path="/qualify/get-certified" element={<GetCertified />} />
          <Route path="/qualify/ratings" element={<Ratings />} />
          <Route path="/play/online" element={<Online />} />
          <Route path="/play/retailer-games" element={<RetailerGames />} />
          <Route path="/play/convention-games" element={<ConventionGames />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/my/games" element={<MyGames />} />
          <Route path="/my/retailers" element={<MyRetailers />} />
          <Route path="/my/game-systems" element={<MyGameSystems />} />
          <Route path="/my/equipment" element={<MyEquipment />} />
          <Route path="/my/inventory" element={<MyInventory />} />
          <Route path="/my/purchases" element={<MyPurchases />} />
          <Route path="/my/earnings" element={<MyEarnings />} />
          <Route path="/my/exams" element={<MyExams />} />
          <Route path="/my/tournaments" element={<MyTournaments />} />
          <Route path="/my/fundraisers" element={<MyFundraisers />} />
          <Route path="/my/conventions" element={<MyConventions />} />
          <Route path="/my/take-exam" element={<TakeExam />} />
          <Route path="/my/new-campaign" element={<NewCampaign />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route path="/campaigns/:id/edit" element={<EditCampaign />} />
          <Route path="/retailers/search" element={<RetailerSearch />} />
          <Route path="/retailers/:id" element={<RetailerDetail />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;