export type CampaignAction = 'join' | 'leave';

export interface CampaignActionState {
  isDialogOpen: boolean;
  selectedCampaignId: string | null;
  dialogAction: CampaignAction;
}

export interface UseCampaignActionsReturn extends CampaignActionState {
  setIsDialogOpen: (open: boolean) => void;
  setSelectedCampaignId: (id: string | null) => void;
  setDialogAction: (action: CampaignAction) => void;
  handleJoinCampaign: (campaignId: string) => Promise<void>;
  handleLeaveCampaign: (campaignId: string) => Promise<void>;
}