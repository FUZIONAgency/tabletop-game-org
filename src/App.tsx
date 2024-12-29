import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth";

// Import pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Network from "@/pages/Network";
import MyGames from "@/pages/profile/MyGames";
import MyRetailers from "@/pages/profile/MyRetailers";
import MyTournaments from "@/pages/profile/MyTournaments";
import MyConventions from "@/pages/profile/MyConventions";
import MyProducts from "@/pages/profile/MyProducts";
import Contact from "@/pages/footer/Contact";
import Terms from "@/pages/footer/Terms";
import PrivacyPolicy from "@/pages/footer/PrivacyPolicy";
import ConventionGames from "@/pages/play/ConventionGames";
import RetailerGames from "@/pages/play/RetailerGames";
import Online from "@/pages/play/Online";
import GetCertified from "@/pages/qualify/GetCertified";
import Ratings from "@/pages/qualify/Ratings";
import ConventionSales from "@/pages/earn/ConventionSales";
import RetailerSales from "@/pages/earn/RetailerSales";
import ProductSales from "@/pages/earn/ProductSales";
import PaidGames from "@/pages/earn/PaidGames";
import Overrides from "@/pages/earn/Overrides";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/network" element={<Network />} />
          <Route path="/my-games" element={<MyGames />} />
          <Route path="/retailers" element={<MyRetailers />} />
          <Route path="/tournaments" element={<MyTournaments />} />
          <Route path="/conventions" element={<MyConventions />} />
          <Route path="/products" element={<MyProducts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/play">
            <Route path="convention-games" element={<ConventionGames />} />
            <Route path="retailer-games" element={<RetailerGames />} />
            <Route path="online" element={<Online />} />
          </Route>
          <Route path="/qualify">
            <Route path="get-certified" element={<GetCertified />} />
            <Route path="ratings" element={<Ratings />} />
          </Route>
          <Route path="/earn">
            <Route path="convention-sales" element={<ConventionSales />} />
            <Route path="retailer-sales" element={<RetailerSales />} />
            <Route path="product-sales" element={<ProductSales />} />
            <Route path="paid-games" element={<PaidGames />} />
            <Route path="overrides" element={<Overrides />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;