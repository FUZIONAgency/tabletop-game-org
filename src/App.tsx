import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Network from "@/pages/Network";
import MyGames from "@/pages/profile/MyGames";
import MyRetailers from "@/pages/profile/MyRetailers";
import MyTournaments from "@/pages/profile/MyTournaments";
import MyConventions from "@/pages/profile/MyConventions";
import MyProducts from "@/pages/profile/MyProducts";
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
            <Route path="/games" element={<MyGames />} />
            <Route path="/retailers" element={<MyRetailers />} />
            <Route path="/tournaments" element={<MyTournaments />} />
            <Route path="/conventions" element={<MyConventions />} />
            <Route path="/products" element={<MyProducts />} />
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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;