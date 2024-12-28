import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Network from "@/pages/Network";
import MyGames from "@/pages/MyGames";
import MyRetailers from "@/pages/MyRetailers";
import MyTournaments from "@/pages/MyTournaments";
import MyConventions from "@/pages/MyConventions";
import MyProducts from "@/pages/MyProducts";
import RetailerGames from "@/pages/play/RetailerGames";
import OnlineGames from "@/pages/play/Online";
import ConventionGames from "@/pages/play/ConventionGames";

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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;