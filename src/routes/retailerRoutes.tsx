import RetailerDetail from "@/pages/retailers/RetailerDetail";
import RetailerSearch from "@/pages/retailers/RetailerSearch";
import EditCampaign from "@/pages/campaigns/EditCampaign";

export const retailerRoutes = [
  { path: "/retailers/search", element: <RetailerSearch /> },
  { path: "/retailers/:id", element: <RetailerDetail /> },
  { path: "/retailers/:id/edit", element: <EditCampaign /> },
];