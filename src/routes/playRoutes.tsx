import RetailerGames from "@/pages/play/RetailerGames";
import ConventionGames from "@/pages/play/ConventionGames";
import Online from "@/pages/play/Online";

export const playRoutes = [
  { path: "/play/retailer", element: <RetailerGames /> },
  { path: "/play/convention", element: <ConventionGames /> },
  { path: "/play/online", element: <Online /> },
];