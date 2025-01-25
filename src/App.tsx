import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import AcceptInvite from "@/pages/AcceptInvite";
import Online from "@/pages/play/Online";
import RetailerGames from "@/pages/play/RetailerGames";
import ConventionGames from "@/pages/play/ConventionGames";
import GetCertified from "@/pages/qualify/GetCertified";
import Ratings from "@/pages/qualify/Ratings";
import PaidGames from "@/pages/earn/PaidGames";
import RetailerSales from "@/pages/earn/RetailerSales";
import ConventionSales from "@/pages/earn/ConventionSales";
import ProductSales from "@/pages/earn/ProductSales";
import Overrides from "@/pages/earn/Overrides";
import MyProfile from "@/pages/my/MyProfile";
import MyGameSystems from "@/pages/my/MyGameSystems";
import MyRetailers from "@/pages/my/MyRetailers";
import MyGames from "@/pages/my/MyGames";
import MyTournaments from "@/pages/my/MyTournaments";
import MyConventions from "@/pages/my/MyConventions";
import MyFundraisers from "@/pages/my/MyFundraisers";
import MyEarnings from "@/pages/my/MyEarnings";
import MyPurchases from "@/pages/my/MyPurchases";
import MyInventory from "@/pages/my/MyInventory";
import MyEquipment from "@/pages/my/MyEquipment";
import MyExams from "@/pages/my/MyExams";
import TakeExam from "@/pages/my/TakeExam";
import Network from "@/pages/recruit/MyNetwork";
import Terms from "@/pages/footer/Terms";
import PrivacyPolicy from "@/pages/footer/PrivacyPolicy";
import Contact from "@/pages/footer/Contact";
import RetailerSearch from "@/pages/retailers/RetailerSearch";
import RetailerDetail from "@/pages/retailers/RetailerDetail";
import CampaignDetail from "@/pages/campaigns/CampaignDetail";
import EditCampaign from "@/pages/campaigns/EditCampaign";
import NewCampaign from "@/pages/my/NewCampaign";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/accept-invite/:token",
    element: <AcceptInvite />,
  },
  // Play routes
  {
    path: "/play/online",
    element: <Online />,
  },
  {
    path: "/play/retailer-games",
    element: <RetailerGames />,
  },
  {
    path: "/play/convention-games",
    element: <ConventionGames />,
  },
  // Qualify routes
  {
    path: "/qualify/get-certified",
    element: <GetCertified />,
  },
  {
    path: "/qualify/ratings",
    element: <Ratings />,
  },
  // Earn routes
  {
    path: "/earn/paid-games",
    element: <PaidGames />,
  },
  {
    path: "/earn/retailer-sales",
    element: <RetailerSales />,
  },
  {
    path: "/earn/convention-sales",
    element: <ConventionSales />,
  },
  {
    path: "/earn/product-sales",
    element: <ProductSales />,
  },
  {
    path: "/earn/overrides",
    element: <Overrides />,
  },
  // My routes
  {
    path: "/my/profile",
    element: <MyProfile />,
  },
  {
    path: "/my/game-systems",
    element: <MyGameSystems />,
  },
  {
    path: "/my/retailers",
    element: <MyRetailers />,
  },
  {
    path: "/my/games",
    element: <MyGames />,
  },
  {
    path: "/my/tournaments",
    element: <MyTournaments />,
  },
  {
    path: "/my/conventions",
    element: <MyConventions />,
  },
  {
    path: "/my/fundraisers",
    element: <MyFundraisers />,
  },
  {
    path: "/my/earnings",
    element: <MyEarnings />,
  },
  {
    path: "/my/purchases",
    element: <MyPurchases />,
  },
  {
    path: "/my/inventory",
    element: <MyInventory />,
  },
  {
    path: "/my/equipment",
    element: <MyEquipment />,
  },
  {
    path: "/my/exams",
    element: <MyExams />,
  },
  {
    path: "/my/take-exam/:examId",
    element: <TakeExam />,
  },
  {
    path: "/my/network",
    element: <Network />,
  },
  // Footer routes
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  // Retailer routes
  {
    path: "/retailers/search",
    element: <RetailerSearch />,
  },
  {
    path: "/retailers/:id",
    element: <RetailerDetail />,
  },
  // Campaign routes
  {
    path: "/campaigns/:id",
    element: <CampaignDetail />,
  },
  {
    path: "/campaigns/:id/edit",
    element: <EditCampaign />,
  },
  {
    path: "/my/new-campaign",
    element: <NewCampaign />,
  },
]);

export default router;
