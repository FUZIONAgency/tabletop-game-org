import { useNavigate } from "react-router-dom";
import { Campaign } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface CampaignTableProps {
  campaigns: Campaign[];
  onJoinCampaign: (campaignId: string) => void;
  onLeaveCampaign: (campaignId: string) => void;
}

export const CampaignTable = ({ campaigns, onJoinCampaign, onLeaveCampaign }: CampaignTableProps) => {
  const navigate = useNavigate();

  const handleEditClick = (campaignId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/campaigns/${campaignId}/edit`);
  };

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => navigate(`/campaigns/${campaign.id}`)}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">{campaign.title}</h3>
              <p className="text-gray-600">{campaign.game_system?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              {campaign.is_owner && (
                <Button
                  onClick={(e) => handleEditClick(campaign.id, e)}
                  className="bg-gold hover:bg-gold/90"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  campaign.is_member
                    ? onLeaveCampaign(campaign.id)
                    : onJoinCampaign(campaign.id);
                }}
                variant={campaign.is_member ? "destructive" : "default"}
              >
                {campaign.is_member ? "Leave" : "Join"}
              </Button>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{campaign.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>
              Players: {campaign.min_players} - {campaign.max_players}
            </span>
            <span>${campaign.price}/session</span>
          </div>
        </div>
      ))}
    </div>
  );
};