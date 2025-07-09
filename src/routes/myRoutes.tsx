
import MyProfile from "@/pages/my/MyProfile";
import MyGames from "@/pages/my/MyGames";
import MyPoints from "@/pages/my/MyPoints";
import MyPurchases from "@/pages/my/MyPurchases";
import MyFundraisers from "@/pages/my/MyFundraisers";
import NewCampaign from "@/pages/my/NewCampaign";
import MyConventions from "@/pages/my/MyConventions";
import MyGameSystems from "@/pages/my/MyGameSystems";
import MyRetailers from "@/pages/my/MyRetailers";
import MyExams from "@/pages/my/MyExams";
import TakeExam from "@/pages/my/TakeExam";
import MyContracts from "@/pages/my/MyContracts";
import MyVisits from "@/pages/my/MyVisits";

export const myRoutes = [
  { path: "/my/profile", element: <MyProfile /> },
  { path: "/my/games", element: <MyGames /> },
  { path: "/my/games/new", element: <NewCampaign /> },
  { path: "/my/gamesystems", element: <MyGameSystems /> },
  { path: "/my/retailers", element: <MyRetailers /> },
  { path: "/my/earnings", element: <MyPoints /> },
  { path: "/my/purchases", element: <MyPurchases /> },
  { path: "/my/fundraisers", element: <MyFundraisers /> },
  { path: "/my/exams", element: <MyExams /> },
  { path: "/my/exams/:examId", element: <TakeExam /> },
  { path: "/my/conventions", element: <MyConventions /> },
  { path: "/my/contracts", element: <MyContracts /> },
  { path: "/my/visits", element: <MyVisits /> },
];
