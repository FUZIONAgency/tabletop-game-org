import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Network from "@/pages/Network";
import MyRetailers from "@/pages/MyRetailers";
import MyTournaments from "@/pages/MyTournaments";
import MyConventions from "@/pages/MyConventions";
import MyProducts from "@/pages/MyProducts";
import Games from "@/pages/Games";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/network" element={<Network />} />
        <Route path="/retailers" element={<MyRetailers />} />
        <Route path="/tournaments" element={<MyTournaments />} />
        <Route path="/conventions" element={<MyConventions />} />
        <Route path="/products" element={<MyProducts />} />
        <Route path="/games" element={<Games />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;