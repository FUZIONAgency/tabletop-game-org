import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import MyGames from "@/pages/my/MyGames";
import MyExams from "@/pages/my/MyExams";
import TakeExamPage from "@/pages/my/TakeExamPage";
import PrivateRoute from "@/components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/my/games"
              element={
                <PrivateRoute>
                  <MyGames />
                </PrivateRoute>
              }
            />
            <Route
              path="/my/exams"
              element={
                <PrivateRoute>
                  <MyExams />
                </PrivateRoute>
              }
            />
            <Route
              path="/my/exams/:examId"
              element={
                <PrivateRoute>
                  <TakeExamPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;