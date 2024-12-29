import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import MyGames from "@/pages/my/MyGames";
import GetCertified from "@/pages/qualify/GetCertified";
import TakeExam from "@/pages/qualify/TakeExam";
import MyPlayerSection from "@/components/sections/MyPlayerSection";
import Navigation from "@/components/Navigation";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyPlayerSection />,
  },
  {
    path: "/my/games",
    element: <MyGames />,
  },
  {
    path: "/qualify",
    element: <GetCertified />,
  },
  {
    path: "/qualify/exam/:examId",
    element: <TakeExam />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Navigation />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;