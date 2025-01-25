import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Network from "@/pages/Network";
import AcceptInvite from "@/pages/AcceptInvite";
import Contact from "@/pages/footer/Contact";
import Terms from "@/pages/footer/Terms";
import PrivacyPolicy from "@/pages/footer/PrivacyPolicy";
import MyGames from "@/pages/my/MyGames";
import MyRetailers from "@/pages/my/MyRetailers";
import MyExams from "@/pages/my/MyExams";
import MyGameSystems from "@/pages/my/MyGameSystems";
import MyTournaments from "@/pages/my/MyTournaments";
import MyConventions from "@/pages/my/MyConventions";
import MyFundraisers from "@/pages/my/MyFundraisers";
import MyInventory from "@/pages/my/MyInventory";
import MyEquipment from "@/pages/my/MyEquipment";
import MyPurchases from "@/pages/my/MyPurchases";
import MyEarnings from "@/pages/my/MyEarnings";
import NewCampaign from "@/pages/my/NewCampaign";
import EditCampaign from "@/pages/campaigns/EditCampaign";
import CampaignDetail from "@/pages/campaigns/CampaignDetail";
import TakeExam from "@/pages/my/TakeExam";
import RetailerGames from "@/pages/play/RetailerGames";
import ConventionGames from "@/pages/play/ConventionGames";
import Online from "@/pages/play/Online";
import GetCertified from "@/pages/qualify/GetCertified";
import Ratings from "@/pages/qualify/Ratings";
import RetailerSales from "@/pages/earn/RetailerSales";
import ConventionSales from "@/pages/earn/ConventionSales";
import ProductSales from "@/pages/earn/ProductSales";
import PaidGames from "@/pages/earn/PaidGames";
import Overrides from "@/pages/earn/Overrides";
import RetailerSearch from "@/pages/retailers/RetailerSearch";
import RetailerDetail from "@/pages/retailers/RetailerDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/network" element={<Network />} />
        <Route path="/accept-invite" element={<AcceptInvite />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/my/games" element={<MyGames />} />
        <Route path="/my/retailers" element={<MyRetailers />} />
        <Route path="/my/exams" element={<MyExams />} />
        <Route path="/my/game-systems" element={<MyGameSystems />} />
        <Route path="/my/tournaments" element={<MyTournaments />} />
        <Route path="/my/conventions" element={<MyConventions />} />
        <Route path="/my/fundraisers" element={<MyFundraisers />} />
        <Route path="/my/inventory" element={<MyInventory />} />
        <Route path="/my/equipment" element={<MyEquipment />} />
        <Route path="/my/purchases" element={<MyPurchases />} />
        <Route path="/my/earnings" element={<MyEarnings />} />
        <Route path="/my/games/new" element={<NewCampaign />} />
        <Route path="/my/games/:id/edit" element={<EditCampaign />} />
        <Route path="/my/games/:id" element={<CampaignDetail />} />
        <Route path="/my/exams/:id" element={<TakeExam />} />
        <Route path="/play/retailer-games" element={<RetailerGames />} />
        <Route path="/play/convention-games" element={<ConventionGames />} />
        <Route path="/play/online" element={<Online />} />
        <Route path="/qualify/get-certified" element={<GetCertified />} />
        <Route path="/qualify/ratings" element={<Ratings />} />
        <Route path="/earn/retailer-sales" element={<RetailerSales />} />
        <Route path="/earn/convention-sales" element={<ConventionSales />} />
        <Route path="/earn/product-sales" element={<ProductSales />} />
        <Route path="/earn/paid-games" element={<PaidGames />} />
        <Route path="/earn/overrides" element={<Overrides />} />
        <Route path="/retailers/search" element={<RetailerSearch />} />
        <Route path="/retailers/:id" element={<RetailerDetail />} />
      </Routes>
    </Router>
  );
}

export default App;