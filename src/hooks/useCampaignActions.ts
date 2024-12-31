import { useState } from "react";
import { useJoinCampaign } from "./useJoinCampaign";
import { useLeaveCampaign } from "./useLeaveCampaign";
import type { CampaignAction, UseCampaignActionsReturn } from "@/types/campaign-actions";

export const useCampaignActions = (refetch: () => void): UseCampaignActionsReturn => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [dialogAction, setDialogAction] = useState<CampaignAction>('join');

  const handleJoinCampaign = useJoinCampaign(refetch);
  const handleLeaveCampaign = useLeaveCampaign(refetch);

  return {
    isDialogOpen,
    setIsDialogOpen,
    selectedCampaignId,
    setSelectedCampaignId,
    dialogAction,
    setDialogAction,
    handleJoinCampaign,
    handleLeaveCampaign,
  };
};