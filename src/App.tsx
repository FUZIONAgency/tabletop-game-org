import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Auth from "@/pages/Auth";
import Index from "@/pages/Index";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout><Outlet /></PageLayout>}>
          <Route index element={<Index />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;