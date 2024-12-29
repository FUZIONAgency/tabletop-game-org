import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import MyGames from "@/pages/my/MyGames";
import GetCertified from "@/pages/qualify/GetCertified";
import TakeExam from "@/pages/qualify/TakeExam";
import MyPlayerSection from "@/components/sections/MyPlayerSection";
import Navigation from "@/components/Navigation";
import PageLayout from "@/components/PageLayout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout><MyPlayerSection /></PageLayout>,
  },
  {
    path: "/my/games",
    element: <PageLayout><MyGames /></PageLayout>,
  },
  {
    path: "/qualify",
    element: <PageLayout><GetCertified /></PageLayout>,
  },
  {
    path: "/qualify/exam/:examId",
    element: <PageLayout><TakeExam /></PageLayout>,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;