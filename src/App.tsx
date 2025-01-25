import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Network from "@/pages/Network";
import AcceptInvite from "@/pages/AcceptInvite";
import RetailerSearch from "@/pages/retailers/RetailerSearch";
import RetailerDetail from "@/pages/retailers/RetailerDetail";
import RetailerGames from "@/pages/play/RetailerGames";
import Online from "@/pages/play/Online";
import ConventionGames from "@/pages/play/ConventionGames";
import GetCertified from "@/pages/qualify/GetCertified";
import Ratings from "@/pages/qualify/Ratings";
import MyGames from "@/pages/my/MyGames";
import MyRetailers from "@/pages/my/MyRetailers";
import MyGameSystems from "@/pages/my/MyGameSystems";
import MyExams from "@/pages/my/MyExams";
import MyTournaments from "@/pages/my/MyTournaments";
import MyConventions from "@/pages/my/MyConventions";
import MyInventory from "@/pages/my/MyInventory";
import MyEquipment from "@/pages/my/MyEquipment";
import MyPurchases from "@/pages/my/MyPurchases";
import MyEarnings from "@/pages/my/MyEarnings";
import MyFundraisers from "@/pages/my/MyFundraisers";
import TakeExam from "@/pages/my/TakeExam";
import Contact from "@/pages/footer/Contact";
import Terms from "@/pages/footer/Terms";
import PrivacyPolicy from "@/pages/footer/PrivacyPolicy";
import CampaignDetail from "@/pages/campaigns/CampaignDetail";
import EditCampaign from "@/pages/campaigns/EditCampaign";
import NewCampaign from "@/pages/campaigns/NewCampaign";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/network" element={<Network />} />
        <Route path="/accept-invite" element={<AcceptInvite />} />
        <Route path="/retailers/search" element={<RetailerSearch />} />
        <Route path="/retailers/:id" element={<RetailerDetail />} />
        <Route path="/play/retailer-games" element={<RetailerGames />} />
        <Route path="/play/online" element={<Online />} />
        <Route path="/play/convention-games" element={<ConventionGames />} />
        <Route path="/qualify/get-certified" element={<GetCertified />} />
        <Route path="/qualify/ratings" element={<Ratings />} />
        <Route path="/my/games" element={<MyGames />} />
        <Route path="/my/retailers" element={<MyRetailers />} />
        <Route path="/my/game-systems" element={<MyGameSystems />} />
        <Route path="/my/exams" element={<MyExams />} />
        <Route path="/my/tournaments" element={<MyTournaments />} />
        <Route path="/my/conventions" element={<MyConventions />} />
        <Route path="/my/inventory" element={<MyInventory />} />
        <Route path="/my/equipment" element={<MyEquipment />} />
        <Route path="/my/purchases" element={<MyPurchases />} />
        <Route path="/my/earnings" element={<MyEarnings />} />
        <Route path="/my/fundraisers" element={<MyFundraisers />} />
        <Route path="/my/exams/:id" element={<TakeExam />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
        <Route path="/campaigns/:id/edit" element={<EditCampaign />} />
        <Route path="/campaigns/new" element={<NewCampaign />} />
      </Routes>
    </Router>
  );
}

export default App;