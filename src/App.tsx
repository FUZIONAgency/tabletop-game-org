import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Network from "@/pages/Network";
import MyGames from "@/pages/my/MyGames";
import MyRetailers from "@/pages/my/MyRetailers";
import MyTournaments from "@/pages/my/MyTournaments";
import MyConventions from "@/pages/my/MyConventions";
import MyProducts from "@/pages/my/MyProducts";
import MyExams from "@/pages/my/MyExams";
import MyEarnings from "@/pages/my/MyEarnings";
import MyFundraisers from "@/pages/my/MyFundraisers";
import MyInventory from "@/pages/my/MyInventory";
import MyEquipment from "@/pages/my/MyEquipment";
import TakeExam from "@/pages/my/TakeExam";
import RetailerGames from "@/pages/play/RetailerGames";
import OnlineGames from "@/pages/play/Online";
import ConventionGames from "@/pages/play/ConventionGames";
import ProductSales from "@/pages/earn/ProductSales";
import Overrides from "@/pages/earn/Overrides";
import ConventionSales from "@/pages/earn/ConventionSales";
import RetailerSales from "@/pages/earn/RetailerSales";
import PaidGames from "@/pages/earn/PaidGames";
import GetCertified from "@/pages/qualify/GetCertified";
import Ratings from "@/pages/qualify/Ratings";
import PrivacyPolicy from "@/pages/footer/PrivacyPolicy";
import Terms from "@/pages/footer/Terms";
import Contact from "@/pages/footer/Contact";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/my/profile" element={<Profile />} />
            <Route path="/my/network" element={<Network />} />
            <Route path="/my/games" element={<MyGames />} />
            <Route path="/my/exams" element={<MyExams />} />
            <Route path="/my/exams/:examId" element={<TakeExam />} />
            <Route path="/my/retailers" element={<MyRetailers />} />
            <Route path="/my/tournaments" element={<MyTournaments />} />
            <Route path="/my/conventions" element={<MyConventions />} />
            <Route path="/my/products" element={<MyProducts />} />
            <Route path="/my/earnings" element={<MyEarnings />} />
            <Route path="/my/fundraisers" element={<MyFundraisers />} />
            <Route path="/my/inventory" element={<MyInventory />} />
            <Route path="/my/equipment" element={<MyEquipment />} />
            <Route path="/play/retailer" element={<RetailerGames />} />
            <Route path="/play/online" element={<OnlineGames />} />
            <Route path="/play/convention" element={<ConventionGames />} />
            <Route path="/earn/product-sales" element={<ProductSales />} />
            <Route path="/earn/overrides" element={<Overrides />} />
            <Route path="/earn/convention-sales" element={<ConventionSales />} />
            <Route path="/earn/retailer-sales" element={<RetailerSales />} />
            <Route path="/earn/paid-games" element={<PaidGames />} />
            <Route path="/qualify/get-certified" element={<GetCertified />} />
            <Route path="/qualify/ratings" element={<Ratings />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;