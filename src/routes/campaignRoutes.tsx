import CampaignDetail from "@/pages/campaigns/CampaignDetail";
import EditCampaign from "@/pages/campaigns/EditCampaign";

export const campaignRoutes = [
  { path: "/campaigns/:id", element: <CampaignDetail /> },
  { path: "/campaigns/:id/edit", element: <EditCampaign /> },
];