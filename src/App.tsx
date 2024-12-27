import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Network from "./pages/Network";
import MyGames from "./pages/MyGames";
import MyRetailers from "./pages/MyRetailers";
import MyTournaments from "./pages/MyTournaments";
import MyConventions from "./pages/MyConventions";
import MyProducts from "./pages/MyProducts";
import Profile from "./pages/Profile";
import OnlineGames from "./pages/play/Online";
import RetailerGames from "./pages/play/RetailerGames";
import ConventionGames from "./pages/play/ConventionGames";
import AuthProvider from "./contexts/auth/AuthContext";
import Navigation from "./components/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/network" element={<Network />} />
            <Route path="/my-games" element={<MyGames />} />
            <Route path="/my-retailers" element={<MyRetailers />} />
            <Route path="/my-tournaments" element={<MyTournaments />} />
            <Route path="/my-conventions" element={<MyConventions />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/play/online" element={<OnlineGames />} />
            <Route path="/play/retailer-games" element={<RetailerGames />} />
            <Route path="/play/convention-games" element={<ConventionGames />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;